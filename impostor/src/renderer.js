// ============================================================================
// THE BLIGHTSTEAD - 2D RENDERING, DYNAMIC LIGHTING & DIEGETIC HUD
// ============================================================================

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.camX = 0;
    this.camY = 0;

    // Offscreen lighting canvas for fog-of-war and dynamic shadows
    this.lightCanvas = document.createElement('canvas');
    this.lightCtx = this.lightCanvas.getContext('2d');
    this.resizeLightCanvas();

    this.screenShake = 0;
    this.hudMessages = [];
  }

  resize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    this.width = w;
    this.height = h;
    this.resizeLightCanvas();
  }

  resizeLightCanvas() {
    this.lightCanvas.width = this.width;
    this.lightCanvas.height = this.height;
  }

  addMessage(text, color = '#39ff14', duration = 3.5) {
    this.hudMessages.push({ text, color, life: duration, maxLife: duration });
    if (this.hudMessages.length > 5) this.hudMessages.shift();
  }

  shake(amount = 8) {
    this.screenShake = Math.max(this.screenShake, amount);
  }

  update(dt, player) {
    // Smooth camera lerp
    const targetX = player.x - this.width / 2;
    const targetY = player.y - this.height / 2;
    this.camX += (targetX - this.camX) * (1 - Math.exp(-dt * 8));
    this.camY += (targetY - this.camY) * (1 - Math.exp(-dt * 8));

    // Screen shake decay
    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - dt * 24);
    }

    // Update HUD messages
    for (const msg of this.hudMessages) {
      msg.life -= dt;
    }
    this.hudMessages = this.hudMessages.filter(m => m.life > 0);
  }

  // Convert world to screen coordinates
  toScreen(wx, wy) {
    return {
      x: wx - this.camX + (Math.random() - 0.5) * this.screenShake,
      y: wy - this.camY + (Math.random() - 0.5) * this.screenShake
    };
  }

  render(sceneName, player, homestead, zone, projectiles, particles, dt) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.save();
    const shakeOffsetX = (Math.random() - 0.5) * this.screenShake;
    const shakeOffsetY = (Math.random() - 0.5) * this.screenShake;
    ctx.translate(-this.camX + shakeOffsetX, -this.camY + shakeOffsetY);

    if (sceneName === 'HOMESTEAD') {
      this.renderHomestead(ctx, homestead, player);
    } else if (sceneName === 'ZONE') {
      this.renderZone(ctx, zone, player);
    } else if (sceneName === 'AIRLOCK') {
      this.renderAirlock(ctx, player);
    }

    // Render Projectiles
    this.renderProjectiles(ctx, projectiles);

    // Render Particles
    particles.render(ctx);

    // Render Player
    this.renderPlayer(ctx, player, sceneName);

    ctx.restore();

    // In Exclusion Zone: Apply pitch-black dynamic lighting & flashlight shadows
    if (sceneName === 'ZONE') {
      this.applyZoneLighting(player, zone, projectiles);
    } else if (sceneName === 'AIRLOCK') {
      this.applyAirlockAtmosphere();
    }

    // Diegetic HUD
    this.renderDiegeticHUD(player, sceneName, homestead, zone);
  }

  // --- HOMESTEAD RENDERING ---

  renderHomestead(ctx, homestead, player) {
    // Background earth / flagstone
    ctx.fillStyle = '#1c1815';
    ctx.fillRect(homestead.startX - 240, homestead.startY - 220, 800, 680);

    // Perimeter stone wall
    ctx.strokeStyle = '#383028';
    ctx.lineWidth = 14;
    ctx.strokeRect(homestead.startX - 220, homestead.startY - 200, 760, 640);

    // Inner farmyard cobblestone
    ctx.fillStyle = '#26201b';
    ctx.fillRect(homestead.startX - 180, homestead.startY - 60, homestead.cols * homestead.tileSize + 280, homestead.rows * homestead.tileSize + 120);

    // Render Soil Tiles
    for (const tile of homestead.tiles) {
      this.renderSoilTile(ctx, tile);
    }

    // Stations
    this.renderCompostVat(ctx, homestead.compostVat);
    this.renderApothecaryBench(ctx, homestead.apothecaryBench);
    this.renderWaterWell(ctx, homestead.waterWell);
    this.renderAirlockGate(ctx, homestead.airlockGate, 'ZONE ENTRANCE');
  }

  renderSoilTile(ctx, tile) {
    ctx.save();
    // Base soil color: dry loam vs moist fertile humus
    const moistFactor = tile.moisture / 100;
    const r = Math.floor(45 + moistFactor * 15);
    const g = Math.floor(32 + moistFactor * 10);
    const b = Math.floor(22 + moistFactor * 8);

    ctx.fillStyle = tile.isTilled ? `rgb(${r}, ${g}, ${b})` : '#231e1a';
    ctx.fillRect(tile.x + 2, tile.y + 2, tile.size - 4, tile.size - 4);

    // Border: shows tilled furrows
    ctx.strokeStyle = tile.isTilled ? '#4a3728' : '#1a1714';
    ctx.lineWidth = 2;
    ctx.strokeRect(tile.x + 2, tile.y + 2, tile.size - 4, tile.size - 4);

    // Tilled furrows lines
    if (tile.isTilled) {
      ctx.strokeStyle = 'rgba(20, 15, 10, 0.4)';
      ctx.beginPath();
      ctx.moveTo(tile.x + 6, tile.y + 16);
      ctx.lineTo(tile.x + tile.size - 6, tile.y + 16);
      ctx.moveTo(tile.x + 6, tile.y + 32);
      ctx.lineTo(tile.x + tile.size - 6, tile.y + 32);
      ctx.moveTo(tile.x + 6, tile.y + 48);
      ctx.lineTo(tile.x + tile.size - 6, tile.y + 48);
      ctx.stroke();
    }

    // Render Crop
    if (tile.crop) {
      this.renderCrop(ctx, tile);
    }

    ctx.restore();
  }

  renderCrop(ctx, tile) {
    const cx = tile.x + tile.size / 2;
    const cy = tile.y + tile.size / 2;
    const stage = tile.stage;

    ctx.save();
    if (tile.isDead) {
      // Withered black husk
      ctx.fillStyle = '#444444';
      ctx.fillRect(cx - 3, cy - 8, 6, 16);
      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.arc(cx, cy - 8, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    // Glow if mature or bioluminescent
    if (tile.crop.id === 'phosphor' && stage >= 2) {
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 28);
      grad.addColorStop(0, tile.crop.glowColor);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fill();
    }

    // Stem
    ctx.strokeStyle = '#2d6a4f';
    ctx.lineWidth = 3 + stage;
    ctx.beginPath();
    ctx.moveTo(cx, cy + 12);
    ctx.lineTo(cx, cy - 2 - stage * 4);
    ctx.stroke();

    // Foliage & Fruits based on stage
    if (stage === 0) {
      // Tiny seedling
      ctx.fillStyle = '#52b788';
      ctx.beginPath();
      ctx.arc(cx, cy + 4, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (stage === 1) {
      // Sprout leaves
      ctx.fillStyle = '#52b788';
      ctx.beginPath();
      ctx.ellipse(cx - 5, cy, 6, 3, -0.4, 0, Math.PI * 2);
      ctx.ellipse(cx + 5, cy, 6, 3, 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (stage === 2) {
      // Blooming
      ctx.fillStyle = tile.crop.color;
      ctx.beginPath();
      ctx.arc(cx, cy - 8, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (stage === 3) {
      // Fully mature harvestable pod
      ctx.fillStyle = tile.crop.color;
      ctx.beginPath();
      ctx.arc(cx, cy - 12, 10, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing harvest indicator
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  renderCompostVat(ctx, vat) {
    ctx.save();
    // Heavy wooden vat with brass bands
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(vat.x, vat.y, vat.width, vat.height);
    ctx.strokeStyle = '#d7a15c';
    ctx.lineWidth = 3;
    ctx.strokeRect(vat.x, vat.y, vat.width, vat.height);

    // Slurry liquid inside
    ctx.fillStyle = '#1b4332';
    ctx.fillRect(vat.x + 6, vat.y + 6, vat.width - 12, vat.height - 12);

    ctx.fillStyle = '#a7c957';
    ctx.font = 'bold 11px monospace';
    ctx.fillText('COMPOST', vat.x + 8, vat.y + 32);
    ctx.fillText(`${vat.slurryAmount} Bkt`, vat.x + 14, vat.y + 48);
    ctx.restore();
  }

  renderApothecaryBench(ctx, bench) {
    ctx.save();
    ctx.fillStyle = '#2e282a';
    ctx.fillRect(bench.x, bench.y, bench.width, bench.height);
    ctx.strokeStyle = '#9d4edd';
    ctx.lineWidth = 2;
    ctx.strokeRect(bench.x, bench.y, bench.width, bench.height);

    ctx.fillStyle = '#c77dff';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('APOTHECARY', bench.x + 3, bench.y + 30);
    ctx.fillText('[E] Craft', bench.x + 10, bench.y + 46);
    ctx.restore();
  }

  renderWaterWell(ctx, well) {
    ctx.save();
    ctx.fillStyle = '#212529';
    ctx.beginPath();
    ctx.arc(well.x + well.width / 2, well.y + well.height / 2, well.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#48cae4';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#48cae4';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('WELL', well.x + 16, well.y + 34);
    ctx.restore();
  }

  renderAirlockGate(ctx, gate, label) {
    ctx.save();
    ctx.fillStyle = '#b7094c';
    ctx.fillRect(gate.x, gate.y, gate.w, gate.h);
    ctx.strokeStyle = '#ffb703';
    ctx.lineWidth = 3;
    ctx.strokeRect(gate.x, gate.y, gate.w, gate.h);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(label, gate.x + 6, gate.y + 24);
    ctx.restore();
  }

  // --- ZONE RENDERING ---

  renderZone(ctx, zone, player) {
    // Basalt and bone ground
    ctx.fillStyle = '#0d0d0f';
    ctx.fillRect(0, 0, zone.width, zone.height);

    // Subtle anomalous fissures
    ctx.strokeStyle = '#1b1b22';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 300); ctx.lineTo(400, 380); ctx.lineTo(800, 320);
    ctx.moveTo(500, 800); ctx.lineTo(900, 750); ctx.lineTo(1300, 880);
    ctx.stroke();

    // Obstacles / Gothic Walls
    for (const obs of zone.obstacles) {
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
      ctx.strokeStyle = '#44403c';
      ctx.lineWidth = 2;
      ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
    }

    // Resource Nodes
    for (const node of zone.nodes) {
      if (node.isHarvested) continue;
      ctx.save();
      if (node.type === 'ICHOR') {
        ctx.fillStyle = '#2d6a4f';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#52b788';
        ctx.fillText('ICHOR SEEP', node.x - 30, node.y - 12);
      } else if (node.type === 'BONE') {
        ctx.fillStyle = '#d6ccc2';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f5ebe0';
        ctx.fillText('SPINE FOSSIL', node.x - 35, node.y - 12);
      } else if (node.type === 'GERMPLASM') {
        ctx.fillStyle = '#7209b7';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f72585';
        ctx.fillText('GERMPLASM', node.x - 32, node.y - 12);
      }
      ctx.restore();
    }

    // Airlock Gate back to Homestead
    this.renderAirlockGate(ctx, zone.airlockGate, 'HOMESTEAD GATE');

    // Extraction Winch Station
    this.renderExtractionWinch(ctx, zone.extractionWinch);

    // Render Screechers
    for (const scr of zone.screechers) {
      if (!scr.isAlive) continue;
      ctx.save();
      ctx.fillStyle = '#0077b6';
      ctx.beginPath();
      ctx.arc(scr.x, scr.y, scr.radius, 0, Math.PI * 2);
      ctx.fill();

      // Sound ping ripple
      if (scr.pulseRadius > 0) {
        ctx.strokeStyle = `rgba(0, 180, 216, ${1 - scr.pulseRadius / scr.pulseMaxRadius})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(scr.x, scr.y, scr.pulseRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Render Stalkers
    for (const stalker of zone.stalkers) {
      if (!stalker.isAlive) continue;
      this.renderStalker(ctx, stalker);
    }
  }

  renderStalker(ctx, stalker) {
    ctx.save();
    ctx.translate(stalker.x, stalker.y);
    ctx.rotate(stalker.facingAngle);

    // Gloom Shield Aura: Dark void mist
    if (stalker.gloomShield > 0) {
      const shieldRatio = stalker.gloomShield / stalker.maxGloomShield;
      ctx.fillStyle = `rgba(88, 24, 69, ${0.45 * shieldRatio})`;
      ctx.beginPath();
      ctx.arc(0, 0, stalker.radius + 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(144, 12, 63, ${0.7 * shieldRatio})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Body
    ctx.fillStyle = stalker.gloomShield <= 0 ? '#b7094c' : '#14001a';
    ctx.beginPath();
    ctx.ellipse(0, 0, stalker.radius, stalker.radius * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Claws / Mandibles
    ctx.strokeStyle = '#e63946';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(stalker.radius, -8);
    ctx.lineTo(stalker.radius + 10, -12);
    ctx.moveTo(stalker.radius, 8);
    ctx.lineTo(stalker.radius + 10, 12);
    ctx.stroke();

    // Eyes: Sickly predatory red
    ctx.fillStyle = '#ff0055';
    ctx.beginPath();
    ctx.arc(8, -5, 3, 0, Math.PI * 2);
    ctx.arc(8, 5, 3, 0, Math.PI * 2);
    ctx.fill();

    // Shield status bar over head
    ctx.rotate(-stalker.facingAngle);
    if (stalker.gloomShield > 0) {
      ctx.fillStyle = '#333333';
      ctx.fillRect(-20, -32, 40, 5);
      ctx.fillStyle = '#9d4edd';
      ctx.fillRect(-20, -32, 40 * (stalker.gloomShield / stalker.maxGloomShield), 5);
    } else {
      // Health bar when vulnerable
      ctx.fillStyle = '#333333';
      ctx.fillRect(-20, -32, 40, 5);
      ctx.fillStyle = '#e63946';
      ctx.fillRect(-20, -32, 40 * (stalker.health / stalker.maxHealth), 5);
    }

    ctx.restore();
  }

  renderExtractionWinch(ctx, winch) {
    ctx.save();
    ctx.translate(winch.x, winch.y);

    // Winch platform
    ctx.fillStyle = '#212529';
    ctx.beginPath();
    ctx.arc(0, 0, winch.radius, 0, Math.PI * 2);
    ctx.fill();

    // Ring indicator
    ctx.strokeStyle = winch.state === 'READY' ? '#39ff14' : (winch.state === 'SPOOLING' ? '#ffaa00' : '#6c757d');
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, winch.radius, 0, Math.PI * 2 * (winch.state === 'SPOOLING' ? winch.progress / 100 : 1));
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    if (winch.state === 'IDLE') {
      ctx.fillText('WINCH TETHER', 0, -8);
      ctx.fillText('[E] START', 0, 10);
    } else if (winch.state === 'SPOOLING') {
      ctx.fillText('SPOOLING...', 0, -8);
      ctx.fillText(`${Math.floor(winch.progress)}%`, 0, 10);
    } else if (winch.state === 'READY') {
      ctx.fillStyle = '#39ff14';
      ctx.fillText('TETHER READY', 0, -8);
      ctx.fillText('[E] EXTRACT!', 0, 10);
    }

    ctx.restore();
  }

  // --- AIRLOCK RENDERING ---

  renderAirlock(ctx, player) {
    ctx.fillStyle = '#111315';
    ctx.fillRect(player.x - 200, player.y - 200, 400, 400);

    ctx.strokeStyle = '#e0a96d';
    ctx.lineWidth = 10;
    ctx.strokeRect(player.x - 140, player.y - 140, 280, 280);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DECONTAMINATION AIRLOCK', player.x, player.y - 90);
    ctx.font = '12px monospace';
    ctx.fillText('Equalizing Atmospheric Toxicity...', player.x, player.y - 65);
  }

  // --- LIGHTING & FOG-OF-WAR ---

  applyZoneLighting(player, zone, projectiles) {
    const lctx = this.lightCtx;
    lctx.clearRect(0, 0, this.width, this.height);

    // Pitch-black ambient gloom
    lctx.fillStyle = 'rgba(2, 2, 4, 0.96)';
    lctx.fillRect(0, 0, this.width, this.height);

    // Subtract lights using destination-out
    lctx.globalCompositeOperation = 'destination-out';

    const pScreen = this.toScreen(player.x, player.y);

    // 1. Player ambient aura (faint close proximity)
    const pGrad = lctx.createRadialGradient(pScreen.x, pScreen.y, 5, pScreen.x, pScreen.y, 45);
    pGrad.addColorStop(0, 'rgba(0,0,0,1)');
    pGrad.addColorStop(1, 'rgba(0,0,0,0)');
    lctx.fillStyle = pGrad;
    lctx.beginPath();
    lctx.arc(pScreen.x, pScreen.y, 45, 0, Math.PI * 2);
    lctx.fill();

    // 2. Player Flashlight Cone (Raymarched Light)
    if (player.flashlightOn) {
      const coneGrad = lctx.createRadialGradient(
        pScreen.x, pScreen.y, 10,
        pScreen.x, pScreen.y, player.flashlightRange
      );
      coneGrad.addColorStop(0, 'rgba(0,0,0,1)');
      coneGrad.addColorStop(0.7, 'rgba(0,0,0,0.85)');
      coneGrad.addColorStop(1, 'rgba(0,0,0,0)');

      lctx.fillStyle = coneGrad;
      lctx.beginPath();
      lctx.moveTo(pScreen.x, pScreen.y);
      lctx.arc(
        pScreen.x, pScreen.y,
        player.flashlightRange,
        player.angle - player.flashlightSpread,
        player.angle + player.flashlightSpread
      );
      lctx.closePath();
      lctx.fill();
    }

    // 3. Phosphor Flares Burning in Zone
    for (const proj of projectiles) {
      if (proj.type === 'FLARE') {
        const fScreen = this.toScreen(proj.x, proj.y);
        const flareGrad = lctx.createRadialGradient(
          fScreen.x, fScreen.y, 15,
          fScreen.x, fScreen.y, proj.lightRadius
        );
        flareGrad.addColorStop(0, 'rgba(0,0,0,1)');
        flareGrad.addColorStop(0.8, 'rgba(0,0,0,0.7)');
        flareGrad.addColorStop(1, 'rgba(0,0,0,0)');

        lctx.fillStyle = flareGrad;
        lctx.beginPath();
        lctx.arc(fScreen.x, fScreen.y, proj.lightRadius, 0, Math.PI * 2);
        lctx.fill();
      }
    }

    // Reset composite operation & draw dark mask over main canvas
    lctx.globalCompositeOperation = 'source-over';
    this.ctx.drawImage(this.lightCanvas, 0, 0);
  }

  applyAirlockAtmosphere() {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255, 120, 0, 0.08)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  // --- PROJECTILES & PLAYER RENDERING ---

  renderProjectiles(ctx, projectiles) {
    for (const proj of projectiles) {
      ctx.save();
      if (proj.type === 'FLARE') {
        ctx.fillStyle = '#ffff44';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#ffaa33';
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  renderPlayer(ctx, player, sceneName) {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);

    // Body: Heavy leather warden trenchcoat & respirator
    ctx.fillStyle = '#3a3d40';
    ctx.beginPath();
    ctx.arc(0, 0, player.radius, 0, Math.PI * 2);
    ctx.fill();

    // Shoulders
    ctx.fillStyle = '#212529';
    ctx.fillRect(-6, -player.radius - 2, 12, 4);
    ctx.fillRect(-6, player.radius - 2, 12, 4);

    // Pneumatic weapon / tool held forward
    ctx.fillStyle = '#b08968';
    ctx.fillRect(6, 4, 18, 5);
    ctx.fillStyle = '#7f5539';
    ctx.fillRect(20, 2, 8, 9);

    // Respirator mask lenses (amber glow)
    ctx.fillStyle = '#ffb703';
    ctx.beginPath();
    ctx.arc(8, -4, 2.5, 0, Math.PI * 2);
    ctx.arc(8, 4, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- DIEGETIC HUD ---

  renderDiegeticHUD(player, sceneName, homestead, zone) {
    const ctx = this.ctx;
    ctx.save();

    // Top Bar: Location & Phase
    ctx.fillStyle = 'rgba(15, 17, 20, 0.85)';
    ctx.fillRect(20, 20, 320, 75);
    ctx.strokeStyle = '#5c677d';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, 20, 320, 75);

    ctx.fillStyle = '#e0a96d';
    ctx.font = 'bold 14px monospace';
    const locName = sceneName === 'HOMESTEAD' ? 'OUTPOST 4: HOMESTEAD' : (sceneName === 'ZONE' ? 'OSSUARY EXCLUSION ZONE' : 'DECONTAMINATION AIRLOCK');
    ctx.fillText(locName, 32, 42);

    // Health & Sanity Gauges
    ctx.fillStyle = '#cccccc';
    ctx.font = '11px monospace';
    ctx.fillText(`VITALS: ${Math.floor(player.health)}%`, 32, 62);
    ctx.fillText(`SANITY: ${Math.floor(player.sanity)}%`, 140, 62);
    ctx.fillText(`STAMINA: ${Math.floor(player.stamina)}%`, 245, 62);

    // Health bar fill
    ctx.fillStyle = '#b7094c';
    ctx.fillRect(32, 68, 80, 5);
    ctx.fillStyle = '#06d6a0';
    ctx.fillRect(32, 68, 80 * (player.health / player.maxHealth), 5);

    // Sanity bar fill
    ctx.fillStyle = '#7209b7';
    ctx.fillRect(140, 68, 80 * (player.sanity / player.maxSanity), 5);

    // Active Tool / Weapon Panel (Bottom Right)
    const panelW = 340;
    const panelH = 110;
    const panelX = this.width - panelW - 20;
    const panelY = this.height - panelH - 20;

    ctx.fillStyle = 'rgba(15, 17, 20, 0.85)';
    ctx.fillRect(panelX, panelY, panelW, panelH);
    ctx.strokeStyle = '#5c677d';
    ctx.strokeRect(panelX, panelY, panelW, panelH);

    if (sceneName === 'HOMESTEAD') {
      const activeTool = player.farmTools[player.activeFarmToolIdx];
      ctx.fillStyle = '#52b788';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`EQUIPPED: ${activeTool.name}`, panelX + 15, panelY + 28);

      ctx.fillStyle = '#aaaaaa';
      ctx.font = '11px monospace';
      ctx.fillText(`[1-6 / Q,E] Cycle Tools | [LMB] Till / Water / Harvest`, panelX + 15, panelY + 48);
      ctx.fillText(`Harvest: Phosphor:${player.inventory.phosphor_pod} | Reed:${player.inventory.iron_reed} | Cinnabar:${player.inventory.cinnabar_core}`, panelX + 15, panelY + 70);
      ctx.fillText(`Ammunition: Flares:${player.inventory.flare_slugs} | Kinetic:${player.inventory.kinetic_slugs} | Meds:${player.inventory.inhalers}`, panelX + 15, panelY + 90);
    } else if (sceneName === 'ZONE') {
      const activeWeapon = player.zoneWeapons[player.activeZoneWeaponIdx];
      ctx.fillStyle = '#ffb703';
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`ARMAMENT: ${activeWeapon.name}`, panelX + 15, panelY + 28);

      const ammoCount = player.inventory[activeWeapon.ammoKey];
      ctx.fillStyle = '#39ff14';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(`RESERVE ROUNDS: ${ammoCount}`, panelX + 15, panelY + 50);

      ctx.fillStyle = '#aaaaaa';
      ctx.font = '11px monospace';
      ctx.fillText(`[1-3 / Q,E] Switch Weapon | [LMB] Fire | [R] Inhaler`, panelX + 15, panelY + 72);
      ctx.fillText(`Cargo: Ichor:${player.inventory.mutant_ichor} | Bone:${player.inventory.calcified_bone} | Germplasm:${player.inventory.germplasm_core}`, panelX + 15, panelY + 92);
    }

    // Notification Log (Top Center)
    let logY = 35;
    for (const msg of this.hudMessages) {
      const alpha = Math.min(1, msg.life / 0.5);
      ctx.fillStyle = `rgba(0,0,0,${0.6 * alpha})`;
      ctx.fillRect(this.width / 2 - 200, logY - 14, 400, 24);

      ctx.fillStyle = msg.color;
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(msg.text, this.width / 2, logY);
      logY += 28;
    }
    ctx.textAlign = 'left';

    ctx.restore();
  }
}

window.Renderer = Renderer;
