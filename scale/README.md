# RESONANCE PING // HADAL TRENCH TARTARUS-7

A diegetic submarine simulation and asymmetric sensor combat game combining **scalar proximity triangulation / hot-cold semantic scoring** with **real-time analog submarine navigation and tactical weapons management**.

---

## Quick Start: Launching the Game

To launch the local game server:
```bash
python3 server.py
```
Or:
```bash
npm start
```
Then open your web browser to:
**`http://localhost:8080`**

---

## Core Game Systems & Cockpit Stations

### 1. Station 01: Acoustic Telemetry & Resonance Probe
* **Taxonomic Domain:** Select the biological or mineral classification (`Litho-Silicate`, `Chitin-Arthropodic`, `Bio-Electric Cephalopod`, `Abyssal Siphonophore`, `Crystalline Precursor`).
* **Structural Matrix:** Choose the micro-density and shell structure (`Segmented Carapace`, `Hydrostatic Gel`, `Piezo-Lattice`, etc.).
* **Metabolic Output:** Tune to the creature's energetic emission (`Cavitation Hydro-Jet`, `Piezoelectric Discharge`, `Thermal Endothermic`, etc.).
* **Carrier Frequency:** Fine-tune the frequency dial between **3.0 kHz (ELF)** and **30.0 kHz (VLF)**.
* **Azimuth Bearing:** Direct the acoustic transmitter cone (0° to 359°).
* **Discharge Probe [PING]:** Emits an active diagnostic sonar pulse. Returns a **Scalar Score from 0 to 100%**:
  * **0 - 39% (Acoustic Scatter):** Mismatch. Generates a deafening 25dB noise spike that alerts stalkers.
  * **40 - 69% (Faint Harmonic):** Isolates the quadrant and coarse depth stratum.
  * **70 - 89% (Sub-Harmonic Lock):** Unmasks wireframe bathymetry and entity contours.
  * **90 - 99% (Resonant Coherence):** **Unlocks weapons targeting computer** and exposes vulnerable ventral organs.
  * **100% (Harmonic Singularity):** Overloads the creature's nervous system, causing paralysis and internal cavitation vulnerability.

### 2. Station 02: Liquid Sodium Reactor & Acoustic Signature
* **Reactor Output:** Fixed pool of **100 Power Units (PU)** dynamically distributed across:
  * **Telemetry:** Speeds up sensor capacitor recharge and probe focus.
  * **Propulsion:** Governs maximum throttle and engine output.
  * **Ballast Pumps:** Dictates vertical dive/ascent speed.
  * **Weapons Bank:** Powers torpedo warming, tube flooding, and decoys.
  * **Life Support:** Drives oxygen generation and CO2 scrubbers.
* **Acoustic Noise Budget (dB):**
  * Ambient quiet: **35 dB**.
  * Propeller Cavitation: Triggered at speeds > 6.5 knots (+24 dB).
  * Stalker Aggro: Reached at **75 dB**.
  * Apex Charge: Triggered at **95 dB** (The Leviathan initiates a 28-knot ramming charge).
* **Silent Running:** Shuts down main reactor propulsion, cuts scrubbers, and runs on battery reserves (-20 dB acoustic reduction).

### 3. Station 03: Helm, Ballast & Oceanography
* **Throttle Telegraph:** Stop, 1/3 Slow (2 kts), 2/3 Standard (6 kts), and Flank (11.5 kts).
* **Dual Ballast Levers:** Controls Forward Ballast and Aft Ballast (Neutral buoyancy is ~50%).
* **Emergency Ballast Blow:** Blows all tanks to surface rapidly (generates loud acoustic noise).
* **Thermocline Layer (9,400m):** Submarines beneath this density inversion layer are acoustically shielded from entities above.

### 4. Station 04: Tactical Weapons & Oscilloscope
* **Target Calibration Gate:** Torpedoes fired at $R < 80\%$ suffer erratic hydrodynamic deflection or armor bounce. Achieving $R \ge 90\%$ provides 100% homing trajectory into the exposed ventral siphon.
* **Tube 1 (Hadal-8 Torpedo):** Heavy guided acoustic homing projectile.
* **Tube 2 (Acoustic Decoy):** Ejects an active 95 dB noisemaker buoy to lure charging stalkers away from your submarine.

---

## Project Structure
```
scale/
├── index.html       # Diegetic cockpit HUD & CRT monitors
├── css/
│  └── style.css      # Retro-analog styling, phosphor scanlines, CRT glow
├── js/
│  ├── audio.js      # Procedural Web Audio API sound synthesis engine
│  ├── telemetry.js    # Relational vector distance & taxonomic scoring engine
│  ├── subsystem.js    # Submarine physics, power bus & acoustic noise model
│  ├── entities.js     # Apex Leviathan & Stalker acoustic AI state machines
│  ├── combat.js      # Torpedo trajectories, target lock gates, decoys
│  ├── renderer.js     # Canvas 2D CRT waterfall spectrogram & bathymetry radar
│  └── game.js       # Main simulation coordinator & event loop
├── server.py        # Zero-dependency local web server
├── package.json      # ES module declaration
└── GDD_RESONANCE_PING.md  # Complete Master Game Design Document
```

---
*Built as a fully interactive prototype inspired by In Other Waters, Iron Lung, FTL, and Signal Head.*
