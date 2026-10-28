/**
 * RESONANCE PING - Abyssal Entities & Behavioral AI State Machine
 * Defines the Apex Leviathan and Ambient Stalker swarms with acoustic tracking.
 */

export class ApexEntity {
  constructor(name = 'CARCINUS DREADNOUGHT') {
    this.name = name;
    // Initial Position in Hadal Basin
    this.x = 420;
    this.z = 680;
    this.depth = 9480;
    this.headingDeg = 210;
    this.speedKts = 3.5;

    // Taxonomy Profile (True Biophysical Identity)
    this.traits = {
      domain: 'CHITIN_ARTHROPODIC',
      matrix: 'SEGMENTED_CARAPACE',
      metabolism: 'CAVITATION_JET',
      carrierKhz: 14.2
    };

    // Combat Stats
    this.hp = 100;
    this.maxHp = 100;
    this.armorHardness = 0.85; // Deflects non-resonant weapons
    this.paralyzedTimer = 0;

    // AI State Machine: DORMANT -> PROBING -> STALKING -> CAVITATION_CHARGE
    this.state = 'DORMANT';
    this.stateTimer = 0;
    this.lastKnownSubPos = null;
  }

  takeDamage(amount, penetrationMultiplier = 1.0) {
    const effectiveDamage = amount * penetrationMultiplier;
    this.hp = Math.max(0, this.hp - effectiveDamage);
    if (this.hp > 0 && this.state !== 'CAVITATION_CHARGE') {
      this.state = 'CAVITATION_CHARGE';
      this.stateTimer = 20.0;
    }
    return this.hp <= 0;
  }

  paralyze(seconds = 12) {
    this.paralyzedTimer = seconds;
    this.state = 'DORMANT';
  }

  update(dt, sub, ocean) {
    if (this.hp <= 0) return; // Neutralized

    // If paralyzed by 100% singularity resonance
    if (this.paralyzedTimer > 0) {
      this.paralyzedTimer -= dt;
      this.speedKts = 0;
      return;
    }

    // Distance to submarine
    const dx = sub.x - this.x;
    const dy = sub.depth - this.depth;
    const dz = sub.z - this.z;
    const distToSub = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const bearingToSub = (Math.atan2(dx, dz) * (180 / Math.PI) + 360) % 360;

    // Check acoustic perception through thermocline
    const subAbove = sub.depth < ocean.thermoclineDepth;
    const entityAbove = this.depth < ocean.thermoclineDepth;
    const thermoclineShield = (subAbove !== entityAbove);
    const perceivedNoise = thermoclineShield ? Math.max(30, sub.currentNoiseDb - 22) : sub.currentNoiseDb;

    // State Transitions based on Acoustic Signature
    if (this.state === 'DORMANT') {
      this.speedKts = 3.0;
      // Gentle patrol wandering
      this.headingDeg = (this.headingDeg + (Math.sin(Date.now() * 0.001) * 15 * dt)) % 360;
      if (perceivedNoise > 65 || sub.reverbDecibels > 15) {
        this.state = 'PROBING';
        this.stateTimer = 8.0;
      }
    } else if (this.state === 'PROBING') {
      this.speedKts = 6.0;
      // Turn towards suspected sound vector
      this.headingDeg = bearingToSub;
      if (perceivedNoise > 80 || distToSub < 400) {
        this.state = 'STALKING';
      } else if (perceivedNoise < 55) {
        this.stateTimer -= dt;
        if (this.stateTimer <= 0) this.state = 'DORMANT';
      }
    } else if (this.state === 'STALKING') {
      this.speedKts = 11.0;
      this.headingDeg = bearingToSub;
      // Align depth
      this.depth += (sub.depth - this.depth) * 0.2 * dt;

      if (perceivedNoise > 92 || distToSub < 250) {
        this.state = 'CAVITATION_CHARGE';
        this.stateTimer = 18.0;
      } else if (perceivedNoise < 50 && distToSub > 700) {
        this.state = 'PROBING';
        this.stateTimer = 10.0;
      }
    } else if (this.state === 'CAVITATION_CHARGE') {
      this.speedKts = 26.0; // Violent hyper-cavitation ram!
      this.headingDeg = bearingToSub;
      this.depth += (sub.depth - this.depth) * 0.4 * dt;
      this.stateTimer -= dt;

      // Ram check
      if (distToSub < 45) {
        // Catastrophic collision with player vessel!
        sub.hullIntegrity -= 35;
        sub.addAcousticSpike(40);
        // Recoil back
        this.x -= Math.sin(this.headingDeg * Math.PI / 180) * 120;
        this.z -= Math.cos(this.headingDeg * Math.PI / 180) * 120;
        this.state = 'STALKING';
      }

      if (this.stateTimer <= 0) {
        this.state = 'STALKING';
      }
    }

    // Spatial movement
    const speedMs = this.speedKts * 0.5144;
    const rad = this.headingDeg * (Math.PI / 180);
    this.x += Math.sin(rad) * speedMs * dt;
    this.z += Math.cos(rad) * speedMs * dt;
  }
}

export class AmbientStalker {
  constructor(id, x, z, depth) {
    this.id = id;
    this.x = x;
    this.z = z;
    this.depth = depth;
    this.speedKts = 5;
    this.headingDeg = Math.random() * 360;
    this.hp = 25;
    this.aggro = false;
  }

  update(dt, sub, ocean) {
    const dx = sub.x - this.x;
    const dy = sub.depth - this.depth;
    const dz = sub.z - this.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (sub.currentNoiseDb > 70 && dist < 1200) {
      this.aggro = true;
    } else if (sub.currentNoiseDb < 50) {
      this.aggro = false;
    }

    if (this.aggro) {
      this.headingDeg = (Math.atan2(dx, dz) * (180 / Math.PI) + 360) % 360;
      this.speedKts = 9;
      if (dist < 30) {
        sub.hullIntegrity -= 4 * dt;
        sub.addAcousticSpike(8);
      }
    } else {
      this.speedKts = 4;
      this.headingDeg = (this.headingDeg + (Math.sin(Date.now() * 0.002 + this.id) * 20 * dt)) % 360;
    }

    const speedMs = this.speedKts * 0.5144;
    const rad = this.headingDeg * (Math.PI / 180);
    this.x += Math.sin(rad) * speedMs * dt;
    this.z += Math.cos(rad) * speedMs * dt;
  }
}
