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
  particleCountDesktop: 42,
  particleCountTablet: 28,
  particleCountTouch: 18,

  // Size range in px (before depth scaling below).
  particleSizeMin: 1.4,
  particleSizeMax: 4.2,

  // Opacity range — deliberately low so the dark hero reads exactly as it
  // does today until the cursor draws attention to the field.
  particleOpacityMin: 0.09,
  particleOpacityMax: 0.38,

  // Warm gold / champagne / ivory tones only — no neon, no blue/purple.
  particleColors: ["#eccd8f", "#e4bd4c", "#f8f4ea", "#f5e8c1"],

  // Relative mix of vector shapes drawn instead of plain dots. Weights don't
  // need to sum to 1 — they're normalized automatically. "sparkle" is a
  // slim four-point star (a tiny light flare), "diamond" a soft rotated
  // square, "ring" a hollow circle for distant/faint points.
  shapeWeights: {
    dot: 0.42,
    sparkle: 0.32,
    diamond: 0.14,
    ring: 0.12,
  },

  // Soft glow behind sparkle/diamond shapes only — kept small, never on the
  // plain dots, so it stays elegant rather than glowy/gamey.
  glowBlur: 5,

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
  // Slow independent rotation for sparkle/diamond shapes (radians/ms).
  ambientSpin: 0.00012,

  // Ambient-only animation for touch/coarse-pointer devices (no cursor to
  // react to). Set to false to freeze the field completely on touch.
  ambientOnTouch: true,
} as const;

type Shape = "dot" | "sparkle" | "diamond" | "ring";

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
  rotation: number;
  shape: Shape;
};

function pickShape(): Shape {
  const entries = Object.entries(CONFIG.shapeWeights) as [Shape, number][];
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  let roll = Math.random() * total;
  for (const [shape, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return shape;
  }
  return "dot";
}

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
      rotation: Math.random() * Math.PI * 2,
      shape: pickShape(),
    });
  }
  return particles;
}

/** Draws a slim four-point star (a tiny light flare) centered at (x, y). */
function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  const long = size * 2.6;
  const short = size * 0.55;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -long);
  ctx.quadraticCurveTo(short, -short, long, 0);
  ctx.quadraticCurveTo(short, short, 0, long);
  ctx.quadraticCurveTo(-short, short, -long, 0);
  ctx.quadraticCurveTo(-short, -short, 0, -long);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawDiamond(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
  const r = size * 1.6;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawRing(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.arc(x, y, size * 1.4, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(0.5, size * 0.32);
  ctx.stroke();
}

function drawDot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

/** Renders one particle at (x, y) with the given opacity multiplier. */
function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  x: number,
  y: number,
  opacityMultiplier: number,
) {
  ctx.globalAlpha = p.opacity * opacityMultiplier;
  ctx.fillStyle = p.color;
  ctx.strokeStyle = p.color;

  const glows = p.shape === "sparkle" || p.shape === "diamond";
  if (glows) {
    ctx.shadowColor = p.color;
    ctx.shadowBlur = CONFIG.glowBlur;
  }

  switch (p.shape) {
    case "sparkle":
      drawSparkle(ctx, x, y, p.size, p.rotation);
      break;
    case "diamond":
      drawDiamond(ctx, x, y, p.size, p.rotation);
      break;
    case "ring":
      drawRing(ctx, x, y, p.size);
      break;
    default:
      drawDot(ctx, x, y, p.size);
  }

  if (glows) {
    ctx.shadowBlur = 0;
  }
}

/**
 * Subtle, cursor-reactive field of light for the Hero background only.
 * Pure canvas — no DOM nodes per particle — so it stays cheap regardless of
 * particle count. Renders behind the existing gradient blobs/grain/copy.
 * Shapes are small vector flares/diamonds/rings/dots rather than uniform
 * balls, for a more custom-designed look.
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

    const renderStatic = () => {
      ctx.clearRect(0, 0, width(), height());
      for (const p of particles) {
        drawParticle(ctx, p, p.baseX, p.baseY, 0.55);
      }
      ctx.globalAlpha = 1;
    };

    sizeCanvas();
    seed();

    // Static, extremely subtle render for reduced-motion — no rAF loop at all.
    if (prefersReducedMotion) {
      renderStatic();
      const onResize = () => {
        sizeCanvas();
        seed();
        renderStatic();
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
        const ambientX =
          Math.sin(time * CONFIG.ambientSpeed + p.phase) * CONFIG.ambientDriftPx * (0.3 + p.depth * 0.7);
        const ambientY =
          Math.cos(time * CONFIG.ambientSpeed * 1.3 + p.phase) * CONFIG.ambientDriftPx * (0.3 + p.depth * 0.7);

        if (isFinePointer && mouse.active) {
          const dx = p.baseX - mouse.x;
          const dy = p.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.interactionRadius && dist > 0.001) {
            const force =
              (1 - dist / CONFIG.interactionRadius) * CONFIG.interactionStrength * (0.3 + p.depth * 0.7);
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
        p.rotation += CONFIG.ambientSpin * (0.4 + p.depth * 0.6) * 16.67; // ~per-frame at 60fps, time-independent enough for this subtlety

        drawParticle(ctx, p, p.baseX + p.offsetX + ambientX, p.baseY + p.offsetY + ambientY, 1);
      }
      ctx.globalAlpha = 1;

      frameId = requestAnimationFrame(tick);
    };

    if (!isFinePointer && !CONFIG.ambientOnTouch) {
      // Touch device, ambient animation disabled entirely — paint once and stop.
      renderStatic();
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
