// audio.js - Diegetic Procedural Web Audio API Engine for Cipher Breach
// Generates authentic CRT hums, mechanical relay clicks, pneumatic pistons, and alarms without external audio files.

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.masterGain = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        if (typeof window === 'undefined') return;
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;

        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        this.isInitialized = true;
    }

    ensureContext() {
        if (typeof window === 'undefined') return;
        if (!this.isInitialized) this.init();
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.masterGain && this.ctx) {
            this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.25, this.ctx.currentTime);
        }
        return this.muted;
    }

    // Tactile relay click for buttons and UI toggles
    playClick() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = this.ctx.currentTime;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.exponentialRampToValueAtTime(180, t + 0.035);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.04);
    }

    // Chunky mechanical insertion sound when binding a telemetry plug
    playPlugIn() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        
        // Low metallic resonance
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(45, t + 0.08);

        gain.gain.setValueAtTime(0.5, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.09);

        // Click transient
        this.playClick();
    }

    // Unbinding / unplugging sound
    playUnplug() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(220, t + 0.05);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.06);
    }

    // Ascending 3-tone harmonic synth for successful decryption
    playSuccessChime() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
        const t = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const startTime = t + idx * 0.06;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0.001, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(startTime);
            osc.stop(startTime + 0.26);
        });
    }

    // Harsh electrical buzzer for parity error / desync
    playErrorBuzz() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(95, t);
        osc.frequency.linearRampToValueAtTime(82, t + 0.2);

        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.23);
    }

    // Heavy hydraulic piston punch sound for kinetic knockback
    playPiston() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;

        // Sub bass thump
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.18);

        gain.gain.setValueAtTime(0.7, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.21);

        // Filtered noise punch
        this.playNoise(0.12, 400);
    }

    // Sub-orbital mortar whistling shell and concussive impact
    playMortar() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        
        // Whistle
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, t);
        osc.frequency.exponentialRampToValueAtTime(240, t + 0.25);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.26);

        // Delayed concussive blast
        setTimeout(() => {
            this.playPiston();
            this.playNoise(0.25, 250);
        }, 220);
    }

    // Sizzling electrical arc & steam discharge for thermal vent cascade stun
    playStunCascade() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(60, t);
        osc.frequency.linearRampToValueAtTime(220, t + 0.15);
        osc.frequency.linearRampToValueAtTime(40, t + 0.35);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.42);

        this.playNoise(0.35, 1200);
    }

    // Utility: short noise burst
    playNoise(duration, cutoff) {
        if (this.muted || !this.ctx) return;
        const t = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(cutoff, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(t);
    }

    // Mech step / servo motor
    playStep() {
        if (this.muted) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.linearRampToValueAtTime(140, t + 0.05);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.08);
    }
}

export const audio = new SoundEngine();
