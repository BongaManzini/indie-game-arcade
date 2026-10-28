/**
 * Grand Cross: Crucible — Normalized Combat Engine & Arena Simulation
 * Master Systems Implementation per GDD_CORE.md and Zone 44 Forest of Death Expansion (Chunin Exams)
 */

// Master Draft Data Catalog
const DRAFT_DATA = {
  techniques: [
    {
      id: 'tech_01_kunai',
      name: 'Paper Bomb Kunai (Wire Detonation)',
      cost: 1,
      cooldown: 5.0,
      tags: ['Trap', 'Tether', 'Detonation'],
      desc: 'Fires 3 chakra kunai in a spread. Tap again to detonate wire, causing 140 Fire Damage and tethering enemies for 1.2s.'
    },
    {
      id: 'tech_02_substitution',
      name: 'Shadow Substitution (Kawarimi)',
      cost: 2,
      cooldown: 8.0,
      tags: ['Evasion', 'Log Decoy', 'Aggro Shed'],
      desc: 'Active guard window. Upon taking a hit or triggering, vanish in a smoke puff and drop a decoy log, leaping back with 0.6s invulnerability.'
    },
    {
      id: 'tech_03_shadow_possession',
      name: 'Shadow Possession (Kagemane no Jutsu)',
      cost: 3,
      cooldown: 9.0,
      tags: ['Hard CC', 'Shadow Tether', 'Damage Mirror'],
      desc: 'Extends an elastic shadow line up to 300px. Binds the nearest enemy for 3.5s, preventing movement and mirroring all damage inflicted.'
    },
    {
      id: 'tech_03_boogie_woogie',
      name: 'Boogie Woogie (Spatial Swap)',
      cost: 3,
      cooldown: 6.0,
      tags: ['Instant Swap', 'Vector Inversion', 'Poise Break'],
      desc: 'Clap hands to instantly swap positions with the nearest enemy within 340px, disrupting their current attack and staggering them.'
    },
    {
      id: 'tech_04_tsukuyomi',
      name: 'Tsukuyomi (Perception Dilation)',
      cost: 4,
      cooldown: 11.0,
      tags: ['Input Inversion', 'Slow', 'Poise Backlash'],
      desc: 'Locks target within 280px. Inverts enemy directional movement, reduces speed by -65%, and inflicts 40 self-poise backlash on attacks.'
    },
    {
      id: 'tech_04_room',
      name: 'Room / Shambles (Spatial Sphere)',
      cost: 4,
      cooldown: 12.0,
      tags: ['Domain Sphere', 'Blink Dash', 'Vector Cut'],
      desc: 'Projects a 280px spherical domain. Inside, player dashes become instant zero-friction warps and melee hits slice enemies into fragments.'
    },
    {
      id: 'tech_05_flying_thunder_god',
      name: 'Flying Thunder God (Hiraishin Warp)',
      cost: 5,
      cooldown: 7.0,
      tags: ['Map-Wide Teleport', 'Super Armor', 'Shockwave'],
      desc: '0-frame instant teleport behind marked or lowest HP target, delivering a 120 poise damage shockwave with guaranteed super armor arrival.'
    }
  ],
  hands: [
    {
      id: 'hands_01_academy',
      name: 'Academy Taijutsu (Kunai Flurry)',
      cost: 1,
      damage: 26,
      poiseDmg: 22,
      range: 46,
      speed: 0.22,
      tags: ['Rapid 3-Hit', 'Zero Recovery'],
      desc: 'Ultra-fast 3-hit knife jab sequence with 5-frame startup and near-zero recovery frames for rapid repositioning.'
    },
    {
      id: 'hands_01_scrappy',
      name: 'Scrappy Brawler',
      cost: 1,
      damage: 28,
      poiseDmg: 20,
      range: 48,
      speed: 0.28,
      tags: ['Fast 2-Hit', 'Quick Recovery'],
      desc: 'Rapid 2-hit punch chain. Low poise damage per hit, but nearly zero recovery frames allow rapid repositioning.'
    },
    {
      id: 'hands_02_mist_slit',
      name: 'Hidden Mist Silent Throat Slit',
      cost: 2,
      damage: 48,
      poiseDmg: 55,
      range: 52,
      speed: 0.36,
      tags: ['3.5x Ambush Backstab', 'Forced Takedown'],
      desc: 'High-commitment blade strike. Striking from behind or from [Hidden] foliage deals 3.5x damage and 4x poise for an instant takedown.'
    },
    {
      id: 'hands_02_military',
      name: 'Military Muay Thai',
      cost: 2,
      damage: 42,
      poiseDmg: 45,
      range: 52,
      speed: 0.38,
      tags: ['Low Sweep', 'Takedown Pin'],
      desc: 'Heavy leg sweep and elbow strikes. 3rd hit inflicts a ground pin that roots targets for 1.2s.'
    },
    {
      id: 'hands_03_gentle_fist',
      name: 'Gentle Fist (Tenketsu Strike)',
      cost: 3,
      damage: 54,
      poiseDmg: 60,
      range: 50,
      speed: 0.32,
      tags: ['True Armor Pierce', 'Stamina Siphon', 'Cooldown Freeze'],
      desc: 'Punctures internal chakra tenketsu. Completely bypasses armor, siphoning 15% stamina and freezing enemy cooldowns for 2.0s.'
    },
    {
      id: 'hands_03_divergent',
      name: 'Divergent Fist',
      cost: 3,
      damage: 58,
      poiseDmg: 65,
      range: 50,
      speed: 0.42,
      tags: ['Delayed Shockwave', 'Micro-Stagger'],
      desc: 'Punches land with a physical blow followed 0.2s later by a delayed cursed energy shockwave, interrupting enemy startups.'
    },
    {
      id: 'hands_04_dynamic_entry',
      name: 'Dynamic Entry (Strong Fist)',
      cost: 4,
      damage: 82,
      poiseDmg: 95,
      range: 72,
      speed: 0.44,
      tags: ['Flying Dropkick', 'Super Armor', 'Guard Break'],
      desc: 'Might Guy flying jump dropkick at 22 m/s. Super armor startup, breaks physical guard instantly, and launches enemies backward.'
    },
    {
      id: 'hands_04_destructive',
      name: 'Destructive Compass Fist',
      cost: 4,
      damage: 75,
      poiseDmg: 85,
      range: 68,
      speed: 0.45,
      tags: ['360 Shockwave', 'Melee Deflect'],
      desc: 'Omnidirectional shockwave bursts on every punch. Automatically deflects and parries frontal incoming melee attacks.'
    },
    {
      id: 'hands_05_morning_peacock',
      name: 'Eight Gates: Morning Peacock (Asakujaku)',
      cost: 5,
      damage: 110,
      poiseDmg: 130,
      range: 80,
      speed: 0.30,
      tags: ['12-Hit Fire Barrage', 'Uninterruptible', 'True Burn'],
      desc: '6th Gate Guy atmospheric friction barrage. Completely uninterruptible fire shockwaves melting 100% poise with ignition burn.'
    },
    {
      id: 'hands_05_sharingan',
      name: 'Sharingan Hand-to-Hand',
      cost: 5,
      damage: 92,
      poiseDmg: 110,
      range: 58,
      speed: 0.35,
      tags: ['Frame-1 Auto Parry', 'Backstab Teleport'],
      desc: 'Automated 12-frame parry window. When struck during startup, counters instantly behind the aggressor with critical strike damage.'
    }
  ],
  speed: [
    {
      id: 'speed_01_tree_adhesion',
      name: 'Chakra Tree Adhesion & Spring',
      cost: 1,
      baseSpeed: 3.4,
      dashDist: 120,
      friction: 0.86,
      tags: ['Wall Adhesion', '50% Less Stamina'],
      desc: 'Allows vertical branch springs. Sprint-jumping consumes -50% stamina with +20% faster landing recovery.'
    },
    {
      id: 'speed_01_odm',
      name: 'Wire Hooking (Momentum Pivot)',
      cost: 1,
      baseSpeed: 3.2,
      dashDist: 110,
      friction: 0.88,
      tags: ['Wall Pivot', 'Linear Momentum'],
      desc: 'Moderate running pace, but dashes grapple to nearest boundary wall or enemy with accelerated linear velocity.'
    },
    {
      id: 'speed_02_body_flicker',
      name: 'Body Flicker (Shunshin Burst)',
      cost: 2,
      baseSpeed: 4.0,
      dashDist: 160,
      friction: 0.84,
      tags: ['Shunshin Smoke', 'Lock-On Break'],
      desc: 'Shisui high-velocity smoke burst (24 m/s). Instantly breaks enemy lock-on targeting lines and leaves a smoke veil.'
    },
    {
      id: 'speed_02_water_stream',
      name: 'Water Stream Agility',
      cost: 2,
      baseSpeed: 3.8,
      dashDist: 140,
      friction: 0.85,
      tags: ['Decoy Afterimages', 'Target Shed'],
      desc: 'Smooth lateral dash leaving momentary afterimages that absorb 1 targeted attack from enemy AI.'
    },
    {
      id: 'speed_03_wire_slingshot',
      name: 'Puppet Wire Slingshot',
      cost: 3,
      baseSpeed: 4.3,
      dashDist: 180,
      friction: 0.83,
      tags: ['Chakra Grapple', '32 m/s Slingshot'],
      desc: 'Dual retractable chakra filaments accelerating operative up to 32 m/s, converting velocity into +2% bonus kinetic damage.'
    },
    {
      id: 'speed_03_full_cowling',
      name: 'Full Cowling 20%',
      cost: 3,
      baseSpeed: 4.4,
      dashDist: 170,
      friction: 0.84,
      tags: ['Wall Bounce', 'Kinetic Strike Bonus'],
      desc: 'High sprint velocity and boundary bouncing. First strike immediately out of a dash deals +40% bonus kinetic impact.'
    },
    {
      id: 'speed_04_lightning_cloak',
      name: 'Lightning Release Chakra Cloak',
      cost: 4,
      baseSpeed: 5.4,
      dashDist: 220,
      friction: 0.90,
      tags: ['Hyper Velocity', 'Electric Stun Trail'],
      desc: '+120% sprint speed. Directional turns preserve momentum and leave an electrified plasma trail that stuns pursuers for 0.6s.'
    },
    {
      id: 'speed_04_weightless_gates',
      name: 'Weightless Gates (5th Gate)',
      cost: 4,
      baseSpeed: 5.2,
      dashDist: 210,
      friction: 0.92,
      tags: ['Tripled Velocity', 'Hazard Immunity'],
      desc: 'Explosive ground speed. Completely immune to environmental mud friction and ice slip penalties.'
    },
    {
      id: 'speed_05_kamui',
      name: 'Kamui Phase Shifting',
      cost: 5,
      baseSpeed: 5.8,
      dashDist: 250,
      friction: 0.82,
      tags: ['True Intangibility', 'Hazard Bypass'],
      desc: 'Tapping dash phases physical collision into alternate pocket dimension for 1.8s. 100% immune to damage, traps, and hazards.'
    },
    {
      id: 'speed_05_godspeed',
      name: 'Godspeed (Lightning Blink)',
      cost: 5,
      baseSpeed: 6.0,
      dashDist: 260,
      friction: 0.80,
      tags: ['Instant Blink', 'Invulnerability Frames'],
      desc: 'True instant lightning blink replacing standard dash. Has 18 invulnerability frames and electrifies paths traveled.'
    }
  ],
  teammates: [
    {
      id: 'ally_01_pakkun',
      name: 'Tracking Hound (Ninken Pakkun)',
      cost: 1,
      hp: 220,
      ai: 'PAKKUN',
      tags: ['Scroll Radar', 'Wallhack Sensor', 'Trap Detector'],
      desc: 'Scout companion. Passively renders tracking sonar lines through fog to dropped Heaven/Earth scrolls and hidden enemies.'
    },
    {
      id: 'ally_01_meatshield',
      name: 'Cursed Meatshield Tank',
      cost: 1,
      hp: 650,
      ai: 'TANK',
      tags: ['Body Block', 'Aggro Taunt'],
      desc: 'Heavily armored bruiser that stays between you and high-threat enemies, absorbing projectiles and drawing fire.'
    },
    {
      id: 'ally_02_katsuyu',
      name: 'Katsuyu Divisible Slug',
      cost: 2,
      hp: 360,
      ai: 'KATSUYU',
      tags: ['Passive +25 HP Regen', 'Reactive Acid Burst'],
      desc: 'Mounted on shoulder. Passively restores +25 HP every 3.0s. If operative poise is broken, fires a reactive acid jet at attacker.'
    },
    {
      id: 'ally_02_healer',
      name: 'Support Enchanter',
      cost: 2,
      hp: 340,
      ai: 'HEALER',
      tags: ['Aura Pulse', 'Cleanse Debuffs'],
      desc: 'Keeps backline distance. Pulses a 200px green restoration field every 6 seconds healing 60 HP and restoring poise.'
    },
    {
      id: 'ally_03_kikaichu',
      name: 'Aburame Insect Cloud (Kikaichu)',
      cost: 3,
      hp: 420,
      ai: 'KIKAICHU',
      tags: ['Parasitic Swarm', 'Stamina Drain', 'Cooldown Reverse'],
      desc: 'Orbiting swarm in 3m radius. Surges forward to latch onto enemies, dealing 25 DPS, draining stamina, and delaying cooldowns.'
    },
    {
      id: 'ally_03_berserk',
      name: 'Berserk Chainsaw Disruptor',
      cost: 3,
      hp: 480,
      ai: 'BERSERK',
      tags: ['Relentless Pressure', 'Stagger Lock'],
      desc: 'Relentless aggressive fighter that hyper-focuses the lowest HP enemy, forcing them into defensive guard break.'
    },
    {
      id: 'ally_04_raven',
      name: 'Puppet Specialist: Iron Sand Raven',
      cost: 4,
      hp: 520,
      ai: 'RAVEN',
      tags: ['Off-Axis Mirroring', 'Poison Neurotoxin'],
      desc: 'Autonomous mechanoid puppet mirroring strikes from 8m offset, attacking with poisoned scythes that slow targets.'
    },
    {
      id: 'ally_04_clones',
      name: 'Shadow Clone Swarm',
      cost: 4,
      hp: 180,
      ai: 'CLONES',
      tags: ['3 Decoy Clones', 'Synchronized Strikes'],
      desc: 'Spawns 3 fragile decoy clones that mirror player strikes, splitting enemy attention and overwhelming defenses.'
    },
    {
      id: 'ally_05_edo_tensei',
      name: 'Reanimated Shadow Titan (Edo Tensei)',
      cost: 5,
      hp: 1200,
      ai: 'EDO_TENSEI',
      tags: ['Raid Boss Titan', '30 HP/s Regen', 'Indifferent Aggro'],
      desc: 'Tier-apex reanimated warrior with 1200 HP and 30 HP/s regeneration. Attacks indifferently, targeting whichever entity has highest HP!'
    },
    {
      id: 'ally_05_apex',
      name: 'Apex Raid Boss Wildcard',
      cost: 5,
      hp: 950,
      ai: 'WILDCARD',
      tags: ['Hostile to All', 'Volcanic Eruption'],
      desc: 'Spawns an apocalyptic wildcard titan that attacks both teams indifferently, dramatically shifting survival priorities!'
    }
  ]
};

// Battlefields Roster
const SCENARIOS = [
  {
    id: 'zone44',
    name: 'Zone 44 (Forest of Death - Chunin Exams)',
    rule: 'Canopy Ambush & Scrolls: Foliage grants [Hidden] 2.5x poise damage. Guard break enemies to drop Heaven & Earth scrolls!',
    bg: '#0a1209',
    gridColor: 'rgba(75, 140, 50, 0.12)',
    boundaryType: 'FOREST_CANOPY',
    knockbackMult: 1.4,
    friction: 0.88
  },
  {
    id: 'top',
    name: 'Null Realm (Tournament of Power)',
    rule: 'Ring-Out Elimination: 2.5x kinetic knockback. Arena boundaries collapse into void!',
    bg: '#0a0d18',
    gridColor: 'rgba(60, 110, 200, 0.12)',
    boundaryType: 'VOID_RING_OUT',
    knockbackMult: 2.5,
    friction: 0.90
  },
  {
    id: 'jjk',
    name: 'Culling Games Colony (Tokyo No. 1)',
    rule: 'Barrier Alleyways: Tight urban corridors with static barrier walls that ricochet strikes.',
    bg: '#0f120e',
    gridColor: 'rgba(57, 255, 116, 0.10)',
    boundaryType: 'SOLID_WALLS',
    knockbackMult: 1.2,
    friction: 0.88
  },
  {
    id: 'marineford',
    name: 'Marineford Ice Bay',
    rule: 'Sub-Zero Ice Floe: Low friction (skating). Open sea water breaches instantly drown combatants.',
    bg: '#071624',
    gridColor: 'rgba(64, 200, 255, 0.12)',
    boundaryType: 'ICE_WATER_HAZARD',
    knockbackMult: 1.6,
    friction: 0.97
  }
];

// Master Crucible Combat Engine
class CrucibleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.inBattle = false;
    this.audio = window.CrucibleAudio;

    // Default Selected Draft: Authentic Chunin Exam Shinobi Build ($13 / $15)
    this.currentDraft = {
      technique: DRAFT_DATA.techniques[1], // Kawarimi ($2)
      hands: DRAFT_DATA.hands[6],          // Dynamic Entry ($4)
      speed: DRAFT_DATA.speed[2],          // Body Flicker ($2)
      teammate: DRAFT_DATA.teammates[8]    // Edo Tensei ($5) -> Total $13
    };
    this.selectedScenario = SCENARIOS[0]; // Zone 44 Forest of Death

    // Combat Entities & World Objects
    this.player = null;
    this.entities = [];
    this.particles = [];
    this.floatingTexts = [];
    this.activeRoom = null;
    this.kunaiTraps = [];
    this.shadowTethers = [];
    this.scrolls = []; // Dropped scrolls on ground
    this.foliageZones = []; // Canopy ambush circles
    this.unsealingSanctum = null; // Central altar

    // Zone 44 State
    this.playerScrolls = { heaven: false, earth: false };
    this.sanctumTimer = 0;
    this.swampTimer = 0;
    this.serpentActive = false;
    this.ambushStrikes = 0;

    // Match Stats
    this.matchTimer = 180;
    this.killCount = 0;
    this.damageDealt = 0;
    this.ringOuts = 0;

    // Input tracker
    this.keys = {};
    this.mouse = { x: 0, y: 0, down: false };
    this.lastFrameTime = performance.now();
  }

  getBudgetUsed() {
    return (
      (this.currentDraft.technique?.cost || 0) +
      (this.currentDraft.hands?.cost || 0) +
      (this.currentDraft.speed?.cost || 0) +
      (this.currentDraft.teammate?.cost || 0)
    );
  }

  init() {
    this.canvas = document.getElementById('battleCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.bindInputs();
    this.renderDraftUI();
    this.updateSynergyPreview();

    // Start main animation loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    this.canvas.width = container.clientWidth || 900;
    this.canvas.height = container.clientHeight || 560;

    // Recompute foliage zones for Zone 44
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.foliageZones = [
      { x: w * 0.22, y: h * 0.26, radius: 75, name: 'Northwest Canopy' },
      { x: w * 0.78, y: h * 0.26, radius: 75, name: 'Northeast Canopy' },
      { x: w * 0.22, y: h * 0.74, radius: 75, name: 'Southwest Boughs' },
      { x: w * 0.78, y: h * 0.74, radius: 75, name: 'Southeast Boughs' },
      { x: w * 0.50, y: h * 0.50, radius: 55, name: 'Central Altar Boughs' }
    ];
    this.unsealingSanctum = { x: w * 0.50, y: h * 0.50, radius: 65 };
  }

  bindInputs() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ' && this.inBattle) {
        e.preventDefault();
        this.performPlayerDash();
      }
      if ((e.key.toLowerCase() === 'q' || e.key.toLowerCase() === 'r') && this.inBattle) {
        this.triggerPlayerTechnique();
      }
      if (e.key.toLowerCase() === 'e' && this.inBattle) {
        this.triggerTeammateCommand();
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.audio.init();
      if (!this.inBattle) return;
      if (e.button === 0) {
        this.performPlayerAttack();
      } else if (e.button === 2) {
        e.preventDefault();
        this.triggerPlayerTechnique();
      }
    });

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // --- Presets Engine ---
  applyPreset(presetKey) {
    this.audio.init();
    if (presetKey === 'zone44') {
      this.selectedScenario = SCENARIOS[0]; // Zone 44 Forest of Death
      this.currentDraft.technique = DRAFT_DATA.techniques.find((t) => t.id === 'tech_02_substitution');
      this.currentDraft.hands = DRAFT_DATA.hands.find((h) => h.id === 'hands_04_dynamic_entry');
      this.currentDraft.speed = DRAFT_DATA.speed.find((s) => s.id === 'speed_02_body_flicker');
      this.currentDraft.teammate = DRAFT_DATA.teammates.find((m) => m.id === 'ally_05_edo_tensei');
    } else if (presetKey === 'multiverse') {
      this.selectedScenario = SCENARIOS[1]; // Null Realm
      this.currentDraft.technique = DRAFT_DATA.techniques.find((t) => t.id === 'tech_03_boogie_woogie');
      this.currentDraft.hands = DRAFT_DATA.hands.find((h) => h.id === 'hands_03_divergent');
      this.currentDraft.speed = DRAFT_DATA.speed.find((s) => s.id === 'speed_03_full_cowling');
      this.currentDraft.teammate = DRAFT_DATA.teammates.find((m) => m.id === 'ally_03_berserk');
    } else if (presetKey === 'minato') {
      this.selectedScenario = SCENARIOS[0]; // Zone 44
      this.currentDraft.technique = DRAFT_DATA.techniques.find((t) => t.id === 'tech_05_flying_thunder_god');
      this.currentDraft.hands = DRAFT_DATA.hands.find((h) => h.id === 'hands_01_academy');
      this.currentDraft.speed = DRAFT_DATA.speed.find((s) => s.id === 'speed_04_lightning_cloak');
      this.currentDraft.teammate = DRAFT_DATA.teammates.find((m) => m.id === 'ally_04_clones');
    } else if (presetKey === 'taijutsu') {
      this.selectedScenario = SCENARIOS[0]; // Zone 44
      this.currentDraft.technique = DRAFT_DATA.techniques.find((t) => t.id === 'tech_01_kunai');
      this.currentDraft.hands = DRAFT_DATA.hands.find((h) => h.id === 'hands_05_morning_peacock');
      this.currentDraft.speed = DRAFT_DATA.speed.find((s) => s.id === 'speed_04_weightless_gates');
      this.currentDraft.teammate = DRAFT_DATA.teammates.find((m) => m.id === 'ally_02_katsuyu');
    }

    document.querySelectorAll('.btn-preset').forEach((btn) => {
      btn.classList.toggle('active', btn.id === `preset-${presetKey}`);
    });

    this.renderDraftUI();
    this.updateSynergyPreview();
    this.audio.playPunch(2);
  }

  // --- Draft UI ---
  renderDraftUI() {
    this.renderSocketList('tech-list', DRAFT_DATA.techniques, 'technique');
    this.renderSocketList('hands-list', DRAFT_DATA.hands, 'hands');
    this.renderSocketList('speed-list', DRAFT_DATA.speed, 'speed');
    this.renderSocketList('teammate-list', DRAFT_DATA.teammates, 'teammate');

    this.renderScenarioList();
    this.updateBudgetDisplay();
  }

  renderSocketList(containerId, items, socketKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item) => {
      const isSelected = this.currentDraft[socketKey]?.id === item.id;
      const card = document.createElement('div');
      card.className = `draft-item ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <div class="draft-header">
          <span class="draft-name">${item.name}</span>
          <span class="draft-cost">$${item.cost}</span>
        </div>
        <div class="draft-tags">
          ${item.tags.map((t) => `<span class="badge">${t}</span>`).join('')}
        </div>
        <p class="draft-desc">${item.desc}</p>
      `;

      card.onclick = () => {
        this.audio.init();
        const testBudget = this.getBudgetUsed() - (this.currentDraft[socketKey]?.cost || 0) + item.cost;
        if (testBudget > 15) {
          this.flashBudgetWarning();
          return;
        }
        this.currentDraft[socketKey] = item;
        this.renderSocketList(containerId, items, socketKey);
        this.updateBudgetDisplay();
        this.updateSynergyPreview();
        this.audio.playPunch(1);
      };

      container.appendChild(card);
    });
  }

  renderScenarioList() {
    const container = document.getElementById('scenario-selector');
    if (!container) return;
    container.innerHTML = '';

    SCENARIOS.forEach((sc) => {
      const isSelected = this.selectedScenario.id === sc.id;
      const btn = document.createElement('div');
      btn.className = `scenario-pill ${isSelected ? 'active' : ''}`;
      btn.innerHTML = `<strong>${sc.name}</strong><br><small>${sc.rule}</small>`;
      btn.onclick = () => {
        this.selectedScenario = sc;
        this.renderScenarioList();
        this.audio.playPunch(2);
      };
      container.appendChild(btn);
    });
  }

  updateBudgetDisplay() {
    const budget = this.getBudgetUsed();
    const remaining = 15 - budget;
    const disp = document.getElementById('budget-display');
    const remDisp = document.getElementById('budget-remaining');
    const startBtn = document.getElementById('btn-start-battle');

    if (disp) disp.innerText = `$${budget} / $15`;
    if (remDisp) {
      remDisp.innerText = `Remaining: $${remaining}`;
      remDisp.style.color = remaining < 0 ? '#ff3344' : '#39ff74';
    }

    if (startBtn) {
      startBtn.disabled = budget > 15;
    }
  }

  flashBudgetWarning() {
    const disp = document.getElementById('budget-display');
    if (!disp) return;
    disp.style.animation = 'flashRed 0.3s ease';
    setTimeout(() => {
      disp.style.animation = '';
    }, 350);
  }

  updateSynergyPreview() {
    const preview = document.getElementById('synergy-preview');
    if (!preview) return;

    const tech = this.currentDraft.technique;
    const hands = this.currentDraft.hands;
    const speed = this.currentDraft.speed;
    const ally = this.currentDraft.teammate;

    let synergyName = 'Custom Normalized Loadout';
    let synergyDesc = 'Standard balanced engagement profile across kinetic and trait matrices.';

    if (tech?.id.includes('flying_thunder_god') && hands?.id.includes('sharingan')) {
      synergyName = 'Synergy: Yellow Flash Teleport Execution';
      synergyDesc = 'Hiraishin teleports directly into auto-parrying backstab frames, triggering instant poise shatters.';
    } else if (tech?.id.includes('shadow_possession') && hands?.id.includes('dynamic_entry')) {
      synergyName = 'Synergy: Nara Shadow Trap Dropkick';
      synergyDesc = 'Lock enemy movement with Kagemane no Jutsu, then land guaranteed Dynamic Entry with 100% mirrored strike damage!';
    } else if (tech?.id.includes('substitution') && ally?.id.includes('edo_tensei')) {
      synergyName = 'Synergy: Chunin Exam Immortal Anchor';
      synergyDesc = 'Shed boss aggro via Kawarimi smoke logs while the 1200 HP Edo Tensei titan draws all lethal crossfire!';
    } else if (tech?.id.includes('boogie') && speed?.id.includes('full_cowling')) {
      synergyName = 'Synergy: Pinball Ring-Out Swap';
      synergyDesc = 'Full sprint towards the arena void, then trigger Boogie Woogie to swap the enemy boss off the ledge.';
    }

    preview.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--accent-green); margin-bottom: 4px;">
        ${synergyName}
      </div>
      <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">
        ${synergyDesc}
      </div>
    `;
  }

  // --- Battle Transition ---
  startBattle() {
    if (this.getBudgetUsed() > 15) {
      this.flashBudgetWarning();
      return;
    }
    this.audio.init();
    this.inBattle = true;
    this.matchTimer = 180;
    this.killCount = 0;
    this.damageDealt = 0;
    this.ringOuts = 0;
    this.ambushStrikes = 0;
    this.playerScrolls = { heaven: false, earth: false };
    this.sanctumTimer = 0;
    this.swampTimer = 0;
    this.serpentActive = false;
    this.scrolls = [];
    this.shadowTethers = [];
    this.kunaiTraps = [];
    this.particles = [];
    this.floatingTexts = [];

    document.getElementById('draft-view').style.display = 'none';
    document.getElementById('battle-view').style.display = 'flex';
    document.getElementById('post-match-view').style.display = 'none';

    this.setupArenaEntities();
    this.updateScrollHUD();
    this.audio.playExplosion();
  }

  returnToDraft() {
    this.inBattle = false;
    document.getElementById('battle-view').style.display = 'none';
    document.getElementById('post-match-view').style.display = 'none';
    document.getElementById('draft-view').style.display = 'block';
  }

  setupArenaEntities() {
    this.entities = [];
    const w = this.canvas.width;
    const h = this.canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Spawn Player Operative
    this.player = {
      isPlayer: true,
      team: 1,
      x: cx - 220,
      y: cy,
      vx: 0,
      vy: 0,
      radius: 18,
      color: '#39ff74',
      name: 'OPERATIVE (YOU)',
      hp: 500,
      maxHp: 500,
      poise: 250,
      maxPoise: 250,
      stamina: 100,
      maxStamina: 100,
      facing: 0,
      cooldownTech: 0,
      cooldownAttack: 0,
      cooldownDash: 0,
      iframeTimer: 0,
      isStunned: false,
      stunTimer: 0,
      hasSuperArmor: false,
      isHidden: false,
      isKamuiPhased: false,
      kamuiTimer: 0,
      katsuyuHealTimer: 3.0,
      draft: this.currentDraft
    };
    this.entities.push(this.player);

    // Spawn Teammate
    const allyDraft = this.currentDraft.teammate;
    if (allyDraft.ai === 'CLONES') {
      for (let i = 0; i < 3; i++) {
        this.entities.push(this.createClone(this.player.x, this.player.y + (i - 1) * 35));
      }
    } else {
      this.entities.push(this.createTeammate(allyDraft, this.player.x - 40, this.player.y - 40));
    }

    // Spawn Opposing Shinobi Squad (Carrying Heaven & Earth Scrolls)
    this.spawnEnemySquad(cx + 200, cy);
  }

  createTeammate(draft, x, y) {
    const isEdo = draft.ai === 'EDO_TENSEI';
    return {
      isTeammate: true,
      team: isEdo ? 3 : 1, // Edo Tensei attacks indifferently (Team 3)
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      radius: isEdo ? 24 : 16,
      color: isEdo ? '#a855f7' : '#40c8ff',
      name: draft.name,
      hp: draft.hp,
      maxHp: draft.hp,
      poise: isEdo ? 450 : 180,
      maxPoise: isEdo ? 450 : 180,
      facing: 0,
      aiType: draft.ai,
      healCooldown: 6.0,
      cooldownAttack: 0,
      isStunned: false,
      stunTimer: 0,
      regenRate: isEdo ? 30 : 0
    };
  }

  createClone(x, y) {
    return {
      isTeammate: true,
      isClone: true,
      team: 1,
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      radius: 14,
      color: 'rgba(57, 255, 116, 0.65)',
      name: 'SHADOW CLONE',
      hp: 90,
      maxHp: 90,
      poise: 50,
      maxPoise: 50,
      facing: 0,
      aiType: 'CLONE',
      cooldownAttack: 0,
      isStunned: false,
      stunTimer: 0
    };
  }

  spawnEnemySquad(cx, cy) {
    // Enemy Boss carries Earth Scroll
    const boss = {
      isEnemy: true,
      isBoss: true,
      team: 2,
      x: cx,
      y: cy,
      vx: 0,
      vy: 0,
      radius: 22,
      color: '#ff3344',
      name: 'CHUNIN OVERLORD',
      hp: 680,
      maxHp: 680,
      poise: 320,
      maxPoise: 320,
      facing: Math.PI,
      cooldownAttack: 0,
      cooldownSpecial: 6.5,
      isStunned: false,
      stunTimer: 0,
      damage: 46,
      carriesScroll: 'EARTH',
      scrollDropped: false
    };
    this.entities.push(boss);

    // Elite Vanguard carries Heaven Scroll
    const minion1 = {
      isEnemy: true,
      team: 2,
      x: cx + 45,
      y: cy - 75,
      vx: 0,
      vy: 0,
      radius: 17,
      color: '#ff6633',
      name: 'FOLIAGE STALKER',
      hp: 360,
      maxHp: 360,
      poise: 170,
      maxPoise: 170,
      facing: Math.PI,
      cooldownAttack: 0,
      isStunned: false,
      stunTimer: 0,
      damage: 32,
      carriesScroll: 'HEAVEN',
      scrollDropped: false
    };
    this.entities.push(minion1);

    // Tactical Infiltrator
    const minion2 = {
      isEnemy: true,
      team: 2,
      x: cx + 45,
      y: cy + 75,
      vx: 0,
      vy: 0,
      radius: 16,
      color: '#ff9900',
      name: 'MIST INFILTRATOR',
      hp: 320,
      maxHp: 320,
      poise: 140,
      maxPoise: 140,
      facing: Math.PI,
      cooldownAttack: 0,
      isStunned: false,
      stunTimer: 0,
      damage: 28,
      carriesScroll: null,
      scrollDropped: true
    };
    this.entities.push(minion2);
  }

  // --- Combat Actions ---
  performPlayerAttack() {
    if (this.player.isStunned || this.player.cooldownAttack > 0) return;
    const hands = this.player.draft.hands;
    this.player.cooldownAttack = hands.speed;

    const angle = Math.atan2(this.mouse.y - this.player.y, this.mouse.x - this.player.x);
    this.player.facing = angle;

    let hitAny = false;
    const isAmbush = this.player.isHidden;

    this.entities.forEach((ent) => {
      if (ent.team !== this.player.team && ent.hp > 0) {
        const dx = ent.x - this.player.x;
        const dy = ent.y - this.player.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= hands.range + ent.radius) {
          const hitAngle = Math.atan2(dy, dx);
          const angleDiff = Math.abs(this.normalizeAngle(hitAngle - angle));

          if (angleDiff < 1.15) {
            hitAny = true;
            let dmg = hands.damage;
            let poiseDmg = hands.poiseDmg;

            // Hidden foliage ambush multiplier: +150% poise damage (2.5x)
            if (isAmbush) {
              poiseDmg *= 2.5;
              dmg *= 1.25;
              this.ambushStrikes++;
              this.addFloatingText(ent.x, ent.y - 25, 'AMBUSH STRIKE! (2.5x POISE)', '#39ff74');
              this.player.isHidden = false;
            }

            // Silent Throat Slit rear backstab check
            if (hands.id.includes('mist_slit')) {
              const rearAngle = Math.abs(this.normalizeAngle(ent.facing - hitAngle));
              if (rearAngle < 1.0 || isAmbush) {
                dmg *= 3.0;
                poiseDmg *= 3.5;
                this.addFloatingText(ent.x, ent.y - 35, 'REAR THROAT SLIT! CRITICAL', '#ff3344');
              }
            }

            // Gentle Fist tenketsu internal strike
            if (hands.id.includes('gentle_fist')) {
              ent.cooldownAttack = Math.max(ent.cooldownAttack, 1.8);
              this.addFloatingText(ent.x, ent.y - 20, 'TENKETSU SEALED', '#40c8ff');
            }

            // Dynamic Entry super armor dropkick knockback
            const knockback = hands.id.includes('dynamic_entry') ? 14.0 : 4.5;

            this.dealDamage(this.player, ent, dmg, poiseDmg, knockback);

            // Morning Peacock flame shockwaves
            if (hands.id.includes('morning_peacock')) {
              this.createShockwave(ent.x, ent.y, 70, '#ffaa00');
              this.audio.playExplosion();
            }

            // Divergent Fist delayed shockwave
            if (hands.id.includes('divergent')) {
              setTimeout(() => {
                if (ent.hp > 0 && this.inBattle) {
                  this.dealDamage(this.player, ent, 28, 45, 3.0);
                  this.addFloatingText(ent.x, ent.y - 15, 'DIVERGENT BURST', '#39ff74');
                  this.audio.playExplosion();
                }
              }, 200);
            }
          }
        }
      }
    });

    if (hitAny) {
      this.audio.playPunch(hands.cost);
      this.createSlashEffect(this.player.x, this.player.y, angle, hands.range, '#39ff74');
    } else {
      this.audio.playDash();
    }
  }

  performPlayerDash() {
    if (this.player.isStunned || this.player.cooldownDash > 0 || this.player.stamina < 15) return;
    const speed = this.player.draft.speed;
    const cost = speed.id.includes('tree_adhesion') ? 10 : 20;
    this.player.stamina -= cost;
    this.player.cooldownDash = 0.85;

    // Kamui Phase Invulnerability
    if (speed.id.includes('kamui')) {
      this.player.isKamuiPhased = true;
      this.player.kamuiTimer = 1.8;
      this.player.iframeTimer = 1.8;
      this.addFloatingText(this.player.x, this.player.y - 20, 'KAMUI PHASE SHIFT', '#c084fc');
      this.audio.playTeleport();
    } else {
      this.player.iframeTimer = 0.38;
    }

    let dirX = 0;
    let dirY = 0;
    if (this.keys['w'] || this.keys['arrowup']) dirY -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) dirY += 1;
    if (this.keys['a'] || this.keys['arrowleft']) dirX -= 1;
    if (this.keys['d'] || this.keys['arrowright']) dirX += 1;

    let angle = dirX !== 0 || dirY !== 0 ? Math.atan2(dirY, dirX) : this.player.facing;
    const impulse = speed.dashDist * 0.125;

    this.player.vx += Math.cos(angle) * impulse;
    this.player.vy += Math.sin(angle) * impulse;

    // Body Flicker smoke burst sheds AI targeting
    if (speed.id.includes('body_flicker')) {
      this.createSmokePuff(this.player.x, this.player.y);
      this.addFloatingText(this.player.x, this.player.y - 15, 'SHUNSHIN FLICKER', '#94a3b8');
    } else {
      this.addFloatingText(this.player.x, this.player.y - 15, 'DASH', '#39ff74');
    }
    this.audio.playDash();
  }

  triggerPlayerTechnique() {
    if (this.player.isStunned || this.player.cooldownTech > 0) return;
    const tech = this.player.draft.technique;

    // 1. Kagemane no Jutsu (Shadow Possession)
    if (tech.id.includes('shadow_possession')) {
      let target = this.getNearestEnemy(320);
      if (target) {
        this.player.cooldownTech = tech.cooldown;
        this.shadowTethers.push({
          source: this.player,
          target: target,
          timer: 3.5
        });
        target.isStunned = true;
        target.stunTimer = 3.5;
        this.addFloatingText(this.player.x, this.player.y - 20, 'KAGEMANE BOUND!', '#1e293b');
        this.addFloatingText(target.x, target.y - 20, 'SHADOW PARALYSIS!', '#1e293b');
        this.audio.playTeleport();
      }
    }
    // 2. Kawarimi (Shadow Substitution Log)
    else if (tech.id.includes('substitution')) {
      this.player.cooldownTech = tech.cooldown;
      const oldX = this.player.x;
      const oldY = this.player.y;
      this.player.x -= Math.cos(this.player.facing) * 95;
      this.player.y -= Math.sin(this.player.facing) * 95;
      this.player.iframeTimer = 0.7;

      // Drop decoy log
      this.createSmokePuff(oldX, oldY);
      this.addFloatingText(oldX, oldY, 'LOG DECOY', '#d97706');
      this.addFloatingText(this.player.x, this.player.y - 20, 'KAWARIMI ESCAPE', '#39ff74');
      this.audio.playTeleport();
    }
    // 3. Tsukuyomi (Perception Dilation)
    else if (tech.id.includes('tsukuyomi')) {
      let target = this.getNearestEnemy(300);
      if (target) {
        this.player.cooldownTech = tech.cooldown;
        target.vx *= -1.5;
        target.vy *= -1.5;
        target.isStunned = true;
        target.stunTimer = 2.0;
        target.poise = Math.max(0, target.poise - 80);
        this.addFloatingText(this.player.x, this.player.y - 20, 'TSUKUYOMI SIGHT', '#dc2626');
        this.addFloatingText(target.x, target.y - 20, 'PERCEPTION INVERTED!', '#ef4444');
        this.createShockwave(target.x, target.y, 80, '#ef4444');
        this.audio.playGuardBreak();
      }
    }
    // 4. Flying Thunder God (Hiraishin)
    else if (tech.id.includes('flying_thunder_god')) {
      let target = null;
      let minHp = 99999;
      this.entities.forEach((ent) => {
        if (ent.team !== this.player.team && ent.hp > 0) {
          if (ent.hp < minHp) {
            minHp = ent.hp;
            target = ent;
          }
        }
      });
      if (target) {
        this.player.cooldownTech = tech.cooldown;
        this.player.x = target.x - Math.cos(target.facing) * 35;
        this.player.y = target.y - Math.sin(target.facing) * 35;
        this.dealDamage(this.player, target, 95, 140, 6.0);
        this.addFloatingText(this.player.x, this.player.y - 20, 'HIRAISHIN SLICE!', '#ffea00');
        this.createShockwave(this.player.x, this.player.y, 65, '#ffea00');
        this.audio.playTeleport();
      }
    }
    // 5. Boogie Woogie
    else if (tech.id.includes('boogie')) {
      let nearest = this.getNearestEnemy(340);
      if (nearest) {
        this.player.cooldownTech = tech.cooldown;
        const px = this.player.x;
        const py = this.player.y;
        this.player.x = nearest.x;
        this.player.y = nearest.y;
        nearest.x = px;
        nearest.y = py;
        nearest.poise = Math.max(0, nearest.poise - 90);
        nearest.isStunned = true;
        nearest.stunTimer = 1.0;
        this.addFloatingText(this.player.x, this.player.y - 20, 'BOOGIE WOOGIE!', '#40c8ff');
        this.createShockwave(this.player.x, this.player.y, 45, '#40c8ff');
        this.createShockwave(nearest.x, nearest.y, 45, '#40c8ff');
        this.audio.playTeleport();
      }
    }
    // 6. Paper Bomb Kunai
    else if (tech.id.includes('kunai')) {
      this.player.cooldownTech = tech.cooldown;
      const angle = Math.atan2(this.mouse.y - this.player.y, this.mouse.x - this.player.x);
      for (let i = -1; i <= 1; i++) {
        const spread = angle + i * 0.22;
        this.kunaiTraps.push({
          x: this.player.x,
          y: this.player.y,
          vx: Math.cos(spread) * 9.5,
          vy: Math.sin(spread) * 9.5,
          lifetime: 3.5
        });
      }
      this.addFloatingText(this.player.x, this.player.y - 20, 'KUNAI WIRES DEPLOYED', '#ff6633');
      this.audio.playPunch(2);
    }
    // 7. Room / Shambles
    else if (tech.id.includes('room')) {
      this.player.cooldownTech = tech.cooldown;
      this.activeRoom = {
        x: this.player.x,
        y: this.player.y,
        radius: 175,
        timer: 8.0
      };
      this.addFloatingText(this.player.x, this.player.y - 20, 'ROOM: SHAMBLES', '#40c8ff');
      this.createShockwave(this.player.x, this.player.y, 175, '#40c8ff');
      this.audio.playTeleport();
    }
  }

  getNearestEnemy(maxDist = 9999) {
    let nearest = null;
    let minDist = maxDist;
    this.entities.forEach((ent) => {
      if (ent.team !== this.player.team && ent.hp > 0) {
        const d = Math.hypot(ent.x - this.player.x, ent.y - this.player.y);
        if (d < minDist) {
          minDist = d;
          nearest = ent;
        }
      }
    });
    return nearest;
  }

  triggerTeammateCommand() {
    this.entities.forEach((ent) => {
      if (ent.isTeammate && ent.hp > 0) {
        ent.vx += Math.cos(this.player.facing) * 7.5;
        ent.vy += Math.sin(this.player.facing) * 7.5;
        this.addFloatingText(ent.x, ent.y - 15, 'ASSIST RUSH', '#40c8ff');
      }
    });
  }

  // --- Damage Resolution & Scroll Drops ---
  dealDamage(attacker, victim, damage, poiseDmg, knockbackImpulse) {
    if (victim.iframeTimer > 0) return;

    victim.hp = Math.max(0, victim.hp - damage);
    victim.poise = Math.max(0, victim.poise - poiseDmg);

    if (attacker === this.player) {
      this.damageDealt += damage;
    }

    // Mirror damage across shadow tethers (Kagemane no Jutsu)
    this.shadowTethers.forEach((teth) => {
      if (teth.target === victim && teth.source === this.player) {
        // Mirrored true strike
        this.addFloatingText(victim.x, victim.y - 25, 'MIRRORED HIT', '#a855f7');
      }
    });

    // Knockback
    const angle = Math.atan2(victim.y - attacker.y, victim.x - attacker.x);
    const kb = knockbackImpulse * (this.selectedScenario.knockbackMult || 1.0);
    victim.vx += Math.cos(angle) * kb;
    victim.vy += Math.sin(angle) * kb;

    // Check Forced Scroll Drop upon Guard Break
    if (victim.poise <= 0) {
      this.checkScrollDrop(victim, 'GUARD BREAK');
      if (!victim.isStunned) {
        victim.isStunned = true;
        victim.stunTimer = 1.4;
        this.addFloatingText(victim.x, victim.y - 25, 'GUARD BREAK!', '#ffea00');
        this.audio.playGuardBreak();

        // Katsuyu reactive counter if player was broken
        if (victim === this.player && this.player.draft.teammate?.id.includes('katsuyu')) {
          this.triggerKatsuyuCounter(attacker);
        }
      }
    } else {
      this.addFloatingText(victim.x, victim.y - 15, `-${Math.round(damage)}`, victim.team === 1 ? '#ff3344' : '#ffffff');
    }

    // Defeat check
    if (victim.hp <= 0) {
      this.checkScrollDrop(victim, 'DEFEATED');
      this.onEntityDefeated(victim);
    }
  }

  checkScrollDrop(victim, reason) {
    if (victim.carriesScroll && !victim.scrollDropped) {
      victim.scrollDropped = true;
      const scrollType = victim.carriesScroll;
      this.scrolls.push({
        type: scrollType,
        x: victim.x,
        y: victim.y,
        radius: 18,
        color: scrollType === 'HEAVEN' ? '#40c8ff' : '#ffaa00'
      });
      this.addFloatingText(victim.x, victim.y - 30, `${scrollType} SCROLL DROPPED!`, '#ffea00');
      this.audio.playTeleport();
    }
  }

  triggerKatsuyuCounter(attacker) {
    if (!attacker) return;
    this.dealDamage(this.player, attacker, 45, 60, 3.0);
    this.addFloatingText(attacker.x, attacker.y - 20, 'KATSUYU ACID COUNTER!', '#10b981');
    this.createShockwave(attacker.x, attacker.y, 40, '#10b981');
  }

  onEntityDefeated(victim) {
    if (victim.team !== 1) {
      this.killCount++;
    }
    this.createExplosionEffect(victim.x, victim.y, victim.color);
    this.audio.playExplosion();

    // Check victory condition
    const livingEnemies = this.entities.filter((e) => e.team === 2 && e.hp > 0);
    if (livingEnemies.length === 0) {
      setTimeout(() => this.endMatch(true), 600);
    }
  }

  updateScrollHUD() {
    const hDisp = document.getElementById('hud-scroll-heaven');
    const eDisp = document.getElementById('hud-scroll-earth');
    const sTag = document.getElementById('hud-stealth-tag');

    if (hDisp) {
      hDisp.innerText = this.playerScrolls.heaven ? 'HEAVEN: SECURED' : 'HEAVEN: LOCKED';
      hDisp.style.background = this.playerScrolls.heaven ? 'rgba(64, 200, 255, 0.25)' : 'rgba(64, 200, 255, 0.1)';
      hDisp.style.borderColor = this.playerScrolls.heaven ? '#40c8ff' : 'rgba(64, 200, 255, 0.3)';
    }
    if (eDisp) {
      eDisp.innerText = this.playerScrolls.earth ? 'EARTH: SECURED' : 'EARTH: LOCKED';
      eDisp.style.background = this.playerScrolls.earth ? 'rgba(255, 170, 0, 0.25)' : 'rgba(255, 170, 0, 0.1)';
      eDisp.style.borderColor = this.playerScrolls.earth ? '#ffaa00' : 'rgba(255, 170, 0, 0.3)';
    }
    if (sTag && this.player) {
      if (this.player.isHidden) {
        sTag.innerText = 'STEALTH: [HIDDEN] 2.5x POISE';
        sTag.style.color = '#39ff74';
        sTag.style.borderColor = '#39ff74';
      } else {
        sTag.innerText = 'STEALTH: REVEALED';
        sTag.style.color = '#a1a1aa';
        sTag.style.borderColor = '#28344e';
      }
    }
  }

  // --- Main Engine Loop ---
  gameLoop(timestamp) {
    const dt = Math.min((timestamp - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = timestamp;

    if (this.inBattle) {
      this.updatePhysics(dt);
      this.updateAI(dt);
      this.updateFoliageAndScrolls(dt);
      this.updateHUD();
      this.renderCanvas();
    }

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  updatePhysics(dt) {
    this.matchTimer -= dt;
    if (this.matchTimer <= 0) {
      this.endMatch(false);
      return;
    }

    const w = this.canvas.width;
    const h = this.canvas.height;
    const friction = this.selectedScenario.friction || 0.88;

    // Player Movement Input
    if (this.player && this.player.hp > 0 && !this.player.isStunned) {
      const speed = this.player.draft.speed;
      let moveSpeed = speed.baseSpeed;

      // Swamp mud penalty
      if (this.selectedScenario.id === 'zone44' && this.player.y > h - 85) {
        moveSpeed *= 0.6;
      }

      let mx = 0;
      let my = 0;
      if (this.keys['w'] || this.keys['arrowup']) my -= 1;
      if (this.keys['s'] || this.keys['arrowdown']) my += 1;
      if (this.keys['a'] || this.keys['arrowleft']) mx -= 1;
      if (this.keys['d'] || this.keys['arrowright']) mx += 1;

      if (mx !== 0 || my !== 0) {
        const len = Math.hypot(mx, my);
        this.player.vx += (mx / len) * moveSpeed * 0.9;
        this.player.vy += (my / len) * moveSpeed * 0.9;
      }

      // Face mouse
      this.player.facing = Math.atan2(this.mouse.y - this.player.y, this.mouse.x - this.player.x);

      // Stamina & Poise Regeneration
      this.player.stamina = Math.min(this.player.maxStamina, this.player.stamina + 22 * dt);
      if (this.player.poise < this.player.maxPoise && !this.player.isStunned) {
        this.player.poise = Math.min(this.player.maxPoise, this.player.poise + 28 * dt);
      }

      // Katsuyu Slug passive regeneration
      if (this.player.draft.teammate?.id.includes('katsuyu')) {
        this.player.katsuyuHealTimer -= dt;
        if (this.player.katsuyuHealTimer <= 0) {
          this.player.katsuyuHealTimer = 3.0;
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + 25);
          this.addFloatingText(this.player.x, this.player.y - 15, '+25 HP', '#10b981');
        }
      }

      // Kamui Timer
      if (this.player.isKamuiPhased) {
        this.player.kamuiTimer -= dt;
        if (this.player.kamuiTimer <= 0) {
          this.player.isKamuiPhased = false;
        }
      }

      // Cooldown decrements
      if (this.player.cooldownAttack > 0) this.player.cooldownAttack -= dt;
      if (this.player.cooldownDash > 0) this.player.cooldownDash -= dt;
      if (this.player.cooldownTech > 0) this.player.cooldownTech -= dt;
      if (this.player.iframeTimer > 0) this.player.iframeTimer -= dt;
    }

    // Entity Physics Updates
    this.entities.forEach((ent) => {
      if (ent.hp <= 0) return;

      ent.x += ent.vx;
      ent.y += ent.vy;
      ent.vx *= friction;
      ent.vy *= friction;

      if (ent.iframeTimer > 0) ent.iframeTimer -= dt;
      if (ent.cooldownAttack > 0) ent.cooldownAttack -= dt;

      // Stun recovery
      if (ent.isStunned) {
        ent.stunTimer -= dt;
        if (ent.stunTimer <= 0) {
          ent.isStunned = false;
          ent.poise = ent.maxPoise * 0.65;
        }
      }

      // Edo Tensei Titan passive regeneration
      if (ent.regenRate && ent.hp < ent.maxHp) {
        ent.hp = Math.min(ent.maxHp, ent.hp + ent.regenRate * dt);
      }

      // Boundary Collisions per Scenario
      if (this.selectedScenario.boundaryType === 'VOID_RING_OUT') {
        const cx = w / 2;
        const cy = h / 2;
        const distFromCenter = Math.hypot(ent.x - cx, ent.y - cy);
        if (distFromCenter > 380) {
          this.onRingOut(ent);
        }
      } else {
        // Solid wall bounce
        if (ent.x - ent.radius < 20) {
          ent.x = 20 + ent.radius;
          ent.vx = -ent.vx * 0.7;
        }
        if (ent.x + ent.radius > w - 20) {
          ent.x = w - 20 - ent.radius;
          ent.vx = -ent.vx * 0.7;
        }
        if (ent.y - ent.radius < 20) {
          ent.y = 20 + ent.radius;
          ent.vy = -ent.vy * 0.7;
        }
        if (ent.y + ent.radius > h - 20) {
          ent.y = h - 20 - ent.radius;
          ent.vy = -ent.vy * 0.7;
        }
      }
    });

    // Update Shadow Tethers (Kagemane)
    for (let i = this.shadowTethers.length - 1; i >= 0; i--) {
      const teth = this.shadowTethers[i];
      teth.timer -= dt;
      if (teth.timer <= 0 || teth.target.hp <= 0 || !this.inBattle) {
        if (teth.target) teth.target.isStunned = false;
        this.shadowTethers.splice(i, 1);
      }
    }

    // Update Kunai Traps
    for (let i = this.kunaiTraps.length - 1; i >= 0; i--) {
      const k = this.kunaiTraps[i];
      k.x += k.vx;
      k.y += k.vy;
      k.vx *= 0.96;
      k.vy *= 0.96;
      k.lifetime -= dt;

      // Trap trigger check
      this.entities.forEach((ent) => {
        if (ent.team !== 1 && ent.hp > 0 && Math.hypot(ent.x - k.x, ent.y - k.y) < ent.radius + 14) {
          this.dealDamage(this.player, ent, 140, 75, 4.0);
          this.createShockwave(k.x, k.y, 45, '#ff6633');
          k.lifetime = 0;
        }
      });

      if (k.lifetime <= 0) {
        this.kunaiTraps.splice(i, 1);
      }
    }

    // Update Floating Text & Particles
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 18 * dt;
      ft.alpha -= 0.85 * dt;
      if (ft.alpha <= 0) this.floatingTexts.splice(i, 1);
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= dt * 1.5;
      if (p.alpha <= 0) this.particles.splice(i, 1);
    }
  }

  updateAI(dt) {
    this.entities.forEach((ent) => {
      if (ent.isPlayer || ent.hp <= 0 || ent.isStunned) return;

      // Select Target
      let target = null;
      if (ent.team === 2) {
        target = this.player; // Enemies attack player
      } else if (ent.team === 1) {
        // Teammate attacks living enemy
        target = this.getNearestEnemyTo(ent.x, ent.y, 2);
      } else if (ent.team === 3) {
        // Edo Tensei Titan attacks highest HP entity on board indifferently
        target = this.getHighestHpEntity();
      }

      if (!target || target.hp <= 0) return;

      const dx = target.x - ent.x;
      const dy = target.y - ent.y;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      ent.facing = angle;

      // AI Motor
      const baseSpd = ent.isBoss ? 2.6 : 3.0;
      if (dist > 45) {
        ent.vx += Math.cos(angle) * baseSpd * 0.18;
        ent.vy += Math.sin(angle) * baseSpd * 0.18;
      }

      // Attack
      if (dist <= 65 && ent.cooldownAttack <= 0) {
        ent.cooldownAttack = ent.isBoss ? 1.4 : 1.1;
        const dmg = ent.damage || 25;
        this.dealDamage(ent, target, dmg, 35, 4.0);
        this.audio.playPunch(2);
      }
    });
  }

  getNearestEnemyTo(x, y, targetTeam) {
    let nearest = null;
    let minDist = 99999;
    this.entities.forEach((ent) => {
      if (ent.team === targetTeam && ent.hp > 0) {
        const d = Math.hypot(ent.x - x, ent.y - y);
        if (d < minDist) {
          minDist = d;
          nearest = ent;
        }
      }
    });
    return nearest;
  }

  getHighestHpEntity() {
    let highest = null;
    let maxHp = -1;
    this.entities.forEach((ent) => {
      if (ent.hp > 0 && ent.aiType !== 'EDO_TENSEI') {
        if (ent.hp > maxHp) {
          maxHp = ent.hp;
          highest = ent;
        }
      }
    });
    return highest;
  }

  updateFoliageAndScrolls(dt) {
    if (!this.player || this.player.hp <= 0) return;

    // Check Foliage Ambush Zones (Zone 44)
    if (this.selectedScenario.id === 'zone44') {
      let inAnyFoliage = false;
      this.foliageZones.forEach((fz) => {
        const d = Math.hypot(this.player.x - fz.x, this.player.y - fz.y);
        if (d <= fz.radius) {
          inAnyFoliage = true;
        }
      });
      this.player.isHidden = inAnyFoliage;

      // Check Central Unsealing Sanctum Extraction
      if (this.playerScrolls.heaven && this.playerScrolls.earth && this.unsealingSanctum) {
        const dCenter = Math.hypot(this.player.x - this.unsealingSanctum.x, this.player.y - this.unsealingSanctum.y);
        if (dCenter <= this.unsealingSanctum.radius) {
          this.sanctumTimer += dt;
          this.addFloatingText(this.player.x, this.player.y - 25, `UNSEALING: ${(5 - this.sanctumTimer).toFixed(1)}s`, '#ffea00');
          if (this.sanctumTimer >= 5.0) {
            this.endMatch(true); // Instant extraction victory!
          }
        } else {
          this.sanctumTimer = Math.max(0, this.sanctumTimer - dt * 0.5);
        }
      }
    }

    // Check Scroll Pickups
    for (let i = this.scrolls.length - 1; i >= 0; i--) {
      const scr = this.scrolls[i];
      const dist = Math.hypot(this.player.x - scr.x, this.player.y - scr.y);
      if (dist <= scr.radius + this.player.radius) {
        if (scr.type === 'HEAVEN') this.playerScrolls.heaven = true;
        if (scr.type === 'EARTH') this.playerScrolls.earth = true;
        this.addFloatingText(this.player.x, this.player.y - 25, `${scr.type} SCROLL SECURED!`, '#39ff74');
        this.audio.playTeleport();
        this.scrolls.splice(i, 1);
        this.updateScrollHUD();

        if (this.playerScrolls.heaven && this.playerScrolls.earth) {
          this.addFloatingText(this.canvas.width / 2, this.canvas.height / 2, 'UNSEALING SANCTUM UNLOCKED AT CENTER!', '#ffea00');
        }
      }
    }

    this.updateScrollHUD();
  }

  onRingOut(victim) {
    victim.hp = 0;
    this.ringOuts++;
    this.createShockwave(victim.x, victim.y, 90, '#ff3344');
    this.audio.playRingOut();
    this.addFloatingText(victim.x, victim.y, 'RING OUT // EJECTED TO VOID', '#ff3344');
    this.onEntityDefeated(victim);
  }

  updateHUD() {
    if (!this.player) return;
    const hpPct = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    const poisePct = Math.max(0, (this.player.poise / this.player.maxPoise) * 100);
    const stamPct = Math.max(0, (this.player.stamina / this.player.maxStamina) * 100);

    const hpBar = document.getElementById('hud-hp-bar');
    const poiseBar = document.getElementById('hud-poise-bar');
    const stamBar = document.getElementById('hud-stam-bar');
    const timerDisp = document.getElementById('hud-timer');
    const techCd = document.getElementById('hud-tech-cd');

    if (hpBar) hpBar.style.width = `${hpPct}%`;
    if (poiseBar) poiseBar.style.width = `${poisePct}%`;
    if (stamBar) stamBar.style.width = `${stamPct}%`;
    if (timerDisp) timerDisp.innerText = `TIME: ${Math.ceil(this.matchTimer)}s`;

    if (techCd) {
      if (this.player.cooldownTech > 0) {
        techCd.innerText = `TECH: ${this.player.cooldownTech.toFixed(1)}s`;
        techCd.style.color = '#a1a1aa';
      } else {
        techCd.innerText = 'TECH: READY [Q/RMB]';
        techCd.style.color = '#39ff74';
      }
    }
  }

  endMatch(isWin) {
    this.inBattle = false;
    const modal = document.getElementById('post-match-view');
    const title = document.getElementById('post-title');
    const dmg = document.getElementById('stat-damage');
    const kills = document.getElementById('stat-kills');
    const scrolls = document.getElementById('stat-scrolls');
    const ambushes = document.getElementById('stat-ambushes');
    const scDisp = document.getElementById('stat-scenario');
    const budgetDisp = document.getElementById('stat-budget');

    if (title) {
      title.innerText = isWin
        ? 'CHUNIN EXAM CLEARED // CRUCIBLE VICTOR'
        : 'TACTICAL EXTRACTION FAILED // INTEGRITY 0';
      title.style.color = isWin ? '#39ff74' : '#ff3344';
    }

    if (dmg) dmg.innerText = Math.round(this.damageDealt);
    if (kills) kills.innerText = this.killCount;
    if (scrolls) {
      const count = (this.playerScrolls.heaven ? 1 : 0) + (this.playerScrolls.earth ? 1 : 0);
      scrolls.innerText = `${count} / 2`;
    }
    if (ambushes) ambushes.innerText = this.ambushStrikes;
    if (scDisp) scDisp.innerText = this.selectedScenario.name;
    if (budgetDisp) budgetDisp.innerText = `$${this.getBudgetUsed()} / $15`;

    if (modal) modal.style.display = 'flex';
    if (isWin) this.audio.playTeleport();
  }

  // --- Canvas Rendering Pipeline ---
  renderCanvas() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Background Arena Surface
    ctx.fillStyle = this.selectedScenario.bg || '#0a0a0a';
    ctx.fillRect(0, 0, w, h);

    // Draw Grid Lines
    ctx.strokeStyle = this.selectedScenario.gridColor || 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Zone 44 Canopy Foliage Groves
    if (this.selectedScenario.id === 'zone44') {
      this.foliageZones.forEach((fz) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(fz.x, fz.y, fz.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(20, 60, 20, 0.35)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(74, 222, 128, 0.4)';
        ctx.font = '10px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('[CANOPY FOLIAGE]', fz.x, fz.y);
        ctx.restore();
      });

      // Bottom swamp miasma zone
      ctx.fillStyle = 'rgba(30, 45, 25, 0.4)';
      ctx.fillRect(0, h - 75, w, 75);
      ctx.fillStyle = 'rgba(160, 210, 80, 0.3)';
      ctx.font = '10px JetBrains Mono';
      ctx.fillText('SWAMP ROOT NET // -40% FRICTION & APEX SERPENT HAZARD', 25, h - 25);

      // Central Unsealing Sanctum
      if (this.unsealingSanctum) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.unsealingSanctum.x, this.unsealingSanctum.y, this.unsealingSanctum.radius, 0, Math.PI * 2);
        const bothSecured = this.playerScrolls.heaven && this.playerScrolls.earth;
        ctx.fillStyle = bothSecured ? 'rgba(57, 255, 116, 0.15)' : 'rgba(255, 255, 255, 0.03)';
        ctx.fill();
        ctx.strokeStyle = bothSecured ? '#39ff74' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = bothSecured ? 2 : 1;
        ctx.stroke();

        ctx.fillStyle = bothSecured ? '#39ff74' : 'rgba(255, 255, 255, 0.4)';
        ctx.font = '10px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(bothSecured ? 'EXTRACTION ALTAR [ACTIVE]' : 'CENTRAL TOWER ALTAR', this.unsealingSanctum.x, this.unsealingSanctum.y);
        ctx.restore();
      }
    }

    // Law's Room Domain
    if (this.activeRoom) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.activeRoom.x, this.activeRoom.y, this.activeRoom.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(64, 200, 255, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(64, 200, 255, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // Shadow Tethers (Kagemane no Jutsu)
    this.shadowTethers.forEach((teth) => {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(teth.source.x, teth.source.y);
      ctx.lineTo(teth.target.x, teth.target.y);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    });

    // Pakkun Radar Tracking Lines (Wallhack sensor to dropped scrolls & enemies)
    if (this.player && this.player.draft.teammate?.id.includes('pakkun')) {
      this.scrolls.forEach((scr) => {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(this.player.x, this.player.y);
        ctx.lineTo(scr.x, scr.y);
        ctx.strokeStyle = 'rgba(255, 234, 0, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });
    }

    // Draw Dropped Scrolls on Ground
    this.scrolls.forEach((scr) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(scr.x, scr.y, scr.radius, 0, Math.PI * 2);
      ctx.fillStyle = scr.color;
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 9px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(scr.type === 'HEAVEN' ? 'HVN' : 'ETH', scr.x, scr.y + 3);

      ctx.fillStyle = scr.color;
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`[${scr.type} SCROLL]`, scr.x, scr.y - 14);
      ctx.restore();
    });

    // Draw Kunai Traps
    this.kunaiTraps.forEach((k) => {
      ctx.save();
      ctx.fillStyle = '#ff6633';
      ctx.fillRect(k.x - 3, k.y - 3, 6, 6);
      ctx.restore();
    });

    // Draw Entities
    this.entities.forEach((ent) => {
      if (ent.hp <= 0) return;

      ctx.save();

      // Stealth foliage concealment
      if (ent.isHidden) {
        ctx.globalAlpha = 0.55;
      }

      // Kamui phase aura
      if (ent.isKamuiPhased) {
        ctx.beginPath();
        ctx.arc(ent.x, ent.y, ent.radius + 6, 0, Math.PI * 2);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Entity Core Circle
      ctx.beginPath();
      ctx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
      ctx.fillStyle = ent.color;
      ctx.fill();
      ctx.strokeStyle = ent.isStunned ? '#ffea00' : '#262626';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Direction Indicator
      ctx.beginPath();
      ctx.moveTo(ent.x, ent.y);
      ctx.lineTo(ent.x + Math.cos(ent.facing) * (ent.radius + 10), ent.y + Math.sin(ent.facing) * (ent.radius + 10));
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Scroll Carrier Badge
      if (ent.carriesScroll && !ent.scrollDropped) {
        ctx.fillStyle = ent.carriesScroll === 'HEAVEN' ? '#40c8ff' : '#ffaa00';
        ctx.font = 'bold 9px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(`[${ent.carriesScroll} HOLDER]`, ent.x, ent.y - ent.radius - 16);
      }

      // Name & HP Bar
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(ent.name, ent.x, ent.y - ent.radius - 4);

      // Mini Health Bar
      const barW = ent.radius * 2.2;
      const barH = 3;
      const barX = ent.x - barW / 2;
      const barY = ent.y + ent.radius + 6;

      ctx.fillStyle = '#111111';
      ctx.fillRect(barX, barY, barW, barH);
      const hpRatio = Math.max(0, ent.hp / ent.maxHp);
      ctx.fillStyle = ent.team === 1 ? '#39ff74' : '#ff3344';
      ctx.fillRect(barX, barY, barW * hpRatio, barH);

      ctx.restore();
    });

    // Draw Floating Texts
    this.floatingTexts.forEach((ft) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, ft.alpha);
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });

    // Draw Particles
    this.particles.forEach((p) => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.restore();
    });
  }

  // --- Visual FX Helpers ---
  addFloatingText(x, y, text, color = '#ffffff') {
    this.floatingTexts.push({ x, y, text, color, alpha: 1.0 });
  }

  createShockwave(x, y, radius, color) {
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * 4,
        vy: Math.sin(angle) * 4,
        size: 3,
        color: color,
        alpha: 1.0
      });
    }
  }

  createSmokePuff(x, y) {
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        size: 4 + Math.random() * 4,
        color: '#94a3b8',
        alpha: 0.9
      });
    }
  }

  createSlashEffect(x, y, angle, range, color) {
    const tipX = x + Math.cos(angle) * range;
    const tipY = y + Math.sin(angle) * range;
    for (let i = 0; i < 6; i++) {
      this.particles.push({
        x: tipX + (Math.random() - 0.5) * 12,
        y: tipY + (Math.random() - 0.5) * 12,
        vx: Math.cos(angle) * 2 + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * 2 + (Math.random() - 0.5) * 2,
        size: 2,
        color: color,
        alpha: 0.8
      });
    }
  }

  createExplosionEffect(x, y, color) {
    for (let i = 0; i < 24; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: 3 + Math.random() * 3,
        color,
        alpha: 1.0
      });
    }
  }

  normalizeAngle(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }
}

// Instantiate and expose globally
window.addEventListener('DOMContentLoaded', () => {
  window.crucible = new CrucibleEngine();
  window.crucible.init();
});
