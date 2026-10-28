# Neural Sieve: 60s Protocol

A minimal dark-mode forensic triage puzzle and binary elimination game inspired by 60-second speedrun anime deduction protocols.

---

## 1. High Concept & Mechanics

An unknown entity has bypassed outer perimeter firewall filters and breached facility systems. Operators have exactly **60.00 seconds** of global clock time to query ontological and biometric trait bitmasks, prune the candidate database from 45+ target profiles down to a single singularity node, and execute the containment override before total facility collapse.

### Core Systems
- **60-Second Real-Time Countdown:** Continuous high-precision countdown loop.
- **Instant Bitmask Pruning:** Uses 64-bit style bitwise operations (`&`, `|`) across 8 orthogonal trait axes:
  - `POWERS`: Supernatural, magic, Stand, Chakra, Devil Fruit, or cursed energy
  - `DECEASED`: Canonically terminated in source continuity
  - `ACADEMIC`: Explicit student or teacher at an academy or school
  - `LEGACY`: Pre-2005 origin (legacy era vs modern era)
  - `HUMAN`: Pure biological human (not alien, curse, demon, vampire, titan, or elf)
  - `COMBAT`: Front-line martial brawler, swordsman, or assassin
  - `PROTAGONIST`: Titular lead or primary series protagonist
  - `MALE`: Male gender identification
- **Penalties & Defense Milestones:**
  - Inconsistent deduction: `-3.0s` penalty stall.
  - Candidate pool $\le 25$: Outer bulkheads lock (`+5.0s` grace bonus).
  - Candidate pool $\le 10$: Automated sentry turret grid armed.
  - Candidate pool $= 1$: Singularity isolated; containment override unlocked.
  - Premature override attempt: `-5.0s` penalty.

---

## 2. Technical Architecture

- **UI System:** Clean dark-mode SaaS interface (`#0a0a0a` background, `#111111` cards, `#262626` borders, strict 8px/16px spacing, zero glows, zero blurs).
- **Audio Engine:** Procedural Web Audio API synthesis (`src/audio.js`) generating low/high clicks, lockdown alarms, victory fanfares, and defeat buzzers without external audio assets.
- **Zero Dependencies:** Pure vanilla JavaScript, CSS3, and HTML5.
