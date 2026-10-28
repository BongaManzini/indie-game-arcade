/**
 * Neural Sieve: 60s Protocol — Binary Triage Forensic Filter Engine
 * Implements 64-bit style trait bitmasking for instantaneous candidate collapse and breach survival.
 */

// Trait Flags Definitions
const TRAITS = {
  POWERS: 1 << 0,      // Has supernatural powers, magic, stand, chakra, devil fruit, or cursed energy
  DECEASED: 1 << 1,    // Canonically deceased / terminated
  ACADEMIC: 1 << 2,    // Student, teacher, or academy/school affiliated
  LEGACY: 1 << 3,      // Pre-2005 origin (Legacy generation vs Modern)
  HUMAN: 1 << 4,       // Pure biological human (not alien, curse, demon, vampire, titan, elf)
  COMBAT: 1 << 5,      // Primary combatant / martial artist / assassin
  PROTAGONIST: 1 << 6, // Main lead / titular protagonist
  MALE: 1 << 7         // Male gender
};

// Trait Questions Catalog
const QUESTIONS = [
  {
    id: 'powers',
    flag: TRAITS.POWERS,
    label: 'Supernatural / Cursed Powers?',
    desc: 'Does the entity wield supernatural abilities, magic, chakra, or cursed energy?'
  },
  {
    id: 'deceased',
    flag: TRAITS.DECEASED,
    label: 'Status: Deceased / Terminated?',
    desc: 'Has the entity met canonical death in their source continuity?'
  },
  {
    id: 'academic',
    flag: TRAITS.ACADEMIC,
    label: 'Academic / Institutional Affiliation?',
    desc: 'Is the entity explicitly a student or teacher at an academy or school?'
  },
  {
    id: 'legacy',
    flag: TRAITS.LEGACY,
    label: 'Era: Legacy Generation (Pre-2005)?',
    desc: 'Did the entity debut prior to the 2005 modern manga/anime era?'
  },
  {
    id: 'human',
    flag: TRAITS.HUMAN,
    label: 'Species: Pure Biological Human?',
    desc: 'Is the entity fully human (not a demon, alien, vampire, titan, curse, or elf)?'
  },
  {
    id: 'combat',
    flag: TRAITS.COMBAT,
    label: 'Front-Line Combat Specialist?',
    desc: 'Is the entity an active martial brawler, swordsman, soldier, or assassin?'
  },
  {
    id: 'protagonist',
    flag: TRAITS.PROTAGONIST,
    label: 'Primary Series Protagonist?',
    desc: 'Is the entity the central titular lead or primary protagonist?'
  },
  {
    id: 'male',
    flag: TRAITS.MALE,
    label: 'Gender: Male?',
    desc: 'Is the entity identified as male?'
  }
];

// Entity Database with Accurate Traits (Including Zero Tempo Edge-Case Traps)
const ENTITY_DATABASE = [
  // Zero Tempo Iconic Traps
  {
    id: 'junpei',
    name: 'Junpei Yoshino',
    series: 'Jujutsu Kaisen',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.HUMAN | TRAITS.MALE,
    note: 'The Classic Trap: Neither student nor teacher (outsider), modern human, deceased by Mahito.'
  },
  {
    id: 'george_joestar',
    name: 'George Joestar I',
    series: 'JoJo\'s Bizarre Adventure (Part 1)',
    traits: TRAITS.DECEASED | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.MALE,
    note: 'Zero powers, deceased in Victorian era, pure human noble.'
  },
  {
    id: 'toji',
    name: 'Toji Fushiguro',
    series: 'Jujutsu Kaisen',
    traits: TRAITS.DECEASED | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Zero cursed energy (Heavenly Restriction), assassin, deceased.'
  },
  {
    id: 'shino',
    name: 'Shino Aburame',
    series: 'Naruto',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Academy student in Naruto, Academy Teacher in Boruto, insect clan.'
  },
  {
    id: 'mihawk',
    name: 'Dracule Mihawk',
    series: 'One Piece',
    traits: TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'World\'s Greatest Swordsman. Pure human skill and Haki, no devil fruit magic.'
  },
  {
    id: 'gojo',
    name: 'Gojo Satoru',
    series: 'Jujutsu Kaisen',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Special Grade sorcerer and Jujutsu High teacher.'
  },
  {
    id: 'sukuna',
    name: 'Ryomen Sukuna',
    series: 'Jujutsu Kaisen',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.LEGACY | TRAITS.COMBAT | TRAITS.MALE,
    note: 'King of Curses. Non-human reincarnated curse spirit from the Heian era.'
  },
  {
    id: 'levi',
    name: 'Levi Ackerman',
    series: 'Attack on Titan',
    traits: TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Humanity\'s Strongest Soldier. No magic powers, pure titan-science physicality.'
  },
  {
    id: 'makima',
    name: 'Makima',
    series: 'Chainsaw Man',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.COMBAT,
    note: 'The Control Devil. Non-human female entity.'
  },
  {
    id: 'loid',
    name: 'Loid Forger (Twilight)',
    series: 'Spy x Family',
    traits: TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Master spy. No superpowers, modern human.'
  },
  {
    id: 'saitama',
    name: 'Saitama',
    series: 'One Punch Man',
    traits: TRAITS.POWERS | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Caped Baldy. Limitless physical strength, human.'
  },
  {
    id: 'kakashi',
    name: 'Kakashi Hatake',
    series: 'Naruto',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Copy Ninja. Team 7 sensei, Hokage, human.'
  },
  {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    series: 'Demon Slayer',
    traits: TRAITS.POWERS | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Demon Slayer Corps swordsman with Sun Breathing.'
  },
  {
    id: 'dio',
    name: 'Dio Brando',
    series: 'JoJo\'s Bizarre Adventure',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.LEGACY | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Vampire with The World stand, legacy antagonist.'
  },
  {
    id: 'light',
    name: 'Light Yagami (Kira)',
    series: 'Death Note',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Student who found the Death Note, non-combatant.'
  },
  {
    id: 'l_lawliet',
    name: 'L Lawliet',
    series: 'Death Note',
    traits: TRAITS.DECEASED | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.MALE,
    note: 'World\'s greatest detective. No powers, legacy.'
  },
  {
    id: 'edward',
    name: 'Edward Elric',
    series: 'Fullmetal Alchemist',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Fullmetal Alchemist, alchemical powers, legacy hero.'
  },
  {
    id: 'eren',
    name: 'Eren Yeager',
    series: 'Attack on Titan',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.ACADEMIC | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Attack Titan shifter (non-human titan physiology), cadet academy graduate.'
  },
  {
    id: 'todo',
    name: 'Aoi Todo',
    series: 'Jujutsu Kaisen',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Kyoto Jujutsu High student, Boogie Woogie technique.'
  },
  {
    id: 'killua',
    name: 'Killua Zoldyck',
    series: 'Hunter x Hunter',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Zoldyck assassin, Nen lightning user.'
  },
  {
    id: 'hisoka',
    name: 'Hisoka Morow',
    series: 'Hunter x Hunter',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Transmuter Nen fighter (Bungee Gum).'
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    series: 'One Piece',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Straw Hat captain, Mythical Zoan Nika fruit, human.'
  },
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    series: 'One Piece',
    traits: TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Three-sword style master. No devil fruit, pure human.'
  },
  {
    id: 'goku',
    name: 'Son Goku',
    series: 'Dragon Ball Super',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Saiyan warrior (non-human alien species).'
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    series: 'Dragon Ball Super',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Saiyan prince (non-human alien).'
  },
  {
    id: 'frieren',
    name: 'Frieren',
    series: 'Frieren: Beyond Journey\'s End',
    traits: TRAITS.POWERS | TRAITS.COMBAT | TRAITS.PROTAGONIST,
    note: 'Elven mage (non-human female).'
  },
  {
    id: 'anya',
    name: 'Anya Forger',
    series: 'Spy x Family',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN,
    note: 'Telepathic elementary school student at Eden Academy.'
  },
  {
    id: 'denji',
    name: 'Denji (Chainsaw Man)',
    series: 'Chainsaw Man',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Chainsaw Devil hybrid, high school student.'
  },
  {
    id: 'power',
    name: 'Power',
    series: 'Chainsaw Man',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.COMBAT,
    note: 'Blood Fiend (non-human devil possessing a corpse).'
  },
  {
    id: 'megumi',
    name: 'Megumi Fushiguro',
    series: 'Jujutsu Kaisen',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Jujutsu High student with Ten Shadows technique.'
  },
  {
    id: 'nobara',
    name: 'Nobara Kugisaki',
    series: 'Jujutsu Kaisen',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT,
    note: 'Jujutsu High student with Straw Doll technique.'
  },
  {
    id: 'erwin',
    name: 'Erwin Smith',
    series: 'Attack on Titan',
    traits: TRAITS.DECEASED | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: '13th Commander of Survey Corps. Deceased, no powers.'
  },
  {
    id: 'reiner',
    name: 'Reiner Braun',
    series: 'Attack on Titan',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Armored Titan shifter (non-human titan biology).'
  },
  {
    id: 'all_might',
    name: 'All Might (Toshinori Yagi)',
    series: 'My Hero Academia',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Former Symbol of Peace, teacher at UA High.'
  },
  {
    id: 'bakugo',
    name: 'Katsuki Bakugo',
    series: 'My Hero Academia',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Class 1-A student with Explosion Quirk.'
  },
  {
    id: 'deku',
    name: 'Izuku Midoriya',
    series: 'My Hero Academia',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Class 1-A student, Ninth user of One For All.'
  },
  {
    id: 'todoroki',
    name: 'Shoto Todoroki',
    series: 'My Hero Academia',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Class 1-A student with Half-Cold Half-Hot Quirk.'
  },
  {
    id: 'jotaro',
    name: 'Jotaro Kujo',
    series: 'JoJo\'s Bizarre Adventure (Part 3/6)',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Star Platinum stand user, high school student in Part 3.'
  },
  {
    id: 'itachi',
    name: 'Itachi Uchiha',
    series: 'Naruto',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Uchiha prodigy, Academy graduate at age 7, deceased.'
  },
  {
    id: 'madara',
    name: 'Madara Uchiha',
    series: 'Naruto',
    traits: TRAITS.POWERS | TRAITS.DECEASED | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Legendary Uchiha clan head, deceased.'
  },
  {
    id: 'sasuke',
    name: 'Sasuke Uchiha',
    series: 'Naruto',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Team 7 Academy graduate, Rinnegan and Sharingan user.'
  },
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    series: 'Naruto',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Seventh Hokage, Nine-Tails Jinchuriki, Academy graduate.'
  },
  {
    id: 'hinata',
    name: 'Hinata Hyuga',
    series: 'Naruto',
    traits: TRAITS.POWERS | TRAITS.ACADEMIC | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT,
    note: 'Byakugan user, Academy student, female.'
  },
  {
    id: 'spike',
    name: 'Spike Spiegel',
    series: 'Cowboy Bebop',
    traits: TRAITS.DECEASED | TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Bounty hunter. No powers, deceased, legacy classic.'
  },
  {
    id: 'vash',
    name: 'Vash the Stampede',
    series: 'Trigun',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'Humanoid Plant (non-human interdimensional biological entity).'
  },
  {
    id: 'guts',
    name: 'Guts',
    series: 'Berserk',
    traits: TRAITS.LEGACY | TRAITS.HUMAN | TRAITS.COMBAT | TRAITS.PROTAGONIST | TRAITS.MALE,
    note: 'The Black Swordsman. Zero magic, 100% human grit and massive blade.'
  },
  {
    id: 'griffith',
    name: 'Griffith (Femto)',
    series: 'Berserk',
    traits: TRAITS.POWERS | TRAITS.LEGACY | TRAITS.COMBAT | TRAITS.MALE,
    note: 'Leader of Band of the Hawk, reborn as God Hand (non-human demon).'
  }
];

class SieveEngine {
  constructor() {
    this.audio = window.SieveAudio;
    this.targetEntity = null;
    this.candidates = [];
    this.testedQueries = {}; // queryId -> boolean (true/false)
    this.timer = 60.0;
    this.isRunning = false;
    this.isVictory = false;
    this.isDefeat = false;
    this.lastFrameTime = performance.now();

    // Defenses State
    this.bulkheadEngaged = false;
    this.turretsEngaged = false;
    this.overrideArmed = false;

    // Performance Metrics
    this.queriesCount = 0;
    this.correctQueries = 0;
    this.penaltyTime = 0;
  }

  init() {
    this.bindDOM();
    this.renderCandidateList();
    this.renderQueryDeck();
  }

  bindDOM() {
    const btnStart = document.getElementById('btn-start-protocol');
    if (btnStart) {
      btnStart.onclick = () => this.startNewProtocol();
    }

    const btnOverride = document.getElementById('btn-execute-override');
    if (btnOverride) {
      btnOverride.onclick = () => this.executeOverride();
    }
  }

  startNewProtocol() {
    this.audio.init();
    this.audio.playClick();

    // Pick random target from database
    const randIdx = Math.floor(Math.random() * ENTITY_DATABASE.length);
    this.targetEntity = ENTITY_DATABASE[randIdx];

    // Reset candidates pool to all entities
    this.candidates = [...ENTITY_DATABASE];
    this.testedQueries = {};
    this.timer = 60.0;
    this.isRunning = true;
    this.isVictory = false;
    this.isDefeat = false;
    this.bulkheadEngaged = false;
    this.turretsEngaged = false;
    this.overrideArmed = false;
    this.queriesCount = 0;
    this.correctQueries = 0;
    this.penaltyTime = 0;

    // UI Updates
    document.getElementById('welcome-card').style.display = 'none';
    document.getElementById('protocol-arena').style.display = 'grid';
    document.getElementById('debrief-modal').style.display = 'none';

    this.logTerminal(`[PROTOCOL INITIALIZED] Target Breach detected. 60s global clock active.`);
    this.logTerminal(`[DATABASE LOADED] ${this.candidates.length} candidate signatures online.`);

    this.renderQueryDeck();
    this.renderCandidateList();
    this.updateStatusHUD();

    this.lastFrameTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  gameLoop(timestamp) {
    if (!this.isRunning) return;

    const dt = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;

    this.timer -= dt;

    if (this.timer <= 0) {
      this.timer = 0;
      this.endProtocol(false, 'CLOCK EXPIRED // BREACH CONTAINMENT COMPROMISED');
      return;
    }

    this.updateClockUI();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  updateClockUI() {
    const clockDisp = document.getElementById('timer-display');
    const clockBar = document.getElementById('timer-bar');

    if (clockDisp) {
      clockDisp.innerText = `${this.timer.toFixed(2)}s`;
      if (this.timer < 15) {
        clockDisp.style.color = '#ef4444';
      } else if (this.timer < 30) {
        clockDisp.style.color = '#f59e0b';
      } else {
        clockDisp.style.color = '#10b981';
      }
    }

    if (clockBar) {
      const pct = Math.max(0, (this.timer / 60.0) * 100);
      clockBar.style.width = `${pct}%`;
      clockBar.style.background = this.timer < 15 ? '#ef4444' : this.timer < 30 ? '#f59e0b' : '#10b981';
    }
  }

  // --- Fast Bitmask Query Execution ---
  submitQuery(queryId, choiceIsYes) {
    if (!this.isRunning || this.testedQueries[queryId] !== undefined) return;

    this.audio.playQueryToggle(choiceIsYes);
    this.queriesCount++;

    const question = QUESTIONS.find((q) => q.id === queryId);
    if (!question) return;

    // Check target's actual trait bitmask
    const targetHasTrait = (this.targetEntity.traits & question.flag) !== 0;
    const isCorrectDeduction = choiceIsYes === targetHasTrait;

    this.testedQueries[queryId] = choiceIsYes;

    if (isCorrectDeduction) {
      this.correctQueries++;
      // Instant Bitwise SIMD Prune
      const prevCount = this.candidates.length;
      if (choiceIsYes) {
        // Keep only entities having the flag
        this.candidates = this.candidates.filter((e) => (e.traits & question.flag) !== 0);
      } else {
        // Keep only entities NOT having the flag
        this.candidates = this.candidates.filter((e) => (e.traits & question.flag) === 0);
      }
      const pruned = prevCount - this.candidates.length;

      this.logTerminal(`[TEST: ${question.label}] -> ${choiceIsYes ? 'YES' : 'NO'} confirmed! Pruned ${pruned} candidates.`);
      this.audio.playPrune();
    } else {
      // Inconsistent query chosen: penalty stall!
      this.timer = Math.max(0, this.timer - 3.0);
      this.penaltyTime += 3.0;
      this.logTerminal(`[ERROR: ${question.label}] -> Target signature mismatch! -3.0s penalty applied.`, true);
      this.audio.playDefeat();
    }

    // Check Facility Defense Escalations
    this.checkFacilityDefenses();
    this.renderQueryDeck();
    this.renderCandidateList();
    this.updateStatusHUD();
  }

  checkFacilityDefenses() {
    const count = this.candidates.length;

    // Bulkhead milestone
    if (count <= 25 && !this.bulkheadEngaged) {
      this.bulkheadEngaged = true;
      this.timer += 5.0; // Bonus grace time
      this.logTerminal(`[FACILITY STATUS] Candidate pool <= 25. Outer Bulkheads sealed! +5.0s added.`);
      this.audio.playLockdown();
    }

    // Turrets milestone
    if (count <= 10 && !this.turretsEngaged) {
      this.turretsEngaged = true;
      this.logTerminal(`[FACILITY STATUS] Candidate pool <= 10. Automated laser sentry grid armed!`);
      this.audio.playLockdown();
    }

    // Singularity milestone
    if (count === 1 && !this.overrideArmed) {
      this.overrideArmed = true;
      const found = this.candidates[0];
      this.logTerminal(`[SINGULARITY ACQUIRED] Entity isolated: ${found.name} (${found.series}).`);
      this.logTerminal(`[CODE READY] Containment override frequency decrypted. EXECUTE OVERRIDE!`);
      this.audio.playVictory();
    }
  }

  executeOverride() {
    if (!this.isRunning) return;

    if (this.candidates.length === 1 && this.candidates[0].id === this.targetEntity.id) {
      this.endProtocol(true, `CONTAINMENT SEALED // SINGULARITY: ${this.targetEntity.name.toUpperCase()}`);
    } else {
      // Premature override executed
      this.timer = Math.max(0, this.timer - 5.0);
      this.logTerminal(`[OVERRIDE FAILED] Premature override signal! Protocol corrupted. -5s penalty.`, true);
      this.audio.playDefeat();
    }
  }

  endProtocol(isWin, reason) {
    this.isRunning = false;
    this.isVictory = isWin;
    this.isDefeat = !isWin;

    const modal = document.getElementById('debrief-modal');
    const title = document.getElementById('debrief-title');
    const msg = document.getElementById('debrief-reason');
    const statTarget = document.getElementById('stat-target');
    const statTime = document.getElementById('stat-time');
    const statQueries = document.getElementById('stat-queries');
    const statAccuracy = document.getElementById('stat-accuracy');

    if (title) {
      title.innerText = isWin ? 'PROTOCOL SUCCESS // THREAT NEUTRALIZED' : 'BREACH FAILURE // FACILITY COMPROMISED';
      title.style.color = isWin ? '#10b981' : '#ef4444';
    }

    if (msg) msg.innerText = reason;
    if (statTarget) statTarget.innerText = `${this.targetEntity.name} (${this.targetEntity.series})`;
    if (statTime) statTime.innerText = `${(60.0 - this.timer).toFixed(2)}s`;
    if (statQueries) statQueries.innerText = `${this.queriesCount} queries`;

    if (statAccuracy) {
      const acc = this.queriesCount > 0 ? Math.round((this.correctQueries / this.queriesCount) * 100) : 0;
      statAccuracy.innerText = `${acc}%`;
    }

    if (modal) modal.style.display = 'flex';

    if (isWin) {
      this.audio.playVictory();
    } else {
      this.audio.playDefeat();
    }
  }

  // --- UI Renders ---
  renderQueryDeck() {
    const container = document.getElementById('query-switches-container');
    if (!container) return;
    container.innerHTML = '';

    QUESTIONS.forEach((q) => {
      const isTested = this.testedQueries[q.id] !== undefined;
      const testedVal = this.testedQueries[q.id];

      const row = document.createElement('div');
      row.className = `query-row ${isTested ? 'tested' : ''}`;
      row.innerHTML = `
        <div class="query-info">
          <div class="query-label">${q.label}</div>
          <div class="query-desc">${q.desc}</div>
        </div>
        <div class="query-actions">
          <button class="btn-toggle ${isTested && testedVal === true ? 'active-yes' : ''}" 
                  ${isTested ? 'disabled' : ''} 
                  onclick="window.sieve.submitQuery('${q.id}', true)">
            YES
          </button>
          <button class="btn-toggle ${isTested && testedVal === false ? 'active-no' : ''}" 
                  ${isTested ? 'disabled' : ''} 
                  onclick="window.sieve.submitQuery('${q.id}', false)">
            NO
          </button>
        </div>
      `;
      container.appendChild(row);
    });
  }

  renderCandidateList() {
    const container = document.getElementById('candidates-list');
    const countBadge = document.getElementById('candidates-count-badge');
    if (countBadge) countBadge.innerText = `${this.candidates.length} ACTIVE`;

    if (!container) return;
    container.innerHTML = '';

    if (this.candidates.length === 0) {
      container.innerHTML = `<div style="padding: 16px; color: #ef4444; font-size: 11px;">[ANOMALY DETECTED] All candidates pruned. Trait collision error!</div>`;
      return;
    }

    this.candidates.slice(0, 35).forEach((ent) => {
      const isSingularity = this.candidates.length === 1;
      const card = document.createElement('div');
      card.className = `candidate-card ${isSingularity ? 'singularity' : ''}`;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <strong style="color: ${isSingularity ? '#10b981' : '#ededed'}; font-size: 12px;">${ent.name}</strong>
          <span style="font-size: 10px; color: #a1a1aa;">${ent.series}</span>
        </div>
        ${isSingularity ? `<div style="font-size: 10px; color: #10b981; margin-top: 4px;">// ${ent.note || 'Singularity node confirmed.'}</div>` : ''}
      `;
      container.appendChild(card);
    });

    if (this.candidates.length > 35) {
      const more = document.createElement('div');
      more.style.padding = '8px 12px';
      more.style.fontSize = '10px';
      more.style.color = '#71717a';
      more.innerText = `+ ${this.candidates.length - 35} more candidates matching current bitmask...`;
      container.appendChild(more);
    }
  }

  updateStatusHUD() {
    const bulkDisp = document.getElementById('status-bulkhead');
    const turretDisp = document.getElementById('status-turret');
    const overrideBtn = document.getElementById('btn-execute-override');

    if (bulkDisp) {
      bulkDisp.innerText = this.bulkheadEngaged ? 'BULKHEADS: LOCKED' : 'BULKHEADS: OPEN';
      bulkDisp.style.borderColor = this.bulkheadEngaged ? '#10b981' : '#262626';
      bulkDisp.style.color = this.bulkheadEngaged ? '#10b981' : '#a1a1aa';
    }

    if (turretDisp) {
      turretDisp.innerText = this.turretsEngaged ? 'TURRETS: ARMED' : 'TURRETS: STANDBY';
      turretDisp.style.borderColor = this.turretsEngaged ? '#3b82f6' : '#262626';
      turretDisp.style.color = this.turretsEngaged ? '#3b82f6' : '#a1a1aa';
    }

    if (overrideBtn) {
      if (this.candidates.length === 1) {
        overrideBtn.disabled = false;
        overrideBtn.style.background = '#10b981';
        overrideBtn.style.color = '#000000';
        overrideBtn.innerText = `EXECUTE CONTAINMENT OVERRIDE [${this.candidates[0].name.toUpperCase()}]`;
      } else {
        overrideBtn.disabled = true;
        overrideBtn.style.background = '#141414';
        overrideBtn.style.color = '#71717a';
        overrideBtn.innerText = `CONTAINMENT OVERRIDE: PRUNING REQUIRED (${this.candidates.length} CANDIDATES)`;
      }
    }
  }

  logTerminal(msg, isError = false) {
    const box = document.getElementById('terminal-log-box');
    if (!box) return;
    const timeStr = this.timer > 0 ? this.timer.toFixed(1) : '0.0';
    const line = document.createElement('div');
    line.style.marginBottom = '4px';
    line.style.color = isError ? '#ef4444' : '#a1a1aa';
    line.innerText = `[T-${timeStr}s] ${msg}`;
    box.prepend(line);

    // Keep log trim
    while (box.children.length > 20) {
      box.removeChild(box.lastChild);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.sieve = new SieveEngine();
  window.sieve.init();
});
