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

  window.TradeOSHardwareVisualizer = HardwareVisualizer;
})(window);
