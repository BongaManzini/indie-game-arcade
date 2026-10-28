/**
 * RESONANCE PING - Procedural Web Audio Engine
 * Zero external audio assets required. All soundscapes, hydrophone acoustics,
 * sonar pings, biological clicks, and mechanical bridge foley are synthesized in real-time.
 */

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.initialized = false;
    this.muted = false;

    // Master Busses
    this.masterGain = null;
    this.hydrophoneGain = null;
    this.foleyGain = null;
    this.alertGain = null;

    // Ambient Continuous Sources
    this.hydroDroneOsc = null;
    this.hullStrainOsc = null;
    this.cavitationNoiseNode = null;
    this.cavitationGain = null;
    this.ambientFilter = null;

    // Alarm interval
    this.alarmActive = false;
    this.alarmTimer = null;
  }

  init() {
    if (this.initialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // Master Bus
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Dynamic Limiter/Compressor to prevent clipping
    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
    compressor.knee.setValueAtTime(12, this.ctx.currentTime);
    compressor.ratio.setValueAtTime(8, this.ctx.currentTime);
    compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    compressor.release.setValueAtTime(0.25, this.ctx.currentTime);
    this.masterGain.connect(compressor);
    compressor.connect(this.ctx.destination);

    // Channel Busses
    this.hydrophoneGain = this.ctx.createGain();
    this.hydrophoneGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    this.hydrophoneGain.connect(compressor);

    this.foleyGain = this.ctx.createGain();
    this.foleyGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.foleyGain.connect(compressor);

    this.alertGain = this.ctx.createGain();
    this.alertGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    this.alertGain.connect(compressor);

    this._setupHydrophoneAmbiance();
    this._setupCavitationLoop();
    this.initialized = true;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // -------------------------------------------------------------
  // CONTINUOUS AMBIANCE & HYDROPHONE
  // -------------------------------------------------------------
  _setupHydrophoneAmbiance() {
    if (!this.ctx) return;

    // 1. Deep Sub-Bass Hydro Drone (45 Hz)
    this.hydroDroneOsc = this.ctx.createOscillator();
    this.hydroDroneOsc.type = 'sine';
    this.hydroDroneOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

    // LFO to slowly modulate hydrophone frequency (trench current drift)
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(4.0, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(this.hydroDroneOsc.frequency);
    lfo.start();

    // Low-Pass Filter simulating 10,000m of dense seawater
    this.ambientFilter = this.ctx.createBiquadFilter();
    this.ambientFilter.type = 'lowpass';
    this.ambientFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
    this.ambientFilter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    this.hydroDroneOsc.connect(this.ambientFilter);
    this.ambientFilter.connect(droneGain);
    droneGain.connect(this.hydrophoneGain);
    this.hydroDroneOsc.start();

    // 2. Procedural Brown Noise (Water Column Hiss)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain boost
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(90, this.ctx.currentTime);
    noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.hydrophoneGain);
    noiseSource.start();
  }

  _setupCavitationLoop() {
    if (!this.ctx) return;
    // High-frequency crackle generator for propeller cavitation
    const bufferSize = this.ctx.sampleRate * 1;
    const crackleBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = crackleBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() > 0.96 ? (Math.random() * 2 - 1) * 0.8 : 0;
    }

    this.cavitationNoiseNode = this.ctx.createBufferSource();
    this.cavitationNoiseNode.buffer = crackleBuffer;
    this.cavitationNoiseNode.loop = true;

    const cavFilter = this.ctx.createBiquadFilter();
    cavFilter.type = 'highpass';
    cavFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    this.cavitationGain = this.ctx.createGain();
    this.cavitationGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

    this.cavitationNoiseNode.connect(cavFilter);
    cavFilter.connect(this.cavitationGain);
    this.cavitationGain.connect(this.hydrophoneGain);
    this.cavitationNoiseNode.start();
  }

  setCavitationLevel(level) { // level from 0.0 to 1.0
    if (!this.cavitationGain || !this.ctx) return;
    const target = Math.max(0, Math.min(1, level)) * 0.45;
    this.cavitationGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.2);
  }

  // -------------------------------------------------------------
  // ACTIVE SONAR & RESONANCE FEEDBACK CHORDS
  // -------------------------------------------------------------
  playSonarPing(frequencyKhz = 14.2) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Map kHz to audible frequency (scaled for dramatic tension)
    const baseFreq = 400 + (frequencyKhz * 45); // e.g. 14.2kHz -> ~1039Hz
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * 1.3, t);
    osc.frequency.exponentialRampToValueAtTime(baseFreq, t + 0.06);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.7, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);

    // Underwater Reverb Delay line
    const delay = this.ctx.createDelay();
    delay.delayTime.setValueAtTime(0.22, t);
    const feedback = this.ctx.createGain();
    feedback.gain.setValueAtTime(0.42, t);
    const delayFilter = this.ctx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.setValueAtTime(600, t);

    osc.connect(gain);
    gain.connect(this.hydrophoneGain);

    gain.connect(delay);
    delay.connect(delayFilter);
    delayFilter.connect(feedback);
    feedback.connect(delay);
    delayFilter.connect(this.hydrophoneGain);

    osc.start(t);
    osc.stop(t + 1.8);
  }

  playResonanceReturn(score) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    if (score < 40) {
      // Harsh, hollow metallic echo scattering into the abyss
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(115, t);
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(173, t); // Dissonant interval

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(220, t);
      filter.Q.setValueAtTime(3.0, t);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.hydrophoneGain);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + 1.0);
      osc2.stop(t + 1.0);

    } else if (score < 70) {
      // Muffled dual harmonic pulse
      [220, 330].forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        osc.connect(gain);
        gain.connect(this.hydrophoneGain);
        osc.start(t);
        osc.stop(t + 0.85);
      });

    } else if (score < 90) {
      // Sub-harmonic resonant chime (Major Chord with biological ring)
      [261.63, 329.63, 392.0].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + (idx * 0.05));
        gain.gain.setValueAtTime(0.3, t + (idx * 0.05));
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
        osc.connect(gain);
        gain.connect(this.hydrophoneGain);
        osc.start(t + (idx * 0.05));
        osc.stop(t + 1.5);
      });

    } else if (score < 100) {
      // 90-99%: Pure, crystalline harmonic chord (Ethereal resonance, hull singing)
      [432, 648, 864, 1296].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 2.2);
        osc.connect(gain);
        gain.connect(this.hydrophoneGain);
        osc.start(t);
        osc.stop(t + 2.4);
      });

    } else {
      // 100%: Harmonic Singularity (Violent room-shaking bass cavitation shockwave)
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(80, t);
      subOsc.frequency.exponentialRampToValueAtTime(28, t + 1.8);
      subGain.gain.setValueAtTime(0.9, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

      subOsc.connect(subGain);
      subGain.connect(this.hydrophoneGain);
      subOsc.start(t);
      subOsc.stop(t + 2.6);

      // Shimmering high bell
      [528, 1056, 1584].forEach(f => {
        const bell = this.ctx.createOscillator();
        const bellGain = this.ctx.createGain();
        bell.type = 'triangle';
        bell.frequency.setValueAtTime(f, t);
        bellGain.gain.setValueAtTime(0.3, t);
        bellGain.gain.exponentialRampToValueAtTime(0.001, t + 3.0);
        bell.connect(bellGain);
        bellGain.connect(this.hydrophoneGain);
        bell.start(t);
        bell.stop(t + 3.2);
      });
    }
  }

  // -------------------------------------------------------------
  // MECHANICAL & TACTICAL FOLEY
  // -------------------------------------------------------------
  playSwitch() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(850, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.035);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    osc.connect(gain);
    gain.connect(this.foleyGain);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  playBallastPneumatics() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.9;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, t);
    filter.Q.setValueAtTime(1.8, t);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.85);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.foleyGain);
    noise.start(t);
  }

  playHullCreak() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(75, t);
    osc.frequency.linearRampToValueAtTime(110, t + 0.4);
    osc.frequency.linearRampToValueAtTime(68, t + 0.9);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(280, t);
    filter.Q.setValueAtTime(6.0, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.2, t + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.foleyGain);
    osc.start(t);
    osc.stop(t + 1.3);
  }

  playTorpedoLaunch() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Pneumatic impulse THWUMP
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(32, t + 0.35);
    gain.gain.setValueAtTime(0.85, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.foleyGain);
    osc.start(t);
    osc.stop(t + 0.45);

    // Followed by high-speed rushing water hiss
    this.playBallastPneumatics();
  }

  playDetonation() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Deep sub-bass implosion
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, t);
    osc.frequency.exponentialRampToValueAtTime(20, t + 1.5);
    gain.gain.setValueAtTime(1.0, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.8);

    osc.connect(gain);
    gain.connect(this.hydrophoneGain);
    osc.start(t);
    osc.stop(t + 3.0);
  }

  playApexRoar() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, t);
    osc1.frequency.linearRampToValueAtTime(180, t + 0.8);
    osc1.frequency.exponentialRampToValueAtTime(40, t + 2.4);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(82, t);
    osc2.frequency.linearRampToValueAtTime(260, t + 0.7);
    osc2.frequency.exponentialRampToValueAtTime(35, t + 2.4);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, t);
    filter.Q.setValueAtTime(3.0, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.65, t + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.hydrophoneGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 2.6);
    osc2.stop(t + 2.6);
  }

  setAlarm(active) {
    if (this.alarmActive === active) return;
    this.alarmActive = active;
    if (active) {
      this.alarmTimer = setInterval(() => {
        if (!this.ctx || !this.alarmActive) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(680, t);
        osc.frequency.setValueAtTime(540, t + 0.15);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.alertGain);
        osc.start(t);
        osc.stop(t + 0.32);
      }, 700);
    } else {
      if (this.alarmTimer) {
        clearInterval(this.alarmTimer);
        this.alarmTimer = null;
      }
    }
  }
}

export const audio = new AudioManager();
