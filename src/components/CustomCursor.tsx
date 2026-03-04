"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

// Draw a heart shape centered at (0,0) with given size
function drawHeart(ctx: CanvasRenderingContext2D, size: number) {
  const s = size;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.1, 0, s);
  ctx.bezierCurveTo(s, s * 0.1, s * 0.5, -s * 0.3, 0, s * 0.3);
  ctx.closePath();
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef<Point>({ x: -100, y: -100 });
  const pos = useRef<Point>({ x: -100, y: -100 });
  const vel = useRef<Point>({ x: 0, y: 0 });
  const trail = useRef<Point[]>([]);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number>(0);
  const hovered = useRef(false);
  const lastMouse = useRef<Point>({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onClick = (e: MouseEvent) => {
      // Burst of heart + circle particles on click
      for (let i = 0; i < 10; i++) {
        particles.current.push(new Particle(e.clientX, e.clientY, i < 4 ? "heart" : "circle"));
      }
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")
      ) {
        hovered.current = true;
      }
    };

    const onLeave = () => {
      hovered.current = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const time = performance.now() * 0.001;

      // Smooth follow with spring-like easing
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      vel.current.x += dx * 0.12;
      vel.current.y += dy * 0.12;
      vel.current.x *= 0.75;
      vel.current.y *= 0.75;
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Track mouse speed for dynamic effects
      const speed = Math.hypot(
        mouse.current.x - lastMouse.current.x,
        mouse.current.y - lastMouse.current.y
      );
      lastMouse.current = { ...mouse.current };

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Warm gradient trail ---
      trail.current.push({ x: pos.current.x, y: pos.current.y });
      if (trail.current.length > 24) trail.current.shift();

      if (trail.current.length > 2) {
        for (let t = 0; t < trail.current.length - 1; t++) {
          const progress = t / (trail.current.length - 1);
          const alpha = progress * 0.6;
          const width = progress * (2.5 + Math.min(speed * 0.08, 3));

          ctx.beginPath();
          ctx.moveTo(trail.current[t].x, trail.current[t].y);
          ctx.lineTo(trail.current[t + 1].x, trail.current[t + 1].y);

          // Gradient from warm rose to coral
          const r = Math.round(254 + (255 - 254) * progress);
          const g = Math.round(60 + (107 - 60) * progress);
          const b = Math.round(114 + (74 - 114) * progress);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      // --- Particles ---
      particles.current = particles.current.filter((p) => p.life > 0);
      for (const p of particles.current) {
        p.update();
        p.draw(ctx);
      }

      // --- Outer ring (soft pulsing, not dashed) ---
      const basePulse = Math.sin(time * 2.5) * 0.15 + 0.85;
      const ringRadius = (hovered.current ? 24 : 17) * basePulse;
      const hoverScale = hovered.current ? 1.15 : 1;

      ctx.save();
      ctx.translate(pos.current.x, pos.current.y);

      // Soft warm ring — dual stroke for depth
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * hoverScale, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(254, 60, 114, ${hovered.current ? 0.55 : 0.25})`;
      ctx.lineWidth = hovered.current ? 2 : 1.5;
      ctx.stroke();

      // Second inner ring with slight offset for glow feel
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * hoverScale - 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 107, 74, ${hovered.current ? 0.25 : 0.1})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // --- Orbiting mini hearts ---
      for (let i = 0; i < 3; i++) {
        const angle = time * 1.2 + (i * Math.PI * 2) / 3;
        const orbitR = ringRadius * hoverScale + 1;
        const ox = Math.cos(angle) * orbitR;
        const oy = Math.sin(angle) * orbitR;
        const heartSize = 3 + Math.sin(time * 3 + i) * 0.5;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.scale(0.5, 0.5);
        ctx.rotate(angle + Math.PI);

        const heartColors = ["#FE3C72", "#FF6B4A", "#FF85A2"];
        ctx.fillStyle = heartColors[i];
        ctx.globalAlpha = 0.85;
        drawHeart(ctx, heartSize);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      ctx.restore();

      // --- Center dot with warm glow ---
      const dotRadius = hovered.current ? 5.5 : 3.5;

      // Multi-layered glow
      const glow1 = ctx.createRadialGradient(
        pos.current.x, pos.current.y, 0,
        pos.current.x, pos.current.y, dotRadius * 8
      );
      glow1.addColorStop(0, `rgba(254, 60, 114, ${0.35 + Math.sin(time * 3) * 0.1})`);
      glow1.addColorStop(0.3, "rgba(255, 107, 74, 0.12)");
      glow1.addColorStop(0.6, "rgba(255, 133, 162, 0.04)");
      glow1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, dotRadius * 8, 0, Math.PI * 2);
      ctx.fillStyle = glow1;
      ctx.fill();

      // White dot with warm shadow
      ctx.beginPath();
      ctx.arc(pos.current.x, pos.current.y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#FE3C72";
      ctx.shadowBlur = hovered.current ? 18 : 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Tiny inner highlight
      ctx.beginPath();
      ctx.arc(pos.current.x - dotRadius * 0.2, pos.current.y - dotRadius * 0.2, dotRadius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fill();

      // --- Speed-based sparkle trail ---
      if (speed > 4) {
        const sparkleCount = Math.min(Math.floor(speed * 0.3), 3);
        for (let i = 0; i < sparkleCount; i++) {
          particles.current.push(
            new Particle(
              pos.current.x + (Math.random() - 0.5) * 8,
              pos.current.y + (Math.random() - 0.5) * 8,
              "sparkle"
            )
          );
        }
      }

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-9999"
    />
  );
}

// --- Enhanced Particle class ---
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: "heart" | "circle" | "sparkle";
  rotation: number;
  rotSpeed: number;

  constructor(x: number, y: number, type: "heart" | "circle" | "sparkle" = "circle") {
    this.x = x;
    this.y = y;
    this.type = type;

    const angle = Math.random() * Math.PI * 2;
    const speed = type === "sparkle"
      ? Math.random() * 1.5 + 0.3
      : Math.random() * 3.5 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - (type === "heart" ? 1.5 : 0);

    this.maxLife = type === "sparkle" ? 15 + Math.random() * 10 : 35 + Math.random() * 25;
    this.life = this.maxLife;
    this.size = type === "sparkle" ? Math.random() * 1.5 + 0.5 : Math.random() * 3 + 1.5;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.15;

    const colors = ["#FE3C72", "#FF6B4A", "#FF85A2", "#FFD700", "#ffffff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.type === "heart" ? 0.02 : 0.035;
    this.vx *= 0.985;
    this.rotation += this.rotSpeed;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.globalAlpha = alpha;

    if (this.type === "heart") {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      drawHeart(ctx, this.size * 2.5);
      ctx.fill();
      ctx.restore();
    } else if (this.type === "sparkle") {
      // Diamond sparkle shape
      const s = this.size * alpha;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.4, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.4, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    } else {
      const radius = Math.max(0, this.size * alpha);
      ctx.beginPath();
      ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }
}
