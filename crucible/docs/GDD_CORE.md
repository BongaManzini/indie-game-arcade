# Grand Cross: Crucible — Master Game Design Document (GDD)

**Project Name:** Grand Cross: Crucible 
**Genre:** Modular Asymmetric Auto-Brawler / Tactical Combat Arena 
**Perspective:** Senior Game Systems Architect & Combat Director 

---

## 1. High Concept & Thematic Engine
Instead of building a dozen disconnected combat systems, the game uses a unified, normalized physics and trait engine. Whether an ability comes from Jujutsu Kaisen, Dragon Ball Super, or One Piece, every component is translated into concrete gameplay tags:
- **Kinetic Velocity**
- **Poise / Stun**
- **Spatial Swap**
- **Aura Scaling**
- **Environmental Hazard Triggers**

### The Campaign / Scenario Matrix
Each run puts you into a distinct, high-stakes battlefield scenario with unique rule modifications:

| Scenario / Battlefield | Core Rule Modifier | Win / Elimination Condition | Environmental Threat |
| :--- | :--- | :--- | :--- |
| **Culling Games Colony (JJK)** | **Curse Energy & Barriers:** Teleportation and spatial swaps cost 50% less cooldown; high density of tight alleyways. | Accumulate 100 Colony Points by eliminating targets or survival extraction. | Roaming Cursed Spirits and static barrier walls that ricochet projectiles. |
| **Null Realm / Tournament of Power (DBS)** | **Anti-Flight & Ring-Out:** Gravity is locked; jumping has limited vertical height. Kinetic knockback is amplified by 2.5x. | **Ring-Out / Out of Bounds:** Pushing an enemy off the arena surface is an instant kill. | Destructible terrain; shrinking ring boundary over time. |
| **Marineford Ice Bay (One Piece)** | **Mass War & Freezing Ocean:** Sub-zero ice terrain gives low ground friction (sliding). Open water fractures instantly down Devil Fruit users. | Protect or assassinate the Flagship Execution Target within the round time limit. | Cannonball bombardments, tidal waves, cracking tectonic ice floes. |
| **Chimera Ant Palace (HxH)** | **Perception Dilation & En:** Fog of War covers the board; units only reveal enemy positions inside their sensory radius. | Infiltrate the throne room and neutralise the Royal Guard in sequence. | Structural collapse; high-speed ambush attacks from blind spots. |

---

## 2. The $15 Budget-Draft Engine
Before deploying into a chosen battlefield, the player faces a strict **$15 Resource Cap** across four modular sockets:

```
                                  [ $15 DRAFT POOL ]
                                           │
         ┌──────────────────┬──────────────┴─────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼
    [Technique]         [Hands]              [Speed]           [Teammate]
     ($1 – $5)          ($1 – $5)            ($1 – $5)          ($1 – $5)
```

### Socket 1: Core Technique (Active Gimmick & Cooldown)
- **$1 – Straw Doll / Hairpin:** Low damage, but hitting an enemy sticks a nail. Reactivating detonates all nails across the map, staggering targets regardless of distance.
- **$2 – Gum-Gum Balloon / Deflection:** Passive counter stance. Absorbs blunt projectiles and kinetic knockback, returning 70% force back to the attacker.
- **$3 – Boogie Woogie:** Swap positions with any enemy, ally, or projectile within a 15-meter radius on a 4-second cooldown. Instant poise interrupt.
- **$4 – Room / Shambles:** Spawns a 20-meter spherical domain. Inside the dome, dashes are instant blinks and incoming physical projectiles can be detached and redirected.
- **$5 – Disaster Flames / Hakai Compression:** Sustained screen-clearing AoE beam or volcanic eruptions with high armor-melting ticks. Immobilizes the caster during activation.

### Socket 2: Hands (CQC, Attack Strings, & Parrying)
- **$1 – Scrappy / Brawler (Hinata/Usopp level):** Simple 2-hit punch string. Low poise damage, but very fast animation recovery allowing rapid disengagements.
- **$2 – Military Striking (Annie Leonhart):** Muay Thai sweeps and low-center grappling. Converts successful hits into takedowns that pin targets to the ground for 1.5s.
- **$3 – Divergent Fist / Impact Brawling (Yuji Itadori):** Heavy, delayed second shockwave on every hit. Causes consecutive micro-staggers that interrupt enemy attack startups.
- **$4 – Destructive Fist (Akaza / Rokushiki):** Shockwave punches with 360-degree radial coverage. Can deflect basic melee attacks if timed within startup frames.
- **$5 – Sharingan Hand-to-Hand (Kakashi / Jin Mori):** Automated parry window during the first 6 frames of incoming strikes; successful counters place the player directly behind the opponent.

### Socket 3: Speed & Kinematics (Mobility & Physics)
- **$1 – ODM Hooking / Wire Momentum (Levi):** Slow ground running, but allows rapid linear wall-grappling and rope pivots off arena geometry.
- **$2 – Water Stream Agility (Tanjiro):** Smooth lateral dashes that leave momentary afterimages, shedding target locks.
- **$3 – Full Cowling (Deku 20%):** High sprint velocity and wall-bouncing. Converts momentum directly into extra damage on the first strike out of a sprint.
- **$4 – Weightless Gates (Rock Lee - 5th Gate):** Ground movement speed is tripled. Normal walking ignores environmental mud/ice friction entirely.
- **$5 – Godspeed / Instant Transmission (Killua / Goku):** True instant short-range blinks replacing normal dashes. Invulnerability frames (i-frames) during movement, consuming stamina per tick.

### Socket 4: Anchor / Teammate (AI Behavior Module)
- **$1 – Cursed Meatshield / Grunt:** High HP, zero offensive output. Aggressively body-blocks projectiles aimed at you and taunts nearby AI.
- **$2 – Support Healer / Enchanter (Dende / Chopper):** Stays at maximum distance. Pulses an aura every 8 seconds removing status effects (burn, bleed, stun).
- **$3 – Berserk Disruptor (Denji / Inosuke):** Uncontrollable aggro AI that relentlessly chases the enemy with the lowest health pool, forcing target switching.
- **$4 – Clone Tactician (Kid Naruto / Morel):** Spawns 3 fragile decoy clones that mimic your basic attack inputs, cluttering enemy targeting lines.
- **$5 – The Wildcard Apex (Top Comment / Raid Boss):** Spawns a high-tier NPC (e.g., Whitebeard, Sukuna, or Broly) that fights both teams indifferently, radically altering arena survival priorities.

---

## 3. Emergent Cross-Verse Synergies

### The "Pinball Ring-Out" (Tournament of Power)
- **Build:** Boogie Woogie ($3) + Rock Lee Speed ($4) + Divergent Fist ($3) + Clone Tactician ($4) = **$14 Total**.
- **Execution:** Run at maximum speed towards the arena boundary, hit a massive forward punch, and right before flying off the edge, activate Boogie Woogie to swap places with the enemy boss—launching them into the void while you safely take their center-stage position.

### The "Executioner Ice Trapper" (Marineford)
- **Build:** Room ($4) + Annie's Takedown ($2) + Godspeed ($5) + Grunt ($1) = **$12 Total**.
- **Execution:** Dash instantly across the freezing ice floe, take down an enemy Devil Fruit user, and cast Room to sever the ice floor beneath them, sending them straight into the sea.

---

## 4. Technical Architecture (Senior Dev Perspective)
To prototype this cleanly in an engine like Godot 4 or Unity (DOTS/ECS):

```
[Entity Root]
 ├── CharacterStats (Normalized: HP, Stamina, Mass, Poise)
 ├── KinematicMotorComponent  <-- Injected by Speed Selection ($1–$5)
 ├── CombatStringComponent    <-- Injected by Hands Selection ($1–$5)
 ├── ActiveSkillComponent     <-- Injected by Technique Selection ($1–$5)
 └── CompanionSpawner         <-- Instantiates Selected Teammate Prefab
```

- **Normalized Physics Motor:** Every character uses the same rigid-body physics controller. Speed items simply override `MaxVelocity`, `AccelerationCurve`, and `FrictionCoefficient`.
- **Hitbox & Hurtbox Buffering:** "Hands" are strictly animation packages with standardized collision frames and stun durations.
- **Event-Driven Skill Bridge:** Techniques do not care who executes them. `BoogieWoogie.Execute()` simply takes two `EntityID` pointers and swaps their `Transform.Position` while firing a camera shake event.
