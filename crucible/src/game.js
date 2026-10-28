/**
 * Grand Cross: Crucible — Normalized Combat Engine & Arena Simulation
 * Master Systems Implementation per GDD_CORE.md
 */

// Draft Item Catalogs
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
      desc: 'Active guard window. Upon taking a hit or triggering, vanish in a smoke puff and drop a decoy log, leaping 80px back with 0.5s invulnerability.'
    },
    {
      id: 'tech_03_boogie_woogie',
      name: 'Boogie Woogie (Spatial Swap)',
      cost: 3,
      cooldown: 6.0,
      tags: ['Instant Swap', 'Vector Inversion', 'Poise Break'],
      desc: 'Clap hands to instantly swap positions with the nearest enemy or ally within 300px, disrupting their current attack and staggering them.'
    },
    {
      id: 'tech_04_room',
      name: 'Room / Shambles (Spatial Sphere)',
      cost: 4,
      cooldown: 12.0,
      tags: ['Domain Sphere', 'Blink Dash', 'Vector Cut'],
      desc: 'Projects a 280px spherical domain. Inside, player dashes become instant zero-friction warps and melee hits slice enemies into airborne fragments.'
    },
    {
      id: 'tech_05_flying_thunder_god',
      name: 'Flying Thunder God (Hiraishin Warp)',
      cost: 5,
      cooldown: 7.0,
      tags: ['Map-Wide Teleport', 'Super Armor', 'Shockwave'],
      desc: 'Leaves spatial formula tags on hit. Instant teleport behind marked targets delivering a 120 poise damage shockwave with super armor arrival.'
    }
  ],
  hands: [
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
      id: 'ally_01_meatshield',
      name: 'Cursed Meatshield Tank',
      cost: 1,
      hp: 650,
      ai: 'TANK',
      tags: ['Body Block', 'Aggro Taunt'],
      desc: 'Heavily armored bruiser that stays between you and high-threat enemies, absorbing projectiles and drawing fire.'
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
      id: 'ally_03_berserk',
      name: 'Berserk Chainsaw Disruptor',
      cost: 3,
      hp: 480,
      ai: 'BERSERK',
      tags: ['Relentless Pressure', 'Stagger Lock'],
      desc: 'Relentless aggressive fighter that hyper-focuses the lowest HP enemy, forcing them into defensive guard break.'
    },
    {
      id: 'ally_04_clones',
      name: 'Shadow Clone Swarm',
      cost: 4,
      hp: 180,
      ai: 'CLONES',
      tags: ['3 Clones', 'Synchronized Striking'],
      desc: 'Spawns 3 fragile decoy clones that mirror player strikes, splitting enemy attention and overwhelming defenses.'
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

// Battlefields
const SCENARIOS = [
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
  },
  {
    id: 'zone44',
    name: 'Zone 44 (Forest of Death)',
    rule: 'Canopy Ambush & Scrolls: Attacks from foliage grant +150% poise damage. Collect Heaven & Earth scrolls.',
    bg: '#141a10',
    gridColor: 'rgba(160, 210, 80, 0.10)',
    boundaryType: 'FOREST_CANOPY',
    knockbackMult: 1.3,
    friction: 0.84
  }
];

// Master Game State
class CrucibleEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.inBattle = false;
    this.audio = window.CrucibleAudio;

    // Draft State
    this.currentDraft = {
      technique: DRAFT_DATA.techniques[2], // Default: Boogie Woogie ($3)
      hands: DRAFT_DATA.hands[2],          // Default: Divergent Fist ($3)
      speed: DRAFT_DATA.speed[2],          // Default: Full Cowling ($3)
      teammate: DRAFT_DATA.teammates[2]    // Default: Berserk ($3) -> Total $12
    };
    this.selectedScenario = SCENARIOS[0];

    // Combat Entities
    this.player = null;
    this.entities = [];
    this.particles = [];
    this.floatingTexts = [];
    this.activeRoom = null; // Law Room Domain
    this.kunaiTraps = [];

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

    // Start loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    this.canvas.width = container.clientWidth || 900;
    this.canvas.height = container.clientHeight || 560;
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
        // Left click: Basic strike
        this.performPlayerAttack();
      } else if (e.button === 2) {
        // Right click: Technique
        e.preventDefault();
        this.triggerPlayerTechnique();
      }
    });

    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // --- UI & Draft Logic ---
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
    disp.style.animation = 'flashRed 0.4s';
    setTimeout(() => {
      disp.style.animation = '';
    }, 400);
  }

  updateSynergyPreview() {
    const { technique, hands, speed, teammate } = this.currentDraft;
    const previewEl = document.getElementById('synergy-preview');
    if (!previewEl) return;

    let synergyTitle = 'Custom Standard Loadout';
    let synergyDesc = 'Well-rounded combat build tailored for versatile skirmishing.';

    // Check GDD Synergies
    if (technique.id.includes('boogie') && speed.id.includes('gates') && hands.id.includes('divergent')) {
      synergyTitle = 'Synergy: "Pinball Ring-Out" (Null Realm Optimal)';
      synergyDesc = 'Sprint at 3x speed to the edge, strike with divergent shockwave, then swap with target right at the perimeter for instant void ejection!';
    } else if (technique.id.includes('room') && speed.id.includes('godspeed')) {
      synergyTitle = 'Synergy: "Executioner Teleport Domain"';
      synergyDesc = 'Drop Room sphere and execute instantaneous zero-recovery strikes across all trapped targets with complete i-frame safety.';
    } else if (technique.id.includes('substitution') && teammate.id.includes('clones')) {
      synergyTitle = 'Synergy: "Mirage Swarm"';
      synergyDesc = 'Decoy substitution combined with 3 shadow clones completely fragments hostile targeting logic, making you virtually untargetable.';
    } else if (technique.id.includes('flying_thunder_god') && hands.id.includes('sharingan')) {
      synergyTitle = 'Synergy: "Yellow Flash Counter"';
      synergyDesc = 'Auto-parries chain seamlessly into instantaneous map-wide backstab teleports with 1.5x critical shockwaves.';
    }

    previewEl.innerHTML = `
      <div style="font-weight: bold; color: #39ff74; font-size: 13px;">${synergyTitle}</div>
      <div style="font-size: 12px; color: #a0c4ab; margin-top: 3px;">${synergyDesc}</div>
    `;
  }

  // --- Battle Deployment ---
  startBattle() {
    if (this.getBudgetUsed() > 15) return;
    this.audio.init();

    this.inBattle = true;
    this.matchTimer = 180;
    this.killCount = 0;
    this.damageDealt = 0;
    this.ringOuts = 0;
    this.particles = [];
    this.floatingTexts = [];
    this.kunaiTraps = [];
    this.activeRoom = null;

    document.getElementById('draft-view').style.display = 'none';
    document.getElementById('battle-view').style.display = 'flex';
    document.getElementById('post-match-view').style.display = 'none';

    this.setupArenaEntities();
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

    // Spawn Player
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
      markId: null,
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

    // Spawn Enemies (Asymmetric Opposing Team)
    this.spawnEnemySquad(cx + 200, cy);
  }

  createTeammate(draft, x, y) {
    return {
      isTeammate: true,
      team: 1,
      x: x,
      y: y,
      vx: 0,
      vy: 0,
      radius: 16,
      color: '#40c8ff',
      name: draft.name,
      hp: draft.hp,
      maxHp: draft.hp,
      poise: 180,
      maxPoise: 180,
      facing: 0,
      aiType: draft.ai,
      healCooldown: 6.0,
      cooldownAttack: 0,
      isStunned: false,
      stunTimer: 0
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
      hp: 80,
      maxHp: 80,
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
    // 1 Commander Boss + 2 Elite Bruisers
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
      name: 'COLONY OVERLORD',
      hp: 650,
      maxHp: 650,
      poise: 300,
      maxPoise: 300,
      facing: Math.PI,
      cooldownAttack: 0,
      cooldownSpecial: 7.0,
      isStunned: false,
      stunTimer: 0,
      damage: 45
    };
    this.entities.push(boss);

    const minion1 = {
      isEnemy: true,
      team: 2,
      x: cx + 40,
      y: cy - 70,
      vx: 0,
      vy: 0,
      radius: 16,
      color: '#ff6633',
      name: 'SHADOW VANGUARD',
      hp: 350,
      maxHp: 350,
      poise: 160,
      maxPoise: 160,
      facing: Math.PI,
      cooldownAttack: 0,
      isStunned: false,
      stunTimer: 0,
      damage: 30
    };
    this.entities.push(minion1);

    const minion2 = {
      isEnemy: true,
      team: 2,
      x: cx + 40,
      y: cy + 70,
      vx: 0,
      vy: 0,
      radius: 16,
      color: '#ff9900',
      name: 'TACTICAL INFILTRATOR',
      hp: 320,
      maxHp: 320,
      poise: 140,
      maxPoise: 140,
      facing: Math.PI,
      cooldownAttack: 0,
      isStunned: false,
      stunTimer: 0,
      damage: 28
    };
    this.entities.push(minion2);
  }

  // --- Actions ---
  performPlayerAttack() {
    if (this.player.isStunned || this.player.cooldownAttack > 0) return;
    const hands = this.player.draft.hands;
    this.player.cooldownAttack = hands.speed;

    const angle = Math.atan2(this.mouse.y - this.player.y, this.mouse.x - this.player.x);
    this.player.facing = angle;

    // Hitbox arc check
    let hitAny = false;
    this.entities.forEach((ent) => {
      if (ent.team !== this.player.team && ent.hp > 0) {
        const dx = ent.x - this.player.x;
        const dy = ent.y - this.player.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= hands.range + ent.radius) {
          const hitAngle = Math.atan2(dy, dx);
          const angleDiff = Math.abs(this.normalizeAngle(hitAngle - angle));

          if (angleDiff < 1.1) {
            // Hit!
            hitAny = true;
            this.dealDamage(this.player, ent, hands.damage, hands.poiseDmg, 4.0);

            // Divergent Fist delayed shockwave
            if (hands.id.includes('divergent')) {
              setTimeout(() => {
                if (ent.hp > 0 && this.inBattle) {
                  this.dealDamage(this.player, ent, 25, 40, 2.5);
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
    if (this.player.isStunned || this.player.cooldownDash > 0 || this.player.stamina < 20) return;
    const speed = this.player.draft.speed;
    this.player.stamina -= 20;
    this.player.cooldownDash = 0.9;
    this.player.iframeTimer = 0.35;

    let dirX = 0;
    let dirY = 0;
    if (this.keys['w'] || this.keys['arrowup']) dirY -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) dirY += 1;
    if (this.keys['a'] || this.keys['arrowleft']) dirX -= 1;
    if (this.keys['d'] || this.keys['arrowright']) dirX += 1;

    let angle = dirX !== 0 || dirY !== 0 ? Math.atan2(dirY, dirX) : this.player.facing;
    const impulse = speed.dashDist * 0.12;

    this.player.vx += Math.cos(angle) * impulse;
    this.player.vy += Math.sin(angle) * impulse;

    // Water stream afterimages or Godspeed lightning
    this.addFloatingText(this.player.x, this.player.y - 15, 'DASH', '#39ff74');
    this.audio.playDash();
  }

  triggerPlayerTechnique() {
    if (this.player.isStunned || this.player.cooldownTech > 0) return;
    const tech = this.player.draft.technique;

    if (tech.id.includes('boogie')) {
      // Find nearest living enemy
      let nearest = null;
      let minDist = 360;
      this.entities.forEach((ent) => {
        if (ent.team !== this.player.team && ent.hp > 0) {
          const d = Math.hypot(ent.x - this.player.x, ent.y - this.player.y);
          if (d < minDist) {
            minDist = d;
            nearest = ent;
          }
        }
      });

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
        this.addFloatingText(nearest.x, nearest.y - 20, 'DISORIENTED!', '#ffea00');
        this.createShockwave(this.player.x, this.player.y, 45, '#40c8ff');
        this.createShockwave(nearest.x, nearest.y, 45, '#40c8ff');
        this.audio.playTeleport();
      }
    } else if (tech.id.includes('kunai')) {
      this.player.cooldownTech = tech.cooldown;
      const angle = Math.atan2(this.mouse.y - this.player.y, this.mouse.x - this.player.x);
      for (let i = -1; i <= 1; i++) {
        const spread = angle + (i * 0.22);
        this.kunaiTraps.push({
          x: this.player.x,
          y: this.player.y,
          vx: Math.cos(spread) * 9,
          vy: Math.sin(spread) * 9,
          lifetime: 3.5
        });
      }
      this.addFloatingText(this.player.x, this.player.y - 20, 'KUNAI WIRES DEPLOYED', '#ff6633');
      this.audio.playPunch(2);
    } else if (tech.id.includes('substitution')) {
      this.player.cooldownTech = tech.cooldown;
      this.player.x -= Math.cos(this.player.facing) * 90;
      this.player.y -= Math.sin(this.player.facing) * 90;
      this.player.iframeTimer = 0.6;
      this.addFloatingText(this.player.x, this.player.y - 20, 'KAWARIMI LOG SWAP', '#39ff74');
      this.createShockwave(this.player.x, this.player.y, 50, '#39ff74');
      this.audio.playTeleport();
    } else if (tech.id.includes('room')) {
      this.player.cooldownTech = tech.cooldown;
      this.activeRoom = {
        x: this.player.x,
        y: this.player.y,
        radius: 170,
        timer: 8.0
      };
      this.addFloatingText(this.player.x, this.player.y - 20, 'ROOM: SHAMBLES', '#40c8ff');
      this.createShockwave(this.player.x, this.player.y, 170, '#40c8ff');
      this.audio.playTeleport();
    } else if (tech.id.includes('flying_thunder_god')) {
      // Find marked or lowest enemy
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
        this.dealDamage(this.player, target, 90, 140, 6.0);
        this.addFloatingText(this.player.x, this.player.y - 20, 'HIRAISHIN SLICE!', '#ffea00');
        this.createShockwave(this.player.x, this.player.y, 60, '#ffea00');
        this.audio.playTeleport();
      }
    }
  }

  triggerTeammateCommand() {
    this.entities.forEach((ent) => {
      if (ent.isTeammate && ent.hp > 0) {
        ent.vx += Math.cos(this.player.facing) * 6;
        ent.vy += Math.sin(this.player.facing) * 6;
        this.addFloatingText(ent.x, ent.y - 15, 'ASSIST RUSH', '#40c8ff');
      }
    });
  }

  // --- Damage & Physics Resolution ---
  dealDamage(attacker, victim, damage, poiseDmg, knockbackImpulse) {
    if (victim.iframeTimer > 0) return;

    victim.hp = Math.max(0, victim.hp - damage);
    victim.poise = Math.max(0, victim.poise - poiseDmg);

    if (attacker === this.player) {
      this.damageDealt += damage;
    }

    // Knockback
    const angle = Math.atan2(victim.y - attacker.y, victim.x - attacker.x);
    const kb = knockbackImpulse * (this.selectedScenario.knockbackMult || 1.0);
    victim.vx += Math.cos(angle) * kb;
    victim.vy += Math.sin(angle) * kb;

    // Guard Break check
    if (victim.poise <= 0 && !victim.isStunned) {
      victim.isStunned = true;
      victim.stunTimer = 1.4;
      this.addFloatingText(victim.x, victim.y - 25, 'GUARD BREAK!', '#ffea00');
      this.audio.playGuardBreak();
    } else {
      this.addFloatingText(victim.x, victim.y - 15, `-${Math.round(damage)}`, victim.team === 1 ? '#ff3344' : '#ffffff');
    }

    // Death check
    if (victim.hp <= 0) {
      this.onEntityDefeated(victim);
    }
  }

  onEntityDefeated(victim) {
    if (victim.team !== 1) {
      this.killCount++;
      this.addFloatingText(victim.x, victim.y - 20, 'TARGET ELIMINATED', '#39ff74');
    } else if (victim.isPlayer) {
      this.addFloatingText(victim.x, victim.y - 20, 'OPERATIVE FALLEN', '#ff3344');
    }
    this.createShockwave(victim.x, victim.y, 60, '#ff3344');
    this.audio.playExplosion();

    this.checkVictoryConditions();
  }

  checkVictoryConditions() {
    const livingEnemies = this.entities.filter((e) => e.team === 2 && e.hp > 0);
    if (livingEnemies.length === 0) {
      setTimeout(() => this.showPostMatch(true), 800);
    } else if (this.player.hp <= 0) {
      setTimeout(() => this.showPostMatch(false), 800);
    }
  }

  showPostMatch(isVictory) {
    this.inBattle = false;
    document.getElementById('battle-view').style.display = 'none';
    const postView = document.getElementById('post-match-view');
    postView.style.display = 'flex';

    document.getElementById('post-title').innerText = isVictory ? 'MISSION ACCOMPLISHED // CRUCIBLE VICTOR' : 'OPERATION FAILED // MISSION ABORTED';
    document.getElementById('post-title').style.color = isVictory ? '#39ff74' : '#ff3344';

    document.getElementById('stat-damage').innerText = Math.round(this.damageDealt);
    document.getElementById('stat-kills').innerText = this.killCount;
    document.getElementById('stat-ringouts').innerText = this.ringOuts;
    document.getElementById('stat-scenario').innerText = this.selectedScenario.name;
    document.getElementById('stat-budget').innerText = `$${this.getBudgetUsed()} / $15`;
  }

  // --- Main Engine Loop ---
  gameLoop(currentTime) {
    const dt = Math.min((currentTime - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = currentTime;

    if (this.inBattle) {
      this.updatePhysics(dt);
      this.updateAI(dt);
      this.updateTimers(dt);
    }

    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  updatePhysics(dt) {
    const sc = this.selectedScenario;
    const friction = sc.friction || 0.88;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const margin = 30;

    // Update Kunai Traps
    this.kunaiTraps.forEach((trap, idx) => {
      trap.x += trap.vx;
      trap.y += trap.vy;
      trap.lifetime -= dt;

      // Check enemy collisions
      this.entities.forEach((ent) => {
        if (ent.team === 2 && ent.hp > 0) {
          if (Math.hypot(ent.x - trap.x, ent.y - trap.y) < ent.radius + 8) {
            this.dealDamage(this.player, ent, 65, 50, 4.0);
            this.addFloatingText(ent.x, ent.y - 15, 'TRIPWIRE EXPLOSION', '#ff3344');
            trap.lifetime = 0;
            this.audio.playExplosion();
          }
        }
      });
    });
    this.kunaiTraps = this.kunaiTraps.filter((t) => t.lifetime > 0);

    // Update Room Domain
    if (this.activeRoom) {
      this.activeRoom.timer -= dt;
      if (this.activeRoom.timer <= 0) this.activeRoom = null;
    }

    // Update Entities
    this.entities.forEach((ent) => {
      if (ent.hp <= 0) return;

      // Apply Kinematic movement to player
      if (ent.isPlayer && !ent.isStunned) {
        const speed = ent.draft.speed.baseSpeed;
        let moveX = 0;
        let moveY = 0;
        if (this.keys['w'] || this.keys['arrowup']) moveY -= 1;
        if (this.keys['s'] || this.keys['arrowdown']) moveY += 1;
        if (this.keys['a'] || this.keys['arrowleft']) moveX -= 1;
        if (this.keys['d'] || this.keys['arrowright']) moveX += 1;

        if (moveX !== 0 || moveY !== 0) {
          const len = Math.hypot(moveX, moveY);
          ent.vx += (moveX / len) * speed * 0.45;
          ent.vy += (moveY / len) * speed * 0.45;
          ent.facing = Math.atan2(this.mouse.y - ent.y, this.mouse.x - ent.x);
        }
      }

      // Physics integration
      ent.x += ent.vx;
      ent.y += ent.vy;
      ent.vx *= friction;
      ent.vy *= friction;

      // Poise & Stamina natural regeneration
      ent.poise = Math.min(ent.maxPoise, ent.poise + 18 * dt);
      if (ent.stamina !== undefined) {
        ent.stamina = Math.min(ent.maxStamina, ent.stamina + 22 * dt);
      }

      // Boundary Resolution
      if (sc.boundaryType === 'VOID_RING_OUT') {
        const cx = w / 2;
        const cy = h / 2;
        const ringRadius = Math.min(w, h) * 0.44;
        const distFromCenter = Math.hypot(ent.x - cx, ent.y - cy);

        if (distFromCenter > ringRadius + ent.radius) {
          // Ring out!
          ent.hp = 0;
          this.ringOuts++;
          this.addFloatingText(ent.x, ent.y, 'RING OUT!', '#ffea00');
          this.audio.playRingOut();
          this.onEntityDefeated(ent);
        }
      } else {
        // Solid wall bounce
        if (ent.x < margin + ent.radius) {
          ent.x = margin + ent.radius;
          ent.vx = Math.abs(ent.vx) * 0.7;
        } else if (ent.x > w - margin - ent.radius) {
          ent.x = w - margin - ent.radius;
          ent.vx = -Math.abs(ent.vx) * 0.7;
        }
        if (ent.y < margin + ent.radius) {
          ent.y = margin + ent.radius;
          ent.vy = Math.abs(ent.vy) * 0.7;
        } else if (ent.y > h - margin - ent.radius) {
          ent.y = h - margin - ent.radius;
          ent.vy = -Math.abs(ent.vy) * 0.7;
        }
      }
    });

    // Update Floating text
    this.floatingTexts.forEach((ft) => {
      ft.y -= 25 * dt;
      ft.life -= dt;
    });
    this.floatingTexts = this.floatingTexts.filter((ft) => ft.life > 0);

    // Update Particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= dt;
    });
    this.particles = this.particles.filter((p) => p.life > 0);
  }

  updateAI(dt) {
    this.entities.forEach((ent) => {
      if (ent.isPlayer || ent.hp <= 0 || ent.isStunned) return;

      // Enemy AI
      if (ent.team === 2) {
        // Seek nearest player or ally
        let target = this.player.hp > 0 ? this.player : null;
        if (!target) {
          const livingAllies = this.entities.filter((e) => e.team === 1 && e.hp > 0);
          if (livingAllies.length > 0) target = livingAllies[0];
        }

        if (target) {
          const dx = target.x - ent.x;
          const dy = target.y - ent.y;
          const dist = Math.hypot(dx, dy);
          ent.facing = Math.atan2(dy, dx);

          if (dist > 45) {
            ent.vx += Math.cos(ent.facing) * 0.65;
            ent.vy += Math.sin(ent.facing) * 0.65;
          } else {
            // Attack!
            if (ent.cooldownAttack <= 0) {
              ent.cooldownAttack = 1.2;
              this.dealDamage(ent, target, ent.damage || 25, 30, 3.5);
              this.createSlashEffect(ent.x, ent.y, ent.facing, 45, ent.color);
              this.audio.playPunch(2);
            }
          }
        }
      }

      // Teammate AI
      if (ent.isTeammate) {
        if (ent.aiType === 'HEALER') {
          // Stay near player and pulse heal
          const dx = this.player.x - ent.x;
          const dy = this.player.y - ent.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 120) {
            ent.vx += (dx / dist) * 1.2;
            ent.vy += (dy / dist) * 1.2;
          }
          ent.healCooldown -= dt;
          if (ent.healCooldown <= 0) {
            ent.healCooldown = 6.0;
            this.player.hp = Math.min(this.player.maxHp, this.player.hp + 65);
            this.addFloatingText(this.player.x, this.player.y - 20, '+65 HP (CLEANSE)', '#39ff74');
            this.createShockwave(ent.x, ent.y, 110, '#39ff74');
          }
        } else {
          // Aggressor / Meatshield: attack nearest enemy
          const enemies = this.entities.filter((e) => e.team === 2 && e.hp > 0);
          if (enemies.length > 0) {
            const target = enemies[0];
            const dx = target.x - ent.x;
            const dy = target.y - ent.y;
            const dist = Math.hypot(dx, dy);
            ent.facing = Math.atan2(dy, dx);

            if (dist > 40) {
              ent.vx += Math.cos(ent.facing) * 0.9;
              ent.vy += Math.sin(ent.facing) * 0.9;
            } else if (ent.cooldownAttack <= 0) {
              ent.cooldownAttack = 0.9;
              this.dealDamage(ent, target, 32, 35, 3.0);
              this.createSlashEffect(ent.x, ent.y, ent.facing, 40, ent.color);
              this.audio.playPunch(1);
            }
          }
        }
      }
    });
  }

  updateTimers(dt) {
    this.matchTimer -= dt;
    if (this.matchTimer <= 0) {
      this.checkVictoryConditions();
    }

    // Cooldown reductions
    this.entities.forEach((ent) => {
      if (ent.cooldownAttack > 0) ent.cooldownAttack = Math.max(0, ent.cooldownAttack - dt);
      if (ent.cooldownTech > 0) ent.cooldownTech = Math.max(0, ent.cooldownTech - dt);
      if (ent.cooldownDash > 0) ent.cooldownDash = Math.max(0, ent.cooldownDash - dt);
      if (ent.iframeTimer > 0) ent.iframeTimer = Math.max(0, ent.iframeTimer - dt);

      if (ent.isStunned) {
        ent.stunTimer -= dt;
        if (ent.stunTimer <= 0) {
          ent.isStunned = false;
        }
      }
    });

    // Update HUD
    const timerDisp = document.getElementById('hud-timer');
    const hpDisp = document.getElementById('hud-hp-bar');
    const poiseDisp = document.getElementById('hud-poise-bar');
    const stamDisp = document.getElementById('hud-stam-bar');
    const techCdDisp = document.getElementById('hud-tech-cd');

    if (timerDisp) timerDisp.innerText = `TIME: ${Math.max(0, Math.ceil(this.matchTimer))}s`;
    if (hpDisp && this.player) {
      hpDisp.style.width = `${Math.max(0, (this.player.hp / this.player.maxHp) * 100)}%`;
    }
    if (poiseDisp && this.player) {
      poiseDisp.style.width = `${Math.max(0, (this.player.poise / this.player.maxPoise) * 100)}%`;
    }
    if (stamDisp && this.player) {
      stamDisp.style.width = `${Math.max(0, (this.player.stamina / this.player.maxStamina) * 100)}%`;
    }
    if (techCdDisp && this.player) {
      techCdDisp.innerText = this.player.cooldownTech > 0 ? `TECH CD: ${this.player.cooldownTech.toFixed(1)}s` : 'TECH: READY [Q/RMB]';
      techCdDisp.style.color = this.player.cooldownTech > 0 ? '#ffea00' : '#39ff74';
    }
  }

  // --- Rendering ---
  render() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const sc = this.selectedScenario;

    // Background
    ctx.fillStyle = sc.bg || '#0b0e14';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = sc.gridColor || 'rgba(57, 255, 116, 0.08)';
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

    // Boundary Rendering
    if (sc.boundaryType === 'VOID_RING_OUT') {
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.44;

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#40c8ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#40c8ff';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.strokeStyle = '#ff3344';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 30, w - 60, h - 60);
    }

    // Active Room Domain
    if (this.activeRoom) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.activeRoom.x, this.activeRoom.y, this.activeRoom.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(64, 200, 255, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(64, 200, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.restore();
    }

    // Kunai Traps
    this.kunaiTraps.forEach((trap) => {
      ctx.fillStyle = '#ffea00';
      ctx.beginPath();
      ctx.arc(trap.x, trap.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Entities
    this.entities.forEach((ent) => {
      if (ent.hp <= 0) return;

      // Draw shadow
      ctx.beginPath();
      ctx.arc(ent.x, ent.y + 4, ent.radius * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.fill();

      // Entity Body
      ctx.save();
      ctx.beginPath();
      ctx.arc(ent.x, ent.y, ent.radius, 0, Math.PI * 2);
      ctx.fillStyle = ent.isStunned ? '#ffea00' : ent.color;
      ctx.fill();
      ctx.strokeStyle = ent.isPlayer ? '#ffffff' : '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Facing Direction Indicator
      ctx.beginPath();
      ctx.moveTo(ent.x, ent.y);
      ctx.lineTo(ent.x + Math.cos(ent.facing) * (ent.radius + 8), ent.y + Math.sin(ent.facing) * (ent.radius + 8));
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Name & Overhead Bars
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ent.name, ent.x, ent.y - ent.radius - 12);

      // Health bar
      const barW = ent.radius * 2.2;
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(ent.x - barW / 2, ent.y - ent.radius - 8, barW, 4);
      ctx.fillStyle = ent.team === 1 ? '#39ff74' : '#ff3344';
      ctx.fillRect(ent.x - barW / 2, ent.y - ent.radius - 8, barW * (ent.hp / ent.maxHp), 4);
    });

    // Particles & Slashes
    this.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Floating combat text
    this.floatingTexts.forEach((ft) => {
      ctx.fillStyle = ft.color;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(ft.text, ft.x, ft.y);
    });
  }

  // --- Effects Helpers ---
  createSlashEffect(x, y, angle, range, color) {
    for (let i = 0; i < 8; i++) {
      const spread = angle + (Math.random() - 0.5) * 0.8;
      const speed = range * 0.15 + Math.random() * 2;
      this.particles.push({
        x: x + Math.cos(angle) * 12,
        y: y + Math.sin(angle) * 12,
        vx: Math.cos(spread) * speed,
        vy: Math.sin(spread) * speed,
        size: 2.5,
        color: color,
        life: 0.25
      });
    }
  }

  createShockwave(x, y, radius, color) {
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(a) * (radius * 0.1),
        vy: Math.sin(a) * (radius * 0.1),
        size: 3,
        color: color,
        life: 0.35
      });
    }
  }

  addFloatingText(x, y, text, color) {
    this.floatingTexts.push({ x, y, text, color, life: 1.1 });
  }

  normalizeAngle(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.crucible = new CrucibleEngine();
  window.crucible.init();
});
