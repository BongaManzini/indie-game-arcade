// scenarios.js - Mission & Encounter Definitions for Cipher Breach

export const SCENARIOS = [
    {
        id: 'SCENARIO_GORGO_BOSS',
        name: 'Operation Cipher Breach: GORGO-09 Siege',
        briefing: 'URGENT: A rogue GORGO-09 Siege Dreadnought has targeted the Sector 7 Sub-Reactor. Its Dynamic Flux-Plating renders all attacks ineffective. Sniff its internal databus, decrypt telemetry parameters, shunt its chassis out of the reactor column, and trigger a thermal vent cascade before its spinal railguns obliterate the grid.',
        mountains: [
            { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 1, y: 5 },
            { x: 7, y: 2 }, { x: 7, y: 3 }
        ],
        water: [
            { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 6, y: 1 }, { x: 7, y: 1 }
        ],
        objectives: [
            {
                id: 'CITY_REACTOR',
                name: 'Sector 7 Sub-Reactor',
                hp: 8,
                maxHp: 8,
                tiles: [{ x: 4, y: 7 }, { x: 5, y: 7 }] // E8, F8
            }
        ],
        playerUnits: [
            {
                id: 'P1',
                name: 'SIG-Striker',
                role: 'Vanguard Ram',
                x: 1,
                y: 1, // B2
                hp: 3,
                maxHp: 3,
                ap: 2,
                maxAp: 2,
                moveRange: 4,
                weapons: ['PISTON_RAM']
            },
            {
                id: 'P2',
                name: 'SIG-Aegis',
                role: 'Anchor Winch',
                x: 2,
                y: 3, // C4
                hp: 4,
                maxHp: 4,
                ap: 2,
                maxAp: 2,
                moveRange: 2,
                weapons: ['MAG_WINCH']
            },
            {
                id: 'P3',
                name: 'SIG-Arbiter',
                role: 'Artillery Mortar',
                x: 2,
                y: 6, // C7
                hp: 2,
                maxHp: 2,
                ap: 1,
                maxAp: 1,
                moveRange: 2,
                weapons: ['ORBITAL_MORTAR']
            }
        ],
        enemyUnits: [
            {
                id: 'BOSS_GORGO_09',
                name: 'GORGO-09 Siege Colossus',
                x: 4,
                y: 3, // E4, F4, E5, F5
                footprint: { width: 2, height: 2 },
                hp: 40,
                maxHp: 40,
                isShielded: true,
                inherentMass: 45,
                attackDamage: 12,
                intentType: 'COLUMNS_FORWARD',
                intentDesc: 'Spinal Railguns targeting columns E & F (12 Damage).',
                telemetryPacket: {
                    packetId: 'SIG-PKT-0984',
                    rawPool: [2, 14, 45, 88.4],
                    parameterBindings: {
                        PARAM_MASS: 45,
                        PARAM_VENT: 14,
                        PARAM_CELL: 2,
                        PARAM_ANGLE: 88.4
                    },
                    optics: [
                        'CHASSIS PROFILE: Quadruped Heavy Siege Dreadnought.',
                        'ANCHOR SPUR COUNT: 2 heavy titanium hydraulic claws deployed into street.',
                        'RADIATOR TURBINES: 2 spinning counter-clockwise heat vanes active.'
                    ],
                    signals: [
                        'CARRIER WAVE: 433.90 MHz carrier modulated with decimal float register.',
                        'DOPPLER ENVELOPE: Acoustic standoff angle registered at high trajectory.'
                    ],
                    manualNotes: [
                        'SECTION 4.1: Heavy anchor claws yield 22.5 kN resistance per deployed leg.',
                        'SECTION 4.8: Coolant radiator capacity equals (Active Turbines * 7 MJ).',
                        'SECTION 5.2: Decimal float registers strictly indicate ballistic azimuth/angle.',
                        'SECTION 7.4: Core Sub-Cell 2 corresponds to the lower-right quadrant (local offset +1, +1).'
                    ]
                }
            }
        ]
    },
    {
        id: 'SCENARIO_RECON_TUTORIAL',
        name: 'Training Simulation: Scout Drone Intercept',
        briefing: 'Basic operational qualification. An unshielded scout drone is patrolling near a water basin. Practice routing telemetry into Mass and Vent sockets, then use the Kinetic Piston Ram to push the drone into water or walls.',
        mountains: [{ x: 4, y: 1 }, { x: 4, y: 2 }],
        water: [{ x: 5, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 4 }, { x: 6, y: 5 }],
        objectives: [],
        playerUnits: [
            {
                id: 'P1',
                name: 'SIG-Striker',
                role: 'Vanguard Ram',
                x: 2,
                y: 4,
                hp: 3,
                maxHp: 3,
                ap: 2,
                maxAp: 2,
                moveRange: 3,
                weapons: ['PISTON_RAM']
            }
        ],
        enemyUnits: [
            {
                id: 'DRONE_SCOUT_01',
                name: 'Light Scout Drone',
                x: 3,
                y: 4,
                footprint: { width: 1, height: 1 },
                hp: 8,
                maxHp: 8,
                isShielded: true,
                inherentMass: 10,
                attackDamage: 2,
                intentType: 'MELEE_CHARGE',
                intentDesc: 'Ramming attack charging West.',
                telemetryPacket: {
                    packetId: 'SIG-PKT-0012',
                    rawPool: [5, 10],
                    parameterBindings: {
                        PARAM_MASS: 10,
                        PARAM_VENT: 5
                    },
                    optics: [
                        'CHASSIS: Class-I Light Recon Frame.',
                        'INERTIA: Single 10 kN ballast plate.',
                        'HEAT SINK: Micro radiator rated for 5 MJ.'
                    ],
                    signals: [
                        'CARRIER: 915 MHz short-band telemetry.'
                    ],
                    manualNotes: [
                        'Light Scout ballast rating is exactly 10 kN.',
                        'Micro-radiator max vent limit is 5 MJ.'
                    ]
                }
            }
        ]
    }
];
