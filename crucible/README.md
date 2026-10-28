# Grand Cross: Crucible

> **Modular Asymmetric Auto-Brawler / Tactical Combat Arena** 
> Built with a Normalized Physics Engine, Tagged Trait Matrix, and $15 Budget-Draft Mechanic.

---

## 1. High Concept & Thematic Engine
*Grand Cross: Crucible* unifies multi-verse anime combat mechanics into a standardized, deterministic physics and gameplay tag framework. Rather than implementing isolated rule systems for distinct franchises (e.g., Cursed Energy, Ki, Haki, Nen, Chakra), every attack, movement profile, and passive trait resolves through normalized attributes:

- **Kinetic Velocity & Vector Impulses** ($\text{m/s}$, angular momentum, mass coefficients)
- **Poise & Stun Thresholds** (Micro-stagger, guard break, wall bounce, ground pin)
- **Spatial Anchors & Swaps** (Point-to-point blinks, vector redirection, domain spheres)
- **Resource Siphoning & Lockouts** (Stamina, technique cooldown freeze, input dilation)
- **Environmental Hazard Triggers** (Ring-out void, drowning friction, miasma decay, structural collapse)

---

## 2. The $15 Budget-Draft Engine
Before deploying into an arena scenario, players assemble a combatant loadout under a strict **$15 Resource Cap** across four modular sockets:

```
                                  [ $15 DRAFT POOL ]
                                           │
         ┌──────────────────┬──────────────┴─────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼
    [Technique]         [Hands]              [Speed]           [Teammate]
     ($1 – $5)          ($1 – $5)            ($1 – $5)          ($1 – $5)
```

| Socket | Primary Role | Injected Component |
| :--- | :--- | :--- |
| **1. Technique** | Active Gimmick, Domain, Spatial Ability, Cooldown | `ActiveSkillComponent` |
| **2. Hands** | CQC Attack Strings, Parries, Guard Breaks, Frame Traps | `CombatStringComponent` |
| **3. Speed** | Kinematics, Acceleration Curves, Dash i-frames, Traversal | `KinematicMotorComponent` |
| **4. Teammate** | AI Companion, Zone Denial, Distraction, Apex Boss | `CompanionSpawner` |

---

## 3. Directory Structure
```
crucible/
├── docs/
│  ├── GDD_CORE.md        # Master GDD and core combat engine specification
│  └── scenarios/
│    ├── culling_games.md   # Scenario 1: Culling Games Colony (JJK)
│    ├── tournament_of_power.md# Scenario 2: Null Realm (DBS)
│    ├── marineford.md     # Scenario 3: Ice Bay (One Piece)
│    ├── chimera_palace.md   # Scenario 4: Chimera Ant Palace (HxH)
│    └── forest_of_death.md  # Scenario 5: Chunin Exams Zone 44 (Naruto)
└── src/
    └── schemas/
        ├── entity_components.json# Normalized ECS Component Schemas
        └── skill_specs.json      # Production-ready skill & hitbox frame data
```
