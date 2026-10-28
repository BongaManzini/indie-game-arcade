# Indie Game Arcade & Systems Lab

> **Author:** Bonga Manzini  
> **Live Arcade:** [https://bongamanzini.github.io/indie-game-arcade/](https://bongamanzini.github.io/indie-game-arcade/)  
> **Tech Stack:** Vanilla JavaScript, HTML5 Canvas2D, Web Audio API, WebRTC DataChannels (PeerJS)  
> **External Dependencies:** Zero (Pure Standards-Compliant Web Technologies)

---

## 1. Project Overview

The **Indie Game Arcade** is a unified browser gaming platform and systems engineering laboratory featuring five complete, playable games written entirely from scratch without external commercial game engines (like Unity, Unreal, or Godot).

Every game features an authentic Zero Tempo social deduction and party mechanic, expansive multi-category support, serverless LAN and Online multiplayer room codes via WebRTC PeerJS, and crisp minimal dark SaaS UI styling.

---

## 2. Multi-Category Catalogs

All five games allow instant switching across five popular icon domains:
1. **Anime & Manga:** Luffy, Goku, Naruto, Gojo, Levi, Tanjiro, Zoro, Sukuna
2. **Movies & Cinema:** Darth Vader, The Joker, Tony Stark, Harry Potter, Neo, John Wick, Thanos
3. **Video Games:** Master Chief, Kratos, Super Mario, Geralt of Rivia, Steve (Minecraft), Doom Slayer, Sonic
4. **Sports & Football:** Lionel Messi, Cristiano Ronaldo, LeBron James, Michael Jordan, Usain Bolt, Lewis Hamilton
5. **Music & Hip-Hop:** Eminem, Michael Jackson, Drake, Kendrick Lamar, Tupac Shakur, Kanye West

Only universally recognized household names are used, avoiding obscure edge-case characters.

---

## 3. Playable Game Roster

| Game | Folder | Genre | Core Mechanics | Multiplayer Support |
| :--- | :--- | :--- | :--- | :--- |
| **Connect 5!** | [`connect5/`](connect5/) | Contextual Numeric Decryption | Given a popular icon and 5 raw stats/numbers, deduce the canonical milestone behind each number before accumulating 3 strikes. | Solo Speedrun + 2-Player Pass & Play |
| **Zero Tempo Imposter** | [`impostor/`](impostor/) | Social Deduction & Word Cues | Everyone knows the secret icon except the blind Imposter. Drop single-word clues, cross-examine the table, vote, and attempt last-second character steal guesses. | Solo vs Bots, Couch Pass & Play, LAN/Online WebRTC Room Codes |
| **Scale Versus** | [`scale/`](scale/) | 1–100 Hot & Cold Proximity | Triangulate a secret icon by submitting probes. The radar calculates a 1 to 100 scalar proximity score based on domain, squad, and semantic traits. | Solo vs Rival AI |
| **Crucible: $15 Draft** | [`crucible/`](crucible/) | $15 Budget Loadout & Battle Simulator | Draft a 4-socket loadout staying under the $15 limit, then simulate combat encounters in category-specific missions with synergy bonuses. | Solo Custom Drafter |
| **60s Speedrun** | [`sieve/`](sieve/) | 60s Rapid 20-Questions | Rapid binary triage against a live 60-second countdown clock to isolate the secret icon before time expires. | Solo Time-Attack |

---

## 4. Systems Architecture

### 4.1 Serverless WebRTC Multiplayer (PeerJS + Local BroadcastChannel)
- **Room Codes:** Host generates a 4-character room code (e.g. `TEMPO-7K2X`).
- **Direct Peer DataChannels:** Connected devices communicate peer-to-peer over local Wi-Fi / Internet via free WebRTC brokers.
- **BroadcastChannel Fallback:** Players on the same machine or local browser tabs connect instantly with 0ms latency.
- **Private State Distribution:** Host sends secret roles privately to each peer device; clues and votes sync authoritatively.
- **Couch Pass-and-Play:** A single phone or tablet can be passed around with a privacy curtain screen.

### 4.2 Procedural Web Audio API Synthesis
Instead of downloading multi-megabyte sound libraries or compressed MP3 files, each game instantiates an in-browser audio context using the native `AudioContext` interface:
- **Ping Signals:** Exponential pitch sweeps scaling from 200Hz to 800Hz with proximity score.
- **Buzzers & Clangs:** Low-frequency sawtooth wave drops with fast decay envelopes.
- **Victory Chimes:** Multi-oscillator major arpeggios (C5, E5, G5, C6).

---

## 5. Directory Structure

```
games/
├── index.html            # Master Arcade Hub with fullscreen iframe runner
├── README.md             # Platform documentation & engine specs
├── shared/
│   ├── categories.js     # Universal multi-category database packs
│   └── multiplayer.js    # Serverless WebRTC & Local P2P networking engine
├── connect5/             # Game 1: Connect 5 Numeric Decryption
│   └── index.html
├── impostor/             # Game 2: Zero Tempo Imposter
│   └── index.html
├── scale/                # Game 3: Scale Versus 1-100 Hot & Cold
│   └── index.html
├── crucible/             # Game 4: Crucible $15 Cross-Verse Draft
│   └── index.html
└── sieve/                # Game 5: 60s Speedrun 20-Questions Sieve
    └── index.html
```

---

## 6. Running Locally

Because all games use standard HTML5 and vanilla JavaScript, they run out-of-the-box in any modern browser without requiring build steps, node modules, or compile pipelines.

To serve locally with Python's built-in HTTP server:
```bash
cd games
python3 -m http.server 8080
```
Then navigate to:
```
http://localhost:8080
```

---

## 7. Live Deployment

The arcade is deployed directly to GitHub Pages:
- **Live Arcade Hub:** [https://bongamanzini.github.io/indie-game-arcade/](https://bongamanzini.github.io/indie-game-arcade/)
- **Individual Game Direct URLs:**
  - Connect5: `https://bongamanzini.github.io/indie-game-arcade/connect5/`
  - Impostor: `https://bongamanzini.github.io/indie-game-arcade/impostor/`
  - Scale: `https://bongamanzini.github.io/indie-game-arcade/scale/`
  - Crucible: `https://bongamanzini.github.io/indie-game-arcade/crucible/`
  - 60s Speedrun: `https://bongamanzini.github.io/indie-game-arcade/sieve/`
