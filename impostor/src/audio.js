// ============================================================================
// THE BLIGHTSTEAD - PROCEDURAL AUDIO SYNTHESIS ENGINE
// Zero external audio assets. 100% synthesized via Web Audio API.
// ============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.masterGain = null;
    this.ambientGain = null;
    this.currentAtmosphere = null;
    this.ambientNodes = [];
    this.heartbeatInterval = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio not supported or blocked", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- AMBIENT ATMOSPHERES ---

  setAtmosphere(mode) {
    if (!this.isInitialized || this.currentAtmosphere === mode) return;
    this.resume();
    this.stopAtmosphere();
    this.currentAtmosphere = mode;

    if (mode === 'HOMESTEAD') {
      this.startHomesteadAmbiance();
    } else if (mode === 'AIRLOCK') {
      this.startAirlockAmbiance();
    } else if (mode === 'ZONE') {
      this.startZoneAmbiance();
    }
  }

  stopAtmosphere() {
    for (const node of this.ambientNodes) {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    }
    this.ambientNodes = [];
  }

  // Homestead: Warm wind, low peaceful drone, gentle pastoral minor chimes
  startHomesteadAmbiance() {
    const t = this.ctx.currentTime;
    
    // Wind noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, t);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.12, t);

    // Subtle LFO for wind gusting
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.15, t);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(100, t);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    whiteNoise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.ambientGain);

    whiteNoise.start();
    lfo.start();

    // Warm chord drone (D minor / F maj chord tones)
    const freqs = [73.42, 110.00, 146.83]; // D2, A2, D3
    const oscs = freqs.map(f => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, t);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.04, t);

      osc.connect(g);
      g.connect(this.ambientGain);
      osc.start();
      return osc;
    });

    this.ambientNodes.push(whiteNoise, lfo, ...oscs);
  }

  // Airlock: Industrial steam, heavy resonance, mechanical rumble
  startAirlockAmbiance() {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, t); // A1 hum

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, t);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.15, t);

    osc.connect(filter);
    filter.connect(g);
    g.connect(this.ambientGain);
    osc.start();

    this.ambientNodes.push(osc);
    this.playSteamHiss(4.0);
  }

  // Exclusion Zone: Dreadful sub-bass drone, unsettling resonance, dissonant harmonics
  startZoneAmbiance() {
    const t = this.ctx.currentTime;

    // Sub-bass dread drone
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(36.7, t); // D1 sub

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.25, t);

    subOsc.connect(subGain);
    subGain.connect(this.ambientGain);
    subOsc.start();

    // Dissonant metallic wind
    const dissOsc = this.ctx.createOscillator();
    dissOsc.type = 'sawtooth';
    dissOsc.frequency.setValueAtTime(116.54, t); // Bb2 (tritone against D)

    const dissFilter = this.ctx.createBiquadFilter();
    dissFilter.type = 'bandpass';
    dissFilter.frequency.setValueAtTime(380, t);
    dissFilter.Q.setValueAtTime(6, t);

    const dissGain = this.ctx.createGain();
    dissGain.gain.setValueAtTime(0.06, t);

    dissOsc.connect(dissFilter);
    dissFilter.connect(dissGain);
    dissGain.connect(this.ambientGain);
    dissOsc.start();

    this.ambientNodes.push(subOsc, dissOsc);
  }

  // --- SOUND EFFECTS ---

  playTill() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    // Low punch + filtered rustle
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.18);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.22);
  }

  playWater() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.linearRampToValueAtTime(1400, t + 0.3);
    filter.Q.setValueAtTime(3, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start();
  }

  playPlant() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(540, t + 0.12);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.15);
  }

  playHarvest() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    // Pleasant organic snap and resonant chime
    const notes = [440, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t + idx * 0.05);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, t + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.05 + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + idx * 0.05);
      osc.stop(t + idx * 0.05 + 0.4);
    });
  }

  playCraft() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    // Mechanical gear crank and pestle grind
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(110, t + 0.25);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.3);
  }

  playPneumaticShot() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    // High-pressure mechanical thud + compressed air hiss
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.15);

    const punchGain = this.ctx.createGain();
    punchGain.gain.setValueAtTime(0.6, t);
    punchGain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

    osc.connect(punchGain);
    punchGain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.2);

    this.playSteamHiss(0.25, 0.4);
  }

  playFlareShot() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    // Rising whoosh + crackle
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.15);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.22);
  }

  playFlareDetonate() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    // Loud blinding flash explosion and chemical hiss
    const bufferSize = this.ctx.sampleRate * 0.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.2));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.7);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start();
  }

  playSteamHiss(duration = 1.0, volume = 0.3) {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1800, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start();
  }

  playMonsterRoar(intensity = 1.0) {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.linearRampToValueAtTime(140, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.6);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, t);
    filter.Q.setValueAtTime(8, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5 * intensity, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.65);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.7);
  }

  playMonsterDeath() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.55);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.6);
  }

  playHeartbeat() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    // Lub-dub double thud
    [0, 0.12].forEach((offset, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(idx === 0 ? 65 : 55, t + offset);
      osc.frequency.exponentialRampToValueAtTime(30, t + offset + 0.09);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.45, t + offset);
      gain.gain.exponentialRampToValueAtTime(0.01, t + offset + 0.1);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + offset);
      osc.stop(t + offset + 0.12);
    });
  }

  playWinchSiren() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.linearRampToValueAtTime(880, t + 0.4);
    osc.frequency.linearRampToValueAtTime(440, t + 0.8);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(700, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.85);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(t + 0.9);
  }

  playHeal() {
    if (!this.isInitialized) return;
    const t = this.ctx.currentTime;
    const notes = [329.63, 440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.08);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, t + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + idx * 0.08);
      osc.stop(t + idx * 0.08 + 0.45);
    });
  }
}

window.soundEngine = new SoundEngine();
