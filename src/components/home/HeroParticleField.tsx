import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

/**
 * ---------------------------------------------------------------------------
 * CONFIGURATION — tune the feel of the effect from here only.
 * Values are intentionally conservative; the effect should be almost
 * unnoticeable until the cursor moves across the hero.
 * ---------------------------------------------------------------------------
 */
const CONFIG = {
  // How many points of light on each device class. Kept low — this is a
  // sparse, elegant field, not a dense particle-network effect.
  particleCountDesktop: 46,
  particleCountTablet: 30,
  particleCountTouch: 20,

  // Size range in px (before depth scaling below).
  particleSizeMin: 0.8,
  particleSizeMax: 2.2,

  // Opacity range — deliberately low so the dark hero reads exactly as it
  // does today until the cursor draws attention to the field.
  particleOpacityMin: 0.08,
  particleOpacityMax: 0.34,

  // Warm gold / champagne / ivory tones only — no neon, no blue/purple.
  particleColors: ["#eccd8f", "#e4bd4c", "#f8f4ea", "#f5e8c1"],

  // How far from the cursor particles start reacting (px), and how hard
  // they're pushed at the very center of that radius.
  interactionRadius: 190,
  interactionStrength: 34,

  // Per-frame interpolation factors (0–1). Lower = smoother / more lag,
  // which is what gives the "premium, inertial" feel the brief asks for.
  easeTowardCursor: 0.06,
  easeReturnHome: 0.045,

  // Gentle independent ambient drift so the field feels quietly alive even
  // with no cursor input at all. Kept tiny on purpose.
  ambientDriftPx: 5,
  ambientSpeed: 0.00028,

  // Ambient-only animation for touch/coarse-pointer devices (no cursor to
  // react to). Set to false to freeze the field completely on touch.
  ambientOnTouch: true,
} as const;

type Particle = {
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  depth: number; // 0 = far/still, 1 = near/reactive
  color: string;
  phase: number;
};

function buildParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const depth = Math.random();
    particles.push({
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      offsetX: 0,
      offsetY: 0,
      targetX: 0,
      targetY: 0,
      size: CONFIG.particleSizeMin + depth * (CONFIG.particleSizeMax - CONFIG.particleSizeMin),
      opacity:
        CONFIG.particleOpacityMin + depth * (CONFIG.particleOpacityMax - CONFIG.particleOpacityMin),
      depth,
      color: CONFIG.particleColors[Math.floor(Math.random() * CONFIG.particleColors.length)],
      phase: Math.random() * Math.PI * 2,
    });
  }
  return particles;
}

/**
 * Subtle, cursor-reactive field of light for the Hero background only.
 * Pure canvas — no DOM nodes per particle — so it stays cheap regardless of
 * particle count. Renders behind the existing gradient blobs/grain/copy.
 */
export default function HeroParticleField({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const width = () => container.clientWidth;
    const height = () => container.clientHeight;

    let particles: Particle[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const particleCount = isFinePointer
      ? width() >= 1024
        ? CONFIG.particleCountDesktop
        : CONFIG.particleCountTablet
      : CONFIG.particleCountTouch;

    const sizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = width();
      const h = height();
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = buildParticles(width(), height(), particleCount);
    };

    sizeCanvas();
    seed();

    // Static, extremely subtle render for reduced-motion — no rAF loop at all.
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width(), height());
      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * 0.6;
        ctx.arc(p.baseX, p.baseY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      const onResize = () => {
        sizeCanvas();
        seed();
        ctx.clearRect(0, 0, width(), height());
        for (const p of particles) {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity * 0.6;
          ctx.arc(p.baseX, p.baseY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const mouse = { x: -9999, y: -9999, active: false };
    let frameId = 0;
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };
    const handleLeave = () => {
      mouse.active = false;
    };
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        sizeCanvas();
        seed();
      }, 150);
    };

    if (isFinePointer) {
      container.addEventListener("mousemove", handleMove);
      container.addEventListener("mouseleave", handleLeave);
    }
    window.addEventListener("resize", handleResize);

    const tick = (time: number) => {
      const w = width();
      const h = height();
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        // Gentle independent ambient drift — present on every device class.
        const ambientX = Math.sin(time * CONFIG.ambientSpeed + p.phase) * CONFIG.ambientDriftPx * (0.3 + p.depth * 0.7);
        const ambientY = Math.cos(time * CONFIG.ambientSpeed * 1.3 + p.phase) * CONFIG.ambientDriftPx * (0.3 + p.depth * 0.7);

        if (isFinePointer && mouse.active) {
          const dx = p.baseX - mouse.x;
          const dy = p.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.interactionRadius && dist > 0.001) {
            const force = (1 - dist / CONFIG.interactionRadius) * CONFIG.interactionStrength * (0.3 + p.depth * 0.7);
            p.targetX = (dx / dist) * force;
            p.targetY = (dy / dist) * force;
          } else {
            p.targetX = 0;
            p.targetY = 0;
          }
        } else {
          p.targetX = 0;
          p.targetY = 0;
        }

        const ease = mouse.active ? CONFIG.easeTowardCursor : CONFIG.easeReturnHome;
        p.offsetX += (p.targetX - p.offsetX) * ease;
        p.offsetY += (p.targetY - p.offsetY) * ease;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.baseX + p.offsetX + ambientX, p.baseY + p.offsetY + ambientY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frameId = requestAnimationFrame(tick);
    };

    if (!isFinePointer && !CONFIG.ambientOnTouch) {
      // Touch device, ambient animation disabled entirely — paint once and stop.
      tick(0);
      cancelAnimationFrame(frameId);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(resizeTimeout);
      if (isFinePointer) {
        container.removeEventListener("mousemove", handleMove);
        container.removeEventListener("mouseleave", handleLeave);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
    />
  );
}
