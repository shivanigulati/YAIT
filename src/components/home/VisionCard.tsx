import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import FlipCard from "../FlipCard";
import { usePrefersReducedMotion } from "../../lib/usePrefersReducedMotion";

type VisionCardProps = {
  index: number;
  icon: ReactNode;
  front: string;
  back: string;
};

/**
 * Tracks viewport width in three coarse bands so the scroll interaction can
 * be dialed down on smaller screens, without touching any per-frame state.
 * Desktop gets the full translate/rotate/scale motion; tablets get a
 * softened version; phones get an almost-static entrance so a vertical
 * stack of 4 cards never feels janky.
 */
function useMotionIntensity() {
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const tablet = window.matchMedia("(min-width: 640px)");

    const update = () => {
      if (desktop.matches) setIntensity(1);
      else if (tablet.matches) setIntensity(0.5);
      else setIntensity(0.22);
    };

    update();
    desktop.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return intensity;
}

export default function VisionCard({ index, icon, front, back }: VisionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const intensity = useMotionIntensity();

  // Progress of this specific card through the viewport: 0 as it enters from
  // below, 0.5 roughly centered, 1 as it exits past the top. Per-card (not
  // section-level) tracking is what gives each card its own "active" beat.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 92%", "end 15%"],
  });

  const tilt = index % 2 === 0 ? 1 : -1;
  const yRange = [70 * intensity, 0, -12 * intensity];
  const rotateRange = [8 * tilt * intensity, 0, -2.5 * tilt * intensity];
  const scaleRange = prefersReducedMotion
    ? [1, 1, 1]
    : [0.92 + 0.08 * (1 - intensity), 1.02, 1];

  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], yRange);
  const rawRotate = useTransform(scrollYProgress, [0, 0.5, 1], rotateRange);
  const rawScale = useTransform(scrollYProgress, [0, 0.45, 1], scaleRange);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.18, 1], [0, 1, 1]);

  const springConfig = { stiffness: 140, damping: 22, mass: 0.6 };
  const y = useSpring(rawY, springConfig);
  const rotateZ = useSpring(rawRotate, springConfig);
  const scale = useSpring(rawScale, springConfig);

  if (prefersReducedMotion) {
    return (
      <div ref={cardRef}>
        <FlipCard icon={icon} front={front} back={back} />
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ y, rotateZ, scale, opacity: rawOpacity, willChange: "transform, opacity" }}
      whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
    >
      <FlipCard icon={icon} front={front} back={back} />
    </motion.div>
  );
}
