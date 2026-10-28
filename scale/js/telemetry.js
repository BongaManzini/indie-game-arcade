/**
 * RESONANCE PING - Telemetry & Semantic Distance Engine
 * Implements high-dimensional taxonomic vector matching, distance falloff,
 * beam cone alignment, and thermocline refraction physics.
 */

export const TAXONOMY = {
  DOMAINS: [
    { id: 'LITHO_SILICATE', label: 'Litho-Silicate', desc: 'Dense mineralized silicon body' },
    { id: 'CHITIN_ARTHROPODIC', label: 'Chitin-Arthropodic', desc: 'Segmented crustacean exoplate' },
    { id: 'BIO_ELECTRIC_CEPHALOPOD', label: 'Bio-Electric Cephalopod', desc: 'Piezo-conductive soft tissue' },
    { id: 'ABYSSAL_SIPHONOPHORE', label: 'Abyssal Siphonophore', desc: 'Colonial hydro-gel matrix' },
    { id: 'CRYSTALLINE_PRECURSOR', label: 'Crystalline Precursor', desc: 'Geometric non-terrestrial lattice' }
  ],
  MATRICES: [
    { id: 'SEGMENTED_CARAPACE', label: 'Segmented Carapace', hardness: 0.9 },
    { id: 'HYDROSTATIC_GEL', label: 'Hydrostatic Gel', hardness: 0.2 },
    { id: 'PIEZO_LATTICE', label: 'Piezo-Lattice', hardness: 0.8 },
    { id: 'FIBROUS_MYOFILAMENT', label: 'Fibrous Myofilament', hardness: 0.5 },
    { id: 'POROUS_CALCITE', label: 'Porous Calcite', hardness: 0.6 }
  ],
  METABOLISMS: [
    { id: 'THERMAL_ENDOTHERMIC', label: 'Thermal Endothermic', signature: 'Heat Bloom' },
    { id: 'CHEMOSYNTHETIC_ACID', label: 'Chemosynthetic Acid', signature: 'Corrosive Trail' },
    { id: 'PIEZO_DISCHARGE', label: 'Piezo-Electric Discharge', signature: 'EM Pulse' },
    { id: 'BIOLUMINESCENT_LINK', label: 'Bioluminescent Link', signature: 'Photonic Flash' },
    { id: 'CAVITATION_JET', label: 'Cavitation Hydro-Jet', signature: 'Bubble Collapse' }
  ]
};

export class TelemetryEngine {
  constructor() {
    this.maxSensorRange = 2500; // meters
    this.beamWidthDeg = 55;      // cone angle
  }

  /**
   * Evaluates a directed diagnostic acoustic query against a target entity.
   */
  evaluateQuery(query, subState, entity, oceanEnvironment) {
    // 1. Calculate Spatial Vector & Bearing
    const dx = entity.x - subState.x;
    const dy = entity.depth - subState.depth;
    const dz = entity.z - subState.z;
    const horizontalDist = Math.sqrt(dx * dx + dz * dz);
    const totalDist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // Bearing to target in degrees (0 = North, 90 = East, etc)
    let targetBearingDeg = (Math.atan2(dx, dz) * (180 / Math.PI) + 360) % 360;

    // Relative angle between probe transmitter azimuth and target bearing
    let angularDelta = Math.abs(query.azimuthDeg - targetBearingDeg);
    if (angularDelta > 180) angularDelta = 360 - angularDelta;

    // Target completely outside beam cone
    if (angularDelta > this.beamWidthDeg || totalDist > this.maxSensorRange) {
      return {
        scalarScore: 0,
        bearingConfidenceDeg: 180,
        bearingEstimateDeg: null,
        rangeEstimateMeters: null,
        depthDeltaMeters: null,
        topologicalResolution: 0,
        weakpointExposed: false,
        generatedNoiseDb: 24.0, // High acoustic wall bounce
        targetBearingDeg,
        actualDistance: totalDist,
        message: 'ACOUSTIC SCATTER: NO RETURN RECEIVED'
      };
    }

    // 2. Semantic Taxonomy Matching
    let semanticScore = 0;
    if (query.domain === entity.traits.domain) semanticScore += 35;
    if (query.matrix === entity.traits.matrix) semanticScore += 35;
    if (query.metabolism === entity.traits.metabolism) semanticScore += 20;

    // Carrier frequency matching (up to 10 points)
    const freqDelta = Math.abs(query.frequencyKhz - entity.traits.carrierKhz);
    const freqScore = Math.max(0, 1.0 - (freqDelta / 8.0)) * 10;
    const rawTaxonomicScore = semanticScore + freqScore; // Max 100

    // 3. Distance Falloff
    const distanceFactor = Math.max(0.15, 1.0 - (totalDist / this.maxSensorRange));

    // 4. Beam Alignment Cosine Falloff
    const beamAlignment = Math.cos((angularDelta / this.beamWidthDeg) * (Math.PI / 2));

    // 5. Oceanographic Attenuation (Thermocline Refraction)
    let thermoclineInterference = 0.0;
    const thermoclineDepth = oceanEnvironment.thermoclineDepth;
    const subAbove = subState.depth < thermoclineDepth;
    const targetAbove = entity.depth < thermoclineDepth;
    if (subAbove !== targetAbove) {
      // Sound wave crosses the density inversion layer
      thermoclineInterference = 0.35; // 35% acoustic refraction loss
    }
    const envFactor = (1.0 - oceanEnvironment.siltTurbidity) * (1.0 - thermoclineInterference);

    // Compute Final Calibrated Scalar Score (0 to 100)
    let finalScore = Math.round(rawTaxonomicScore * distanceFactor * beamAlignment * envFactor);
    finalScore = Math.max(0, Math.min(100, finalScore));

    // 6. Acoustic Noise Impact (Constructive Absorption vs Chaotic Reflection)
    // High resonance = absorbed by organism (+8 dB)
    // Low resonance = reflects wildly off benthic cliffs (+25 dB)
    let noiseDb = 25.0 - (finalScore * 0.17);
    if (finalScore >= 90) noiseDb = 8.0;

    // 7. Telemetry Precision derived from Scalar Score
    const bearingConfidenceDeg = Math.max(0.5, 45.0 * (1.0 - finalScore / 100));
    // Simulated measurement noise based on uncertainty
    const noiseOffset = (Math.random() - 0.5) * bearingConfidenceDeg * 0.8;
    const bearingEstimateDeg = (targetBearingDeg + noiseOffset + 360) % 360;

    const rangeNoise = (Math.random() - 0.5) * (totalDist * (1.0 - finalScore / 100));
    const rangeEstimateMeters = finalScore >= 40 ? Math.max(20, Math.round(totalDist + rangeNoise)) : null;

    const depthDeltaMeters = finalScore >= 60 ? Math.round(dy + (Math.random() - 0.5) * 30 * (1 - finalScore / 100)) : null;
    const topologicalResolution = finalScore >= 70 ? (finalScore - 70) / 30 : 0;
    const weakpointExposed = finalScore >= 90;

    let message = 'ACOUSTIC SCATTER / ZERO COHERENCE';
    if (finalScore >= 99) message = 'HARMONIC SINGULARITY: TARGET OVERLOAD';
    else if (finalScore >= 90) message = 'RESONANT COHERENCE: WEAPONS LOCK ENGAGED';
    else if (finalScore >= 70) message = 'SUB-HARMONIC LOCK: TOPOLOGY ACQUIRED';
    else if (finalScore >= 40) message = 'FAINT HARMONIC ECHO: QUADRANT ISOLATED';

    return {
      scalarScore: finalScore,
      bearingConfidenceDeg,
      bearingEstimateDeg,
      rangeEstimateMeters,
      depthDeltaMeters,
      topologicalResolution,
      weakpointExposed,
      generatedNoiseDb: noiseDb,
      targetBearingDeg,
      actualDistance: totalDist,
      angularDelta,
      thermoclineCrossed: subAbove !== targetAbove,
      message
    };
  }
}
