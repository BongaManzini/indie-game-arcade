# Indie Game Arcade & Tactical Systems Lab

> **Author:** Bonga Manzini  
> **Live Arcade:** [https://bongamanzini.github.io/indie-game-arcade/](https://bongamanzini.github.io/indie-game-arcade/)  
> **Tech Stack:** Vanilla JavaScript, HTML5 Canvas2D, Web Audio API, Deterministic Vector Physics  
> **External Dependencies:** Zero (Pure Standards-Compliant Web Technologies)

---

## 1. Project Overview

The **Indie Game Arcade** is a unified browser gaming platform and systems engineering laboratory featuring five complete, playable games written entirely from scratch without external commercial game engines (like Unity, Unreal, or Godot).

Every graphic is drawn to an HTML5 Canvas, every sound effect (gunshots, sonar pings, explosions, parries) is synthesized on-the-fly via the Web Audio API, and physics interactions are computed deterministically.

---

## 2. Playable Game Roster

| Game | Folder | Genre | Core Mechanics |
| :--- | :--- | :--- | :--- |
| **Connect 5!** | [`connect5/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/connect5/) | Contextual Numeric Decryption | Given an anime character and 5 raw stats/numbers (e.g. 1st, 5th, 705.2m), deduce the canonical fact behind each before accumulating 3 strikes. |
| **Anime Imposter** | [`impostor/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/impostor/) | Social Deduction & Word Cues | Everyone knows the secret anime character except the Imposter. Drop single-word clues, cross-examine the table, vote, and attempt last-second character steal guesses. |
| **Scale Versus** | [`scale/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/scale/) | 1–100 Hot & Cold Proximity | Triangulate a secret character by submitting character pings. The game provides a scalar 1 to 100 proximity score based on universe, squad, powers, and traits. |
| **Crucible: $15 Draft** | [`crucible/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/crucible/) | $15 Budget Loadout & Battle Simulator | Draft a 4-socket loadout (Technique, Hands, Speed, Ally) staying under the $15 limit, then simulate match outcomes in Zone 44 Forest of Death or Culling Games. |
| **60s Speedrun** | [`sieve/`](file:///home/bongamanzini/Documents/Coding%20Projects/games/sieve/) | 60s Rapid 20-Questions | Rapid binary triage against a live 60-second countdown clock to isolate the secret character and dodge classic anime trap profiles. |

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
├── crucible/             # Game 4: Grand Cross Crucible
│   ├── index.html        # $15 Draft Bay and combat arena
│   ├── style.css         # Tactical cyberpunk layout
│   ├── docs/             # GDD and scenario documentation
│   └── src/              # Combat engine, audio synthesis, schemas
└── sieve/                # Game 5: Neural Sieve: 60s Protocol
    ├── index.html        # Forensic triage console
    ├── style.css         # Minimal dark-mode SaaS interface
    ├── README.md         # GDD and bitmask architecture specs
    └── src/              # Bitmask filter engine and procedural Web Audio
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
  - Neural Sieve: `https://bongamanzini.github.io/indie-game-arcade/sieve/`

