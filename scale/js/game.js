/**
 * RESONANCE PING - Game Coordinator & Main Simulation Loop
 * Binds DOM controls, audio hooks, entity updates, and win/loss states.
 */

import { audio } from './audio.js';
import { TAXONOMY, TelemetryEngine } from './telemetry.js';
import { SubmarineVessel } from './subsystem.js';
import { ApexEntity, AmbientStalker } from './entities.js';
import { CombatManager } from './combat.js';
import { DiegeticRenderer } from './renderer.js';

class GameController {
  constructor() {
    this.sub = new SubmarineVessel();
    this.telemetryEngine = new TelemetryEngine();
    this.apex = new ApexEntity('CARCINUS DREADNOUGHT');
    this.ambientStalkers = [
      new AmbientStalker(1, -300, 450, 9300),
      new AmbientStalker(2, 600, -200, 9600)
    ];
    this.combat = new CombatManager();
    this.renderer = null;

    this.ocean = {
      thermoclineDepth: 9400, // 9,400 meters density layer
      siltTurbidity: 0.15     // 15% benthic sediment scattering
    };

    // Sensor State
    this.telemetryState = {
      currentDomain: 'LITHO_SILICATE',
      currentMatrix: 'SEGMENTED_CARAPACE',
      currentMetabolism: 'CAVITATION_JET',
      currentFrequencyKhz: 14.2,
      currentAzimuthDeg: 280,
      lastScore: 0,
      message: 'SYSTEM STANDBY'
    };

    this.lastTime = performance.now();
    this.gameOver = false;
    this.victory = false;
    this.running = false;
  }

  init() {
    this._populateTaxonomyDropdowns();
    this._bindControls();

    const tacCanvas = document.getElementById('tac-canvas');
    const telCanvas = document.getElementById('tel-canvas');
    this.renderer = new DiegeticRenderer(tacCanvas, telCanvas);

    this.log('TRITON-IV SYSTEMS ONLINE. PRESS ANY STATION CONTROL TO INITIATE AUDIO FEED.');
    this.log('HADAL BASIN TARTARUS-7 // SECTOR DEPTH: 9,200m - 11,000m.');
    this.log('MISSION: HUNT & NEUTRALIZE APEX BIOMECHANICAL ENTITY.');

    this.running = true;
    requestAnimationFrame((t) => this.loop(t));
  }

  _populateTaxonomyDropdowns() {
    const domainSelect = document.getElementById('domain-select');
    const matrixSelect = document.getElementById('matrix-select');
    const metabSelect = document.getElementById('metab-select');

    TAXONOMY.DOMAINS.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = `${d.label}`;
      domainSelect.appendChild(opt);
    });

    TAXONOMY.MATRICES.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = `${m.label}`;
      matrixSelect.appendChild(opt);
    });

    TAXONOMY.METABOLISMS.forEach(met => {
      const opt = document.createElement('option');
      opt.value = met.id;
      opt.textContent = `${met.label}`;
      metabSelect.appendChild(opt);
    });

    domainSelect.value = this.telemetryState.currentDomain;
    matrixSelect.value = this.telemetryState.currentMatrix;
    metabSelect.value = this.telemetryState.currentMetabolism;
  }

  _bindControls() {
    // Audio Unlock on First Click
    window.addEventListener('click', () => {
      audio.init();
      audio.resume();
    }, { once: true });

    // 1. Telemetry Controls
    document.getElementById('domain-select').addEventListener('change', (e) => {
      audio.playSwitch();
      this.telemetryState.currentDomain = e.target.value;
    });

    document.getElementById('matrix-select').addEventListener('change', (e) => {
      audio.playSwitch();
      this.telemetryState.currentMatrix = e.target.value;
    });

    document.getElementById('metab-select').addEventListener('change', (e) => {
      audio.playSwitch();
      this.telemetryState.currentMetabolism = e.target.value;
    });

    const freqSlider = document.getElementById('freq-slider');
    const freqDisplay = document.getElementById('freq-display');
    freqSlider.addEventListener('input', (e) => {
      this.telemetryState.currentFrequencyKhz = parseFloat(e.target.value);
      freqDisplay.textContent = `${this.telemetryState.currentFrequencyKhz.toFixed(1)} kHz`;
    });

    const azSlider = document.getElementById('azimuth-slider');
    const azDisplay = document.getElementById('azimuth-display');
    azSlider.addEventListener('input', (e) => {
      this.telemetryState.currentAzimuthDeg = parseInt(e.target.value);
      azDisplay.textContent = `${this.telemetryState.currentAzimuthDeg}°`;
    });

    document.getElementById('fire-ping-btn').addEventListener('click', () => {
      this.fireDiagnosticPing();
    });

    // 2. Reactor Power Sliders
    ['telemetry', 'propulsion', 'ballast', 'weapons', 'lifeSupport'].forEach(subsys => {
      const slider = document.getElementById(`pwr-${subsys}`);
      slider.addEventListener('input', (e) => {
        audio.playSwitch();
        this.sub.setPower(subsys, parseInt(e.target.value));
        this._updatePowerSlidersUI();
      });
    });

    // 3. Helm & Ballast Controls
    document.getElementById('throttle-slow').addEventListener('click', () => {
      audio.playSwitch();
      this.sub.speedKts = 2.0;
      this.log('THROTTLE: 1/3 AHEAD (DEAD SLOW)');
    });
    document.getElementById('throttle-std').addEventListener('click', () => {
      audio.playSwitch();
      this.sub.speedKts = 6.0;
      this.log('THROTTLE: 2/3 AHEAD (STANDARD)');
    });
    document.getElementById('throttle-flank').addEventListener('click', () => {
      audio.playSwitch();
      this.sub.speedKts = 11.5;
      this.log('THROTTLE: FLANK SPEED // CAVITATION ALERT');
    });
    document.getElementById('throttle-stop').addEventListener('click', () => {
      audio.playSwitch();
      this.sub.speedKts = 0.0;
      this.log('THROTTLE: ALL STOP');
    });

    const rudderSlider = document.getElementById('rudder-slider');
    const rudderDisplay = document.getElementById('rudder-display');
    rudderSlider.addEventListener('input', (e) => {
      this.sub.rudderAngle = parseInt(e.target.value);
      const dir = this.sub.rudderAngle < 0 ? 'PORT' : (this.sub.rudderAngle > 0 ? 'STBD' : 'RUDDER MID');
      rudderDisplay.textContent = `${Math.abs(this.sub.rudderAngle)}° ${dir}`;
    });

    const fwdBallast = document.getElementById('fwd-ballast');
    const aftBallast = document.getElementById('aft-ballast');
    fwdBallast.addEventListener('input', (e) => {
      this.sub.forwardBallast = parseInt(e.target.value);
      document.getElementById('fwd-ballast-disp').textContent = `${this.sub.forwardBallast}%`;
    });
    aftBallast.addEventListener('input', (e) => {
      this.sub.aftBallast = parseInt(e.target.value);
      document.getElementById('aft-ballast-disp').textContent = `${this.sub.aftBallast}%`;
    });

    document.getElementById('blow-ballast-btn').addEventListener('click', () => {
      audio.playBallastPneumatics();
      this.sub.forwardBallast = 15;
      this.sub.aftBallast = 15;
      fwdBallast.value = 15;
      aftBallast.value = 15;
      document.getElementById('fwd-ballast-disp').textContent = '15%';
      document.getElementById('aft-ballast-disp').textContent = '15%';
      this.sub.addAcousticSpike(20);
      this.log('EMERGENCY BALLAST BLOWN // MASSIVE ACOUSTIC NOISE GENERATED');
    });

    document.getElementById('silent-run-btn').addEventListener('click', () => {
      audio.playSwitch();
      const active = this.sub.toggleSilentRunning();
      const btn = document.getElementById('silent-run-btn');
      if (active) {
        btn.classList.add('active-silent');
        btn.textContent = 'SILENT RUNNING: ON';
        this.log('SILENT RUNNING ENGAGED. ENGINES THROTTLED, SCRUBBERS OFF, RUNNING ON BATTERY.');
      } else {
        btn.classList.remove('active-silent');
        btn.textContent = 'SILENT RUNNING: OFF';
        this.log('SILENT RUNNING DISENGAGED. MAIN REACTOR POWER RESTORED.');
      }
    });

    // 4. Weapons Controls
    document.getElementById('tube1-flood-btn').addEventListener('click', () => {
      if (this.combat.floodTube(1)) {
        audio.playBallastPneumatics();
        this.log('TUBE 1: FLOODED AND PRESSURIZED (HADAL-8 TORPEDO ARMED)');
      }
    });

    document.getElementById('tube1-fire-btn').addEventListener('click', () => {
      this.fireWeapon(1);
    });

    document.getElementById('tube2-flood-btn').addEventListener('click', () => {
      if (this.combat.floodTube(2)) {
        audio.playBallastPneumatics();
        this.log('TUBE 2: FLOODED (ACOUSTIC DECOY BUOY READY)');
      }
    });

    document.getElementById('tube2-fire-btn').addEventListener('click', () => {
      this.fireWeapon(2);
    });

    // Instructions modal button
    const helpBtn = document.getElementById('help-toggle-btn');
    const modal = document.getElementById('instructions-modal');
    if (helpBtn && modal) {
      helpBtn.addEventListener('click', () => {
        modal.classList.toggle('hidden');
      });
      document.getElementById('modal-close-btn').addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }
  }

  _updatePowerSlidersUI() {
    ['telemetry', 'propulsion', 'ballast', 'weapons', 'lifeSupport'].forEach(subsys => {
      const slider = document.getElementById(`pwr-${subsys}`);
      const disp = document.getElementById(`pwr-${subsys}-disp`);
      slider.value = this.sub.power[subsys];
      disp.textContent = `${this.sub.power[subsys]} PU`;
    });
    const used = Object.values(this.sub.power).reduce((a, b) => a + b, 0);
    document.getElementById('total-power-disp').textContent = `${used} / 100 PU`;
  }

  fireDiagnosticPing() {
    if (this.sub.sensorCapacitor < 30) {
      this.log('PING FAILED: SENSOR CAPACITOR DEPLETED. ALLOCATE POWER TO TELEMETRY.');
      return;
    }

    this.sub.sensorCapacitor -= 30;
    audio.playSonarPing(this.telemetryState.currentFrequencyKhz);

    const query = {
      domain: this.telemetryState.currentDomain,
      matrix: this.telemetryState.currentMatrix,
      metabolism: this.telemetryState.currentMetabolism,
      frequencyKhz: this.telemetryState.currentFrequencyKhz,
      azimuthDeg: this.telemetryState.currentAzimuthDeg
    };

    const res = this.telemetryEngine.evaluateQuery(query, this.sub, this.apex, this.ocean);
    this.telemetryState.lastScore = res.scalarScore;
    this.telemetryState.message = res.message;

    // Apply acoustic noise
    this.sub.addAcousticSpike(res.generatedNoiseDb);

    // Update combat lock gate
    this.combat.updateCalibration(res.scalarScore, this.apex);

    // Waterfall push
    this.renderer.pushWaterfallLine(this.telemetryState.currentFrequencyKhz, res.scalarScore, this.sub.currentNoiseDb);

    // Audio resonance harmonic
    setTimeout(() => {
      audio.playResonanceReturn(res.scalarScore);
    }, 450);

    // Log feedback
    if (res.scalarScore >= 90) {
      this.log(`>>> CRITICAL RESONANCE [${res.scalarScore}%]: WEAPONS HARD-LOCK ESTABLISHED.`);
      this.log(`TARGET BEARING: ${Math.round(res.targetBearingDeg)}° | RNG: ${res.rangeEstimateMeters}m | WEAKPOINT: VENTRAL SIPHON.`);
    } else if (res.scalarScore >= 70) {
      this.log(`>> SUB-HARMONIC ECHO [${res.scalarScore}%]: BRG ~${Math.round(res.bearingEstimateDeg)}° | TOPOLOGY DECRYPTED.`);
    } else if (res.scalarScore >= 40) {
      this.log(`> FAINT HARMONIC RETURN [${res.scalarScore}%]: QUADRANT ISOLATED. REFINE CARRIER FREQUENCY & MATRIX.`);
    } else {
      this.log(`! ACOUSTIC SCATTER [${res.scalarScore}%]: MISMATCH! +${Math.round(res.generatedNoiseDb)}dB ACOUSTIC BLOOM DRAWING PREDATORS.`);
    }

    if (res.thermoclineCrossed) {
      this.log('NOTE: ACOUSTIC BEAM CROSSED THERMOCLINE LAYER (35% REFRACTION LOSS).');
    }
  }

  fireWeapon(tubeNum) {
    const tube = tubeNum === 1 ? this.combat.tube1 : this.combat.tube2;
    if (!tube.readyToFire) {
      this.log(`CANNOT FIRE TUBE ${tubeNum}: TUBE NOT FLOODED.`);
      return;
    }

    if (tube.loaded === 'HADAL_8_TORPEDO') {
      if (this.telemetryState.lastScore < 80) {
        this.log(`WARNING: FIRING AT CALIBRATION < 80%. WEAPONS INTERLOCK UNGUIDED.`);
      }
    }

    const res = this.combat.fireTube(tubeNum, this.sub);
    if (res) {
      audio.playTorpedoLaunch();
      this.sub.addAcousticSpike(15);
      if (res.type === 'TORPEDO') {
        this.log(`TUBE 1 FIRED: HADAL-8 TORPEDO AWAY ON HEADING ${Math.round(this.sub.headingDeg)}°. GUIDANCE CALIBRATION: ${this.telemetryState.lastScore}%.`);
      } else {
        this.log(`TUBE 2 FIRED: HIGH-OUTPUT ACOUSTIC DECOY DEPLOYED (95 dB LURE ACTIVE).`);
      }
    }
  }

  log(msg) {
    const logBox = document.getElementById('tactical-log');
    if (!logBox) return;
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    const timestamp = new Date().toTimeString().split(' ')[0];
    entry.textContent = `[${timestamp}] ${msg}`;
    logBox.appendChild(entry);
    logBox.scrollTop = logBox.scrollHeight;
  }

  loop(timestamp) {
    const dt = Math.min(0.1, (timestamp - this.lastTime) / 1000.0);
    this.lastTime = timestamp;

    if (this.running) {
      this.update(dt);
      this.render();
    }

    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    // 1. Update Submarine Physics
    this.sub.update(dt, this.ocean);

    // 2. Update Entities
    this.apex.update(dt, this.sub, this.ocean);
    this.ambientStalkers.forEach(s => s.update(dt, this.sub, this.ocean));

    // 3. Update Combat & Projectiles
    const prevTorps = [...this.combat.activeTorpedos];
    this.combat.update(dt, [this.apex, ...this.ambientStalkers]);

    // Check torpedo hits
    prevTorps.forEach(t => {
      if (!t.active && t.hit) {
        audio.playDetonation();
        this.log(`>>> TORPEDO IMPACT CONFIRMED! EXPLOSIVE CONCUSSION WAVE DETECTED.`);
        if (this.apex.hp <= 0) {
          this.triggerVictory();
        } else {
          this.log(`APEX INTEGRITY AT ${Math.round(this.apex.hp)}% // TARGET AGGRO ENRAGED!`);
          audio.playApexRoar();
        }
      }
    });

    // 4. Audio dynamic feedback
    audio.setCavitationLevel(this.sub.cavitationActive ? 0.8 : 0.0);
    audio.setAlarm(this.sub.currentNoiseDb >= 90 || this.apex.state === 'CAVITATION_CHARGE');

    // Occasional hull creak at depth
    if (this.sub.depth > 10000 && Math.random() < dt * 0.15) {
      audio.playHullCreak();
    }

    // 5. Check Defeat Conditions
    if (this.sub.hullIntegrity <= 0) {
      this.triggerGameOver('HULL BREACH: 1,100 ATMOSPHERES OF HYDROSTATIC PRESSURE CRUSHED THE VESSEL.');
    } else if (this.sub.oxygenLevel <= 0) {
      this.triggerGameOver('LIFE SUPPORT FAILURE: CO2 SCRUBBERS COLLAPSED.');
    }

    // 6. Push slow ambient noise to waterfall
    if (Math.random() < dt * 2.0) {
      this.renderer.pushWaterfallLine(this.telemetryState.currentFrequencyKhz, 0, this.sub.currentNoiseDb);
    }

    this._updateDiegeticGauges();
  }

  _updateDiegeticGauges() {
    // Heading & Depth
    document.getElementById('heading-disp').textContent = `${Math.round(this.sub.headingDeg)}°`;
    document.getElementById('depth-disp').textContent = `${Math.round(this.sub.depth)} m`;
    document.getElementById('speed-disp').textContent = `${this.sub.speedKts.toFixed(1)} KTS`;

    // Hull & Life Support
    const hullEl = document.getElementById('hull-integrity-disp');
    hullEl.textContent = `${Math.max(0, Math.round(this.sub.hullIntegrity))}%`;
    hullEl.style.color = this.sub.hullIntegrity < 40 ? '#ff3333' : '#39d968';

    document.getElementById('o2-disp').textContent = `${Math.max(0, Math.round(this.sub.oxygenLevel))}%`;
    document.getElementById('battery-disp').textContent = `${Math.round(this.sub.batteryReserve)}%`;
    document.getElementById('sensor-cap-disp').textContent = `${Math.round(this.sub.sensorCapacitor)}%`;

    // Acoustic Signature & Threat Bar
    const db = Math.round(this.sub.currentNoiseDb);
    document.getElementById('db-meter-disp').textContent = `${db} dB`;
    const dbBar = document.getElementById('db-meter-bar');
    const barPercent = Math.min(100, Math.max(0, (db - 35) / 65 * 100));
    dbBar.style.width = `${barPercent}%`;
    if (db >= 90) dbBar.style.background = '#ff0000';
    else if (db >= 75) dbBar.style.background = '#f39c12';
    else dbBar.style.background = '#39d968';

    // Cavitation & Stalker LEDs
    const cavLed = document.getElementById('cav-led');
    if (this.sub.cavitationActive) cavLed.classList.add('led-active-red');
    else cavLed.classList.remove('led-active-red');

    const aggroLed = document.getElementById('aggro-led');
    if (db >= 75 || this.apex.state === 'STALKING' || this.apex.state === 'CAVITATION_CHARGE') {
      aggroLed.classList.add('led-active-red');
    } else {
      aggroLed.classList.remove('led-active-red');
    }

    // Weapons Interlock Status
    const lockEl = document.getElementById('weap-lock-status');
    const score = this.telemetryState.lastScore;
    if (score >= 90) {
      lockEl.textContent = `CRITICAL LOCK: ${score}% [LETHAL GUIDE]`;
      lockEl.className = 'lock-green';
    } else if (score >= 80) {
      lockEl.textContent = `SUB-HARMONIC: ${score}% [DEFLECTION RISK]`;
      lockEl.className = 'lock-amber';
    } else {
      lockEl.textContent = `INTERLOCK LOCKED [R: ${score}% < 90%]`;
      lockEl.className = 'lock-red';
    }

    // Tube 1 Status
    const t1Status = document.getElementById('tube1-status');
    if (!this.combat.tube1.loaded) {
      t1Status.textContent = `RELOADING (${Math.round(this.combat.tube1.reloadTimer)}s)`;
    } else {
      t1Status.textContent = this.combat.tube1.flooded ? 'FLOODED // ARMED' : 'DRY // LOADED';
    }

    // Tube 2 Status
    const t2Status = document.getElementById('tube2-status');
    if (!this.combat.tube2.loaded) {
      t2Status.textContent = `RELOADING (${Math.round(this.combat.tube2.reloadTimer)}s)`;
    } else {
      t2Status.textContent = this.combat.tube2.flooded ? 'FLOODED // ARMED' : 'DRY // LOADED';
    }
  }

  render() {
    this.renderer.render(
      this.sub,
      this.apex,
      this.ambientStalkers,
      this.combat,
      this.telemetryState,
      this.ocean
    );
  }

  triggerVictory() {
    this.victory = true;
    this.running = false;
    audio.playDetonation();
    document.getElementById('victory-modal').classList.remove('hidden');
  }

  triggerGameOver(reason) {
    this.gameOver = true;
    this.running = false;
    audio.playDetonation();
    document.getElementById('defeat-reason').textContent = reason;
    document.getElementById('defeat-modal').classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const game = new GameController();
  game.init();
});
