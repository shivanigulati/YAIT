import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";
import Starburst from "../Starburst";
import { stats } from "../../lib/content";

const decorPositions = [
  "top-8 left-[6%]",
  "top-14 right-[10%]",
  "bottom-10 left-[15%]",
  "bottom-8 right-[20%]",
  "top-1/2 left-[45%]",
];

/** Eases a number from 0 up to `target` over `duration` ms, once `start` flips true. */
function useCountUp(target: number, duration = 2400, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | undefined;
    let frame: number;

    const step = (timestamp: number) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, 2400, visible);

  return (
    <div ref={ref}>
      <Reveal delay={delay}>
        <p className="font-serif text-3xl sm:text-4xl text-gold-400 tabular-nums">
          {count}
          {suffix}
        </p>
        <p className="mt-2 font-mono text-micro sm:text-caption tracking-widest uppercase text-cream-100/60">
          {label}
        </p>
      </Reveal>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-14 sm:py-20" data-header-surface="dark">
      <div className="pointer-events-none absolute inset-0">
        {decorPositions.map((pos, i) => (
          <Starburst key={i} className={pos} size={16 + (i % 3) * 8} />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12 text-center">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={i * 0.06}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
