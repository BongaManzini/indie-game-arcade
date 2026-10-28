// telemetry.js - Telemetry Decryption & Parameter Patch-Bay Engine for Cipher Breach
import { audio } from './audio.js';

export const PARAM_DEFINITIONS = {
    PARAM_MASS: {
        id: 'PARAM_MASS',
        name: 'HYDRAULIC ANCHOR MASS',
        unit: 'kN',
        description: 'Kinetic inertia and counter-torque rating. Sets push/knockback resistance threshold.'
    },
    PARAM_VENT: {
        id: 'PARAM_VENT',
        name: 'THERMAL VENT LIMIT',
        unit: 'MJ',
        description: 'Reactor radiator capacity. Exceeding with heat triggers 1-turn Vent Cascade stun.'
    },
    PARAM_CELL: {
        id: 'PARAM_CELL',
        name: 'CORE SUB-CELL ID',
        unit: 'IDX',
        description: 'Internal weakpoint quadrant coordinate. Direct hits deal 2x critical damage.'
    },
    PARAM_ANGLE: {
        id: 'PARAM_ANGLE',
        name: 'STANDOFF CALIB. BEARING',
        unit: 'DEG',
        description: 'Ballistic mortar azimuth. Zeroes artillery scatter and unlocks direct orbital strike.'
    }
};

export class TelemetryManager {
    constructor() {
        this.currentPacket = null;
        this.selectedNumber = null;
        this.assignedBindings = {}; // paramKey -> number
        this.bufferIntegrity = 100;
        this.exCycles = 1;
        this.isBypassed = false;
        this.onStateChange = null;
        this.onBypassSuccess = null;
        this.onDesyncError = null;
    }

    loadPacket(packet) {
        this.currentPacket = packet;
        this.selectedNumber = null;
        this.assignedBindings = {};
        this.isBypassed = false;
        this.notifyState();
    }

    selectNumber(num) {
        if (this.selectedNumber === num) {
            this.selectedNumber = null;
        } else {
            this.selectedNumber = num;
            audio.playClick();
        }
        this.notifyState();
    }

    assignNumberToSlot(paramKey, num) {
        if (this.isBypassed) return;
        
        // Remove number from any other slot first
        for (const [key, val] of Object.entries(this.assignedBindings)) {
            if (val === num) {
                delete this.assignedBindings[key];
            }
        }

        this.assignedBindings[paramKey] = num;
        this.selectedNumber = null;
        audio.playPlugIn();
        this.notifyState();
    }

    unassignSlot(paramKey) {
        if (this.isBypassed) return;
        if (this.assignedBindings[paramKey] !== undefined) {
            delete this.assignedBindings[paramKey];
            audio.playUnplug();
            this.notifyState();
        }
    }

    commitBypass() {
        if (!this.currentPacket || this.isBypassed) return;

        const truth = this.currentPacket.parameterBindings;
        const requiredKeys = Object.keys(truth);

        // Check if all required slots are filled
        for (const key of requiredKeys) {
            if (this.assignedBindings[key] === undefined) {
                if (this.onDesyncError) {
                    this.onDesyncError('INCOMPLETE BYPASS: All required parameter sockets must be patched.');
                }
                audio.playErrorBuzz();
                return;
            }
        }

        // Validate parity
        let allCorrect = true;
        const mismatches = [];

        for (const key of requiredKeys) {
            const assigned = this.assignedBindings[key];
            const correct = truth[key];
            // Compare floats safely
            if (Math.abs(assigned - correct) > 0.05) {
                allCorrect = false;
                mismatches.push(key);
            }
        }

        if (allCorrect) {
            this.isBypassed = true;
            this.exCycles += 1;
            audio.playSuccessChime();
            if (this.onBypassSuccess) {
                this.onBypassSuccess(this.assignedBindings);
            }
        } else {
            this.bufferIntegrity = Math.max(0, this.bufferIntegrity - 25);
            audio.playErrorBuzz();
            
            // Clear wrong bindings to signal failure
            mismatches.forEach(k => delete this.assignedBindings[k]);

            if (this.onDesyncError) {
                this.onDesyncError(`PARITY CHECKSUM MISMATCH: ${mismatches.length} invalid routes. Buffer burned -25%.`);
            }
        }

        this.notifyState();
    }

    spendExCycle(cost = 1) {
        if (this.exCycles >= cost) {
            this.exCycles -= cost;
            this.notifyState();
            return true;
        }
        return false;
    }

    addExCycle(amount = 1) {
        this.exCycles += amount;
        this.notifyState();
    }

    notifyState() {
        if (this.onStateChange) {
            this.onStateChange({
                packet: this.currentPacket,
                selectedNumber: this.selectedNumber,
                assignedBindings: { ...this.assignedBindings },
                bufferIntegrity: this.bufferIntegrity,
                exCycles: this.exCycles,
                isBypassed: this.isBypassed
            });
        }
    }
}
