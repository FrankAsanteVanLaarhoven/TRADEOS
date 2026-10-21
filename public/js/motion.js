/**
 * TradeOS Africa - Motion & Cinematic Hardware Canvas
 * Interactive CAD projection, particle telemetry, and corridor radar visualization
 */

(function(window) {
  'use strict';

  class HardwareVisualizer {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.mode = "cinematic"; // cinematic, exploded, radar
      this.animationFrame = null;
      this.particles = [];
      this.time = 0;
      this.mouseX = 0;
      this.mouseY = 0;

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      
      // Mouse move effect
      this.canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      });

      // Seed particles
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          alpha: Math.random() * 0.6 + 0.2
        });
      }

      this.render();
    }

    resize() {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
    }

    setMode(mode) {
      this.mode = mode;
    }

    render() {
      this.time += 0.02;
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle telemetry grid in background
      ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw floating particles
      this.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Mode-specific render
      if (this.mode === "cinematic") {
        this.renderCinematicOverlay(ctx, w, h);
      } else if (this.mode === "exploded") {
        this.renderExplodedSpecOverlay(ctx, w, h);
      } else if (this.mode === "radar") {
        this.renderRadarOverlay(ctx, w, h);
      }

      this.animationFrame = requestAnimationFrame(() => this.render());
    }

    renderCinematicOverlay(ctx, w, h) {
      const cx = w * 0.5;
      const cy = h * 0.5;
      const ringRadius = 160 + Math.sin(this.time) * 8;

      // Rotating subtle optical reticle
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(this.time * 0.15);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.setLineDash([4, 8]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Corner marks
      ctx.setLineDash([]);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      const markLen = 14;
      [ringRadius, ringRadius * 0.6].forEach(r => {
        ctx.beginPath();
        ctx.moveTo(-r, 0); ctx.lineTo(-r + markLen, 0);
        ctx.moveTo(r, 0); ctx.lineTo(r - markLen, 0);
        ctx.moveTo(0, -r); ctx.lineTo(0, -r + markLen);
        ctx.moveTo(0, r); ctx.lineTo(0, r - markLen);
        ctx.stroke();
      });

      ctx.restore();

      // Top-right coordinate display
      ctx.fillStyle = "rgba(148, 163, 184, 0.8)";
      ctx.font = "10px monospace";
      ctx.fillText(`FPS: 60 | OPTICAL CAD TRACKER [OK]`, w - 240, 30);
      ctx.fillText(`ANODIZED AL6063-T6 [TOLERANCE: ±0.05mm]`, w - 240, 44);
    }

    renderExplodedSpecOverlay(ctx, w, h) {
      // Draw technical dimension lines
      ctx.strokeStyle = "rgba(245, 158, 11, 0.7)";
      ctx.lineWidth = 1.5;

      // Target point 1 (main bracket)
      const p1 = { x: w * 0.38, y: h * 0.42 };
      const callout1 = { x: w * 0.18, y: h * 0.28 };

      ctx.beginPath();
      ctx.arc(p1.x, p1.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(callout1.x + 60, callout1.y);
      ctx.lineTo(callout1.x, callout1.y);
      ctx.stroke();

      // Target point 2 (high-tensile fastener)
      const p2 = { x: w * 0.58, y: h * 0.48 };
      const callout2 = { x: w * 0.78, y: h * 0.38 };

      ctx.beginPath();
      ctx.arc(p2.x, p2.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(callout2.x - 60, callout2.y);
      ctx.lineTo(callout2.x, callout2.y);
      ctx.stroke();
    }

    renderRadarOverlay(ctx, w, h) {
      // Simulated marine corridor radar sweep
      const cx = w * 0.5;
      const cy = h * 0.5;
      const maxR = Math.min(w, h) * 0.45;

      ctx.strokeStyle = "rgba(16, 185, 129, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * 0.33, 0, Math.PI * 2);
      ctx.arc(cx, cy, maxR * 0.66, 0, Math.PI * 2);
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.stroke();

      // Sweeping beam
      const sweepAngle = (this.time * 1.2) % (Math.PI * 2);
      ctx.save();
      ctx.translate(cx, cy);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxR);
      grad.addColorStop(0, "rgba(16, 185, 129, 0.4)");
      grad.addColorStop(1, "rgba(16, 185, 129, 0)");

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxR, sweepAngle - 0.4, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();

      // Radar transit blips
      const lagos = { x: cx + maxR * 0.5, y: cy - maxR * 0.2 };
      const tema = { x: cx - maxR * 0.4, y: cy + maxR * 0.1 };

      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(lagos.x, lagos.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText("APAPA PORT (LAGOS)", lagos.x + 8, lagos.y + 3);

      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(tema.x, tema.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText("TEMA PORT (GHANA)", tema.x + 8, tema.y + 3);

      // Dash line connecting corridor
      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(lagos.x, lagos.y);
      ctx.lineTo(tema.x, tema.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // ==========================================================================
  // GLOBAL MULTI-MODAL RADAR (Maritime AIS, Air Cargo & Road Haulage Fleet)
  // Military & NASA Open-Source Inspired Telematics Map Engine
  // ==========================================================================
  class GlobalMultiModalRadar {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.animationFrame = null;
      this.time = 0;
      this.hoveredItem = null;
      this.mouseX = -1;
      this.mouseY = -1;

      // Coordinate bounds (Pan-African Trade Corridors + Global Links)
      this.bounds = {
        minLat: -36.5, // Cape Town / Durban
        maxLat: 37.5,  // Tangier / Mediterranean
        minLon: -22.0, // Atlantic Dakar West
        maxLon: 58.0   // Dubai / Indian Ocean East
      };

      // Major Continental Trade Ports & Freight Hubs
      this.hubs = [
        { name: "Tanger Med", lat: 35.88, lon: -5.50, type: "port" },
        { name: "Dakar", lat: 14.69, lon: -17.44, type: "port" },
        { name: "Tema (Accra)", lat: 5.62, lon: -0.01, type: "port" },
        { name: "Apapa (Lagos)", lat: 6.44, lon: 3.36, type: "port" },
        { name: "Mombasa SEZ", lat: -4.04, lon: 39.66, type: "port" },
        { name: "Durban Port", lat: -29.87, lon: 31.02, type: "port" },
        { name: "Addis Bole", lat: 9.00, lon: 38.74, type: "air" },
        { name: "Nairobi JKIA", lat: -1.31, lon: 36.92, type: "air" },
        { name: "JHB City Deep", lat: -26.20, lon: 28.04, type: "road" },
        { name: "Dubai Logistics", lat: 25.25, lon: 55.36, type: "hub" },
        { name: "Kampala Mukono", lat: 0.35, lon: 32.75, type: "road" },
        { name: "Lusaka Heavy Ind", lat: -15.41, lon: 28.28, type: "road" }
      ];

      // Simplified Continental Coastline Outline for Cartographic Depth
      this.coastline = [
        { lat: 36.0, lon: -5.5 },  // Strait of Gibraltar
        { lat: 33.5, lon: -7.6 },  // Casablanca
        { lat: 28.0, lon: -12.5 }, // Western Sahara
        { lat: 14.7, lon: -17.5 }, // Dakar
        { lat: 9.5, lon: -13.7 },  // Conakry
        { lat: 4.3, lon: -7.5 },   // Monrovia/Cape Palmas
        { lat: 5.3, lon: -4.0 },   // Abidjan
        { lat: 5.6, lon: 0.0 },    // Tema
        { lat: 6.4, lon: 3.4 },    // Lagos
        { lat: 4.7, lon: 8.3 },    // Calabar
        { lat: 4.0, lon: 9.7 },    // Douala
        { lat: -0.5, lon: 9.3 },   // Gabon
        { lat: -6.0, lon: 12.3 },  // Congo
        { lat: -8.8, lon: 13.2 },  // Luanda
        { lat: -22.9, lon: 14.5 }, // Walvis Bay
        { lat: -34.0, lon: 18.5 }, // Cape of Good Hope
        { lat: -34.8, lon: 20.0 }, // Cape Agulhas
        { lat: -29.9, lon: 31.0 }, // Durban
        { lat: -25.9, lon: 32.6 }, // Maputo
        { lat: -15.1, lon: 40.5 }, // Mozambique
        { lat: -6.8, lon: 39.3 },  // Dar es Salaam
        { lat: -4.0, lon: 39.7 },  // Mombasa
        { lat: 2.0, lon: 45.3 },   // Mogadishu
        { lat: 11.8, lon: 51.3 },  // Horn of Africa
        { lat: 11.6, lon: 43.1 },  // Djibouti (Bab-el-Mandeb)
        { lat: 19.6, lon: 37.2 },  // Port Sudan (Red Sea)
        { lat: 27.8, lon: 34.3 },  // Sinai
        { lat: 31.2, lon: 32.3 },  // Port Said (Suez)
        { lat: 31.2, lon: 29.9 },  // Alexandria
        { lat: 32.9, lon: 13.2 },  // Tripoli
        { lat: 36.8, lon: 10.2 },  // Tunis
        { lat: 36.8, lon: 3.0 },   // Algiers
        { lat: 35.8, lon: -5.3 }   // Tanger Med back to start
      ];

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());

      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        this.mouseY = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        this.checkHover();
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouseX = -1;
        this.mouseY = -1;
        this.hoveredItem = null;
        this.canvas.style.cursor = 'default';
      });

      this.canvas.addEventListener('click', () => {
        if (this.hoveredItem && window.TradeOSStore) {
          window.TradeOSStore.selectFleetItem(this.hoveredItem.id);
        }
      });

      this.render();
    }

    resize() {
      if (!this.canvas) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = Math.max(380, rect.height || 420) * dpr;
      this.ctx.scale(dpr, dpr);
      this.cssWidth = rect.width;
      this.cssHeight = Math.max(380, rect.height || 420);
    }

    project(lat, lon) {
      const w = this.cssWidth;
      const h = this.cssHeight;
      const x = ((lon - this.bounds.minLon) / (this.bounds.maxLon - this.bounds.minLon)) * w;
      const y = ((this.bounds.maxLat - lat) / (this.bounds.maxLat - this.bounds.minLat)) * h;
      return { x, y };
    }

    checkHover() {
      if (!window.TradeOSStore) return;
      const fleet = window.TradeOSStore.getFilteredFleet();
      let found = null;
      for (const item of fleet) {
        const pt = this.project(item.lat, item.lon);
        const dist = Math.hypot(pt.x - (this.mouseX / (window.devicePixelRatio || 1)), pt.y - (this.mouseY / (window.devicePixelRatio || 1)));
        if (dist < 22) {
          found = item;
          break;
        }
      }
      this.hoveredItem = found;
      this.canvas.style.cursor = found ? 'pointer' : 'crosshair';
    }

    render() {
      this.time += 0.02;
      const ctx = this.ctx;
      const w = this.cssWidth;
      const h = this.cssHeight;
      if (!w || !h) return;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      // Deep Ocean Cartographic Background
      const bgGrad = ctx.createRadialGradient(w * 0.45, h * 0.5, 40, w * 0.5, h * 0.5, Math.max(w, h));
      bgGrad.addColorStop(0, '#090f19');
      bgGrad.addColorStop(0.7, '#04070d');
      bgGrad.addColorStop(1, '#020306');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Graticule Lines (Latitude & Longitude)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
      ctx.lineWidth = 1;
      for (let lat = -30; lat <= 30; lat += 15) {
        const p1 = this.project(lat, this.bounds.minLon);
        const p2 = this.project(lat, this.bounds.maxLon);
        ctx.beginPath();
        ctx.moveTo(0, p1.y);
        ctx.lineTo(w, p2.y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.font = '9px monospace';
        ctx.fillText(`${lat > 0 ? lat + '°N' : lat < 0 ? Math.abs(lat) + '°S' : '0° EQ'}`, 8, p1.y - 3);
      }
      for (let lon = -15; lon <= 45; lon += 15) {
        const p1 = this.project(this.bounds.maxLat, lon);
        const p2 = this.project(this.bounds.minLat, lon);
        ctx.beginPath();
        ctx.moveTo(p1.x, 0);
        ctx.lineTo(p2.x, h);
        ctx.stroke();

        ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.font = '9px monospace';
        ctx.fillText(`${lon > 0 ? lon + '°E' : lon < 0 ? Math.abs(lon) + '°W' : '0° GM'}`, p1.x + 4, 14);
      }

      // Draw African Continent Landmass Silhouette
      ctx.beginPath();
      this.coastline.forEach((pt, idx) => {
        const c = this.project(pt.lat, pt.lon);
        if (idx === 0) ctx.moveTo(c.x, c.y);
        else ctx.lineTo(c.x, c.y);
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Maritime Shipping Sea Lanes (Trans-African Corridors)
      this.drawSeaLanes(ctx);

      // Air Corridors (Aviation Arcs)
      this.drawAirCorridors(ctx);

      // Road Haulage Highway Polylines
      this.drawRoadCorridors(ctx);

      // Strategic Trade Hub Blips
      this.hubs.forEach(hub => {
        const p = this.project(hub.lat, hub.lon);
        ctx.fillStyle = hub.type === 'port' ? 'rgba(56, 189, 248, 0.8)' : hub.type === 'air' ? 'rgba(168, 85, 247, 0.8)' : 'rgba(16, 185, 129, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(203, 213, 225, 0.75)';
        ctx.font = '9px sans-serif';
        ctx.fillText(hub.name, p.x + 5, p.y + 3);
      });

      // Render Active Fleet Telematics
      if (window.TradeOSStore) {
        const fleet = window.TradeOSStore.getFilteredFleet();
        const selectedId = window.TradeOSStore.selectedFleetItemId;

        fleet.forEach(item => {
          this.renderFleetMarker(ctx, item, item.id === selectedId);
        });
      }

      // Satellite Radar Scanning Sweep Arc (NASA/Military HUD aesthetic)
      const radarSweepCenter = this.project(4.5, 10.0);
      const sweepAngle = (this.time * 0.9) % (Math.PI * 2);
      ctx.save();
      ctx.translate(radarSweepCenter.x, radarSweepCenter.y);
      const sweepRadius = Math.min(w, h) * 0.42;
      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sweepRadius);
      sweepGrad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      sweepGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, sweepRadius, sweepAngle - 0.35, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();
      ctx.restore();

      // Telemetry Watermark & Satellite Stamp
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.font = '10px monospace';
      ctx.fillText('RADAR SATELLITE FEED • STARLINK + AIS-COSMOS [ACTIVE]', 14, h - 24);
      ctx.fillText(`GPS LAT-LON REFRESH: 200ms • CARGO TELEMATICS ENCRYPTED`, 14, h - 10);

      ctx.restore();
      this.animationFrame = requestAnimationFrame(() => this.render());
    }

    drawSeaLanes(ctx) {
      // West Africa Maritime Feeder (Tanger Med -> Dakar -> Abidjan -> Tema -> Lagos -> Durban)
      const seaWaypoints = [
        { lat: 36.2, lon: -5.7 },
        { lat: 28.5, lon: -15.5 },
        { lat: 14.5, lon: -18.2 },
        { lat: 4.0, lon: -8.0 },
        { lat: 4.8, lon: -0.5 },
        { lat: 5.5, lon: 3.5 },
        { lat: -5.0, lon: 10.5 },
        { lat: -23.0, lon: 13.0 },
        { lat: -35.2, lon: 19.5 },
        { lat: -30.5, lon: 32.0 }
      ];

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 4]);
      ctx.lineDashOffset = -this.time * 20;

      ctx.beginPath();
      seaWaypoints.forEach((wp, i) => {
        const pt = this.project(wp.lat, wp.lon);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    drawAirCorridors(ctx) {
      // Ethiopian Airlines Arc: Addis Ababa to Lagos
      const addis = this.project(9.005, 38.746);
      const lagos = this.project(6.577, 3.321);
      
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.lineDashOffset = -this.time * 15;

      ctx.beginPath();
      ctx.moveTo(addis.x, addis.y);
      const cpAir = { x: (addis.x + lagos.x) / 2, y: Math.min(addis.y, lagos.y) - 40 };
      ctx.quadraticCurveTo(cpAir.x, cpAir.y, lagos.x, lagos.y);
      ctx.stroke();

      // Emirates SkyCargo Arc: Dubai to Johannesburg
      const dxb = this.project(25.253, 55.365);
      const jnb = this.project(-26.139, 28.246);
      ctx.beginPath();
      ctx.moveTo(dxb.x, dxb.y);
      const cpDxb = { x: (dxb.x + jnb.x) / 2 + 30, y: (dxb.y + jnb.y) / 2 };
      ctx.quadraticCurveTo(cpDxb.x, cpDxb.y, jnb.x, jnb.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    drawRoadCorridors(ctx) {
      // Abidjan-Lagos Road Corridor
      const roadWaypoints = [
        { lat: 5.35, lon: -4.00 }, // Abidjan
        { lat: 5.60, lon: -0.18 }, // Accra / Tema
        { lat: 6.13, lon: 1.22 },  // Lome
        { lat: 6.36, lon: 2.42 },  // Cotonou
        { lat: 6.38, lon: 2.65 },  // Seme-Krake border
        { lat: 6.52, lon: 3.37 }   // Lagos
      ];

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.lineDashOffset = -this.time * 12;

      ctx.beginPath();
      roadWaypoints.forEach((wp, i) => {
        const pt = this.project(wp.lat, wp.lon);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    renderFleetMarker(ctx, item, isSelected) {
      const pt = this.project(item.lat, item.lon);
      const isHovered = this.hoveredItem && this.hoveredItem.id === item.id;

      ctx.save();
      ctx.translate(pt.x, pt.y);

      // Pulse ring for active or selected item
      if (isSelected || isHovered) {
        const pulseR = 12 + Math.sin(this.time * 4) * 4;
        ctx.strokeStyle = item.type === 'maritime' ? '#38bdf8' : item.type === 'air' ? '#c084fc' : '#34d399';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (item.type === 'maritime') {
        // Cargo Vessel Silhouette & AIS Vector
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        // Ship Heading Vector Arrow
        const headingRad = (item.headingDeg - 90) * (Math.PI / 180);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(headingRad) * 14, Math.sin(headingRad) * 14);
        ctx.stroke();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(item.vesselName || item.carrier, 10, -5);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px monospace';
        ctx.fillText(`AIS: ${item.speedKnots} kn • Draft ${item.draftMeters}m`, 10, 7);

      } else if (item.type === 'air') {
        // Air Cargo Jet Icon
        ctx.fillStyle = '#c084fc';
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        // Flight vector
        const headingRad = (item.headingDeg - 90) * (Math.PI / 180);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(headingRad) * 18, Math.sin(headingRad) * 18);
        ctx.stroke();

        // Flight Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(item.flightNumber, 10, -5);
        ctx.fillStyle = '#c084fc';
        ctx.font = '9px monospace';
        ctx.fillText(`FL${Math.round(item.altitudeFt / 100)} • ${item.speedKnots} kts`, 10, 7);

      } else if (item.type === 'road') {
        // Uber-Style Road Haulage Truck Marker
        ctx.fillStyle = '#34d399';
        ctx.fillRect(-6, -4, 12, 8);
        ctx.fillStyle = '#065f46';
        ctx.fillRect(2, -3, 3, 6); // cab

        // Green Cryptographic e-seal pulse
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();

        // Road Telematics Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(`${item.truckPlate}`, 12, -4);
        ctx.fillStyle = '#34d399';
        ctx.font = '9px monospace';
        ctx.fillText(`${item.speedKmH} km/h • ${item.cargoTempC}°C • E-SEAL OK`, 12, 8);
      }

      ctx.restore();
    }
  }

  window.TradeOSHardwareVisualizer = HardwareVisualizer;
  window.TradeOSGlobalMultiModalRadar = GlobalMultiModalRadar;
})(window);

