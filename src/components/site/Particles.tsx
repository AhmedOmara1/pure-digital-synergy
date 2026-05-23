import { useEffect, useRef } from "react";

interface ParticlesProps {
  className?: string;
  density?: number; // particles per 10k px²
  color?: string; // any CSS color
  linkDistance?: number;
  speed?: number;
}

/**
 * Lightweight canvas particle field with linking lines and subtle pointer parallax.
 * No external deps. Respects prefers-reduced-motion.
 */
export function Particles({
  className,
  density = 0.00012,
  color = "rgba(120, 160, 255, 0.7)",
  linkDistance = 130,
  speed = 0.25,
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
    const pointer = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobileScale = width < 640 ? 0.45 : 1;
      const count = Math.max(
        18,
        Math.min(width < 640 ? 56 : 120, Math.floor(width * height * density * mobileScale)),
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed * mobileScale,
        vy: (Math.random() - 0.5) * speed * mobileScale,
        r: Math.random() * 1.8 + 0.6,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        // pointer parallax pull
        const dx = pointer.x - p.x;
        const dy = pointer.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const f = (1 - Math.sqrt(d2) / 140) * 0.02;
          p.vx += dx * f * 0.01;
          p.vy += dy * f * 0.01;
        }
        p.x += p.vx;
        p.y += p.vy;
        // friction
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = color;
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
            const alpha = 1 - dist / linkDistance;
            ctx.strokeStyle = color.replace(/rgba?\(([^)]+)\)/, (_m, body) => {
              const parts = body.split(",").map((s: string) => s.trim());
              const r = parts[0];
              const g = parts[1];
              const b2 = parts[2];
              return `rgba(${r}, ${g}, ${b2}, ${alpha * 0.35})`;
            });
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    if (!reduced) raf = requestAnimationFrame(step);
    else {
      // draw a single static frame
      step();
      cancelAnimationFrame(raf);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [color, density, linkDistance, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={"pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")}
    />
  );
}
