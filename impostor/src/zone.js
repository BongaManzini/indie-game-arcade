// ============================================================================
// THE BLIGHTSTEAD - OSSUARY EXCLUSION ZONE MAP & EXTRACTION SYSTEM
// ============================================================================

class ResourceNode {
  constructor(x, y, type = 'ICHOR') {
    this.x = x;
    this.y = y;
    this.radius = 24;
    this.type = type; // 'ICHOR', 'BONE', 'GERMPLASM'
    this.isHarvested = false;
  }

  harvest() {
    if (this.isHarvested) return null;
    this.isHarvested = true;
    if (this.type === 'ICHOR') {
      return { item: 'mutant_ichor', count: 2, name: 'Mutant Ichor' };
    } else if (this.type === 'BONE') {
      return { item: 'calcified_bone', count: 2, name: 'Calcified Spine' };
    } else if (this.type === 'GERMPLASM') {
      return { item: 'germplasm_core', count: 1, name: 'Primordial Germplasm Core' };
    }
    return null;
  }
}

class ZoneManager {
  constructor(width = 1600, height = 1200) {
    this.width = width;
    this.height = height;

    // Boundary walls and obstacles (for collision & shadow casting)
    this.obstacles = [
      // Outer boundaries
      { x: 0, y: 0, w: width, h: 24 },
      { x: 0, y: height - 24, w: width, h: 24 },
      { x: 0, y: 0, w: 24, h: height },
      { x: width - 24, y: 0, w: 24, h: height },

      // Interior ruined Gothic walls
      { x: 260, y: 160, w: 28, h: 220 },
      { x: 260, y: 160, w: 200, h: 28 },

      { x: 620, y: 320, w: 320, h: 32 },
      { x: 760, y: 320, w: 32, h: 260 },

      { x: 340, y: 680, w: 240, h: 32 },
      { x: 550, y: 712, w: 32, h: 180 },

      { x: 1040, y: 180, w: 32, h: 360 },
      { x: 920, y: 510, w: 152, h: 32 },

      { x: 1150, y: 720, w: 240, h: 32 },
      { x: 1360, y: 752, w: 32, h: 220 }
    ];

    // Harvestable resource nodes
    this.nodes = [
      new ResourceNode(380, 260, 'ICHOR'),
      new ResourceNode(480, 800, 'ICHOR'),
      new ResourceNode(900, 240, 'BONE'),
      new ResourceNode(1180, 360, 'BONE'),
      new ResourceNode(720, 840, 'GERMPLASM'),
      new ResourceNode(1320, 280, 'GERMPLASM')
    ];

    // Airlock gate (entrance/exit)
    this.airlockGate = {
      x: 35,
      y: 420,
      w: 30,
      h: 90
    };

    // Extraction Winch Station
    this.extractionWinch = {
      x: 1380,
      y: 920,
      radius: 40,
      state: 'IDLE', // 'IDLE', 'SPOOLING', 'READY'
      progress: 0, // 0 to 100
      spoolTime: 18.0, // seconds to spool
      tetherActive: false
    };

    // Spawn positions for stalkers and screechers
    this.stalkers = [
      new Stalker(680, 220),
      new Stalker(880, 720),
      new Stalker(1240, 480)
    ];

    this.screechers = [
      new Screecher(620, 780),
      new Screecher(1100, 320)
    ];

    this.spawnTimer = 0;
  }

  update(dt, player, flares, particles) {
    // Winch spooling
    if (this.extractionWinch.state === 'SPOOLING') {
      this.extractionWinch.progress += (dt / this.extractionWinch.spoolTime) * 100;
      if (Math.random() < 0.15) {
        if (window.soundEngine) window.soundEngine.playWinchSiren();
      }

      // Spooling noise attracts new stalkers!
      this.spawnTimer += dt;
      if (this.spawnTimer > 5.5 && this.stalkers.filter(s => s.isAlive).length < 6) {
        this.spawnTimer = 0;
        const angle = Math.random() * Math.PI * 2;
        const dist = 350 + Math.random() * 100;
        const spawnX = Math.max(50, Math.min(this.width - 50, this.extractionWinch.x + Math.cos(angle) * dist));
        const spawnY = Math.max(50, Math.min(this.height - 50, this.extractionWinch.y + Math.sin(angle) * dist));
        const newStalker = new Stalker(spawnX, spawnY);
        newStalker.state = 'CHARGING';
        this.stalkers.push(newStalker);
        if (window.soundEngine) window.soundEngine.playMonsterRoar(0.7);
      }

      if (this.extractionWinch.progress >= 100) {
        this.extractionWinch.progress = 100;
        this.extractionWinch.state = 'READY';
        this.extractionWinch.tetherActive = true;
      }
    }

    // Update Stalkers
    for (const stalker of this.stalkers) {
      stalker.update(dt, player, flares, this.obstacles);
    }

    // Update Screechers
    for (const screecher of this.screechers) {
      screecher.update(dt, player, this.stalkers);
    }
  }

  startExtractionWinch() {
    if (this.extractionWinch.state === 'IDLE') {
      this.extractionWinch.state = 'SPOOLING';
      this.extractionWinch.progress = 0;
      if (window.soundEngine) window.soundEngine.playWinchSiren();
      // Alert existing stalkers
      for (const s of this.stalkers) {
        s.state = 'CHARGING';
      }
      return true;
    }
    return false;
  }
}

window.ResourceNode = ResourceNode;
window.ZoneManager = ZoneManager;
