/**
 * RESONANCE PING - Diegetic CRT & Phosphor Canvas Renderer
 * Renders the Waterfall Spectrogram, 2D/3D Bathymetric Vector Map,
 * CRT Scanlines, Analog Needle Gauges, and Oscilloscope curves.
 */

export class DiegeticRenderer {
  constructor(tacticalCanvas, telemetryCanvas) {
    this.tacCanvas = tacticalCanvas;
    this.tacCtx = tacticalCanvas.getContext('2d');

    this.telCanvas = telemetryCanvas;
    this.telCtx = telemetryCanvas.getContext('2d');

    // Waterfall history buffer (scrolling frequency data)
    this.waterfallRows = 120;
    this.waterfallCols = 64;
    this.waterfallData = [];
    for (let r = 0; r < this.waterfallRows; r++) {
      this.waterfallData.push(new Float32Array(this.waterfallCols));
    }

    // Phosphor decay buffer
    this.time = 0;
  }

  pushWaterfallLine(frequencyKhz, resonanceScore, noiseDb) {
    // Generate spectral slice
    const slice = new Float32Array(this.waterfallCols);
    const targetCol = Math.round((frequencyKhz / 30.0) * (this.waterfallCols - 1));

    // Base background noise
    for (let c = 0; c < this.waterfallCols; c++) {
      slice[c] = Math.random() * (noiseDb / 110.0) * 0.35;
    }

    // Add resonant harmonic peaks if ping was fired
    if (resonanceScore > 0) {
      const spread = Math.max(1, Math.round((1.0 - resonanceScore / 100) * 8));
      for (let i = -spread; i <= spread; i++) {
        const col = targetCol + i;
        if (col >= 0 && col < this.waterfallCols) {
          const intensity = (1 - Math.abs(i) / (spread + 1)) * (resonanceScore / 100);
          slice[col] = Math.min(1.0, slice[col] + intensity);
        }
      }
    }

    // Shift waterfall down
    this.waterfallData.pop();
    this.waterfallData.unshift(slice);
  }

  render(sub, entity, stalkers, combat, telemetryState, ocean) {
    this.time += 0.016;

    this._renderTacticalScreen(sub, entity, stalkers, combat, telemetryState, ocean);
    this._renderTelemetryScreen(sub, entity, telemetryState);
  }

  // -------------------------------------------------------------
  // CRT 1: TACTICAL BATHYMETRY & WATERFALL
  // -------------------------------------------------------------
  _renderTacticalScreen(sub, entity, stalkers, combat, telemetry, ocean) {
    const ctx = this.tacCtx;
    const w = this.tacCanvas.width;
    const h = this.tacCanvas.height;

    // Dark Hadal Phosphor Background
    ctx.fillStyle = '#030d07';
    ctx.fillRect(0, 0, w, h);

    // 1. Draw Scrolling Waterfall on Left Half
    const wfWidth = Math.floor(w * 0.38);
    const wfHeight = h - 20;
    const cellW = wfWidth / this.waterfallCols;
    const cellH = wfHeight / this.waterfallRows;

    ctx.save();
    ctx.translate(10, 10);
    // CRT border for waterfall
    ctx.strokeStyle = '#1a4f2b';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, wfWidth, wfHeight);

    for (let r = 0; r < this.waterfallRows; r++) {
      const row = this.waterfallData[r];
      for (let c = 0; c < this.waterfallCols; c++) {
        const val = row[c];
        if (val > 0.08) {
          const g = Math.floor(val * 240);
          const rColor = Math.floor(val > 0.7 ? (val - 0.7) * 400 : 0);
          ctx.fillStyle = `rgb(${rColor}, ${g}, 40)`;
          ctx.fillRect(c * cellW, r * cellH, cellW + 0.5, cellH + 0.5);
        }
      }
    }
    // Frequency Axis Marker
    ctx.fillStyle = '#39d968';
    ctx.font = '9px monospace';
    ctx.fillText('0kHz', 2, wfHeight - 3);
    ctx.fillText('15kHz', wfWidth / 2 - 12, wfHeight - 3);
    ctx.fillText('30kHz', wfWidth - 32, wfHeight - 3);
    ctx.fillText('SPECTROGRAM WATERFALL', 4, 12);
    ctx.restore();

    // 2. Draw Bathymetric Vector Map on Right Side
    const mapX = wfWidth + 25;
    const mapY = 10;
    const mapW = w - mapX - 10;
    const mapH = h - 20;
    const mapCenterX = mapX + mapW / 2;
    const mapCenterY = mapY + mapH / 2;
    const mapScale = mapW / 2200; // 2200 meters across map

    ctx.save();
    ctx.beginPath();
    ctx.rect(mapX, mapY, mapW, mapH);
    ctx.clip();

    // Compass Range Rings (500m, 1000m)
    ctx.strokeStyle = '#0e3a1d';
    ctx.lineWidth = 1;
    [500, 1000].forEach(r => {
      ctx.beginPath();
      ctx.arc(mapCenterX, mapCenterY, r * mapScale, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Trench Edge Geometries (Benthic Topography)
    ctx.strokeStyle = '#185429';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // West Trench Wall
    ctx.moveTo(mapCenterX - 950 * mapScale, mapY);
    ctx.lineTo(mapCenterX - 850 * mapScale, mapCenterY);
    ctx.lineTo(mapCenterX - 980 * mapScale, mapY + mapH);
    // East Trench Wall
    ctx.moveTo(mapCenterX + 920 * mapScale, mapY);
    ctx.lineTo(mapCenterX + 820 * mapScale, mapCenterY);
    ctx.lineTo(mapCenterX + 960 * mapScale, mapY + mapH);
    ctx.stroke();

    // Hydrothermal Vent Anomaly
    ctx.fillStyle = '#ff3300';
    ctx.beginPath();
    const ventX = mapCenterX + 550 * mapScale;
    const ventY = mapCenterY - 400 * mapScale;
    ctx.arc(ventX, ventY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#884422';
    ctx.font = '8px monospace';
    ctx.fillText('VENT [92dB]', ventX + 6, ventY + 3);

    // Sensor Probe Beam Cone (Azimuth)
    if (telemetry && telemetry.currentAzimuthDeg !== undefined) {
      const azRad = (telemetry.currentAzimuthDeg - 90) * (Math.PI / 180);
      const halfCone = (55 / 2) * (Math.PI / 180);
      ctx.fillStyle = 'rgba(26, 120, 60, 0.08)';
      ctx.strokeStyle = 'rgba(57, 217, 104, 0.35)';
      ctx.beginPath();
      ctx.moveTo(mapCenterX, mapCenterY);
      ctx.arc(mapCenterX, mapCenterY, 1400 * mapScale, azRad - halfCone, azRad + halfCone);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Active Torpedoes
    combat.activeTorpedos.forEach(t => {
      const tx = mapCenterX + (t.x - sub.x) * mapScale;
      const ty = mapCenterY + (t.z - sub.z) * mapScale;
      ctx.fillStyle = '#00ffff';
      ctx.beginPath();
      ctx.arc(tx, ty, 3, 0, Math.PI * 2);
      ctx.fill();

      // Heading trail
      const tRad = (t.headingDeg - 90) * (Math.PI / 180);
      ctx.strokeStyle = '#00ffff';
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + Math.cos(tRad) * 12, ty + Math.sin(tRad) * 12);
      ctx.stroke();
    });

    // Active Decoys
    combat.activeDecoys.forEach(d => {
      const dx = mapCenterX + (d.x - sub.x) * mapScale;
      const dy = mapCenterY + (d.z - sub.z) * mapScale;
      ctx.strokeStyle = '#ffbb00';
      ctx.beginPath();
      ctx.arc(dx, dy, (10 + (Date.now() % 1000) * 0.02), 0, Math.PI * 2);
      ctx.stroke();
    });

    // Target Contact Rendering based on Calibration Score (Diegetic Uncertainty)
    const score = telemetry ? telemetry.lastScore : 0;
    if (score >= 40 && entity.hp > 0) {
      const ex = mapCenterX + (entity.x - sub.x) * mapScale;
      const ey = mapCenterY + (entity.z - sub.z) * mapScale;

      if (score < 70) {
        // Coarse quadrant fuzz (Uncertainty Circle)
        const uncertRadius = 35 * (1.0 - score / 100);
        ctx.fillStyle = 'rgba(80, 200, 100, 0.2)';
        ctx.strokeStyle = '#39d968';
        ctx.beginPath();
        ctx.arc(ex, ey, uncertRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.font = '8px monospace';
        ctx.fillStyle = '#39d968';
        ctx.fillText('ECHO CONTACT', ex + uncertRadius + 4, ey);

      } else if (score < 90) {
        // Sub-harmonic lock: Wireframe silhouette of the segmented carapace
        ctx.strokeStyle = '#39d968';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(ex - 8, ey - 8, 16, 16);
        ctx.font = '9px monospace';
        ctx.fillStyle = '#39d968';
        ctx.fillText(`CONTACT [R:${score}%]`, ex + 12, ey - 2);
        ctx.fillText(`RNG: ${Math.round(entity.x - sub.x)}m`, ex + 12, ey + 10);

      } else {
        // 90-100%: FULL WEAPONS LOCK (Bright Green Glowing Reticle + Exposed Nodes)
        ctx.strokeStyle = score === 100 ? '#ffffff' : '#00ff66';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ex, ey, 14, 0, Math.PI * 2);
        ctx.stroke();
        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(ex - 18, ey); ctx.lineTo(ex - 8, ey);
        ctx.moveTo(ex + 8, ey);  ctx.lineTo(ex + 18, ey);
        ctx.moveTo(ex, ey - 18); ctx.lineTo(ex, ey - 8);
        ctx.moveTo(ex, ey + 8);  ctx.lineTo(ex, ey + 18);
        ctx.stroke();

        ctx.fillStyle = score === 100 ? '#ffffff' : '#00ff66';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`LOCK: ${score}% [LETHAL GATE]`, ex + 18, ey - 4);
        ctx.fillText(`TARGET: ${entity.name}`, ex + 18, ey + 8);
        ctx.fillText(`VULNERABILITY: VENTRAL SIPHON`, ex + 18, ey + 20);
      }
    }

    // Submarine (Center of Screen)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(mapCenterX, mapCenterY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Sub Heading Vector Line
    const subRad = (sub.headingDeg - 90) * (Math.PI / 180);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapCenterX, mapCenterY);
    ctx.lineTo(mapCenterX + Math.cos(subRad) * 18, mapCenterY + Math.sin(subRad) * 18);
    ctx.stroke();

    // Compass Labeling
    ctx.fillStyle = '#39d968';
    ctx.font = '10px monospace';
    ctx.fillText('N', mapCenterX - 3, mapY + 12);
    ctx.fillText('S', mapCenterX - 3, mapY + mapH - 4);
    ctx.fillText('W', mapX + 4, mapCenterY + 4);
    ctx.fillText('E', mapX + mapW - 12, mapCenterY + 4);

    // Map Border
    ctx.strokeStyle = '#1a4f2b';
    ctx.strokeRect(mapX, mapY, mapW, mapH);
    ctx.restore();

    // CRT Scanlines Overlay
    this._drawScanlines(ctx, w, h);
  }

  // -------------------------------------------------------------
  // CRT 2: TELEMETRY & CALIBRATION OSCILLOSCOPE
  // -------------------------------------------------------------
  _renderTelemetryScreen(sub, entity, telemetry) {
    const ctx = this.telCtx;
    const w = this.telCanvas.width;
    const h = this.telCanvas.height;

    ctx.fillStyle = '#020b06';
    ctx.fillRect(0, 0, w, h);

    const score = telemetry ? telemetry.lastScore : 0;

    // 1. Oscilloscope Harmonic Curve
    ctx.save();
    ctx.strokeStyle = '#124422';
    ctx.strokeRect(10, 10, w - 20, 90);

    ctx.beginPath();
    ctx.strokeStyle = score >= 90 ? '#00ff88' : '#2ecc71';
    ctx.lineWidth = score >= 90 ? 2.5 : 1.5;

    const midY = 55;
    for (let x = 12; x < w - 12; x++) {
      const freq = 0.04 + (score / 100) * 0.06;
      const noise = (1.0 - score / 100) * (Math.random() - 0.5) * 16;
      const y = midY + Math.sin((x + this.time * 60) * freq) * 28 + noise;
      if (x === 12) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#39d968';
    ctx.font = '10px monospace';
    ctx.fillText('HARMONIC RESONANCE OSCILLOSCOPE', 16, 24);
    ctx.restore();

    // 2. Large Scalar Correlation Bar (0 to 100)
    const barX = 10;
    const barY = 115;
    const barW = w - 20;
    const barH = 32;

    ctx.strokeStyle = '#1a4f2b';
    ctx.strokeRect(barX, barY, barW, barH);

    // Fill bar
    let fillColor = '#e74c3c'; // Red < 40
    if (score >= 99) fillColor = '#ffffff'; // White 100
    else if (score >= 90) fillColor = '#00ff66'; // Bright green
    else if (score >= 70) fillColor = '#f39c12'; // Amber
    else if (score >= 40) fillColor = '#f1c40f'; // Yellow

    const fillW = (score / 100) * (barW - 4);
    ctx.fillStyle = fillColor;
    ctx.fillRect(barX + 2, barY + 2, fillW, barH - 4);

    // Score text
    ctx.fillStyle = score > 50 ? '#000000' : '#39d968';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`SCALAR CALIBRATION: ${score}%`, barX + 8, barY + 22);

    // Interlock Marker at 90%
    const markerX = barX + 2 + (0.9 * (barW - 4));
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(markerX, barY - 4);
    ctx.lineTo(markerX, barY + barH + 4);
    ctx.stroke();
    ctx.fillStyle = '#00ffff';
    ctx.font = '9px monospace';
    ctx.fillText('WEAPONS GATE [90%]', markerX - 45, barY + barH + 14);

    // 3. Entity Classification Vector Breakdown
    ctx.fillStyle = '#39d968';
    ctx.font = '10px monospace';
    let lineY = 175;
    ctx.fillText('TAXONOMIC DECRYPTION:', 10, lineY);
    lineY += 16;

    const domainStatus = score >= 40 ? 'IDENTIFIED [CHITIN-ARTHROPODIC]' : 'UNKNOWN / UNMATCHED';
    ctx.fillText(`DOMAIN:     ${domainStatus}`, 10, lineY);
    lineY += 15;

    const matrixStatus = score >= 70 ? 'IDENTIFIED [SEGMENTED-CARAPACE]' : (score >= 40 ? 'HARMONIC RESIDUE DETECTED' : 'UNKNOWN');
    ctx.fillText(`MATRIX:     ${matrixStatus}`, 10, lineY);
    lineY += 15;

    const metabStatus = score >= 90 ? 'ACTIVE [CAVITATION-JET / VULNERABLE]' : (score >= 70 ? 'HIGH ENERGY EMISSION' : 'UNKNOWN');
    ctx.fillText(`METABOLISM: ${metabStatus}`, 10, lineY);
    lineY += 15;

    // Status message
    ctx.fillStyle = score >= 90 ? '#00ff66' : (score >= 40 ? '#f39c12' : '#e74c3c');
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`STATUS: ${telemetry ? telemetry.message : 'AWAITING PROBE'}`, 10, lineY + 10);

    this._drawScanlines(ctx, w, h);
  }

  _drawScanlines(ctx, w, h) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    for (let y = 0; y < h; y += 3) {
      ctx.fillRect(0, y, w, 1);
    }
    // Vignette
    const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.4, w / 2, h / 2, h * 0.85);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,10,4,0.6)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}
