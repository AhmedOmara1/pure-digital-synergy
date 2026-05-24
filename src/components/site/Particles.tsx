import { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  density?: number; // particles per 10k px²
  color?: string; // any CSS color
  linkDistance?: number;
  speed?: number;
  interactive?: boolean; // enable click/drag burst & repel
}

/**
 * Interactive canvas particle field with linking lines, pointer repulsion,
 * click-burst rings, and drag trails. Respects prefers-reduced-motion.
 */
export function Particles({
  className,
  density = 0.00012,
  color = "rgba(120, 160, 255, 0.7)",
  linkDistance = 130,
  speed = 0.25,
  interactive = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const pointer = { x: -9999, y: -9999, active: false, down: false };

    type P = { x: number; y: number; vx: number; vy: number; r: number; baseR: number };
    type Ring = { x: number; y: number; r: number; max: number; alpha: number };
    let particles: P[] = [];
    const rings: Ring[] = [];

    // parse base color to rgb tuple
    const baseRgb = (() => {
      const m = color.match(/rgba?\(([^)]+)\)/);
      if (!m) return { r: 120, g: 160, b: 255 };
      const [r, g, b] = m[1].split(",").map((s) => parseFloat(s.trim()));
      return { r, g, b };
    })();
    const rgba = (a: number) => `rgba(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b}, ${a})`;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobileScale = width < 640 ? 0.75 : 1;
      const count = Math.max(
        28,
        Math.min(width < 640 ? 70 : 130, Math.floor(width * height * density * mobileScale)),
      );
      particles = Array.from({ length: count }, () => {
        const r = Math.random() * 1.8 + 0.6;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed * mobileScale,
          vy: (Math.random() - 0.5) * speed * mobileScale,
          r,
          baseR: r,
        };
      });
    };

    const spawnRing = (x: number, y: number, strong = false) => {
      rings.push({ x, y, r: 4, max: strong ? 180 : 110, alpha: strong ? 0.9 : 0.6 });
      // burst impulse on nearby particles
      const radius = strong ? 220 : 140;
      const power = strong ? 7 : 3.5;
      for (const p of particles) {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius && dist > 0.01) {
          const f = (1 - dist / radius) * power;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      const maxSpeed = 6;
      for (const p of particles) {
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          const range = pointer.down ? 200 : 130;
          if (d2 < range * range && d2 > 0.01) {
            const dist = Math.sqrt(d2);
            // repel when down, gentle attract when hovering
            const f = (1 - dist / range) * (pointer.down ? 0.9 : -0.05);
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
            p.r = p.baseR + (1 - dist / range) * 1.4;
          } else {
            p.r += (p.baseR - p.r) * 0.08;
          }
        } else {
          p.r += (p.baseR - p.r) * 0.08;
        }
        // clamp speed
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > maxSpeed) {
          p.vx = (p.vx / sp) * maxSpeed;
          p.vy = (p.vy / sp) * maxSpeed;
        }
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = rgba(0.85);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.6;
            ctx.strokeStyle = rgba(alpha);
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.r += (ring.max - ring.r) * 0.08;
        ring.alpha *= 0.94;
        ctx.beginPath();
        ctx.strokeStyle = rgba(ring.alpha);
        ctx.lineWidth = 1.4;
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        if (ring.alpha < 0.03) rings.splice(i, 1);
      }
      raf = requestAnimationFrame(step);
    };

    const localPoint = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onMove = (e: PointerEvent) => {
      const { x, y } = localPoint(e.clientX, e.clientY);
      if (x < 0 || y < 0 || x > width || y > height) {
        pointer.active = false;
        return;
      }
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
      if (pointer.down && Math.random() < 0.4) spawnRing(x, y, false);
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.down = false;
    };
    const onDown = (e: PointerEvent) => {
      const { x, y } = localPoint(e.clientX, e.clientY);
      if (x < 0 || y < 0 || x > width || y > height) return;
      pointer.down = true;
      pointer.x = x;
      pointer.y = y;
      spawnRing(x, y, true);
    };
    const onUp = () => {
      pointer.down = false;
    };

    resize();
    if (!reduced) raf = requestAnimationFrame(step);
    else step();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    if (interactive) {
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [color, density, linkDistance, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={
        (interactive ? "pointer-events-auto cursor-crosshair " : "pointer-events-none ") +
        "absolute inset-0 h-full w-full " +
        (className ?? "")
      }
    />
  );
}
