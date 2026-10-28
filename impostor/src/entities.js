// ============================================================================
// THE BLIGHTSTEAD - ENTITIES, ABERRATION AI & COMBAT SYSTEMS
// ============================================================================

class Particle {
  constructor(x, y, vx, vy, color, size, life, decay, type = 'normal') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
    this.decay = decay;
    this.type = type; // 'normal', 'spark', 'smoke', 'spore', 'light'
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt * this.decay;
    if (this.type === 'smoke') {
      this.size += dt * 8;
      this.vx *= 0.95;
      this.vy *= 0.95;
    } else if (this.type === 'spark') {
      this.vy += 30 * dt; // gravity
      this.vx *= 0.98;
    }
    return this.life > 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  spawn(x, y, count, config = {}) {
    for (let i = 0; i < count; i++) {
      const angle = config.angle !== undefined ? config.angle + (Math.random() - 0.5) * (config.spread || 0.5) : Math.random() * Math.PI * 2;
      const speed = config.speed !== undefined ? config.speed * (0.5 + Math.random() * 0.8) : Math.random() * 60 + 20;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = config.color || '#39ff14';
      const size = config.size || Math.random() * 3 + 2;
      const life = config.life || 1.0;
      const decay = config.decay || 1.0;
      const type = config.type || 'normal';

      this.particles.push(new Particle(x, y, vx, vy, color, size, life, decay, type));
    }
  }

  update(dt) {
    this.particles = this.particles.filter(p => p.update(dt));
  }

  render(ctx) {
    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}

class Projectile {
  constructor(x, y, angle, type = 'KINETIC', speed = 550) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.type = type; // 'KINETIC' or 'FLARE'
    this.radius = type === 'FLARE' ? 5 : 3;
    this.life = type === 'FLARE' ? 9.0 : 1.5; // Flares burn for 9 seconds
    this.maxLife = this.life;
    this.isEmbedded = false;
    this.embeddedEntity = null;
    this.damage = type === 'KINETIC' ? 45 : 15;
    this.lightRadius = type === 'FLARE' ? 240 : 25;
  }

  update(dt, obstacles = [], entities = [], particles, sound) {
    if (this.isEmbedded) {
      this.life -= dt;
      if (this.embeddedEntity && this.embeddedEntity.isAlive) {
        this.x = this.embeddedEntity.x;
        this.y = this.embeddedEntity.y;
        // Burning damage over time + strip gloom shield
        this.embeddedEntity.takeLightExposure(dt * 70);
        this.embeddedEntity.takeDamage(dt * 12, 'BURN', particles);
      }
      if (this.type === 'FLARE' && Math.random() < 0.35) {
        particles.spawn(this.x, this.y, 2, {
          color: '#ffdd33',
          type: 'spark',
          speed: 40,
          spread: Math.PI * 2,
          life: 0.6
        });
      }
      return this.life > 0;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt;

    // Check collision with obstacles
    for (const obs of obstacles) {
      if (
        this.x >= obs.x &&
        this.x <= obs.x + obs.w &&
        this.y >= obs.y &&
        this.y <= obs.y + obs.h
      ) {
        if (this.type === 'FLARE') {
          this.isEmbedded = true;
          this.vx = 0;
          this.vy = 0;
          if (sound) sound.playFlareDetonate();
          particles.spawn(this.x, this.y, 25, { color: '#ffdd33', type: 'spark', speed: 120, life: 0.8 });
          return true;
        } else {
          particles.spawn(this.x, this.y, 8, { color: '#888888', type: 'spark', speed: 80, life: 0.4 });
          return false; // kinetic slug destroyed on wall hit
        }
      }
    }

    // Check collision with entities
    for (const ent of entities) {
      if (!ent.isAlive) continue;
      const dist = Math.hypot(this.x - ent.x, this.y - ent.y);
      if (dist < ent.radius + this.radius) {
        if (this.type === 'FLARE') {
          this.isEmbedded = true;
          this.embeddedEntity = ent;
          ent.takeLightExposure(50);
          ent.takeDamage(this.damage, 'FLARE', particles);
          if (sound) sound.playFlareDetonate();
          particles.spawn(this.x, this.y, 20, { color: '#ffdd33', type: 'spark', speed: 90, life: 0.8 });
        } else {
          ent.takeDamage(this.damage, 'KINETIC', particles);
          particles.spawn(this.x, this.y, 14, { color: '#990000', type: 'spark', speed: 70, life: 0.5 });
          return false; // kinetic slug consumed on impact
        }
        break;
      }
    }

    return this.life > 0;
  }
}

class Stalker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.speed = 135;
    this.health = 100;
    this.maxHealth = 100;
    this.isAlive = true;

    // The Mechanical Synergy: Gloom Shield
    this.gloomShield = 100; // 0 to 100
    this.maxGloomShield = 100;
    this.isStunned = false;
    this.stunTimer = 0;

    this.state = 'STALKING'; // 'STALKING', 'CHARGING', 'BLINDED', 'FLEEING'
    this.target = null;
    this.facingAngle = 0;
    this.attackCooldown = 0;
    this.shriekCooldown = 0;
  }

  takeLightExposure(amount) {
    if (this.gloomShield > 0) {
      this.gloomShield = Math.max(0, this.gloomShield - amount);
      if (this.gloomShield === 0) {
        // Shield broken! Stunned and screams
        this.isStunned = true;
        this.stunTimer = 3.5;
        this.state = 'BLINDED';
        if (window.soundEngine) window.soundEngine.playMonsterRoar(0.8);
      }
    }
  }

  takeDamage(amount, type, particles) {
    let effectiveDmg = amount;
    if (this.gloomShield > 0 && type === 'KINETIC') {
      // 85% damage reduction if gloom shield active
      effectiveDmg *= 0.15;
      if (particles) {
        particles.spawn(this.x, this.y, 6, { color: '#4a0e4e', type: 'spore', speed: 40 });
      }
    } else if (this.gloomShield <= 0 && type === 'KINETIC') {
      // 2.5x critical damage when exposed to light!
      effectiveDmg *= 2.5;
      if (particles) {
        particles.spawn(this.x, this.y, 16, { color: '#cc0022', type: 'spark', speed: 90 });
      }
    }

    this.health -= effectiveDmg;
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
      if (window.soundEngine) window.soundEngine.playMonsterDeath();
      if (particles) {
        particles.spawn(this.x, this.y, 35, { color: '#660011', speed: 80, life: 1.5 });
      }
    }
  }

  update(dt, player, flares = [], obstacles = []) {
    if (!this.isAlive) return;

    if (this.stunTimer > 0) {
      this.stunTimer -= dt;
      if (this.stunTimer <= 0) {
        this.isStunned = false;
        this.state = 'CHARGING';
      }
      return;
    }

    // Slowly regenerate gloom shield if in pure darkness
    let inLight = false;
    for (const flare of flares) {
      const dist = Math.hypot(this.x - flare.x, this.y - flare.y);
      if (dist < flare.lightRadius) {
        this.takeLightExposure(dt * 35);
        inLight = true;
        break;
      }
    }

    // Check player flashlight cone
    if (player && player.flashlightOn) {
      const dx = this.x - player.x;
      const dy = this.y - player.y;
      const dist = Math.hypot(dx, dy);
      if (dist < player.flashlightRange) {
        const angleToMe = Math.atan2(dy, dx);
        let diff = angleToMe - player.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        if (Math.abs(diff) < player.flashlightSpread) {
          this.takeLightExposure(dt * 45);
          inLight = true;
        }
      }
    }

    if (!inLight && this.gloomShield < this.maxGloomShield) {
      this.gloomShield = Math.min(this.maxGloomShield, this.gloomShield + dt * 6);
    }

    // AI navigation
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distToPlayer = Math.hypot(dx, dy);
    this.facingAngle = Math.atan2(dy, dx);

    if (this.attackCooldown > 0) this.attackCooldown -= dt;

    if (distToPlayer < 35 && this.attackCooldown <= 0) {
      // Melee strike on player
      player.takeDamage(24);
      this.attackCooldown = 1.2;
      if (window.soundEngine) window.soundEngine.playMonsterRoar(0.6);
    }

    // Movement state logic
    let moveSpeed = this.speed;
    if (this.gloomShield <= 0) {
      // Flee away or flail when blinded
      moveSpeed = this.speed * 0.45;
    } else if (distToPlayer < 220) {
      this.state = 'CHARGING';
      moveSpeed = this.speed * 1.35;
    } else {
      this.state = 'STALKING';
      moveSpeed = this.speed * 0.8;
    }

    const vx = Math.cos(this.facingAngle) * moveSpeed;
    const vy = Math.sin(this.facingAngle) * moveSpeed;

    this.x += vx * dt;
    this.y += vy * dt;
  }
}

class Screecher {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 22;
    this.health = 50;
    this.maxHealth = 50;
    this.isAlive = true;
    this.hasScreeched = false;
    this.pulseRadius = 0;
    this.pulseMaxRadius = 260;
  }

  takeDamage(amount, type, particles) {
    this.health -= amount;
    if (particles) {
      particles.spawn(this.x, this.y, 10, { color: '#00ffee', type: 'spark', speed: 60 });
    }
    if (this.health <= 0) {
      this.health = 0;
      this.isAlive = false;
      if (window.soundEngine) window.soundEngine.playMonsterDeath();
    }
  }

  update(dt, player, stalkers = []) {
    if (!this.isAlive) return;

    if (this.pulseRadius > 0) {
      this.pulseRadius += dt * 380;
      if (this.pulseRadius >= this.pulseMaxRadius) {
        this.pulseRadius = 0;
      }
    }

    const dist = Math.hypot(player.x - this.x, player.y - this.y);
    if (dist < 140 && !this.hasScreeched) {
      // Trigger acoustic ping
      this.hasScreeched = true;
      this.pulseRadius = 20;
      if (window.soundEngine) window.soundEngine.playWinchSiren();
      // Alert all stalkers on map to charge player
      for (const s of stalkers) {
        s.state = 'CHARGING';
        s.speed *= 1.3;
      }
    }
  }
}

class Player {
  constructor(x = 420, y = 350) {
    this.x = x;
    this.y = y;
    this.radius = 16;
    this.speed = 170;
    this.angle = 0;

    // Biometrics
    this.health = 100;
    this.maxHealth = 100;
    this.sanity = 100;
    this.maxSanity = 100;
    this.stamina = 100;
    this.maxStamina = 100;

    // Flashlight & Optics
    this.flashlightOn = true;
    this.flashlightRange = 320;
    this.flashlightSpread = 0.52; // ~30 degrees half-angle (60 total)

    // Inventory & Bridge Materials
    this.inventory = {
      // Homestead tools
      seeds: {
        phosphor: 5,
        iron_reed: 5,
        cinnabar: 5
      },
      compostBuckets: 2,
      waterLevel: 100, // percentage in can
      // Harvested crops
      phosphor_pod: 2,
      iron_reed: 2,
      cinnabar_core: 2,
      // Refined munitions
      flare_slugs: 4,
      kinetic_slugs: 15,
      inhalers: 2,
      // Extracted zone organs
      mutant_ichor: 0,
      calcified_bone: 0,
      germplasm_core: 0
    };

    // Modes & Tools
    this.farmTools = [
      { id: 'TILL', name: 'Spade (Till Beds)' },
      { id: 'WATER', name: 'Watering Can' },
      { id: 'COMPOST', name: 'Compost Slurry (Nitrogen)' },
      { id: 'SEED_PHOSPHOR', name: 'Seed: Phosphor-Gourd' },
      { id: 'SEED_IRON', name: 'Seed: Iron-Sap Reed' },
      { id: 'SEED_CINNABAR', name: 'Seed: Cinnabar Bulb' }
    ];
    this.activeFarmToolIdx = 0;

    this.zoneWeapons = [
      { id: 'KINETIC', name: 'Scattergun (Kinetic Harpoon)', ammoKey: 'kinetic_slugs' },
      { id: 'FLARE', name: 'Phosphor Flare Launcher', ammoKey: 'flare_slugs' },
      { id: 'INHALER', name: 'Neuro-Suture Inhaler', ammoKey: 'inhalers' }
    ];
    this.activeZoneWeaponIdx = 0;

    this.attackCooldown = 0;
  }

  takeDamage(amount) {
    this.health = Math.max(0, this.health - amount);
    if (window.soundEngine) window.soundEngine.playHeartbeat();
  }

  useInhaler() {
    if (this.inventory.inhalers > 0 && (this.health < this.maxHealth || this.sanity < this.maxSanity)) {
      this.inventory.inhalers--;
      this.health = Math.min(this.maxHealth, this.health + 45);
      this.sanity = Math.min(this.maxSanity, this.sanity + 40);
      if (window.soundEngine) window.soundEngine.playHeal();
      return true;
    }
    return false;
  }

  update(dt, input, currentScene) {
    if (this.attackCooldown > 0) this.attackCooldown -= dt;

    // Movement
    let dx = 0;
    let dy = 0;
    if (input.keys['KeyW'] || input.keys['ArrowUp'] || input.axes[1] < -0.2) dy -= 1;
    if (input.keys['KeyS'] || input.keys['ArrowDown'] || input.axes[1] > 0.2) dy += 1;
    if (input.keys['KeyA'] || input.keys['ArrowLeft'] || input.axes[0] < -0.2) dx -= 1;
    if (input.keys['KeyD'] || input.keys['ArrowRight'] || input.axes[0] > 0.2) dx += 1;

    // Normalize
    const mag = Math.hypot(dx, dy);
    if (mag > 0) {
      let curSpeed = this.speed;
      if (input.keys['ShiftLeft'] || input.keys['ShiftRight'] || input.buttons[10]) {
        if (this.stamina > 10) {
          curSpeed *= 1.45;
          this.stamina -= dt * 25;
        }
      } else {
        this.stamina = Math.min(this.maxStamina, this.stamina + dt * 15);
      }
      this.x += (dx / mag) * curSpeed * dt;
      this.y += (dy / mag) * curSpeed * dt;
    } else {
      this.stamina = Math.min(this.maxStamina, this.stamina + dt * 20);
    }

    // Aim angle
    if (input.gamepadAiming) {
      this.angle = input.gamepadAngle;
    } else {
      this.angle = Math.atan2(input.mouseY - input.screenCenterY, input.mouseX - input.screenCenterX);
    }
  }
}

window.ParticleSystem = ParticleSystem;
window.Projectile = Projectile;
window.Stalker = Stalker;
window.Screecher = Screecher;
window.Player = Player;
