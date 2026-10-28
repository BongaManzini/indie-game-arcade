// main.js - Application Controller & Loop Orchestrator for Cipher Breach
import { audio } from './audio.js';
import { TelemetryManager, PARAM_DEFINITIONS } from './telemetry.js';
import { TacticsEngine, CELL_TYPES } from './tactics.js';
import { SCENARIOS } from './scenarios.js';

class GameApp {
    constructor() {
        this.currentScenario = SCENARIOS[0]; // GORGO-09 Boss Battle default
        this.telemetry = new TelemetryManager();
        this.tactics = new TacticsEngine();

        // DOM Elements
        this.boardContainer = document.getElementById('board-container');
        this.pillsContainer = document.getElementById('telemetry-pills-container');
        this.patchbayContainer = document.getElementById('patchbay-container');
        this.intelContainer = document.getElementById('intel-container');
        this.unitTabsContainer = document.getElementById('unit-tabs-container');
        this.actionButtonsContainer = document.getElementById('action-buttons-container');
        this.terminalLog = document.getElementById('terminal-log');
        this.hudBuffer = document.getElementById('hud-buffer');
        this.hudEx = document.getElementById('hud-ex');
        this.targetShieldStatus = document.getElementById('target-shield-status');
        this.combatAlert = document.getElementById('combat-alert');
        this.btnCommitBypass = document.getElementById('btn-commit-bypass');
        this.btnFlushBus = document.getElementById('btn-flush-bus');
        this.btnEndTurn = document.getElementById('btn-end-turn');
        this.btnReset = document.getElementById('btn-reset');
        this.btnAudio = document.getElementById('btn-audio');

        // Modal Elements
        this.modal = document.getElementById('modal-container');
        this.modalTitle = document.getElementById('modal-title');
        this.modalBody = document.getElementById('modal-body');
        this.modalCloseBtn = document.getElementById('modal-close-btn');

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTelemetryCallbacks();
        this.setupTacticsCallbacks();
        this.loadScenario(this.currentScenario);
        this.showBriefingModal();
    }

    setupEventListeners() {
        this.btnCommitBypass.addEventListener('click', () => this.telemetry.commitBypass());
        
        this.btnFlushBus.addEventListener('click', () => {
            if (!this.telemetry.isBypassed) {
                this.telemetry.assignedBindings = {};
                this.telemetry.selectedNumber = null;
                audio.playUnplug();
                this.telemetry.notifyState();
                this.tactics.logEvent('FLUSH BUS: Unconfirmed parameter patches cleared.');
            }
        });

        this.btnEndTurn.addEventListener('click', () => {
            this.tactics.endTurn();
            this.checkCombatOutcomes();
        });

        this.btnReset.addEventListener('click', () => {
            this.loadScenario(this.currentScenario);
        });

        this.btnAudio.addEventListener('click', () => {
            const isMuted = audio.toggleMute();
            this.btnAudio.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
            this.btnAudio.style.color = isMuted ? 'var(--red-alert)' : 'var(--phosphor-green)';
        });

        this.modalCloseBtn.addEventListener('click', () => {
            this.modal.style.display = 'none';
            audio.playClick();
        });
    }

    setupTelemetryCallbacks() {
        this.telemetry.onStateChange = (state) => {
            this.renderTelemetryDeck(state);
            this.hudBuffer.textContent = `BUFFER: ${state.bufferIntegrity}%`;
            this.hudEx.textContent = `EX-CYCLES: ${state.exCycles}`;
            
            if (state.bufferIntegrity <= 25) {
                this.hudBuffer.className = 'status-badge alert';
            } else {
                this.hudBuffer.className = 'status-badge';
            }
        };

        this.telemetry.onBypassSuccess = (bindings) => {
            const boss = this.tactics.enemyUnits[0];
            if (boss) {
                this.tactics.applyTelemetryBypass(boss.id, bindings);
            }
            this.targetShieldStatus.textContent = 'DFP BARRIER: OFFLINE (BYPASSED)';
            this.targetShieldStatus.style.color = 'var(--phosphor-green)';
            this.btnCommitBypass.disabled = true;
            this.btnCommitBypass.textContent = 'BYPASS ACTIVE (LOCKED)';
        };

        this.telemetry.onDesyncError = (errMsg) => {
            this.tactics.logEvent(`[SIGINT ALERT] ${errMsg}`);
        };
    }

    setupTacticsCallbacks() {
        this.tactics.onGridUpdate = (state) => {
            this.renderGrid(state);
            this.renderUnitTabs(state);
            this.renderActionButtons(state);
            this.renderLog(state.actionLog);
            this.updateAlertBanner(state);
        };
    }

    loadScenario(scenario) {
        this.currentScenario = scenario;
        const enemy = scenario.enemyUnits[0];

        // Initialize Telemetry
        if (enemy && enemy.telemetryPacket) {
            this.telemetry.loadPacket(enemy.telemetryPacket);
        }

        // Initialize Tactics Grid
        this.tactics.initBoard(scenario);

        // Reset UI labels
        document.getElementById('hud-scenario-name').textContent = scenario.name.toUpperCase();
        document.getElementById('target-name').textContent = `TARGET: ${enemy.name.toUpperCase()}`;
        this.targetShieldStatus.textContent = 'DFP BARRIER: ACTIVE';
        this.targetShieldStatus.style.color = 'var(--cyan-sigint)';
        this.btnCommitBypass.disabled = false;
        this.btnCommitBypass.textContent = 'INITIATE HARMONIC BYPASS';

        this.renderIntel(enemy?.telemetryPacket);
    }

    showBriefingModal() {
        this.modalTitle.textContent = this.currentScenario.name.toUpperCase();
        this.modalBody.innerHTML = `
            <p><strong>OBJECTIVE:</strong> ${this.currentScenario.briefing}</p>
            <br>
            <p><strong>DOCTRINE & CONTROLS:</strong></p>
            <ul style="margin-left: 20px; margin-top: 6px;">
                <li><strong>Macro Decryption (Left):</strong> Select raw telemetry numbers and route them into the matching parameter sockets using Field Manual clues.</li>
                <li><strong>Micro Grid Tactics (Right):</strong> Select Mechs (P1 Striker, P2 Aegis, P3 Arbiter) and execute deterministic moves, kinetic rams, and calibrated artillery strikes.</li>
                <li><strong>Physical Synergy:</strong> Decoding <em>Mass</em> allows P1 to knock the boss sideways out of the reactor column. Decoding <em>Vent</em> allows P3's mortar to stun its railgun!</li>
            </ul>
        `;
        this.modal.style.display = 'flex';
    }

    renderTelemetryDeck(state) {
        const packet = state.packet;
        if (!packet) return;

        // Render Raw Numbers Pool
        this.pillsContainer.innerHTML = '';
        packet.rawPool.forEach(num => {
            const pill = document.createElement('div');
            pill.className = 'telemetry-pill';
            pill.textContent = `[ ${num} ]`;

            // Check if already bound
            const isBound = Object.values(state.assignedBindings).includes(num);
            if (isBound) {
                pill.classList.add('bound');
            } else if (state.selectedNumber === num) {
                pill.classList.add('selected');
            }

            pill.addEventListener('click', () => {
                if (!isBound && !state.isBypassed) {
                    this.telemetry.selectNumber(num);
                }
            });

            this.pillsContainer.appendChild(pill);
        });

        // Render Patch-Bay Parameter Sockets
        this.patchbayContainer.innerHTML = '';
        const requiredParams = Object.keys(packet.parameterBindings);

        requiredParams.forEach(paramKey => {
            const def = PARAM_DEFINITIONS[paramKey] || { name: paramKey, unit: '' };
            const assignedVal = state.assignedBindings[paramKey];

            const socket = document.createElement('div');
            socket.className = 'patch-socket';
            if (assignedVal !== undefined) socket.classList.add('filled');
            if (state.isBypassed) socket.classList.add('bypassed');

            socket.innerHTML = `
                <div>
                    <span class="socket-label">${def.name}</span>
                    <span class="socket-unit">(${def.unit})</span>
                </div>
                <div class="socket-slot">
                    ${assignedVal !== undefined ? `[ ${assignedVal} ]` : '--- UNSET ---'}
                </div>
            `;

            socket.addEventListener('click', () => {
                if (state.isBypassed) return;
                if (state.selectedNumber !== null) {
                    this.telemetry.assignNumberToSlot(paramKey, state.selectedNumber);
                } else if (assignedVal !== undefined) {
                    this.telemetry.unassignSlot(paramKey);
                }
            });

            this.patchbayContainer.appendChild(socket);
        });
    }

    renderIntel(packet) {
        if (!packet) return;
        this.intelContainer.innerHTML = '';

        const appendSection = (title, items, isHighlight = false) => {
            const header = document.createElement('div');
            header.style.color = isHighlight ? 'var(--amber-glow)' : 'var(--phosphor-green)';
            header.style.fontWeight = 'bold';
            header.style.marginTop = '6px';
            header.textContent = `// ${title}`;
            this.intelContainer.appendChild(header);

            items.forEach(item => {
                const el = document.createElement('div');
                el.className = `intel-item ${isHighlight ? 'highlight' : ''}`;
                el.textContent = item;
                this.intelContainer.appendChild(el);
            });
        };

        if (packet.optics) appendSection('OPTICAL CHASSIS DIAGNOSTICS', packet.optics);
        if (packet.signals) appendSection('SIGNAL SPECTROGRAM ENVELOPE', packet.signals);
        if (packet.manualNotes) appendSection('TACTICAL MANUAL CROSS-REFERENCES', packet.manualNotes, true);
    }

    renderGrid(state) {
        this.boardContainer.innerHTML = '';

        // Top-left blank corner
        const corner = document.createElement('div');
        corner.className = 'coord-header';
        this.boardContainer.appendChild(corner);

        // Column headers A-H
        for (let x = 0; x < 8; x++) {
            const colHeader = document.createElement('div');
            colHeader.className = 'coord-header';
            colHeader.textContent = String.fromCharCode(65 + x);
            this.boardContainer.appendChild(colHeader);
        }

        // Rows 1-8
        for (let y = 0; y < 8; y++) {
            // Row header label
            const rowHeader = document.createElement('div');
            rowHeader.className = 'coord-header';
            rowHeader.textContent = `${y + 1}`;
            this.boardContainer.appendChild(rowHeader);

            // Cells in row
            for (let x = 0; x < 8; x++) {
                const cell = state.grid[y][x];
                const cellEl = document.createElement('div');
                cellEl.className = `grid-cell ${cell.type}`;

                // Check telegraphed attack zone
                const isTelegraphed = state.enemyUnits.some(e => 
                    e.hp > 0 && !e.isStunned && e.telegraphedTiles && e.telegraphedTiles.some(t => t.x === x && t.y === y)
                );
                if (isTelegraphed) {
                    cellEl.classList.add('telegraphed');
                }

                // Check Action Targeting Highlights
                const activeUnit = state.playerUnits.find(p => p.id === state.selectedUnitId);
                if (activeUnit && activeUnit.ap > 0) {
                    const dist = Math.abs(activeUnit.x - x) + Math.abs(activeUnit.y - y);

                    if (state.selectedAction === 'MOVE') {
                        if (dist > 0 && dist <= activeUnit.moveRange && !this.tactics.isTileBlocked(x, y, activeUnit.id)) {
                            cellEl.classList.add('target-move');
                        }
                    } else if (state.selectedAction === 'PISTON' && activeUnit.id === 'P1') {
                        if (dist === 1 && this.tactics.getUnitAt(x, y)?.hp > 0) {
                            cellEl.classList.add('target-attack');
                        }
                    } else if (state.selectedAction === 'WINCH' && activeUnit.id === 'P2') {
                        const dx = x - activeUnit.x;
                        const dy = y - activeUnit.y;
                        if (((dx === 0 && Math.abs(dy) <= 3) || (dy === 0 && Math.abs(dx) <= 3)) && this.tactics.getUnitAt(x, y)?.hp > 0) {
                            cellEl.classList.add('target-attack');
                        }
                    } else if (state.selectedAction === 'MORTAR' && activeUnit.id === 'P3') {
                        cellEl.classList.add('target-attack');
                    }
                }

                // Render Unit if present
                const unit = this.tactics.getUnitAt(x, y);
                if (unit && unit.hp > 0) {
                    const unitEl = document.createElement('div');
                    const isPlayer = state.playerUnits.some(p => p.id === unit.id);
                    unitEl.className = `unit-entity ${isPlayer ? 'player' : 'enemy'}`;

                    if (isPlayer && unit.id === state.selectedUnitId) {
                        unitEl.classList.add('selected');
                    }

                    if (!isPlayer) {
                        if (unit.isShielded) unitEl.classList.add('shielded');
                        if (unit.isStunned) unitEl.classList.add('stunned');
                        
                        // Weakpoint glyph check
                        if (unit.weakpointCoord && unit.weakpointCoord.x === x && unit.weakpointCoord.y === y) {
                            unitEl.classList.add('weakpoint');
                        }
                    }

                    // Render Unit Contents
                    unitEl.innerHTML = `
                        <div class="unit-name-badge">${unit.name.split(' ')[0]}</div>
                        <div class="unit-bars">
                            ${Array.from({ length: unit.maxHp }, (_, i) => 
                                `<div class="hp-pip ${i >= unit.hp ? 'lost' : ''}"></div>`
                            ).join('')}
                        </div>
                        ${isPlayer ? `<div class="ap-indicator">AP: ${unit.ap}</div>` : `<div style="font-size: 8px; color: #ff99aa;">HP: ${unit.hp}</div>`}
                    `;

                    cellEl.appendChild(unitEl);
                }

                // Cell Click Handler
                cellEl.addEventListener('click', () => this.handleCellClick(x, y));

                this.boardContainer.appendChild(cellEl);
            }
        }
    }

    handleCellClick(x, y) {
        const activeUnit = this.tactics.playerUnits.find(p => p.id === this.tactics.selectedUnitId);
        if (!activeUnit) return;

        // If clicked on another player unit, select that unit
        const clickedUnit = this.tactics.getUnitAt(x, y);
        if (clickedUnit && this.tactics.playerUnits.some(p => p.id === clickedUnit.id)) {
            this.tactics.selectUnit(clickedUnit.id);
            return;
        }

        if (activeUnit.ap < 1) {
            this.tactics.logEvent(`NO ACTION POINTS: ${activeUnit.name} has exhausted its AP for this turn.`);
            audio.playErrorBuzz();
            return;
        }

        // Execute action based on selected mode
        if (this.tactics.selectedAction === 'MOVE') {
            this.tactics.moveUnit(activeUnit.id, x, y);
        } else if (this.tactics.selectedAction === 'PISTON' && activeUnit.id === 'P1') {
            this.tactics.executePistonRam(x, y);
        } else if (this.tactics.selectedAction === 'WINCH' && activeUnit.id === 'P2') {
            this.tactics.executeMagWinch(x, y);
        } else if (this.tactics.selectedAction === 'MORTAR' && activeUnit.id === 'P3') {
            const isCalibrated = this.telemetry.isBypassed || this.telemetry.assignedBindings.PARAM_ANGLE !== undefined;
            this.tactics.executeOrbitalMortar(x, y, isCalibrated);
        }

        this.checkCombatOutcomes();
    }

    renderUnitTabs(state) {
        this.unitTabsContainer.innerHTML = '';
        state.playerUnits.forEach(unit => {
            const btn = document.createElement('button');
            btn.className = `action-btn ${unit.id === state.selectedUnitId ? 'active' : ''}`;
            btn.innerHTML = `
                <div>${unit.name}</div>
                <div class="sub-text">AP: ${unit.ap}/${unit.maxAp} | HP: ${unit.hp}/${unit.maxHp}</div>
            `;
            btn.addEventListener('click', () => this.tactics.selectUnit(unit.id));
            this.unitTabsContainer.appendChild(btn);
        });
    }

    renderActionButtons(state) {
        this.actionButtonsContainer.innerHTML = '';
        const activeUnit = state.playerUnits.find(p => p.id === state.selectedUnitId);
        if (!activeUnit) return;

        // Move Action
        const moveBtn = document.createElement('button');
        moveBtn.className = `action-btn ${state.selectedAction === 'MOVE' ? 'active' : ''}`;
        moveBtn.innerHTML = `<div>[MOVE]</div><div class="sub-text">1 AP (Max ${activeUnit.moveRange} tiles)</div>`;
        moveBtn.addEventListener('click', () => this.tactics.setAction('MOVE'));
        this.actionButtonsContainer.appendChild(moveBtn);

        // Unit-specific special weapon
        if (activeUnit.id === 'P1') {
            const ramBtn = document.createElement('button');
            ramBtn.className = `action-btn ${state.selectedAction === 'PISTON' ? 'active' : ''}`;
            ramBtn.innerHTML = `<div>[PISTON RAM]</div><div class="sub-text">50 kN Knockback | 1 AP</div>`;
            ramBtn.addEventListener('click', () => this.tactics.setAction('PISTON'));
            this.actionButtonsContainer.appendChild(ramBtn);
        } else if (activeUnit.id === 'P2') {
            const winchBtn = document.createElement('button');
            winchBtn.className = `action-btn ${state.selectedAction === 'WINCH' ? 'active' : ''}`;
            winchBtn.innerHTML = `<div>[MAG WINCH]</div><div class="sub-text">Pull 2 Tiles | 1 AP</div>`;
            winchBtn.addEventListener('click', () => this.tactics.setAction('WINCH'));
            this.actionButtonsContainer.appendChild(winchBtn);
        } else if (activeUnit.id === 'P3') {
            const mortarBtn = document.createElement('button');
            mortarBtn.className = `action-btn ${state.selectedAction === 'MORTAR' ? 'active' : ''}`;
            mortarBtn.innerHTML = `<div>[SUB-ORBITAL MORTAR]</div><div class="sub-text">8 Dmg + 15 MJ Heat | 1 AP</div>`;
            mortarBtn.addEventListener('click', () => this.tactics.setAction('MORTAR'));
            this.actionButtonsContainer.appendChild(mortarBtn);
        }
    }

    renderLog(logs) {
        this.terminalLog.innerHTML = logs.map(msg => `<div class="log-entry">${msg}</div>`).join('');
    }

    updateAlertBanner(state) {
        const boss = state.enemyUnits[0];
        if (!boss || boss.hp <= 0) {
            this.combatAlert.className = 'status-badge';
            this.combatAlert.style.color = 'var(--phosphor-green)';
            this.combatAlert.textContent = 'HOSTILE NEUTRALIZED: SECTOR SECURE';
            return;
        }

        if (boss.isStunned) {
            this.combatAlert.className = 'status-badge';
            this.combatAlert.style.color = 'var(--amber-glow)';
            this.combatAlert.textContent = 'VENT CASCADE STUN ACTIVE: RAILGUN OFFLINE';
            return;
        }

        // Check if objective is currently in the crosshairs
        const objectiveThreatened = state.objectives.some(obj => 
            obj.tiles.some(t => boss.telegraphedTiles && boss.telegraphedTiles.some(tgt => tgt.x === t.x && tgt.y === t.y))
        );

        if (objectiveThreatened) {
            this.combatAlert.className = 'status-badge alert';
            this.combatAlert.textContent = 'CRITICAL ALERT: RAILGUN AIMED AT CITY REACTOR!';
        } else {
            this.combatAlert.className = 'status-badge';
            this.combatAlert.style.color = 'var(--amber-glow)';
            this.combatAlert.textContent = 'WARNING: RAILGUN TARGETING OPEN SECTOR';
        }
    }

    checkCombatOutcomes() {
        const boss = this.tactics.enemyUnits[0];
        const reactor = this.tactics.objectives[0];

        // Victory
        if (boss && boss.hp <= 0) {
            this.modalTitle.textContent = 'MISSION ACCOMPLISHED // SECTOR LIBERATED';
            this.modalBody.innerHTML = `
                <p style="color: var(--phosphor-green); font-size: 15px; font-weight: bold;">
                    HOSTILE ACRO-FRAME DESTROYED!
                </p>
                <br>
                <p>The GORGO-09 Colossus has been eliminated. The Sector 7 Sub-Reactor sustained no catastrophic breach.</p>
                <br>
                <p><strong>COMBAT DEBRIEF:</strong></p>
                <ul style="margin-left: 20px;">
                    <li>Harmonic Bypass decoded telemetry parameters with full parity.</li>
                    <li>Tactical displacement physics prevented fatal direct railgun strikes.</li>
                    <li>Vent Cascade stun incapacitated defensive counter-batteries.</li>
                </ul>
            `;
            this.modal.style.display = 'flex';
            audio.playSuccessChime();
            return;
        }

        // Defeat (Reactor destroyed)
        if (reactor && reactor.hp <= 0) {
            this.modalTitle.textContent = 'TACTICAL DEFEAT // REACTOR OVERLOAD';
            this.modalBody.innerHTML = `
                <p style="color: var(--red-alert); font-size: 15px; font-weight: bold;">
                    DEFENSE OBJECTIVE OBLITERATED!
                </p>
                <br>
                <p>The City Sub-Reactor was destroyed by GORGO-09's spinal railgun barrage. The sector grid has collapsed.</p>
                <br>
                <p><em>HINT:</em> Use P1 Striker's Piston Ram to push the boss 1 tile East out of columns E & F, or decode Vent Limit and fire P3's Mortar to stun it!</p>
            `;
            this.modal.style.display = 'flex';
            audio.playErrorBuzz();
            return;
        }

        // Defeat (All mechs lost)
        const allMechsDead = this.tactics.playerUnits.every(p => p.hp <= 0);
        if (allMechsDead) {
            this.modalTitle.textContent = 'TACTICAL DEFEAT // SQUADRON WIPED';
            this.modalBody.innerHTML = `
                <p style="color: var(--red-alert); font-size: 15px; font-weight: bold;">
                    ALL RECON UNITS DESTROYED!
                </p>
                <p>All SIG platforms have been neutralized by enemy fire.</p>
            `;
            this.modal.style.display = 'flex';
            audio.playErrorBuzz();
        }
    }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.gameApp = new GameApp();
});
