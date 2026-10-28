# Scenario Expansion: Zone 44 — The Forest of Death (Chunin Exams)

**Role:** Lead Systems Designer & Combat Director 
**Framework:** Grand Cross: Crucible — Normalized Cross-Verse Combat Engine 
**Theme:** Asymmetric Espionage, Multi-Tier Canopy Combat, Lethal Ambush Mechanics, and Scroll Economy

---

## 1. Scenario Design: Zone 44 (The Forest of Death)

### 1.1 Overview & Lore
A 20-kilometer radius sealed biome enclosed by 44 locked steel gates and giant ironwood trees reaching 100 meters into the sky. The battlefield is characterized by oppressive darkness under a dense canopy, treacherous swampland, and lethal apex wildlife.

```
       [ Tier 2: Crown Canopy ]        <-- High-Speed Aerial Wire Lines & Branch Sprints
                   │
       [ Tier 1: Middle Boughs ]       <-- Main Combat Paths, Foliage Ambush Zones
                   │
       [ Tier 0: Swamp / Root Net ]    <-- Mud Friction Penalty (-40%), Toxic Miasma, Apex Serpent
```

### 1.2 Core Rule Modifier: "Shadow Canopy & Chakra Friction"
- **3-Tier Verticality & Branch Traversal:**
  - **Tier 2 (Canopy, 40m–70m):** Thin interlocking branches. Running velocity is increased by $+15\%$, but poise stability is reduced by $-30\%$. Knocks off branches initiate high-altitude drops.
  - **Tier 1 (Boughs, 15m–40m):** Dense foliage zones. Entities inside leafy cover enter the **`[Hidden]`** state (invisible on radar/line-of-sight outside a 4m perimeter).
  - **Tier 0 (Root Swamps, 0m–15m):** Deep mud and murky water. Ground friction is doubled; standard dashes lose $-40\%$ linear impulse.
- **Ambush Multiplier (`[Hidden]` Attack Bonus):**
  - The first kinetic strike or technique initiated from `[Hidden]` state gains **$+150\%$ Poise Damage ($2.5\times$)** and afflicts the target with **`[Vulnerable]`** ($+25\%$ damage taken for 3.0s).

### 1.3 Win / Elimination Condition: "Scroll Siphon & Central Tower Extraction"
- **The Asymmetric Scroll Economy:**
  - At match initialization, $50\%$ of combatants spawn holding a **Heaven Scroll**, and $50\%$ spawn holding an **Earth Scroll** (visualized as a glowing back-mounted artifact).
  - **Forced Scroll Drop:** Inflicting a **Guard Break (Poise = 0)**, a **Ground Pin/Takedown**, or reducing a target's HP to 0 forces the scroll to drop onto the battlefield.
- **The Central Tower Extraction:**
  - Located at coordinates $(0, 0, \text{Tier } 1)$.
  - To claim victory, an operative must secure **both a Heaven Scroll and an Earth Scroll**, enter the Central Unsealing Sanctum (a 10m radius platform), and channel the unsealing altar for **10 continuous seconds** without being poise-broken or displaced.
  - **Alternative Victory:** Last surviving team/solo combatant remaining when the 300-second match clock expires.

### 1.4 Environmental Threats & Dynamic Hazards
1. **Giant Apex Serpent (Orochimaru's Summon):**
   - A 50-meter colossus patrolling Tier 0 swamp waters.
   - **Sound-Aggro Mechanic:** Emitting high acoustic decibels (explosions, sprint impacts $>25 \text{ m/s}$) triggers an aggro vector. The serpent lunges upward, swallowing targets in an 8-meter AoE (deals 60 DPS internal acid damage until allies deal 300 poise damage to its jaws to force a regurgitate).
2. **Paper Bomb Tripwires & Chakra Thread Traps:**
   - Procedurally spawned along narrow branch choke points.
   - Tripping a wire triggers a **0.8-second fuse indicator**, followed by a $500 \text{ N}$ explosive impulse that launches targets off tree limbs into Tier 0 and inflicts 180 Fire Damage.
3. **Toxic Miasma Hollows:**
   - Low-lying pockets of poisonous gas at Tier 0.
   - Cuts Stamina Regeneration by $-50\%$ and continuously corrodes Poise Shields at 12 Poise/sec.

---

## 2. Themed Socket Roster ($15 Draft System)

### Socket 1: Core Technique (Active Gimmick & Cooldown)

| Cost | Technique Name | Archetype / Source | Mechanical Description & Gameplay Tags | Balance Logic |
| :---: | :--- | :--- | :--- | :--- |
| **$1** | **Paper Bomb Kunai / Wire Detonation** | Tenten / Shikamaru | Fires 3 chakra-threaded kunai in a 35° spread (travel: 35 m/s). If any hit terrain or entities, reactivating triggers an immediate wire detonation. Deals 140 Fire Damage and inflicts `[Wire Tether]` (prevents dashing/jumping for 1.2s). Cooldown: **6.0s**. <br>`[Trap] [Tether] [Manual Detonation]` | Budget zoning tool; high utility, low raw damage. Punishes reckless dashers in tight branch corridors. |
| **$2** | **Shadow Clone Substitution (Kawarimi)** | Kakashi / Naruto | Reactive defensive stance with an active 0.45s guard window. Upon taking damage or on manual trigger, the user instantly vanishes in a smoke puff, leaving a decoy log that absorbs the impact, reappearing 6m backward/elevated with 0.4s i-frames. Cooldown: **11.0s**. <br>`[Evasion] [Log Decoy] [Aggro Shed]` | Invaluable panic button in an ambush scenario; moderate cooldown prevents spamming. |
| **$3** | **Shadow Possession (Kagemane no Jutsu)** | Shikamaru Nara | Casts an elastic shadow along the ground/branches up to 18m (speed: 26 m/s). Upon intersecting an enemy's shadow, both entities are synchronized in a hard bind for up to 3.5s. While bound, the enemy cannot move or input commands; user basic attacks inflict $100\%$ true mirrored damage to target. Cooldown: **16.0s**. <br>`[Hard CC] [Shadow Tether] [Damage Mirror]` | Extremely powerful team-enabling CC, balanced by self-rooting the caster during the channel. |
| **$4** | **Tsukuyomi (Perception Dilation)** | Itachi Uchiha | Target-locks a single enemy within 14m. Inflicts immediate psychological sensory dilation for 3.0s: target's movement speed drops by $-65\%$, their directional input vector is inverted (left becomes right, forward becomes back), and whiffed strikes deal 40 self-poise backlash. Cooldown: **22.0s**. <br>`[Input Inversion] [Slow] [Poise Backlash]` | Lethal debuff that disorients enemy reaction during high-stakes tree branch brawls. |
| **$5** | **Flying Thunder God (Hiraishin Formula)** | Minato Namikaze | Passive: All basic attacks, kunai, and dashes mark targets or terrain with a permanent Hiraishin seal (up to 6 marks active). Active: Instantly blinks (0-frame transition, 0 transit time) to any active seal on the map, granting Super Armor and a guaranteed critical hit ($+50\%$ damage) on arrival. Blinking resets dash cooldown. Cooldown: **8.0s (2 Charges)**. <br>`[Instant Teleport] [Map-Wide Range] [Super Armor Arrival]` | Ultimate spatial mastery. S-tier mobility and repositioning across vertical tiers. |

---

### Socket 2: Hands (CQC, Attack Strings, & Parrying)

| Cost | Combat String Name | Archetype / Source | Mechanical Description & Frame Data Profile | Balance Logic |
| :---: | :--- | :--- | :--- | :--- |
| **$1** | **Academy Taijutsu (Kunai Flurry)** | Basic Genin CQC | 3-hit rapid knife jab sequence. <br>• Startup: **5f**, Active: **3f**, Recovery: **4f**. <br>Deals low base poise damage (15/hit), but possesses near-zero recovery frames, allowing immediate dash/jump canceling on whiff or hit. <br>`[Rapid Recovery] [Cancelable] [Safe Whiff]` | Ultra-safe poking string for budget builds; cannot break heavy armor on its own. |
| **$2** | **Hidden Mist Silent Throat Slit** | Zabuza / Mist ANBU | Single high-commitment blade execution. <br>• Startup: **18f**, Active: **4f**, Recovery: **20f**. <br>Base damage: 90. When striking an opponent from their rear 120° cone or from `[Hidden]` foliage, deals **$3.5\times$ Strike Damage (315)** and **$4.0\times$ Poise Damage (320)**, causing an instant forced takedown. <br>`[Backstab Specialist] [Ambush Execution] [Ground Takedown]` | Brutal punish tool tailored for stealth play; high startup makes it risky in head-to-head neutral. |
| **$3** | **Gentle Fist (Tenketsu Strike)** | Hyuga Clan (Neji) | 4-hit internal palm strike string. Bypasses standard poise armor completely. Each strike punctures the internal chakra network, siphoning $15\%$ of current stamina and freezing active technique cooldowns for 1.0s per hit landed. Total string drains $60\%$ stamina and locks cooldowns for 4.0s. <br>`[True Armor Pierce] [Stamina Drain] [Cooldown Freeze]` | Dominates ability-reliant high-cost casters by locking their kits down. |
| **$4** | **Dynamic Entry (Strong Fist)** | Might Guy | Flying jump dropkick into a heavy leg sweep. <br>• Startup: **12f** with **Super Armor**. <br>Impulses caster forward at $22 \text{ m/s}$. Deals 180 Damage, shatters physical guards instantly, and launches targets backward with an $18 \text{ m/s}$ kinetic impulse (guaranteed wall-bounce on tree trunks). <br>`[Guard Break] [Kinetic Knockback] [Super Armor Startup]` | Aggressive anti-turtle gap closer; ideal for knocking targets off high-tier canopy branches. |
| **$5** | **Eight Gates: Morning Peacock (Asakujaku)** | 6th Gate Guy | 12-hit ultra-speed friction barrage. User's fists ignite atmospheric shockwaves, producing a 6-meter conical blast of fire projectiles. <br>• Startup: **8f**, completely uninterruptible. <br>Deals 480 total hybrid damage, melts $100\%$ target poise, and inflicts 4s of `[True Ignition]` (burns $5\%$ max HP/sec). <br>`[Multi-Hit Barrage] [Uninterruptible] [True Burn AoE]` | Absolute melee supremacy. Clears clusters of enemies and overwhelms all standard guards. |

---

### Socket 3: Speed & Kinematics (Mobility & Physics)

| Cost | Kinematic Profile | Archetype / Source | Physics Overrides & Traversal Mechanics | Balance Logic |
| :---: | :--- | :--- | :--- | :--- |
| **$1** | **Chakra Tree Adhesion & Branch Spring** | Basic Shinobi Traversal | Overrides standard vertical gravity on vertical surfaces: enables infinite $90^\circ$ wall-running up tree trunks. Sprint-jumping between branches consumes $-50\%$ less stamina and grants $+20\%$ landing recovery speed. <br>`[Vertical Adhesion] [Stamina Efficiency] [Fall Buffer]` | Cheap, essential vertical mobility; provides no burst combat speed or i-frames. |
| **$2** | **Body Flicker (Shunshin Burst)** | Shisui / ANBU Flicker | Replaces standard ground dodge with a high-velocity smoke burst ($24 \text{ m/s}$ instantaneous impulse over $0.22\text{s}$). Sheds homing projectile lock-ons and resets camera tracking of AI enemies. Low stamina cost. <br>`[Linear Velocity Burst] [Lock-On Break] [Smoke Veil]` | Efficient repositioning and escape tool; highly effective at breaking AI targeting. |
| **$3** | **Puppet Wire Slingshot** | Sasori / Kankuro | Fires dual retractable chakra filaments up to 25m to grapple onto branches, terrain, or opponents. Reeling in accelerates the player up to $32 \text{ m/s}$ along a parabolic 3D vector. Converts stored momentum directly into $+2.0\%$ bonus kinetic damage per $\text{m/s}$ of velocity on the first melee attack out of a swing. <br>`[3D Grappling] [Slingshot Physics] [Momentum Conversion]` | High skill ceiling; enables huge dynamic aerial dive attacks across tree layers. |
| **$4** | **Lightning Release Chakra Cloak** | Raikage / Sasuke | Passive: Sprint speed is increased by $+120\%$. Frontal arc deflects low-caliber projectiles (kunai, needles, bullets). Performing directional turns preserves $90\%$ of kinetic momentum (near-zero turning circle penalty) and leaves an electrified plasma trail that stuns pursuers for 0.6s. <br>`[Hyper Velocity] [Frontal Shield] [Sharp Vectoring] [Shock Trail]` | Relentless horizontal hunter mobility; dominates open branch corridors. |
| **$5** | **Kamui Phase Shifting** | Obito Uchiha | Active Toggle / Sprint Replacement: Tapping sprint phases the player's physical collision matrix into an alternate pocket dimension for up to **1.8 seconds**. While phased, the player is $100\%$ immune to physical/elemental damage, traps, tripwires, and terrain collisions while maintaining a constant $20 \text{ m/s}$ sprint speed. Cooldown: **3.0s** after phase exit. Consumes stamina per active tick. <br>`[True Intangibility] [Trap Immunity] [Hazard Bypass]` | Complete invulnerability traversal. Allows ignoring every environmental hazard and unsealing sanctum crossfire. |

---

### Socket 4: Anchor / Teammate (AI Behavior Module)

| Cost | Companion / AI Module | Archetype / Source | AI Behavior Routine & Special Abilities | Balance Logic |
| :---: | :--- | :--- | :--- | :--- |
| **$1** | **Tracking Hound (Ninken Pakkun)** | Kakashi Ninken Squad | Non-combat scout. HP: 120. Follows 5m behind player. Passively detects all hidden enemy operatives, dropped scrolls, and tripwire traps within a 45-meter radius, rendering their outline visible through fog, foliage, and solid tree trunks. <br>`[Wallhack / Sensor] [Scroll Radar] [Trap Detector]` | Pure macro intelligence at minimum cost; no combat offensive output. |
| **$2** | **Katsuyu Divisible Slug Attachment** | Lady Tsunade / Sakura | Parasitic symbioses companion mounted on the player's shoulder. <br>• Passive: Regenerates $+2.5\%$ max HP every 3.0s. <br>• Reactive Guard: If the player's poise is broken by a melee strike, Katsuyu instantly sprays an acid jet at the attacker, dealing 60 Acid Damage and micro-staggering them (interrupting combo extensions). <br>`[Passive Regeneration] [Combo-Breaker Counter]` | High survivability investment; saves budget builds from fatal infinite juggle combos. |
| **$3** | **Aburame Parasitic Insect Cloud (Kikaichu)** | Shino Aburame | Autonomous swarm orbiting the player in a 3m radius. When an enemy steps within 8m, the swarm automatically surges forward, latching onto the target. Deals 25 DPS, drains 15 stamina/sec, and accelerates the cooldown timer of the target's active techniques in reverse ($+1.5\text{s}$ added to cooldown per second latched). Swarm HP: 250. <br>`[Resource Siphon] [Zone Denial] [Cooldown Disruption]` | Suffocates caster and mobility builds by draining stamina and stalling abilities. |
| **$4** | **Puppet Specialist: Iron Sand Raven** | Sasori / Chiyo Puppet | Autonomous mechanoid combatant. HP: 450. Mirrors the player's attack inputs from an 8m offset angle. Attacks with poisoned scythes (applies stacking Neurotoxin: $-10\%$ move speed and 20 bleed DPS per stack, max 5). Can be commanded via Sub-Ability to self-destruct into a 10m cloud of paralyzing senbon needles (2.0s AoE Stun). <br>`[Off-Axis Mirroring] [Poison Stacking] [Manual Detonation Stun]` | High tactical pressure; creates dual-threat 2v1 positioning in narrow tree passages. |
| **$5** | **The Cursed Apex: Reanimated Shadow (Edo Tensei)** | Orochimaru Wildcard | Summons a tier-apex reanimated warrior (e.g., 2nd Hokage Tobirama or Kimimaro). HP: 1200 with passive HP regeneration (30 HP/s). Attacks all non-summoner entities indifferently, using high-tier water/bone techniques. <br>**Dynamic Aggro Priority:** Always targets the entity currently carrying both scrolls, or the player with the highest current HP pool. <br>`[Raid Boss Wildcard] [Indifferent Aggro] [Regenerative Meatshield]` | Alters match dynamics completely; forces opponents to flee or fight the raid boss while user secures extraction. |

---

## 3. Emergent Cross-Verse Synergies & Mathematical Proofs

### Build 1: "The Phantom Executioner" (Silent Ambush & Instant Extraction)
```
[ Socket 1: Flying Thunder God ($5) ] + [ Socket 2: Silent Throat Slit ($2) ]
[ Socket 3: Kamui Phase Shifting ($5) ] + [ Socket 4: Ninken Pakkun ($1) ]
──────────────────────────────────────────────────────────────────────────
TOTAL COST: $5 + $2 + $5 + $1 = $13 / $15 Budget ($2 Surplus / Katsuyu Option)
```

#### Mechanical Execution Loop:
1. **Target Acquisition:** Pakkun ($1) scans through the canopy, pinpointing the exact coordinates of the player or AI holding the missing Earth Scroll at 40m distance.
2. **Untouchable Approach:** Activate Kamui Phase Shifting ($3, $5). For 1.8 seconds, the player sprints at $20 \text{ m/s}$ through solid ironwood tree trunks and across paper-bomb tripwires with 100% intangibility, avoiding all trap triggers and noise emissions.
3. **Ambush Poise Shatter:** Emerge directly behind the target from Tier 1 foliage:
   - **Canopy Ambush Modifier:** $+150\%$ Poise Damage ($2.5\times$) + `[Vulnerable]` debuff ($+25\%$ incoming damage).
   - **Silent Throat Slit ($2) Rear Backstab:** Base Damage $90 \to 3.5\times$ backstab bonus = $315$ Base Kinetic Damage.
   - **Damage Math:**
     $$\text{Final Damage} = 315 \times 1.25\,(\text{Vulnerable}) = 393.75 \text{ Pure Strike Damage}$$
   - **Poise Calculation:**
     $$\text{Final Poise Damage} = \text{Base Poise }(80) \times 4.0\,(\text{Backstab}) \times 2.5\,(\text{Canopy Ambush}) = \mathbf{800 \text{ Poise Damage}}$$
   - *Result:* Standard entity maximum poise is normalized at $250 \text{ Poise}$. A single 800 poise impact instantly obliterates the poise bar, causes an automatic ground pin takedown, and forces an immediate **Forced Scroll Drop**.
4. **Instant Extraction Sequence:**
   - Landing the takedown embeds a **Hiraishin Mark ($5)** on the target and ground.
   - Snatch the dropped scroll.
   - Trigger Flying Thunder God ($5$) to teleport across the map directly to an altar mark pre-placed at the Central Tower Sanctum.
   - Reactivate Kamui Phase Shifting to remain phased and immune during the first 1.8 seconds of the unsealing channel.

#### Counter & Vulnerability:
- **Hard Counter: Gentle Fist ($3) + Aburame Insect Cloud ($3)**
  - If intercepted by an insect swarm or tenketsu strike, the build's stamina pool is instantly drained. Kamui Phasing and Flying Thunder God require active stamina to execute. Without phasing, the build has a standard fragile glass-cannon statline ($100$ HP, zero passive armor) and will collapse under sustained pressure.

---

### Build 2: "The Tenketsu Cooldown Suffocator" (Resource Lockout & Loop Freeze)
```
[ Socket 1: Shadow Possession ($3) ] + [ Socket 2: Gentle Fist ($3) ]
[ Socket 3: Puppet Wire Slingshot ($3) ] + [ Socket 4: Aburame Insect Cloud ($3) ]
──────────────────────────────────────────────────────────────────────────
TOTAL COST: $3 + $3 + $3 + $3 = $12 / $15 Budget ($3 Surplus for Speed/Hands Upgrade)
```

#### Mechanical Execution Loop:
1. **Kinetic Slingshot Initiation:**
   - Latch Puppet Wire ($3$) onto a high canopy branch 25m overhead and accelerate downward into a slingshot arc at $32 \text{ m/s}$.
   - **Momentum to Damage Formula:** $+2.0\%$ bonus damage per $\text{m/s}$ of velocity:
     $$\text{Bonus Damage} = 32 \times 2.0\% = +64\% \text{ Additive Kinetic Multiplier}$$
   - Slam into target: inflicts 164 damage and a 35-frame hitstun stagger.
2. **Frame-Trap into Shadow Possession:**
   - Cancel landing recovery frames immediately into **Shadow Possession ($3$)**. Target is in hitstun and cannot dodge.
   - Target is hard-tethered for **3.50 seconds** (unable to move, turn, or activate skills).
3. **Tenketsu Chakra Sealing & Cooldown Lockdown:**
   - Caster steps forward and unloads the 4-hit Gentle Fist ($3$) string into the bound target:
     - 4 hits $\times 15\%$ stamina drain = **$60\%$ Instant Stamina Depletion**.
     - 4 hits $\times 1.0\text{s}$ cooldown lockout = **$+4.0\text{s}$ Frozen Cooldown**.
4. **Parasitic Insect Swarm Depletion:**
   - While the enemy is bound, the autonomous Aburame Swarm ($3$) latches onto the target:
     - Over 3.5 seconds of tether: drains $3.5 \times 15 = 52.5$ Stamina (completely emptying any remaining stamina pool).
     - Adds $+1.5\text{s}$ cooldown delay per second: $3.5 \times 1.5 = +5.25\text{s}$ additional cooldown lockout.
   - **Total Cooldown Math:**
     $$\text{Total Active Cooldown Stalled} = 4.0\text{s} + 5.25\text{s} = \mathbf{9.25 \text{ Seconds of Complete Skill Quarantining}}$$
   - *Result:* The target is at $0\%$ stamina (cannot sprint, roll, or jump) and their core technique and defensive evasions are frozen for nearly 10 seconds. In the lethal environment of the Forest of Death, an immobile, silenced enemy is helpless against tripwires or the roaming Giant Serpent.

#### Counter & Vulnerability:
- **Hard Counter: Morning Peacock ($5$) or Dynamic Entry ($4$)**
  - High-tier physical strike strings feature **Startup Super Armor**. If the opponent buffers Dynamic Entry or Morning Peacock prior to the wire landing, their super armor ignores the initial hitstun, interrupts the Shadow Possession startup, and counter-launches the user with massive kinetic force.

---

## 4. Entity Component Specs (Production-Ready Architecture)

To implement this deterministically in Godot 4 (C# / GDExtension) or Unity DOTS (ECS), here are the exact data structures and frame data specifications for **$1 Paper Bomb Kunai** (Budget) and **$5 Flying Thunder God** (High-End).

### 4.1 Component Data Schema (C# / ECS)

```csharp
namespace Crucible.Core.Combat
{
    // Normalized Entity Core Stats
    public struct CharacterStats
    {
        public float MaxHP;             // e.g., 500.0f
        public float CurrentHP;
        public float MaxStamina;        // e.g., 100.0f
        public float CurrentStamina;
        public float MaxPoise;          // Normalized: 250.0f
        public float CurrentPoise;
        public float PoiseRegenRate;    // Normalized: 25.0f / sec
        public float MassKg;            // Normalized: 75.0f
    }

    // Kinematic Motor State
    public struct KinematicMotorComponent
    {
        public Vector3 Velocity;
        public float BaseSprintSpeed;   // Standard: 10.0 m/s
        public float Acceleration;      // Standard: 35.0 m/s^2
        public float GroundFriction;    // 1.0 = normal, 2.0 = mud, 0.1 = ice
        public bool IsPhasing;          // If true, bypass hurtbox / hazard collision
        public float PhasingDurationRemaining;
    }

    // Active Skill State (Technique Socket)
    public struct ActiveSkillComponent
    {
        public int SkillID;
        public string SkillName;
        public float CooldownDuration;
        public float CurrentCooldown;
        public int MaxCharges;
        public int AvailableCharges;
        public bool IsChanneling;
        public float ChannelTimeRemaining;
    }

    // Standardized Hitbox Data Frame Definition (60 FPS Basis)
    public struct HitboxFrameData
    {
        public int StartupFrames;       // Frames before hitbox is active
        public int ActiveFrames;        // Active collision frames
        public int RecoveryFrames;      // End-lag frames before input unlock
        public float BaseDamage;
        public float PoiseDamage;
        public Vector3 KnockbackImpulse; // Kinetic impulse in Newton-seconds
        public float HitstunDuration;   // In seconds
        public uint CollisionMask;      // Target layers
    }
}
```

---

### 4.2 Production Specification: $1 Budget Skill (Paper Bomb Kunai)

```json
{
  "skill_id": "tech_01_paper_bomb_kunai",
  "name": "Paper Bomb Kunai / Wire Detonation",
  "cost": 1,
  "cooldown_seconds": 6.0,
  "stamina_cost": 15.0,
  "charges": 1,
  "targeting_type": "PROJECTILE_CONE",
  "execution_profile": {
    "startup_frames": 8,
    "active_frames": 24,
    "recovery_frames": 10,
    "projectile_count": 3,
    "spread_angle_degrees": 35.0,
    "projectile_velocity_mps": 35.0,
    "projectile_lifetime_seconds": 1.2,
    "projectile_gravity_scale": 0.2
  },
  "impact_payload": {
    "initial_impact_damage": 30.0,
    "initial_poise_damage": 20.0,
    "applies_tag": "TAG_WIRE_ATTACHED",
    "wire_max_length_meters": 22.0
  },
  "detonation_payload": {
    "trigger_type": "MANUAL_OR_TIMEOUT",
    "timeout_seconds": 4.0,
    "blast_radius_meters": 3.8,
    "blast_damage": 110.0,
    "blast_poise_damage": 75.0,
    "knockback_impulse_vector": { "x": 0.0, "y": 250.0, "z": 350.0 },
    "hitstun_duration_seconds": 1.2,
    "status_effects": [
      {
        "effect_id": "STATUS_WIRE_TETHER",
        "duration_seconds": 1.2,
        "blocks_actions": ["ACTION_DASH", "ACTION_JUMP"],
        "speed_penalty_percent": 0.50
      }
    ]
  }
}
```

---

### 4.3 Production Specification: $5 High-End Skill (Flying Thunder God)

```json
{
  "skill_id": "tech_05_flying_thunder_god",
  "name": "Flying Thunder God (Hiraishin Formula)",
  "cost": 5,
  "cooldown_seconds": 8.0,
  "stamina_cost": 25.0,
  "charges": 2,
  "targeting_type": "SPATIAL_ANCHOR_SELECT",
  "passive_marking_rules": {
    "mark_tag": "TAG_HIRAISHIN_FORMULA",
    "mark_duration_seconds": 30.0,
    "max_active_marks": 6,
    "marked_sources": [
      "SOURCE_MELEE_HIT",
      "SOURCE_PROJECTILE_HIT",
      "SOURCE_DASH_ORIGIN"
    ]
  },
  "execution_profile": {
    "startup_frames": 0,
    "active_frames": 1,
    "recovery_frames": 6,
    "spatial_transit_time_seconds": 0.0,
    "camera_snap_smoothing_factor": 0.15,
    "reset_dash_cooldown_on_teleport": true
  },
  "arrival_payload": {
    "arrival_invulnerability_frames": 4,
    "grants_super_armor_duration_seconds": 0.8,
    "guaranteed_critical_multiplier": 1.5,
    "arrival_shockwave": {
      "radius_meters": 2.5,
      "damage": 50.0,
      "poise_damage": 120.0,
      "radial_push_impulse": 300.0,
      "hitstun_duration_seconds": 0.45
    }
  }
}
```

---

## 5. Architectural Integration Checklist
- [x] **Normalized Motor Validation:** Speed component sets `BaseSprintSpeed` and physics modifiers without requiring custom character controller scripts.
- [x] **Frame-Data Precision:** All animation timings calibrated at 60Hz tick rates.
- [x] **Event-Driven Combat Bridge:** Techniques use decoupling tags (`TAG_WIRE_ATTACHED`, `TAG_HIRAISHIN_FORMULA`), allowing any entity in the arena (players, clones, enemies) to interact with marks deterministically.
- [x] **Dynamic Economy Balance:** Hard cap of $15 prevents stacking multiple S-tier abilities, enforcing tactical trade-offs between mobility, survivability, and raw burst lethality.
