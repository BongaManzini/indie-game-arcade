// ============================================================================
// THE BLIGHTSTEAD - CORE GAMEPLAY LOOP & STATE ORCHESTRATOR
// ============================================================================

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.renderer = new Renderer(this.canvas);
    this.input = new InputManager(this.canvas);
    this.sound = window.soundEngine;

    this.scene = 'HOMESTEAD'; // 'HOMESTEAD', 'AIRLOCK', 'ZONE', 'MODAL'
    this.previousScene = null;
    this.dayCount = 1;

    // Subsystems
    this.player = new Player(420, 350);
    this.homestead = new HomesteadManager();
    this.zone = new ZoneManager();
    this.particles = new ParticleSystem();
    this.projectiles = [];

    this.airlockTimer = 0;
    this.airlockTargetScene = 'ZONE';

    this.lastTime = performance.now();
    this.isPaused = false;

    // Modal UI states (Apothecary, Winch report)
    this.activeModal = null; // 'APOTHECARY', 'REPORT'

    this.init();
  }

  init() {
    window.addEventListener('resize', () => {
      this.renderer.resize(window.innerWidth, window.innerHeight);
    });
    this.renderer.resize(window.innerWidth, window.innerHeight);

    // Initial audio on first user gesture
    const unlockAudio = () => {
      this.sound.init();
      this.sound.setAtmosphere(this.scene);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    this.renderer.addMessage('DAY 1: OUTPOST 4. TILL SOIL & HARVEST MUNITIONS BEFORE DEPLOYMENT.', '#ffb703', 6.0);

    // Start game loop
    requestAnimationFrame(t => this.loop(t));
  }

  loop(currentTime) {
    const dt = Math.min(0.1, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    this.update(dt);
    this.render(dt);

    this.input.clearTriggers();
    requestAnimationFrame(t => this.loop(t));
  }

  update(dt) {
    this.input.update();

    // Scene-specific updates
    if (this.scene === 'HOMESTEAD') {
      this.updateHomestead(dt);
    } else if (this.scene === 'AIRLOCK') {
      this.updateAirlock(dt);
    } else if (this.scene === 'ZONE') {
      this.updateZone(dt);
    }

    // Update Particles
    this.particles.update(dt);

    // Update Projectiles
    const currentObstacles = this.scene === 'ZONE' ? this.zone.obstacles : [];
    const currentEntities = this.scene === 'ZONE' ? [...this.zone.stalkers, ...this.zone.screechers] : [];
    this.projectiles = this.projectiles.filter(p =>
      p.update(dt, currentObstacles, currentEntities, this.particles, this.sound)
    );

    // Global Renderer Camera Update
    this.renderer.update(dt, this.player);
  }

  // --- HOMESTEAD LOGIC ---

  updateHomestead(dt) {
    this.player.update(dt, this.input, this.scene);
    this.homestead.update(dt);

    // Tool switching: 1 to 6 or Q / E
    if (this.input.isKeyJustPressed('Digit1')) this.player.activeFarmToolIdx = 0;
    if (this.input.isKeyJustPressed('Digit2')) this.player.activeFarmToolIdx = 1;
    if (this.input.isKeyJustPressed('Digit3')) this.player.activeFarmToolIdx = 2;
    if (this.input.isKeyJustPressed('Digit4')) this.player.activeFarmToolIdx = 3;
    if (this.input.isKeyJustPressed('Digit5')) this.player.activeFarmToolIdx = 4;
    if (this.input.isKeyJustPressed('Digit6')) this.player.activeFarmToolIdx = 5;

    if (this.input.isKeyJustPressed('KeyQ')) {
      this.player.activeFarmToolIdx = (this.player.activeFarmToolIdx - 1 + this.player.farmTools.length) % this.player.farmTools.length;
    }
    if (this.input.isKeyJustPressed('KeyE') && !this.isNearStation()) {
      this.player.activeFarmToolIdx = (this.player.activeFarmToolIdx + 1) % this.player.farmTools.length;
    }

    // Interacting with Stations (E key)
    if (this.input.isKeyJustPressed('KeyE') || this.input.isKeyJustPressed('Space')) {
      this.handleHomesteadInteractions();
    }

    // Primary action (Click on farm tile)
    if (this.input.isClickJustPressed(0)) {
      this.handleFarmTileClick();
    }

    // Check entry into Airlock Gate
    const gate = this.homestead.airlockGate;
    if (
      this.player.x >= gate.x &&
      this.player.x <= gate.x + gate.w &&
      this.player.y >= gate.y &&
      this.player.y <= gate.y + gate.h
    ) {
      this.triggerAirlock('ZONE');
    }
  }

  isNearStation() {
    const p = this.player;
    const vat = this.homestead.compostVat;
    const bench = this.homestead.apothecaryBench;
    const well = this.homestead.waterWell;
    return (
      Math.hypot(p.x - (vat.x + 35), p.y - (vat.y + 35)) < 70 ||
      Math.hypot(p.x - (bench.x + 35), p.y - (bench.y + 35)) < 70 ||
      Math.hypot(p.x - (well.x + 30), p.y - (well.y + 30)) < 70
    );
  }

  handleHomesteadInteractions() {
    const p = this.player;
    const vat = this.homestead.compostVat;
    const bench = this.homestead.apothecaryBench;
    const well = this.homestead.waterWell;

    // Compost Vat
    if (Math.hypot(p.x - (vat.x + 35), p.y - (vat.y + 35)) < 70) {
      const converted = this.homestead.depositCompost(p.inventory);
      if (converted > 0) {
        this.sound.playCraft();
        this.renderer.addMessage(`DEPOSITED MUTANT BIOMASS -> REFINED COMPOST SLURRY!`, '#39ff14');
      } else {
        this.renderer.addMessage(`COMPOST VAT: HAS ${vat.slurryAmount} BUCKETS. DEPLOY TO ZONE TO HARVEST MONSTER ICHOR.`, '#aaaaaa');
      }
    }

    // Apothecary Bench
    if (Math.hypot(p.x - (bench.x + 35), p.y - (bench.y + 35)) < 70) {
      this.openApothecaryCrafting();
    }

    // Water Well
    if (Math.hypot(p.x - (well.x + 30), p.y - (well.y + 30)) < 70) {
      p.inventory.waterLevel = 100;
      this.sound.playWater();
      this.renderer.addMessage('WATER CAN REFILLED TO 100%', '#48cae4');
    }
  }

  openApothecaryCrafting() {
    const p = this.player;
    // Attempt crafting priority
    let crafted = false;
    if (p.inventory.phosphor_pod >= 1) {
      const res = this.homestead.craftRecipe('craft_flares', p.inventory);
      this.sound.playCraft();
      this.renderer.addMessage(res.message, '#39ff14');
      crafted = true;
    }
    if (p.inventory.cinnabar_core >= 1) {
      const res = this.homestead.craftRecipe('craft_kinetic', p.inventory);
      this.sound.playCraft();
      this.renderer.addMessage(res.message, '#ffaa33');
      crafted = true;
    }
    if (p.inventory.iron_reed >= 1) {
      const res = this.homestead.craftRecipe('craft_inhaler', p.inventory);
      this.sound.playCraft();
      this.renderer.addMessage(res.message, '#00ffff');
      crafted = true;
    }

    if (!crafted) {
      this.renderer.addMessage('APOTHECARY: NO MATURE CROPS TO REFINE! TILL AND GROW PODS FIRST.', '#ff5555');
    }
  }

  handleFarmTileClick() {
    // Convert screen mouse to world coords
    const worldX = this.input.mouseX + this.renderer.camX;
    const worldY = this.input.mouseY + this.renderer.camY;
    const tile = this.homestead.getTileAt(worldX, worldY);
    if (!tile) return;

    const tool = this.player.farmTools[this.player.activeFarmToolIdx].id;

    // 1. Harvest check
    if (tile.stage === 3 && !tile.isDead) {
      const result = tile.harvest();
      if (result) {
        this.player.inventory[result.item] = (this.player.inventory[result.item] || 0) + result.count;
        this.sound.playHarvest();
        this.particles.spawn(tile.x + 32, tile.y + 32, 15, { color: '#39ff14', speed: 50, life: 0.8 });
        this.renderer.addMessage(`HARVESTED: +${result.count} ${result.name}!`, '#39ff14');
        return;
      }
    }

    // 2. Spade / Till
    if (tool === 'TILL') {
      if (tile.till()) {
        this.sound.playTill();
        this.particles.spawn(worldX, worldY, 8, { color: '#553311', speed: 40 });
      }
    }

    // 3. Water Can
    if (tool === 'WATER') {
      if (this.player.inventory.waterLevel > 0) {
        if (tile.water(35)) {
          this.player.inventory.waterLevel = Math.max(0, this.player.inventory.waterLevel - 5);
          this.sound.playWater();
          this.particles.spawn(worldX, worldY, 12, { color: '#48cae4', speed: 30 });
        }
      } else {
        this.renderer.addMessage('WATER CAN EMPTY! REFILL AT THE WELL.', '#ff5555');
      }
    }

    // 4. Compost
    if (tool === 'COMPOST') {
      if (this.homestead.compostVat.slurryAmount > 0) {
        if (tile.fertilize(40)) {
          this.homestead.compostVat.slurryAmount -= 1;
          this.sound.playTill();
          this.particles.spawn(worldX, worldY, 12, { color: '#39ff14', speed: 30 });
          this.renderer.addMessage('FERTILIZED BED: +40% NITROGEN', '#39ff14');
        }
      } else {
        this.renderer.addMessage('OUT OF COMPOST! PROCESS MONSTER CARCASSES AT THE VAT.', '#ff5555');
      }
    }

    // 5. Seeds
    if (tool === 'SEED_PHOSPHOR') {
      if (this.player.inventory.seeds.phosphor > 0 && tile.plant('phosphor')) {
        this.player.inventory.seeds.phosphor--;
        this.sound.playPlant();
      }
    } else if (tool === 'SEED_IRON') {
      if (this.player.inventory.seeds.iron_reed > 0 && tile.plant('iron_reed')) {
        this.player.inventory.seeds.iron_reed--;
        this.sound.playPlant();
      }
    } else if (tool === 'SEED_CINNABAR') {
      if (this.player.inventory.seeds.cinnabar > 0 && tile.plant('cinnabar')) {
        this.player.inventory.seeds.cinnabar--;
        this.sound.playPlant();
      }
    }
  }

  // --- AIRLOCK TRANSITION ---

  triggerAirlock(targetScene) {
    this.scene = 'AIRLOCK';
    this.airlockTargetScene = targetScene;
    this.airlockTimer = 3.5;
    this.sound.setAtmosphere('AIRLOCK');

    if (targetScene === 'ZONE') {
      this.renderer.addMessage('VENTING CONTAMINANTS... LOCKING RESPIRATOR HOOD.', '#ffb703', 3.0);
    } else {
      this.renderer.addMessage('PURGING EXCLUSION ZONE SPORES... RETURNING TO HOMESTEAD.', '#39ff14', 3.0);
    }
  }

  updateAirlock(dt) {
    this.airlockTimer -= dt;
    this.particles.spawn(this.player.x, this.player.y, 3, {
      color: '#e0a96d',
      type: 'smoke',
      speed: 30,
      life: 1.2
    });

    if (this.airlockTimer <= 0) {
      this.scene = this.airlockTargetScene;
      this.sound.setAtmosphere(this.scene);

      if (this.scene === 'ZONE') {
        this.player.x = 90;
        this.player.y = 460;
        this.zone = new ZoneManager(); // Fresh sector layout
        this.renderer.addMessage('ZONE DEPLOYED: ILLUMINATE GLOOM-SHIELDED STALKERS BEFORE FIRING!', '#ff3333', 6.0);
      } else if (this.scene === 'HOMESTEAD') {
        this.dayCount++;
        this.player.x = this.homestead.airlockGate.x + 40;
        this.player.y = this.homestead.airlockGate.y + 60;
        this.renderer.addMessage(`DAY ${this.dayCount}: RETURNED ALIVE. DEPOSIT CARGO AT COMPOST VAT.`, '#39ff14', 5.0);
      }
    }
  }

  // --- ZONE LOGIC ---

  updateZone(dt) {
    this.player.update(dt, this.input, this.scene);
    this.zone.update(dt, this.player, this.projectiles, this.particles);

    // Sanity drain in darkness
    if (!this.player.flashlightOn) {
      this.player.sanity = Math.max(0, this.player.sanity - dt * 3.5);
    }

    // Toggle Flashlight (F key)
    if (this.input.isKeyJustPressed('KeyF')) {
      this.player.flashlightOn = !this.player.flashlightOn;
    }

    // Weapon switching: 1 to 3 or Q / E
    if (this.input.isKeyJustPressed('Digit1')) this.player.activeZoneWeaponIdx = 0;
    if (this.input.isKeyJustPressed('Digit2')) this.player.activeZoneWeaponIdx = 1;
    if (this.input.isKeyJustPressed('Digit3')) this.player.activeZoneWeaponIdx = 2;

    if (this.input.isKeyJustPressed('KeyQ')) {
      this.player.activeZoneWeaponIdx = (this.player.activeZoneWeaponIdx - 1 + this.player.zoneWeapons.length) % this.player.zoneWeapons.length;
    }
    if (this.input.isKeyJustPressed('KeyE') && !this.isNearZoneInteractable()) {
      this.player.activeZoneWeaponIdx = (this.player.activeZoneWeaponIdx + 1) % this.player.zoneWeapons.length;
    }

    // Inhaler quick-use (R key)
    if (this.input.isKeyJustPressed('KeyR')) {
      if (this.player.useInhaler()) {
        this.renderer.addMessage('NEURO-SUTURE INHALED: RESTORED 45 HP & 40 SANITY', '#00ffff');
      }
    }

    // Firing Weapons (LMB or Space)
    if (this.input.isClickJustPressed(0) || this.input.isKeyJustPressed('Space')) {
      this.fireActiveWeapon();
    }

    // Zone Interactions (E key)
    if (this.input.isKeyJustPressed('KeyE')) {
      this.handleZoneInteractions();
    }

    // Check Player Death
    if (this.player.health <= 0) {
      this.handlePlayerDeath();
    }
  }

  isNearZoneInteractable() {
    const p = this.player;
    const winch = this.zone.extractionWinch;
    if (Math.hypot(p.x - winch.x, p.y - winch.y) < winch.radius + 30) return true;
    for (const node of this.zone.nodes) {
      if (!node.isHarvested && Math.hypot(p.x - node.x, p.y - node.y) < node.radius + 30) return true;
    }
    const gate = this.zone.airlockGate;
    if (p.x >= gate.x && p.x <= gate.x + gate.w && p.y >= gate.y && p.y <= gate.y + gate.h) return true;
    return false;
  }

  fireActiveWeapon() {
    const p = this.player;
    if (p.attackCooldown > 0) return;

    const activeWep = p.zoneWeapons[p.activeZoneWeaponIdx];

    if (activeWep.id === 'KINETIC') {
      if (p.inventory.kinetic_slugs > 0) {
        p.inventory.kinetic_slugs--;
        p.attackCooldown = 0.35;
        this.sound.playPneumaticShot();
        this.renderer.shake(4);

        // Spawn kinetic projectile
        const proj = new Projectile(p.x, p.y, p.angle, 'KINETIC', 620);
        this.projectiles.push(proj);

        this.particles.spawn(p.x + Math.cos(p.angle) * 20, p.y + Math.sin(p.angle) * 20, 8, {
          color: '#ffaa33',
          type: 'spark',
          speed: 80,
          angle: p.angle,
          spread: 0.3
        });
      } else {
        this.renderer.addMessage('OUT OF KINETIC SLUGS! GROW CINNABAR BULBS ON THE FARM.', '#ff5555');
      }
    } else if (activeWep.id === 'FLARE') {
      if (p.inventory.flare_slugs > 0) {
        p.inventory.flare_slugs--;
        p.attackCooldown = 0.7;
        this.sound.playFlareShot();
        this.renderer.shake(6);

        // Spawn flare projectile
        const proj = new Projectile(p.x, p.y, p.angle, 'FLARE', 420);
        this.projectiles.push(proj);

        this.particles.spawn(p.x, p.y, 12, { color: '#ffdd33', type: 'spark', speed: 90 });
        this.renderer.addMessage('PHOSPHOR FLARE FIRED! BURNS GLOOM SHIELDS & REVEALS HORRORS.', '#39ff14');
      } else {
        this.renderer.addMessage('OUT OF FLARES! GROW PHOSPHOR-GOURDS ON THE FARM.', '#ff5555');
      }
    } else if (activeWep.id === 'INHALER') {
      this.player.useInhaler();
    }
  }

  handleZoneInteractions() {
    const p = this.player;

    // 1. Extraction Winch
    const winch = this.zone.extractionWinch;
    if (Math.hypot(p.x - winch.x, p.y - winch.y) < winch.radius + 30) {
      if (winch.state === 'IDLE') {
        this.zone.startExtractionWinch();
        this.renderer.addMessage('WINCH SPOOLING! HOLD PERIMETER AGAINST ATTRACTED STALKERS!', '#ffaa00', 5.0);
      } else if (winch.state === 'READY') {
        // Successful extraction!
        this.triggerAirlock('HOMESTEAD');
        this.renderer.addMessage('EXTRACTION SUCCESSFUL! CARGO SECURED.', '#39ff14', 6.0);
      }
    }

    // 2. Harvest Nodes
    for (const node of this.zone.nodes) {
      if (!node.isHarvested && Math.hypot(p.x - node.x, p.y - node.y) < node.radius + 30) {
        const harvested = node.harvest();
        if (harvested) {
          p.inventory[harvested.item] = (p.inventory[harvested.item] || 0) + harvested.count;
          this.sound.playHarvest();
          this.particles.spawn(node.x, node.y, 20, { color: '#7209b7', speed: 60 });
          this.renderer.addMessage(`SCAVENGED: +${harvested.count} ${harvested.name}!`, '#00ffff');
        }
      }
    }

    // 3. Early retreat gate
    const gate = this.zone.airlockGate;
    if (p.x >= gate.x && p.x <= gate.x + gate.w && p.y >= gate.y && p.y <= gate.y + gate.h) {
      this.triggerAirlock('HOMESTEAD');
    }
  }

  handlePlayerDeath() {
    this.sound.playMonsterDeath();
    this.renderer.addMessage('WARDEN OVERWHELMED IN THE DARK. CARGO LOST. EVACUATED TO HOMESTEAD CLINIC.', '#ff0033', 8.0);

    // Lose collected zone loot
    this.player.inventory.mutant_ichor = 0;
    this.player.inventory.calcified_bone = 0;
    this.player.inventory.germplasm_core = 0;

    // Wake up in Homestead with low vitals and degraded soil
    this.player.health = 40;
    this.player.sanity = 50;
    this.player.x = 420;
    this.player.y = 350;

    // Degrade farm soil
    for (const tile of this.homestead.tiles) {
      tile.moisture = Math.max(0, tile.moisture - 30);
    }

    this.scene = 'HOMESTEAD';
    this.dayCount++;
    this.sound.setAtmosphere('HOMESTEAD');
  }

  render(dt) {
    this.renderer.render(
      this.scene,
      this.player,
      this.homestead,
      this.zone,
      this.projectiles,
      this.particles,
      dt
    );
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new Game();
});
