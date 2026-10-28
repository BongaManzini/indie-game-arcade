/**
 * Zero Tempo Multiplayer Engine
 * Serverless WebRTC DataChannel (PeerJS) + Local BroadcastChannel + Couch Pass-and-Play
 * Zero server costs, runs 100% on static hosting (GitHub Pages)
 */

class TempoMultiplayer {
  constructor(options = {}) {
    this.gameType = options.gameType || 'imposter';
    this.onStateChange = options.onStateChange || (() => {});
    this.onPlayerListChange = options.onPlayerListChange || (() => {});
    this.onChatMessage = options.onChatMessage || (() => {});
    this.onPrivateData = options.onPrivateData || (() => {});

    this.mode = 'solo'; // 'solo' | 'online-host' | 'online-client' | 'pass-and-play'
    this.roomCode = null;
    this.localPlayer = {
      id: 'local-' + Math.random().toString(36).substring(2, 8),
      name: options.playerName || 'Player 1',
      isHost: false
    };
    this.players = []; // [{ id, name, isHost, ready, clue, vote, isImposter }]
    this.peer = null;
    this.connections = new Map(); // peerId -> DataConnection
    this.hostConnection = null;
    this.broadcastChannel = null;

    // Pass and Play State
    this.passState = {
      playerIndex: 0,
      phase: 'pass', // 'pass' | 'turn'
      playerNames: ['Player 1', 'Player 2', 'Player 3', 'Player 4']
    };
  }

  // 1. ROOM CODE GENERATION
  generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // 2. HOST ONLINE ROOM
  hostRoom(playerName = 'Host Player', onReady = () => {}) {
    this.mode = 'online-host';
    this.roomCode = this.generateCode();
    this.localPlayer.name = playerName;
    this.localPlayer.isHost = true;
    this.players = [{
      id: this.localPlayer.id,
      name: this.localPlayer.name,
      isHost: true,
      ready: true,
      clue: null,
      vote: null
    }];

    // Setup Local BroadcastChannel as instant zero-latency bridge
    this.setupBroadcastChannel(this.roomCode);

    // Initialize PeerJS if library available
    const peerId = `zt-arcade-${this.roomCode.toLowerCase()}`;
    if (typeof window !== 'undefined' && window.Peer) {
      try {
        this.peer = new window.Peer(peerId, {
          debug: 1
        });

        this.peer.on('open', (id) => {
          onReady(this.roomCode, null);
          this.notifyPlayersChange();
        });

        this.peer.on('connection', (conn) => {
          this.handleIncomingConnection(conn);
        });

        this.peer.on('error', (err) => {
          console.warn('[PeerJS Host Error]:', err.type, err.message);
          // If PeerJS broker is unreachable or ID taken, BroadcastChannel still works locally
          onReady(this.roomCode, 'WebRTC broker fallback: Local network active.');
        });
      } catch (e) {
        console.warn('[PeerJS Init Exception]:', e);
        onReady(this.roomCode, 'Local network active.');
      }
    } else {
      onReady(this.roomCode, 'Local broadcast channel active.');
    }

    this.notifyPlayersChange();
    return this.roomCode;
  }

  // 3. JOIN ONLINE ROOM
  joinRoom(roomCode, playerName = 'Guest Player', onComplete = () => {}) {
    this.mode = 'online-client';
    this.roomCode = roomCode.toUpperCase().trim();
    this.localPlayer.name = playerName;
    this.localPlayer.isHost = false;

    // Connect via BroadcastChannel
    this.setupBroadcastChannel(this.roomCode);
    this.sendBroadcast({
      type: 'PLAYER_JOIN_REQUEST',
      player: { id: this.localPlayer.id, name: this.localPlayer.name }
    });

    // Connect via PeerJS
    const targetPeerId = `zt-arcade-${this.roomCode.toLowerCase()}`;
    if (typeof window !== 'undefined' && window.Peer) {
      try {
        this.peer = new window.Peer({ debug: 1 });

        this.peer.on('open', (id) => {
          const conn = this.peer.connect(targetPeerId, { reliable: true });
          
          conn.on('open', () => {
            this.hostConnection = conn;
            conn.send({
              type: 'PLAYER_JOIN_REQUEST',
              player: { id: this.localPlayer.id, name: this.localPlayer.name }
            });
            onComplete(true, null);
          });

          conn.on('data', (data) => {
            this.handleMessage(data, conn);
          });

          conn.on('close', () => {
            onComplete(false, 'Disconnected from room host.');
          });

          conn.on('error', (err) => {
            onComplete(false, 'Failed to connect to room: ' + err.message);
          });
        });

        this.peer.on('error', (err) => {
          // Check if BroadcastChannel handled it
          onComplete(false, 'Could not find room code: ' + this.roomCode);
        });
      } catch (e) {
        onComplete(false, 'Peer connection failed.');
      }
    } else {
      onComplete(true, null);
    }
  }

  // 4. BROADCASTCHANNEL SETUP (Multi-tab / Local Network fallback)
  setupBroadcastChannel(roomCode) {
    if (typeof window === 'undefined' || !window.BroadcastChannel) return;
    try {
      if (this.broadcastChannel) this.broadcastChannel.close();
      this.broadcastChannel = new window.BroadcastChannel(`zt-channel-${roomCode.toLowerCase()}`);
      this.broadcastChannel.onmessage = (evt) => {
        if (evt.data && evt.data.senderId !== this.localPlayer.id) {
          this.handleMessage(evt.data, null);
        }
      };
    } catch (e) {
      console.warn('[BroadcastChannel Error]:', e);
    }
  }

  sendBroadcast(payload) {
    payload.senderId = this.localPlayer.id;
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(payload);
    }
  }

  // 5. INCOMING WEBRTC CONNECTIONS (Host side)
  handleIncomingConnection(conn) {
    conn.on('open', () => {
      this.connections.set(conn.peer, conn);
    });

    conn.on('data', (data) => {
      this.handleMessage(data, conn);
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
      // Remove player
      this.players = this.players.filter(p => p.peerId !== conn.peer);
      this.broadcastToAll({
        type: 'PLAYERS_SYNC',
        players: this.players
      });
      this.notifyPlayersChange();
    });
  }

  // 6. MESSAGE DISPATCHER
  handleMessage(msg, conn) {
    if (!msg || !msg.type) return;

    switch (msg.type) {
      case 'PLAYER_JOIN_REQUEST':
        if (this.isHost()) {
          const existing = this.players.find(p => p.id === msg.player.id);
          if (!existing) {
            this.players.push({
              id: msg.player.id,
              name: msg.player.name,
              isHost: false,
              ready: true,
              peerId: conn ? conn.peer : null,
              clue: null,
              vote: null
            });
          }
          this.broadcastToAll({
            type: 'PLAYERS_SYNC',
            players: this.players
          });
          this.notifyPlayersChange();
        }
        break;

      case 'PLAYERS_SYNC':
        this.players = msg.players;
        this.notifyPlayersChange();
        break;

      case 'PRIVATE_ROLE_ASSIGN':
        if (msg.targetPlayerId === this.localPlayer.id) {
          this.onPrivateData(msg.data);
        }
        break;

      case 'SUBMIT_CLUE':
        if (this.isHost()) {
          const pl = this.players.find(p => p.id === msg.playerId);
          if (pl) {
            pl.clue = msg.clue;
            this.broadcastToAll({
              type: 'CLUE_BROADCAST',
              playerId: pl.id,
              clue: pl.clue
            });
            this.checkAllCluesSubmitted();
          }
        }
        break;

      case 'CLUE_BROADCAST':
        this.onStateChange({
          event: 'CLUE_RECEIVED',
          playerId: msg.playerId,
          clue: msg.clue
        });
        break;

      case 'SUBMIT_VOTE':
        if (this.isHost()) {
          const pl = this.players.find(p => p.id === msg.voterId);
          if (pl) {
            pl.vote = msg.targetId;
            this.broadcastToAll({
              type: 'VOTE_BROADCAST',
              voterId: pl.id,
              targetId: msg.targetId
            });
            this.checkAllVotesSubmitted();
          }
        }
        break;

      case 'VOTE_BROADCAST':
        this.onStateChange({
          event: 'VOTE_RECEIVED',
          voterId: msg.voterId,
          targetId: msg.targetId
        });
        break;

      case 'ROUND_START':
        this.onStateChange({
          event: 'ROUND_STARTED',
          data: msg.data
        });
        break;

      case 'ROUND_RESULT':
        this.onStateChange({
          event: 'ROUND_RESOLVED',
          data: msg.data
        });
        break;

      default:
        this.onStateChange({
          event: msg.type,
          data: msg.data
        });
        break;
    }
  }

  // 7. BROADCAST HELPERS
  broadcastToAll(msg) {
    this.sendBroadcast(msg);
    this.connections.forEach(conn => {
      try {
        if (conn.open) conn.send(msg);
      } catch (e) {
        console.warn('[Send Error]:', e);
      }
    });
  }

  sendToHost(msg) {
    if (this.hostConnection && this.hostConnection.open) {
      this.hostConnection.send(msg);
    } else {
      this.sendBroadcast(msg);
    }
  }

  sendPrivateMessage(targetPlayerId, data) {
    const msg = {
      type: 'PRIVATE_ROLE_ASSIGN',
      targetPlayerId,
      data
    };
    this.broadcastToAll(msg);
    if (targetPlayerId === this.localPlayer.id) {
      this.onPrivateData(data);
    }
  }

  checkAllCluesSubmitted() {
    const allHaveClues = this.players.every(p => p.clue !== null && p.clue !== undefined);
    if (allHaveClues) {
      this.broadcastToAll({
        type: 'ALL_CLUES_SUBMITTED',
        players: this.players
      });
      this.onStateChange({
        event: 'ALL_CLUES_SUBMITTED',
        players: this.players
      });
    }
  }

  checkAllVotesSubmitted() {
    const allHaveVotes = this.players.every(p => p.vote !== null && p.vote !== undefined);
    if (allHaveVotes) {
      // Calculate vote tallies
      const tallies = {};
      this.players.forEach(p => {
        tallies[p.vote] = (tallies[p.vote] || 0) + 1;
      });

      let mostVotedId = null;
      let maxVotes = -1;
      let tie = false;

      Object.entries(tallies).forEach(([id, count]) => {
        if (count > maxVotes) {
          maxVotes = count;
          mostVotedId = id;
          tie = false;
        } else if (count === maxVotes) {
          tie = true;
        }
      });

      const result = {
        tallies,
        mostVotedId: tie ? null : mostVotedId,
        tie,
        players: this.players
      };

      this.broadcastToAll({
        type: 'ROUND_RESULT',
        data: result
      });
      this.onStateChange({
        event: 'ROUND_RESOLVED',
        data: result
      });
    }
  }

  notifyPlayersChange() {
    this.onPlayerListChange([...this.players]);
  }

  isHost() {
    return this.mode === 'online-host' || this.localPlayer.isHost;
  }

  disconnect() {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    this.connections.clear();
    this.hostConnection = null;
    this.mode = 'solo';
    this.players = [];
  }
}

if (typeof window !== 'undefined') {
  window.TempoMultiplayer = TempoMultiplayer;
}
