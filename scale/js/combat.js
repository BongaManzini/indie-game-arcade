/**
 * RESONANCE PING - Tactical Weapons & Countermeasure Engine
 * Simulates Torpedo Tube mechanics, target locking gates, projectile trajectories,
 * and acoustic decoys.
 */

export class Torpedo {
  constructor(x, z, depth, headingDeg, calibrationScore, target) {
    this.x = x;
    this.z = z;
    this.depth = depth;
    this.headingDeg = headingDeg;
    this.calibrationScore = calibrationScore;
    this.target = target;
    this.speedKts = 36.0; // Fast acoustic runner
    this.lifetime = 14.0; // seconds before fuel exhaustion
    this.active = true;
    this.hit = false;
  }

  update(dt) {
    if (!this.active) return;
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.active = false;
      return;
    }

    // Guidance Logic based on Calibration Score
    if (this.target && this.calibrationScore >= 80) {
      const dx = this.target.x - this.x;
      const dy = this.target.depth - this.depth;
      const dz = this.target.z - this.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const targetBearing = (Math.atan2(dx, dz) * (180 / Math.PI) + 360) % 360;

      // Homing turn rate proportional to calibration
      const turnAgility = (this.calibrationScore / 100) * 85.0 * dt;
      let angleDiff = targetBearing - this.headingDeg;
      while (angleDiff < -180) angleDiff += 360;
      while (angleDiff > 180) angleDiff -= 360;

      this.headingDeg = (this.headingDeg + Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), turnAgility) + 360) % 360;
      this.depth += (this.target.depth - this.depth) * 0.4 * dt;

      // Collision check
      if (dist < 35) {
        this.active = false;
        this.hit = true;
        // Hit evaluation:
        if (this.calibrationScore >= 90) {
          // Weakpoint penetrated!
          this.target.takeDamage(65, 1.8);
        } else {
          // Deflection chance against chitin
          if (Math.random() < 0.5) {
            this.target.takeDamage(25, 0.4); // Armor ricochet
          } else {
            this.target.takeDamage(40, 1.0);
          }
        }
      }
    } else {
      // Uncalibrated: drifts with erratic wobble
      this.headingDeg += (Math.random() - 0.5) * 45 * dt;
    }

    const speedMs = this.speedKts * 0.5144;
    const rad = this.headingDeg * (Math.PI / 180);
    this.x += Math.sin(rad) * speedMs * dt;
    this.z += Math.cos(rad) * speedMs * dt;
  }
}

export class DecoyBuoy {
  constructor(x, z, depth) {
    this.x = x;
    this.z = z;
    this.depth = depth;
    this.duration = 18.0; // emits 95 dB noise for 18 seconds
    this.active = true;
  }

  update(dt, entities) {
    if (!this.active) return;
    this.duration -= dt;
    if (this.duration <= 0) {
      this.active = false;
      return;
    }

    // Divert nearby entities towards decoy
    entities.forEach(ent => {
      const dx = this.x - ent.x;
      const dz = this.z - ent.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 1000) {
        ent.headingDeg = (Math.atan2(dx, dz) * (180 / Math.PI) + 360) % 360;
        if (ent.state === 'PROBING' || ent.state === 'STALKING') {
          ent.speedKts = 14;
        }
      }
    });
  }
}

export class CombatManager {
  constructor() {
    this.tube1 = {
      loaded: 'HADAL_8_TORPEDO',
      flooded: false,
      readyToFire: false,
      reloadTimer: 0
    };
    this.tube2 = {
      loaded: 'ACOUSTIC_DECOY',
      flooded: false,
      readyToFire: false,
      reloadTimer: 0
    };

    this.activeTorpedos = [];
    this.activeDecoys = [];
    this.lastCalibrationScore = 0;
    this.lockedTarget = null;
  }

  floodTube(tubeNum) {
    const tube = tubeNum === 1 ? this.tube1 : this.tube2;
    if (!tube.loaded || tube.flooded) return false;
    tube.flooded = true;
    tube.readyToFire = true;
    return true;
  }

  updateCalibration(score, target) {
    this.lastCalibrationScore = score;
    this.lockedTarget = target;
  }

  fireTube(tubeNum, sub) {
    const tube = tubeNum === 1 ? this.tube1 : this.tube2;
    if (!tube.readyToFire || !tube.loaded) return null;

    tube.readyToFire = false;
    const firedType = tube.loaded;
    tube.loaded = null;
    tube.flooded = false;
    tube.reloadTimer = 18.0; // seconds reload

    if (firedType === 'HADAL_8_TORPEDO') {
      const torp = new Torpedo(
        sub.x,
        sub.z,
        sub.depth,
        sub.headingDeg,
        this.lastCalibrationScore,
        this.lockedTarget
      );
      this.activeTorpedos.push(torp);
      return { type: 'TORPEDO', instance: torp };
    } else if (firedType === 'ACOUSTIC_DECOY') {
      const decoy = new DecoyBuoy(sub.x, sub.z, sub.depth);
      this.activeDecoys.push(decoy);
      return { type: 'DECOY', instance: decoy };
    }
    return null;
  }

  update(dt, entities) {
    // Reload tubes
    [this.tube1, this.tube2].forEach((tube, idx) => {
      if (!tube.loaded && tube.reloadTimer > 0) {
        tube.reloadTimer -= dt;
        if (tube.reloadTimer <= 0) {
          tube.loaded = idx === 0 ? 'HADAL_8_TORPEDO' : 'ACOUSTIC_DECOY';
        }
      }
    });

    // Update projectiles
    this.activeTorpedos.forEach(t => t.update(dt));
    this.activeTorpedos = this.activeTorpedos.filter(t => t.active);

    this.activeDecoys.forEach(d => d.update(dt, entities));
    this.activeDecoys = this.activeDecoys.filter(d => d.active);
  }
}
