# The Blightstead: Vertical Slice Prototype
**Genre Fusion:** Gothic Agronomy Simulator + Isometric Psychological Horror Extraction 
**Architecture:** Zero-dependency Canvas2D + Web Audio API + Pure Modular JavaScript 

## Quickstart

Run the game server with Python 3:

```bash
python3 run_game.py
```

Then open your browser to:
**http://localhost:8080** (or whichever port is printed)

Or simply open `index.html` directly in any modern browser (Chrome, Firefox, Edge, Safari).

---

## Controls

### Keyboard & Mouse
* **Move:** `W`, `A`, `S`, `D`
* **Aim / Flashlight Vector:** `Mouse Cursor`
* **Primary Action (Till / Water / Harvest / Fire Weapon):** `Left Mouse Button` (or `Space`)
* **Ready Tool / Aim Focus:** `Right Mouse Button` (or `Shift`)
* **Cycle Tools / Ammo:** `Q` / `E` (or `1`, `2`, `3`)
* **Inspect Soil / Flashlight Toggle:** `F`
* **Use Inhaler (Stamina / Sanity):** `R`
* **Interact (Apothecary / Compost / Airlock / Winch):** `E`

### Gamepad (DualShock / DualSense / Xbox)
* **Move:** Left Analog Stick
* **Aim / Focus:** Right Analog Stick
* **Primary Action:** Right Trigger (`RT` / `R2`)
* **Ready / Aim Focus:** Left Trigger (`LT` / `L2`)
* **Cycle Ammo / Tools:** Left / Right Bumpers (`LB` / `RB`)
* **Interact:** South Button (`A` / `X`)
* **Toggle Light / Metrics:** North Button (`Y` / `Triangle`)

---

## Core Systems & The Mechanical Bridge

1. **Morning: Homestead Phase**
   - **Soil Chemistry:** Monitor Moisture (%), Nitrogen (%), and Spore Contamination per grid tile.
   - **Crops:**
     - *Phosphor-Gourd:* Yields high-candela flares and blinding ammunition.
     - *Iron-Sap Reed:* Yields reinforcement resin and protective barricades.
     - *Cinnabar Pod:* Yields volatile concussion charges.
   - **Compost Vat:** Deposit monster organs extracted from the Zone into the vat to brew high-potency nitrogen slurry.
   - **Apothecary Bench:** Refine raw harvests into combat ammunition.

2. **The Decontamination Airlock**
   - Seamless physical boundary between the safe homestead and the anomalous Ossuary Zone.
   - Prepares player loadout, shifts lighting and procedural acoustic atmosphere.

3. **Night: Exclusion Zone Phase**
   - **Dynamic Line of Sight & Shadows:** Complete darkness outside your flashlight beam cone. Monsters conceal themselves in pitch-black shadow.
   - **Gloom-Shielded Entities:** Stalkers absorb kinetic impacts unless their shadow shroud is first stripped away with a Phosphor Flare or sustained light beam.
   - **Extraction Tether:** Activate the acoustic extraction winch and hold off waves of sound-attracted aberrations until extraction completes.
   - **Diegetic Stakes:** If you extract, your harvested mutant organs sustain your farm; if you perish, you wake up in the clinic with degraded soil and broken wards.
