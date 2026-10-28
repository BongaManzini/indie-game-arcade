// tactics.js - Deterministic 8x8 Tactical Grid & Displacement Physics Engine for Cipher Breach
import { audio } from './audio.js';

export const CELL_TYPES = {
    CLEAR: 'clear',
    MOUNTAIN: 'mountain',
    WATER: 'water',
    OBJECTIVE: 'objective'
};

export class TacticsEngine {
    constructor() {
        this.width = 8;
        this.height = 8;
        this.grid = [];
        this.playerUnits = [];
        this.enemyUnits = [];
        this.objectives = [];
        this.selectedUnitId = null;
        this.selectedAction = null; // 'MOVE', 'PISTON', 'WINCH', 'MORTAR'
        this.actionLog = [];
        this.onGridUpdate = null;
        this.onCombatEvent = null;
    }

    initBoard(scenario) {
        this.grid = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push({ x, y, type: CELL_TYPES.CLEAR, hazard: null });
            }
            this.grid.push(row);
        }

        // Apply terrain
        if (scenario.mountains) {
            scenario.mountains.forEach(m => {
                if (this.isValidCoord(m.x, m.y)) this.grid[m.y][m.x].type = CELL_TYPES.MOUNTAIN;
            });
        }
        if (scenario.water) {
            scenario.water.forEach(w => {
                if (this.isValidCoord(w.x, w.y)) this.grid[w.y][w.x].type = CELL_TYPES.WATER;
            });
        }

        // Copy units
        this.playerUnits = JSON.parse(JSON.stringify(scenario.playerUnits));
        this.enemyUnits = JSON.parse(JSON.stringify(scenario.enemyUnits));
        this.objectives = JSON.parse(JSON.stringify(scenario.objectives || []));

        // Mark objectives on grid
        this.objectives.forEach(obj => {
            obj.tiles.forEach(t => {
                if (this.isValidCoord(t.x, t.y)) this.grid[t.y][t.x].type = CELL_TYPES.OBJECTIVE;
            });
        });

        this.selectedUnitId = this.playerUnits[0]?.id || null;
        this.selectedAction = 'MOVE';
        this.actionLog = ['COMBAT INITIALIZED: Hostile Acro-Frame detected. Dynamic Flux-Plating active.'];
        this.updateTelegraphs();
        this.notify();
    }

    isValidCoord(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    getUnitAt(x, y) {
        // Player units are 1x1
        for (const p of this.playerUnits) {
            if (p.hp > 0 && p.x === x && p.y === y) return p;
        }
        // Enemy units can have footprints
        for (const e of this.enemyUnits) {
            if (e.hp <= 0) continue;
            const w = e.footprint?.width || 1;
            const h = e.footprint?.height || 1;
            if (x >= e.x && x < e.x + w && y >= e.y && y < e.y + h) {
                return e;
            }
        }
        return null;
    }

    isTileBlocked(x, y, ignoreUnitId = null) {
        if (!this.isValidCoord(x, y)) return true;
        const cell = this.grid[y][x];
        if (cell.type === CELL_TYPES.MOUNTAIN) return true;

        const unit = this.getUnitAt(x, y);
        if (unit && unit.id !== ignoreUnitId) return true;

        return false;
    }

    selectUnit(unitId) {
        this.selectedUnitId = unitId;
        this.selectedAction = 'MOVE';
        audio.playClick();
        this.notify();
    }

    setAction(actionName) {
        this.selectedAction = actionName;
        audio.playClick();
        this.notify();
    }

    // Update enemy intent telegraph lines
    updateTelegraphs() {
        this.enemyUnits.forEach(enemy => {
            if (enemy.hp <= 0 || enemy.isStunned) {
                enemy.telegraphedTiles = [];
                return;
            }

            const tiles = [];
            const w = enemy.footprint?.width || 1;
            const h = enemy.footprint?.height || 1;

            if (enemy.intentType === 'COLUMNS_FORWARD') {
                // Spinal railgun down all occupied columns starting in front of enemy
                for (let col = enemy.x; col < enemy.x + w; col++) {
                    for (let row = enemy.y + h; row < this.height; row++) {
                        if (this.isValidCoord(col, row)) {
                            tiles.push({ x: col, y: row });
                        }
                    }
                }
            } else if (enemy.intentType === 'MELEE_CHARGE') {
                // Charges forward 2 tiles
                const targetY = enemy.y + 1;
                if (this.isValidCoord(enemy.x, targetY)) {
                    tiles.push({ x: enemy.x, y: targetY });
                }
            }

            enemy.telegraphedTiles = tiles;
        });
    }

    // Apply Telemetry Decryption results to Enemy Units
    applyTelemetryBypass(targetUnitId, bindings) {
        const enemy = this.enemyUnits.find(e => e.id === targetUnitId);
        if (!enemy) return;

        enemy.isShielded = false;
        enemy.resolvedParams = { ...bindings };
        
        // Expose weakpoint tile
        if (bindings.PARAM_CELL !== undefined) {
            const w = enemy.footprint?.width || 1;
            const cellIdx = bindings.PARAM_CELL;
            let localX = (cellIdx - 1) % w;
            let localY = Math.floor((cellIdx - 1) / w);
            // On GORGO-09 (2x2), Cell 2 specifically maps to bottom-right quadrant (local offset 1, 1) as per Manual Section 7.4
            if (w === 2 && cellIdx === 2) {
                localX = 1;
                localY = 1;
            }
            enemy.weakpointCoord = { x: enemy.x + localX, y: enemy.y + localY };
        }

        this.logEvent(`[SIGINT HARMONIC BYPASS] ${enemy.name} shields collapsed. Weakpoint exposed. Physics unlocked.`);
        this.notify();
    }

    // Player action: Move unit
    moveUnit(unitId, targetX, targetY) {
        const unit = this.playerUnits.find(u => u.id === unitId);
        if (!unit || unit.ap < 1) return false;

        // Check orthogonal distance
        const dist = Math.abs(unit.x - targetX) + Math.abs(unit.y - targetY);
        if (dist > unit.moveRange || dist === 0) return false;

        // Target cannot be blocked
        if (this.isTileBlocked(targetX, targetY, unit.id)) return false;

        unit.x = targetX;
        unit.y = targetY;
        unit.ap -= 1;
        audio.playStep();
        this.logEvent(`${unit.name} repositioned to [${String.fromCharCode(65 + targetX)}${targetY + 1}].`);
        this.notify();
        return true;
    }

    // Player action: Kinetic Piston Ram (Striker P1)
    executePistonRam(targetX, targetY) {
        const striker = this.playerUnits.find(u => u.id === 'P1');
        if (!striker || striker.ap < 1) return false;

        // Must be adjacent orthogonal
        const dx = targetX - striker.x;
        const dy = targetY - striker.y;
        if (Math.abs(dx) + Math.abs(dy) !== 1) return false;

        const targetUnit = this.getUnitAt(targetX, targetY);
        if (!targetUnit) return false;

        striker.ap -= 1;
        audio.playPiston();

        // Calculate push resistance
        let effectiveMass = 999; // If shielded or mass not decoded
        if (targetUnit.resolvedParams && targetUnit.resolvedParams.PARAM_MASS !== undefined) {
            effectiveMass = targetUnit.resolvedParams.PARAM_MASS;
        } else if (!targetUnit.isShielded && targetUnit.inherentMass) {
            effectiveMass = targetUnit.inherentMass;
        }

        const weaponForce = 50.0; // kN
        const excessForce = weaponForce - effectiveMass;
        const pushDistance = excessForce > 0 ? Math.floor(excessForce / 5.0) : 0;

        this.logEvent(`[KINETIC RAM] Force: ${weaponForce} kN vs Target Mass: ${effectiveMass} kN -> Net Excess: ${excessForce} kN (${pushDistance} tile push).`);

        // Damage calculation
        let damage = 2;
        if (targetUnit.isShielded) {
            damage = 0;
            this.logEvent(`DEFLECTED: ${targetUnit.name} Flux-Plating absorbed kinetic shockwave.`);
        } else {
            targetUnit.hp = Math.max(0, targetUnit.hp - damage);
        }

        // Apply knockback
        if (pushDistance > 0) {
            this.displaceUnit(targetUnit, dx, dy, pushDistance);
        }

        this.updateTelegraphs();
        this.notify();
        return true;
    }

    // Player action: Magnetic Winch (Aegis P2)
    executeMagWinch(targetX, targetY) {
        const aegis = this.playerUnits.find(u => u.id === 'P2');
        if (!aegis || aegis.ap < 1) return false;

        const dx = targetX - aegis.x;
        const dy = targetY - aegis.y;

        // Straight line check up to 3 tiles
        if (!((dx === 0 && Math.abs(dy) <= 3) || (dy === 0 && Math.abs(dx) <= 3))) return false;

        const targetUnit = this.getUnitAt(targetX, targetY);
        if (!targetUnit) return false;

        aegis.ap -= 1;
        audio.playPlugIn();

        const pullDirX = dx === 0 ? 0 : (dx > 0 ? -1 : 1);
        const pullDirY = dy === 0 ? 0 : (dy > 0 ? -1 : 1);

        this.logEvent(`[MAG-WINCH] Grappling cable latched to ${targetUnit.name}. Pulling 2 tiles inward.`);
        this.displaceUnit(targetUnit, pullDirX, pullDirY, 2);

        this.updateTelegraphs();
        this.notify();
        return true;
    }

    // Player action: Sub-Orbital Mortar (Arbiter P3)
    executeOrbitalMortar(targetX, targetY, isCalibrated) {
        const arbiter = this.playerUnits.find(u => u.id === 'P3');
        if (!arbiter || arbiter.ap < 1) return false;

        if (!isCalibrated) {
            this.logEvent('CALIBRATION ERROR: Mortar trajectory uncalibrated! Assign PARAM_ANGLE first.');
            audio.playErrorBuzz();
            return false;
        }

        arbiter.ap -= 1;
        audio.playMortar();

        const targetUnit = this.getUnitAt(targetX, targetY);
        let baseDamage = 8;
        const heatOutput = 15; // MJ

        if (targetUnit) {
            // Check if hitting exposed weakpoint
            let isWeakpointHit = false;
            if (targetUnit.weakpointCoord && targetUnit.weakpointCoord.x === targetX && targetUnit.weakpointCoord.y === targetY) {
                isWeakpointHit = true;
                baseDamage *= 2;
                this.logEvent(`CRITICAL DIRECT HIT! Mortar penetrated exposed Core Sub-Cell at [${String.fromCharCode(65 + targetX)}${targetY + 1}]. 2x Damage applied!`);
            }

            if (targetUnit.isShielded) {
                this.logEvent(`SHIELD BLOCKED: Target barrier absorbed orbital warhead.`);
            } else {
                targetUnit.hp = Math.max(0, targetUnit.hp - baseDamage);
                this.logEvent(`${targetUnit.name} sustained ${baseDamage} explosive damage! (HP: ${targetUnit.hp}/${targetUnit.maxHp})`);
            }

            // Thermal Vent Cascade evaluation
            if (targetUnit.resolvedParams && targetUnit.resolvedParams.PARAM_VENT !== undefined) {
                const ventLimit = targetUnit.resolvedParams.PARAM_VENT;
                if (heatOutput >= ventLimit) {
                    targetUnit.isStunned = true;
                    targetUnit.telegraphedTiles = [];
                    audio.playStunCascade();
                    this.logEvent(`VENT CASCADE OVERHEAT! Radiator breached (${heatOutput} MJ >= ${ventLimit} MJ limit). ${targetUnit.name} STUNNED for 1 Turn. Attack aborted!`);
                }
            }
        } else {
            this.logEvent(`Mortar detonated on empty tile [${String.fromCharCode(65 + targetX)}${targetY + 1}]. Shockwave dispersed.`);
        }

        this.updateTelegraphs();
        this.notify();
        return true;
    }

    // Displace a unit with collision checking
    displaceUnit(unit, dirX, dirY, distance) {
        const w = unit.footprint?.width || 1;
        const h = unit.footprint?.height || 1;

        for (let step = 0; step < distance; step++) {
            const nextX = unit.x + dirX;
            const nextY = unit.y + dirY;

            // Check if every tile in footprint can move
            let canMove = true;
            for (let ox = 0; ox < w; ox++) {
                for (let oy = 0; oy < h; oy++) {
                    const checkX = nextX + ox;
                    const checkY = nextY + oy;

                    if (!this.isValidCoord(checkX, checkY)) {
                        canMove = false;
                        break;
                    }

                    // Check terrain
                    const cell = this.grid[checkY][checkX];
                    if (cell.type === CELL_TYPES.MOUNTAIN) {
                        canMove = false;
                        break;
                    }

                    // Check colliding with another unit
                    const otherUnit = this.getUnitAt(checkX, checkY);
                    if (otherUnit && otherUnit.id !== unit.id) {
                        canMove = false;
                        // Bump damage
                        unit.hp = Math.max(0, unit.hp - 1);
                        otherUnit.hp = Math.max(0, otherUnit.hp - 1);
                        this.logEvent(`COLLISION IMPACT! ${unit.name} slammed into ${otherUnit.name}. Both take 1 bump damage.`);
                        break;
                    }
                }
                if (!canMove) break;
            }

            if (!canMove) break;

            unit.x = nextX;
            unit.y = nextY;

            // Update weakpoint coord position if unit moves
            if (unit.weakpointCoord) {
                unit.weakpointCoord.x += dirX;
                unit.weakpointCoord.y += dirY;
            }
        }
    }

    // End Turn & Enemy Resolution
    endTurn() {
        this.logEvent('--- TURN RESOLUTION INITIATED ---');

        // Resolve active enemy attacks
        this.enemyUnits.forEach(enemy => {
            if (enemy.hp <= 0) return;

            if (enemy.isStunned) {
                enemy.isStunned = false;
                this.logEvent(`${enemy.name} core cooled down. Stun expired. System recovering.`);
                return;
            }

            // Execute telegraphed attack
            if (enemy.telegraphedTiles && enemy.telegraphedTiles.length > 0) {
                audio.playMortar();
                this.logEvent(`FIRE RELEASE! ${enemy.name} discharged twin Spinal Railguns down targeted vector.`);

                enemy.telegraphedTiles.forEach(tile => {
                    // Check player units in line of fire
                    const pUnit = this.playerUnits.find(p => p.hp > 0 && p.x === tile.x && p.y === tile.y);
                    if (pUnit) {
                        pUnit.hp = Math.max(0, pUnit.hp - enemy.attackDamage);
                        this.logEvent(`DIRECT HIT: ${pUnit.name} sustained ${enemy.attackDamage} railgun damage!`);
                    }

                    // Check objective in line of fire
                    this.objectives.forEach(obj => {
                        const objHit = obj.tiles.some(t => t.x === tile.x && t.y === tile.y);
                        if (objHit) {
                            obj.hp = Math.max(0, obj.hp - enemy.attackDamage);
                            this.logEvent(`CRITICAL ALERT: Defense Objective sustained ${enemy.attackDamage} damage! Remaining HP: ${obj.hp}/${obj.maxHp}`);
                        }
                    });
                });
            }
        });

        // Reset player AP
        this.playerUnits.forEach(p => {
            p.ap = p.maxAp;
        });

        this.updateTelegraphs();
        this.notify();
    }

    logEvent(msg) {
        this.actionLog.unshift(msg);
        if (this.actionLog.length > 25) this.actionLog.pop();
        if (this.onCombatEvent) this.onCombatEvent(msg);
    }

    notify() {
        if (this.onGridUpdate) {
            this.onGridUpdate({
                grid: this.grid,
                playerUnits: this.playerUnits,
                enemyUnits: this.enemyUnits,
                objectives: this.objectives,
                selectedUnitId: this.selectedUnitId,
                selectedAction: this.selectedAction,
                actionLog: this.actionLog
            });
        }
    }
}
