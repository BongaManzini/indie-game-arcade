# Indie Game Arcade & Tactical Systems Lab

> **Author:** Bonga Manzini  
> **Live Arcade:** [https://bongamanzini.github.io/indie-game-arcade/](https://bongamanzini.github.io/indie-game-arcade/)  
> **Tech Stack:** Vanilla JavaScript, HTML5 Canvas2D, Web Audio API, Deterministic Vector Physics  
> **External Dependencies:** Zero (Pure Standards-Compliant Web Technologies)

---

## 1. Project Overview

The **Indie Game Arcade** is a unified browser gaming platform and systems engineering laboratory featuring four complete, playable games written entirely from scratch without external commercial game engines (like Unity, Unreal, or Godot).

Every graphic is drawn to an HTML5 Canvas, every sound effect (gunshots, sonar pings, explosions, parries) is synthesized on-the-fly via the Web Audio API, and physics interactions are computed deterministically.

---

## 2. Playable Game Roster

| Game | Folder | Genre | Core Mechanics & Innovation |
| :--- | :--- | :--- | :--- |
| **Connect5: Cipher Breach** | [`connect5/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/connect5/) | Tactical EW & Mech Grid Combat | Frequency SIGINT demodulation, harmonic bypass patchbay routing, 8x8 deterministic tactical grid combat, and boss telegraph displacement. |
| **Impostor: The Blightstead** | [`impostor/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/impostor/) | Gothic Agronomic Extraction | Closed-loop bio-industrial soil chemistry, living ammunition cultivation (Phosphor Flares, Kinetic Slugs, Suture Inhalers), raymarched 2D field-of-view flashlight beam, and extraction tether defense. |
| **Scale: Resonance Ping** | [`scale/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/scale/) | Hadal Trench Acoustic Combat | 11,000m bathyscaphe operations, hydrophone frequency modulation (ELF to VLF), LSTR-100 reactor power distribution, thermal cavitation avoidance, and deep-sea benthic aggro. |
| **Crucible: Zone 44 & Grand Cross** | [`crucible/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/crucible/) | Normalized Asymmetric Auto-Brawler | The Chunin Exams Zone 44 Forest of Death scroll extraction, 2.5x poise canopy ambush, and $15 Budget-Draft across 4 sockets (Technique, Hands, Speed, Teammate) with normalized physics. |

---

## 3. Systems Architecture

### 3.1 Procedural Web Audio API Synthesis
Instead of downloading multi-megabyte sound libraries or compressed MP3 files, each game instantiates an in-browser audio context using the native `AudioContext` interface:
- **Kinetic Impacts:** Short exponential pitch sweeps down from 160Hz to 30Hz using `OscillatorNode` with triangular and sawtooth wave shapes.
- **Explosions & Gunfire:** Low-pass filtered procedural white noise buffers generated via random floating-point arrays.
- **Sonar Hydrophone Pings:** High-Q sine wave bursts decaying exponentially with synthesized acoustic reverberation.
- **Domain Warps & Teleports:** Frequency-modulated sine waves with rapid pitch ascents.

### 3.2 Deterministic 2D Physics & ECS
- **Rigid-Body Kinematics:** Normalized position vectors, velocity damping, mass coefficients, and acceleration curves.
- **Poise & Guard Breaks:** Standardized poise meters prevent infinite stun loops. Breaking an opponent's poise inflicts a micro-stagger or knockback multiplier.
- **Raymarched FOV:** Uses angular raycasting across 2D occluders to compute real-time visibility polygons and volumetric darkness.

---

## 4. Directory Structure

```
games/
├── index.html            # Master Arcade Hub with fullscreen iframe runner
├── README.md             # Platform documentation & engine specs
├── connect5/             # Game 1: Cipher Breach
│   ├── index.html        # Cockpit EW interface
│   ├── css/              # Cockpit and 8x8 hologrid styles
│   └── js/               # SIGINT, tactics, and audio engines
├── impostor/             # Game 2: The Blightstead
│   ├── index.html        # Homestead & exclusion zone runner
│   ├── style.css         # Diegetic UI and modal styling
│   └── src/              # Agronomy, raymarched renderer, audio
├── scale/                # Game 3: Resonance Ping
│   ├── index.html        # Bathyscaphe bridge console
│   ├── css/              # Analog CRT styles
│   └── js/               # Hydrophone acoustics, reactor power, game loop
└── crucible/             # Game 4: Grand Cross Crucible
    ├── index.html        # $15 Draft Bay and combat arena
    ├── style.css         # Tactical cyberpunk layout
    ├── docs/             # GDD and scenario documentation
    └── src/              # Combat engine, audio synthesis, schemas
```

---

## 5. Running Locally

Because all games use standard HTML5 Canvas and vanilla JavaScript, they run out-of-the-box in any modern browser without requiring build steps, node modules, or compile pipelines.

To serve locally with Python's built-in HTTP server:
```bash
cd games
python3 -m http.server 8080
```
Then navigate to:
```
http://localhost:8080
```

---

## 6. Live Deployment

The arcade is deployed directly to GitHub Pages:
- **Live Arcade URL:** [https://bongamanzini.github.io/indie-game-arcade/](https://bongamanzini.github.io/indie-game-arcade/)
- **Individual Game Direct URLs:**
  - Connect5: `https://bongamanzini.github.io/indie-game-arcade/connect5/`
  - Impostor: `https://bongamanzini.github.io/indie-game-arcade/impostor/`
  - Scale: `https://bongamanzini.github.io/indie-game-arcade/scale/`
  - Crucible: `https://bongamanzini.github.io/indie-game-arcade/crucible/`
