import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";
import HeroParticleField from "./HeroParticleField";

const WORDS = ["Learn.", "Serve.", "Empower."];

/** Tiny drifting motes — purely decorative, skipped for reduced motion. */
const PARTICLES = [
  { top: "18%", left: "12%", size: 3, delay: "0s", duration: "9s" },
  { top: "28%", left: "82%", size: 2, delay: "1.2s", duration: "11s" },
  { top: "62%", left: "20%", size: 2, delay: "2.4s", duration: "10s" },
  { top: "72%", left: "76%", size: 3, delay: "0.6s", duration: "12s" },
  { top: "42%", left: "50%", size: 2, delay: "3s", duration: "9.5s" },
  { top: "85%", left: "40%", size: 2, delay: "1.8s", duration: "10.5s" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Cinematic hand-off into the next section: the hero content eases up and
  // fades slightly as the user scrolls through it, rather than cutting off.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  // A soft glow that follows the cursor — desktop-only, and skipped entirely
  // for reduced-motion or touch/coarse-pointer devices.
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    let frame = 0;
    const handleMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.setProperty("--cx", `${x}px`);
        glow.style.setProperty("--cy", `${y}px`);
        glow.style.opacity = "1";
      });
    };
    const handleLeave = () => {
      glow.style.opacity = "0";
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="-mt-20 relative overflow-hidden hero-gradient"
      data-header-surface="dark"
    >
      {/* ---------- Ambient background layers ---------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle cursor-reactive field of light — canvas-based, behind everything else. */}
        <HeroParticleField containerRef={sectionRef} />

        <motion.div
          animate={{ opacity: hoveredWord === 0 ? 0.3 : 0.12, scale: hoveredWord === 0 ? 1.15 : 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute -top-24 -left-20 h-[420px] w-[420px] rounded-full bg-gold-400/40 blur-[110px] animate-blob"
        />
        <motion.div
          animate={{ opacity: hoveredWord === 2 ? 0.35 : 0.18, scale: hoveredWord === 2 ? 1.15 : 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-navy-400/60 blur-[110px] animate-blob-slow"
        />
        <motion.div
          animate={{ opacity: hoveredWord === 1 ? 0.32 : 0.12, scale: hoveredWord === 1 ? 1.15 : 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-gold-300/40 blur-[100px] animate-blob"
        />

        {/* Cursor-following glow (desktop / fine-pointer only) */}
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(480px circle at var(--cx, 50%) var(--cy, 30%), rgba(228,189,76,0.09), transparent 65%)",
          }}
        />

        {/* Fine grain */}
        <div className="absolute inset-0 grain-overlay" />

        {/* Floating motes */}
        {!prefersReducedMotion &&
          PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-gold-300 animate-particle-drift"
              style={{
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
      </div>

      {/* ---------- Hero statement — fills the first screen ---------- */}
      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen min-h-[100svh] max-[500px]:landscape:min-h-0 max-[500px]:landscape:py-16 flex flex-col"
      >
        <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32">
          <motion.h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.2] text-cream-100">
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredWord(i)}
                onMouseLeave={() => setHoveredWord((current) => (current === i ? null : current))}
                className="inline-block cursor-default mr-[0.25em] transition-colors duration-500 hover:text-gold-200"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + WORDS.length * 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", zIndex: 10 }}
              className="font-'Script MT Bold' block italic mt-1 pb-2 shimmer-gold animate-shimmer"
            >
              Through Technology.
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 + WORDS.length * 0.14 + 0.18 }}
            className="mt-7 max-w-2xl mx-auto text-base sm:text-lg text-cream-100/65 leading-relaxed"
          >
            Transforming skills into selfless service through
            <br className="hidden sm:block" /> innovation, compassion, and community.
          </motion.p>
        </div>

        {/* ---------- Scroll invitation ---------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="pb-10 sm:pb-14 flex flex-col items-center gap-3 text-cream-100/40"
        >
          <span className="font-mono text-micro tracking-[0.3em] uppercase">Scroll to Explore</span>
          <span className="relative h-10 w-px overflow-hidden bg-cream-100/15">
            {!prefersReducedMotion && (
              <span className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent via-gold-300 to-transparent animate-line-travel" />
            )}
          </span>
        </motion.div>
      </motion.div>

      {/* ---------- Commemorative banner — full-bleed, revealed as the hero hands off ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative w-full"
      >
        <img
          src="/quote-banner.png"
          alt="&quot;True selfless service is an expression of love.&quot; — Sant Rajinder Singh Ji Maharaj"
          className="w-full h-auto block"
        />
      </motion.div>
    </section>
  );
}
