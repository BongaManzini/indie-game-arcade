# CIPHER BREACH - Playable Prototype

A multi-genre hybrid combining **Numeric Context Decryption (Stat-Deduction)** with a **Deterministic Grid Tactics Mech Simulator**.

---

## Quick Start (Play in Browser)

Because the prototype is built with pure, self-contained HTML5, CSS3, ES6 Modules, and the Web Audio API, there are **no external dependencies or build steps required**.

### Option A: Local Python Web Server (Recommended)
From this project directory, run:
```bash
python3 -m http.server 8085
```
Then navigate to:
```
http://localhost:8085
```

### Option B: Node.js / `npx serve`
```bash
npx serve .
```

### Option C: Direct Browser Opening
You can also open `index.html` directly in modern web browsers (Chrome, Firefox, Safari, Edge) that permit local ES6 module loading.

---

## How to Play

### 1. Macro Decryption Phase (Left Panel - SIGINT Interception Deck)
1. **Inspect Raw Registers:** High-value enemy units leak unlabelled telemetry numbers (e.g. `[2]`, `[14]`, `[45]`, `[88.4]`).
2. **Cross-Reference Sensor Clues:** Read the **Sensor Intel & Field Manual** drawer (e.g. anchor claws deployed, radiator turbines active, decimal azimuths).
3. **Route Sockets:** Click a raw number pill to select it, then click an empty parameter socket in the patch-bay (`MASS RATING`, `VENT LIMIT`, `CELL CORE`, `CALIB. ANGLE`).
4. **Initiate Harmonic Bypass:** Click `[ INITIATE HARMONIC BYPASS ]`.
   - **Correct Parity:** Enemy Flux-Plating drops to 0, weakpoint sub-cells light up on the battlefield, and +1 EX-Cycle is awarded.
   - **Checksum Error:** Telemetry buffer burns -25% integrity.

### 2. Micro Grid Tactics Phase (Right Panel - Hologrid)
1. **Analyze Telegraphed Enemy Attacks:** Red warning zones show precisely where the boss's twin Spinal Railguns will fire at the end of the turn.
2. **Select Player Mechs:**
   - **P1: SIG-Striker:** Equipped with *Kinetic Piston Ram* ($50\text{ kN}$ Force). Once the boss's mass ($45\text{ kN}$) is decoded, punching it shunts its chassis 1 tile sideways, diverting its railgun away from the civilian reactor!
   - **P2: SIG-Aegis:** Equipped with *Magnetic Winch* (pulls targets 2 tiles toward self).
   - **P3: SIG-Arbiter:** Equipped with *Sub-Orbital Mortar* ($8\text{ Damage} + 15\text{ MJ Heat}$). Hitting the exposed weakpoint deals $2\times$ critical damage ($16\text{ Dmg}$), and exceeding the vent limit ($14\text{ MJ}$) triggers an automatic **Vent Cascade Stun**, shutting down the railgun!
3. **Execute Turn:** Click `[ EXECUTE TURN ]` to commit the turn and witness the deterministic outcome.

---

## File Architecture
```
connect5/
├── index.html         # Cockpit HUD Layout
├── css/
│  ├── cockpit.css      # CRT Scanlines, Phosphor HUD, Sockets
│  └── grid.css        # 8x8 Grid, Telegraphs, Weakpoint Glyphs
├── js/
│  ├── audio.js        # Procedural Web Audio API sound synthesizer
│  ├── telemetry.js      # Decryption engine & patch-bay logic
│  ├── tactics.js       # 8x8 grid & displacement physics
│  ├── scenarios.js      # GORGO-09 Boss & Tutorial mission data
│  └── main.js        # Game coordinator & UI bindings
├── CIPHER_BREACH_GDD.md    # Comprehensive Game Design Document
└── README.md         # This file
```
