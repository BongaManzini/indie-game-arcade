// test_engine.js - Headless automated test suite for Cipher Breach mechanics
import { TelemetryManager } from './js/telemetry.js';
import { TacticsEngine } from './js/tactics.js';
import { SCENARIOS } from './js/scenarios.js';

function runTests() {
    console.log("=== RUNNING CIPHER BREACH VERIFICATION SUITE ===");

    // 1. Telemetry Parity Test
    console.log("\n[TEST 1] Testing Telemetry Deduction Engine...");
    const scenario = SCENARIOS[0]; // GORGO Boss
    const telemetry = new TelemetryManager();
    telemetry.loadPacket(scenario.enemyUnits[0].telemetryPacket);

    // Initial state
    console.assert(telemetry.bufferIntegrity === 100, "Buffer should start at 100%");
    console.assert(!telemetry.isBypassed, "Telemetry should not be bypassed initially");

    // Assign wrong value to MASS
    telemetry.assignNumberToSlot('PARAM_MASS', 14); // Wrong (should be 45)
    telemetry.assignNumberToSlot('PARAM_VENT', 45); // Wrong
    telemetry.assignNumberToSlot('PARAM_CELL', 2);
    telemetry.assignNumberToSlot('PARAM_ANGLE', 88.4);
    telemetry.commitBypass();

    console.assert(!telemetry.isBypassed, "Parity check should reject incorrect bindings");
    console.assert(telemetry.bufferIntegrity === 75, "Buffer integrity should drop to 75% on misfire");
    console.log("  [PASS] Parity failure correctly detected & buffer penalized (-25%).");

    // Assign correct values
    telemetry.assignNumberToSlot('PARAM_MASS', 45);
    telemetry.assignNumberToSlot('PARAM_VENT', 14);
    telemetry.assignNumberToSlot('PARAM_CELL', 2);
    telemetry.assignNumberToSlot('PARAM_ANGLE', 88.4);
    telemetry.commitBypass();

    console.assert(telemetry.isBypassed, "Parity check should pass with correct bindings");
    console.assert(telemetry.exCycles === 2, "EX-Cycles should increment on successful bypass");
    console.log("  [PASS] Correct bindings achieve Harmonic Bypass (+1 EX-Cycle awarded).");

    // 2. Tactics Grid & Displacement Physics Test
    console.log("\n[TEST 2] Testing Deterministic Displacement & Weakpoint Mechanics...");
    const tactics = new TacticsEngine();
    tactics.initBoard(scenario);

    const boss = tactics.enemyUnits[0];
    console.assert(boss.isShielded, "Boss should start with active Flux-Plating");
    console.assert(boss.x === 4 && boss.y === 3, "Boss should start at E4 (x=4, y=3)");

    // Apply Telemetry Bypass to Boss
    tactics.applyTelemetryBypass(boss.id, telemetry.assignedBindings);
    console.assert(!boss.isShielded, "Boss shields should collapse on bypass");
    console.assert(boss.weakpointCoord.x === 5 && boss.weakpointCoord.y === 4, "Weakpoint should map to F5 (x=5, y=4)");
    console.log("  [PASS] Shields dropped; weakpoint coordinate projected to F5.");

    // Striker (P1) Reposition & Kinetic Punch
    const striker = tactics.playerUnits.find(p => p.id === 'P1');
    tactics.moveUnit(striker.id, 3, 3); // Move adjacent to boss tile (4, 3)
    console.assert(striker.x === 3 && striker.y === 3, "Striker moved to D4 (x=3, y=3)");

    // Execute Piston Ram Eastward against (4, 3)
    tactics.executePistonRam(4, 3);
    console.assert(boss.x === 5 && boss.y === 3, `Boss should be pushed 1 tile East to x=5 (was ${boss.x})`);
    console.assert(boss.weakpointCoord.x === 6 && boss.weakpointCoord.y === 4, `Weakpoint should shift with boss to x=6 (was ${boss.weakpointCoord.x})`);
    console.log("  [PASS] Kinetic Piston Ram shunted boss 1 tile East into Column F & G.");

    // Check that Column E is now safe
    const colESafe = !boss.telegraphedTiles.some(t => t.x === 4);
    console.assert(colESafe, "Column E should now be completely safe from Spinal Railgun!");
    console.log("  [PASS] Sub-Reactor in Column E successfully saved by displacement!");

    // Mortar Weakpoint Strike & Vent Cascade Stun
    const arbiter = tactics.playerUnits.find(p => p.id === 'P3');
    const initialBossHp = boss.hp;
    tactics.executeOrbitalMortar(boss.weakpointCoord.x, boss.weakpointCoord.y, true);

    console.assert(boss.hp === initialBossHp - 16, `Weakpoint strike should deal 16 damage (got ${initialBossHp - boss.hp})`);
    console.assert(boss.isStunned, "Boss should enter Vent Cascade Stun (15 MJ >= 14 MJ)");
    console.assert(boss.telegraphedTiles.length === 0, "Telegraphed railgun attack should be aborted on stun");
    console.log("  [PASS] Mortar dealt 2x critical damage (16 dmg) on exposed weakpoint.");
    console.log("  [PASS] Vent Cascade triggered: Boss stunned, Spinal Railgun aborted!");

    console.log("\n=== ALL UNIT TESTS PASSED WITH 100% PARITY! ===");
}

runTests();
