// ============================================================================
// THE BLIGHTSTEAD - AGRONOMIC ECOLOGY & HOMESTEAD SIMULATION
// Deep bidirectional causality between soil management and combat viability.
// ============================================================================

const CROP_TYPES = {
  PHOSPHOR: {
    id: 'phosphor',
    name: 'Phosphor-Gourd',
    description: 'Bioluminescent pod. High nitrogen feeder. Yields flare ammo.',
    stages: 4, // 0: seed, 1: sprout, 2: blooming, 3: mature
    growthTime: 25.0, // seconds to mature
    minMoisture: 30,
    optimalMoisture: [45, 80],
    minNitrogen: 40,
    optimalNitrogen: [55, 95],
    color: '#39ff14',
    glowColor: 'rgba(57, 255, 20, 0.45)',
    harvestItem: 'phosphor_pod',
    harvestYield: 2
  },
  IRON_REED: {
    id: 'iron_reed',
    name: 'Iron-Sap Reed',
    description: 'Fibrous metallic reed. Siphon of moisture. Yields medical suture.',
    stages: 4,
    growthTime: 22.0,
    minMoisture: 50,
    optimalMoisture: [60, 95],
    minNitrogen: 20,
    optimalNitrogen: [30, 75],
    color: '#8be9fd',
    glowColor: 'rgba(139, 233, 253, 0.25)',
    harvestItem: 'iron_reed',
    harvestYield: 2
  },
  CINNABAR: {
    id: 'cinnabar',
    name: 'Cinnabar Bulb',
    description: 'Volatile explosive tuber. Arid soil preferred. Yields kinetic flak.',
    stages: 4,
    growthTime: 28.0,
    minMoisture: 15,
    optimalMoisture: [20, 55],
    minNitrogen: 50,
    optimalNitrogen: [65, 100],
    color: '#ff5555',
    glowColor: 'rgba(255, 85, 85, 0.45)',
    harvestItem: 'cinnabar_core',
    harvestYield: 2
  }
};

class SoilTile {
  constructor(gx, gy, worldX, worldY, size = 64) {
    this.gx = gx;
    this.gy = gy;
    this.x = worldX;
    this.y = worldY;
    this.size = size;

    this.isTilled = false;
    this.moisture = 40; // 0 to 100
    this.nitrogen = 35; // 0 to 100
    this.contamination = 10; // 0 to 100

    this.crop = null;
    this.growthProgress = 0; // 0 to 100
    this.stage = 0; // 0 to 3
    this.isDead = false;
  }

  till() {
    if (this.isTilled && !this.crop) return false;
    if (this.isDead && this.crop) {
      // Clear dead crop
      this.crop = null;
      this.isDead = false;
      this.growthProgress = 0;
      this.stage = 0;
      return true;
    }
    this.isTilled = true;
    return true;
  }

  water(amount = 35) {
    if (!this.isTilled) return false;
    this.moisture = Math.min(100, this.moisture + amount);
    return true;
  }

  fertilize(nitrogenAmount = 40) {
    if (!this.isTilled) return false;
    this.nitrogen = Math.min(100, this.nitrogen + nitrogenAmount);
    return true;
  }

  plant(cropTypeId) {
    if (!this.isTilled || this.crop) return false;
    const type = Object.values(CROP_TYPES).find(c => c.id === cropTypeId);
    if (!type) return false;

    this.crop = { ...type };
    this.growthProgress = 0;
    this.stage = 0;
    this.isDead = false;
    return true;
  }

  update(dt) {
    // Environmental evaporation
    if (this.moisture > 0) {
      this.moisture = Math.max(0, this.moisture - dt * 0.4);
    }

    if (!this.crop || this.isDead) return;

    // Check crop survival conditions
    if (this.moisture < this.crop.minMoisture || this.nitrogen < this.crop.minNitrogen) {
      // Crop under stress
      if (Math.random() < 0.05 * dt) {
        this.isDead = true;
      }
      return;
    }

    // Growth speed based on optimal ranges
    let growthMultiplier = 1.0;
    if (this.moisture >= this.crop.optimalMoisture[0] && this.moisture <= this.crop.optimalMoisture[1]) {
      growthMultiplier += 0.5;
    }
    if (this.nitrogen >= this.crop.optimalNitrogen[0] && this.nitrogen <= this.crop.optimalNitrogen[1]) {
      growthMultiplier += 0.5;
    }

    // Consume soil nutrients proportionally
    this.moisture = Math.max(0, this.moisture - dt * 0.6 * growthMultiplier);
    this.nitrogen = Math.max(0, this.nitrogen - dt * 0.4 * growthMultiplier);

    this.growthProgress += (dt / this.crop.growthTime) * 100 * growthMultiplier;
    this.growthProgress = Math.min(100, this.growthProgress);

    // Calculate stage (0, 1, 2, 3)
    this.stage = Math.min(3, Math.floor((this.growthProgress / 100) * 4));
  }

  harvest() {
    if (!this.crop || this.stage < 3 || this.isDead) return null;
    const harvestResult = {
      item: this.crop.harvestItem,
      count: this.crop.harvestYield,
      name: this.crop.name
    };
    this.crop = null;
    this.growthProgress = 0;
    this.stage = 0;
    return harvestResult;
  }
}

class HomesteadManager {
  constructor(cols = 5, rows = 4, startX = 260, startY = 220, tileSize = 64) {
    this.cols = cols;
    this.rows = rows;
    this.startX = startX;
    this.startY = startY;
    this.tileSize = tileSize;
    this.tiles = [];

    // Stations
    this.compostVat = {
      x: startX - 110,
      y: startY + 50,
      width: 70,
      height: 70,
      slurryAmount: 2, // starter compost
      isProcessing: false
    };

    this.apothecaryBench = {
      x: startX - 110,
      y: startY + 160,
      width: 70,
      height: 70
    };

    this.waterWell = {
      x: startX + cols * tileSize + 40,
      y: startY + 50,
      width: 60,
      height: 60
    };

    this.airlockGate = {
      x: startX + (cols * tileSize) / 2 - 40,
      y: startY - 140,
      width: 80,
      height: 40
    };

    this.initGrid();
  }

  initGrid() {
    this.tiles = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = this.startX + c * this.tileSize;
        const y = this.startY + r * this.tileSize;
        const tile = new SoilTile(c, r, x, y, this.tileSize);
        // Pre-till and prepare starter beds for good initial game feel
        if (r === 1 && c === 1) {
          tile.till();
          tile.water(50);
          tile.fertilize(50);
          tile.plant('phosphor');
          tile.growthProgress = 85;
          tile.stage = 3;
        } else if (r === 1 && c === 2) {
          tile.till();
          tile.water(60);
          tile.fertilize(40);
          tile.plant('iron_reed');
          tile.growthProgress = 90;
          tile.stage = 3;
        } else if (r === 2 && c === 1) {
          tile.till();
          tile.water(30);
          tile.fertilize(60);
          tile.plant('cinnabar');
          tile.growthProgress = 80;
          tile.stage = 3;
        } else {
          tile.till();
          tile.moisture = 50;
          tile.nitrogen = 50;
        }
        this.tiles.push(tile);
      }
    }
  }

  getTileAt(worldX, worldY) {
    for (const tile of this.tiles) {
      if (
        worldX >= tile.x &&
        worldX < tile.x + tile.size &&
        worldY >= tile.y &&
        worldY < tile.y + tile.size
      ) {
        return tile;
      }
    }
    return null;
  }

  update(dt) {
    for (const tile of this.tiles) {
      tile.update(dt);
    }
  }

  // Composting: converts zone monster organs into nitrogen fertilizer slurry
  depositCompost(playerInventory) {
    let converted = 0;
    if (playerInventory.mutant_ichor > 0) {
      this.compostVat.slurryAmount += playerInventory.mutant_ichor * 2;
      converted += playerInventory.mutant_ichor;
      playerInventory.mutant_ichor = 0;
    }
    if (playerInventory.calcified_bone > 0) {
      this.compostVat.slurryAmount += playerInventory.calcified_bone * 3;
      converted += playerInventory.calcified_bone;
      playerInventory.calcified_bone = 0;
    }
    if (playerInventory.germplasm_core > 0) {
      this.compostVat.slurryAmount += playerInventory.germplasm_core * 5;
      converted += playerInventory.germplasm_core;
      playerInventory.germplasm_core = 0;
    }
    return converted;
  }

  takeCompostBucket() {
    if (this.compostVat.slurryAmount >= 1) {
      this.compostVat.slurryAmount -= 1;
      return true;
    }
    return false;
  }

  // Apothecary: Craft munitions and medicines
  craftRecipe(recipeId, playerInventory) {
    if (recipeId === 'craft_flares') {
      if (playerInventory.phosphor_pod >= 1) {
        playerInventory.phosphor_pod -= 1;
        playerInventory.flare_slugs = (playerInventory.flare_slugs || 0) + 3;
        return { success: true, message: 'Synthesized 3 Phosphor Flare Slugs!' };
      }
      return { success: false, message: 'Requires 1 Phosphor-Gourd Pod.' };
    }

    if (recipeId === 'craft_kinetic') {
      if (playerInventory.cinnabar_core >= 1) {
        playerInventory.cinnabar_core -= 1;
        playerInventory.kinetic_slugs = (playerInventory.kinetic_slugs || 0) + 5;
        return { success: true, message: 'Forged 5 Heavy Kinetic Slugs!' };
      }
      return { success: false, message: 'Requires 1 Cinnabar Core.' };
    }

    if (recipeId === 'craft_inhaler') {
      if (playerInventory.iron_reed >= 1) {
        playerInventory.iron_reed -= 1;
        playerInventory.inhalers = (playerInventory.inhalers || 0) + 1;
        return { success: true, message: 'Distilled 1 Suture Neuro-Inhaler!' };
      }
      return { success: false, message: 'Requires 1 Iron-Sap Reed.' };
    }

    return { success: false, message: 'Unknown formulation recipe.' };
  }
}

window.CROP_TYPES = CROP_TYPES;
window.HomesteadManager = HomesteadManager;
