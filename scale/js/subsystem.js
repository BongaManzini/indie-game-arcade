/**
 * RESONANCE PING - Submarine Physics & Power Distribution Matrix
 * Simulates reactor power routing, ballast trim, hadal depth dynamics,
 * cavitation acoustics, and life support.
 */

export class SubmarineVessel {
  constructor() {
    // 3D Spatial Position in Trench
    this.x = 0;           // Meters (East/West)
    this.z = 0;           // Meters (North/South)
    this.depth = 9200;    // Meters (Depth beneath surface)
    this.headingDeg = 0;  // 0 = North, 90 = East, 180 = South, 270 = West
    this.speedKts = 0;    // Knots
    this.rudderAngle = 0; // -30 to +30 degrees

    // Ballast & Trim
    this.forwardBallast = 50; // 0 to 100% (flooded)
    this.aftBallast = 50;     // 0 to 100% (flooded)
    this.verticalRate = 0;    // m/s

    // Hull & Health
    this.hullIntegrity = 100; // %
    this.crushDepth = 11000;  // Meters
    this.oxygenLevel = 100;   // %
    this.coreTempK = 420;     // Kelvin

    // Power Matrix (Max Total: 100 PU)
    this.totalPower = 100;
    this.power = {
      telemetry: 30,
      propulsion: 20,
      ballast: 15,
      weapons: 25,
      lifeSupport: 10
    };

    // Modes & States
    this.silentRunning = false;
    this.batteryReserve = 100; // % used during silent running
    this.sensorCapacitor = 100;// % (0-100, needed to fire ping)

    // Acoustic Signature & Decibel Budget
    this.ambientBaseDb = 35;
    this.currentNoiseDb = 38;
    this.cavitationActive = false;
    this.reverbDecibels = 0; // residual echo decaying over time
  }

  setPower(subsystem, amount) {
    amount = Math.max(0, Math.min(100, Math.round(amount)));
    const otherSum = Object.entries(this.power)
      .filter(([k]) => k !== subsystem)
      .reduce((sum, [, v]) => sum + v, 0);

    if (otherSum + amount > this.totalPower) {
      amount = this.totalPower - otherSum;
    }
    this.power[subsystem] = Math.max(0, amount);
  }

  toggleSilentRunning() {
    this.silentRunning = !this.silentRunning;
    return this.silentRunning;
  }

  addAcousticSpike(db) {
    this.reverbDecibels = Math.min(60, this.reverbDecibels + db);
  }

  update(dt, ocean) {
    // 1. Propulsion & Cavitation Physics
    const maxThrottle = this.power.propulsion / 30; // 0 to ~1.0
    const targetSpeed = maxThrottle * (this.silentRunning ? 4.0 : 12.0); // knots
    this.speedKts += (targetSpeed - this.speedKts) * (dt * 0.4);

    // Turning rate proportional to speed and rudder
    const turnRate = (this.rudderAngle / 30) * (this.speedKts * 1.8) * dt;
    this.headingDeg = (this.headingDeg + turnRate + 360) % 360;

    // Spatial translation in horizontal plane (1 knot ~ 0.514 m/s)
    const speedMs = this.speedKts * 0.5144;
    const rad = this.headingDeg * (Math.PI / 180);
    this.x += Math.sin(rad) * speedMs * dt;
    this.z += Math.cos(rad) * speedMs * dt;

    // 2. Ballast & Vertical Depth Dynamics
    // Neutral buoyancy is at ~50% ballast. >50% sinks, <50% rises.
    const averageBallast = (this.forwardBallast + this.aftBallast) / 2;
    const trimDelta = (this.forwardBallast - this.aftBallast); // Pitch angle
    const ballastEffectiveness = (this.power.ballast / 20);

    const netBuoyancy = (averageBallast - 50) * 0.18 * (this.silentRunning ? 0.4 : ballastEffectiveness);
    this.verticalRate += (netBuoyancy - this.verticalRate) * (dt * 0.5);
    this.depth += this.verticalRate * dt;

    // Clamp depth to trench floor (10,950m) and surface (8,000m min trench entry)
    this.depth = Math.max(8200, Math.min(10950, this.depth));

    // 3. Crush Depth Stress
    if (this.depth > 10500) {
      const overDepth = (this.depth - 10500) / (this.crushDepth - 10500);
      this.hullIntegrity -= overDepth * 2.5 * dt;
    }

    // 4. Life Support & Silent Running
    if (this.silentRunning) {
      this.batteryReserve -= dt * 0.4;
      this.oxygenLevel -= dt * 0.25;
      if (this.batteryReserve <= 0) {
        this.batteryReserve = 0;
        this.silentRunning = false; // Battery dead, forced reactor startup
      }
    } else {
      // Recharging battery slowly
      this.batteryReserve = Math.min(100, this.batteryReserve + dt * 0.8);
      if (this.power.lifeSupport >= 10) {
        this.oxygenLevel = Math.min(100, this.oxygenLevel + dt * 0.5);
      } else {
        this.oxygenLevel -= (10 - this.power.lifeSupport) * 0.05 * dt;
      }
    }

    // 5. Sensor Capacitor Recharge
    const rechargeRate = (this.power.telemetry / 30) * 18.0; // % per second
    this.sensorCapacitor = Math.min(100, this.sensorCapacitor + rechargeRate * dt);

    // 6. Acoustic Noise Simulation
    // Baseline + Propulsion + Cavitation + Residual Pings
    let engineNoise = 0;
    if (!this.silentRunning) {
      engineNoise = (this.speedKts / 12.0) * 22; // up to 22 dB
      this.cavitationActive = this.speedKts > 6.5;
      if (this.cavitationActive) {
        engineNoise += 24.0; // Cavitation bubble collapse
      }
    } else {
      this.cavitationActive = false;
      engineNoise = (this.speedKts / 4.0) * 4.0;
    }

    // Decay residual acoustic reverberation
    this.reverbDecibels = Math.max(0, this.reverbDecibels - dt * 6.5);

    // Calculate instant total decibels
    let totalDb = this.ambientBaseDb + engineNoise + this.reverbDecibels;
    if (this.silentRunning) {
      totalDb = Math.max(25, totalDb - 15.0);
    }
    this.currentNoiseDb = totalDb;
  }
}
