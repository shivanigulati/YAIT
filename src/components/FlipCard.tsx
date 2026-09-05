import type { ReactNode } from "react";

type FlipCardProps = {
  icon: ReactNode;
  front: string;
  back: string;
};

export default function FlipCard({ icon, front, back }: FlipCardProps) {
  return (
    <div className="flip-card h-72 w-full">
      <div className="flip-card-inner relative h-full w-full">
        {/* Front */}
        <div className="flip-card-face flip-card-front absolute inset-0 rounded-2xl border border-gold-400/25 bg-navy-800/70 p-7 flex flex-col justify-between">
          <div className="text-gold-400">{icon}</div>
          <p className="font-serif italic text-xl sm:text-2xl text-gold-300 leading-snug">
            {front}
          </p>
          <span className="font-mono text-micro tracking-widest text-cream-100/35 uppercase">
            hover to reveal
          </span>
        </div>
        {/* Back */}
        <div className="flip-card-face flip-card-back rounded-2xl border border-gold-400/40 bg-navy-700 p-7 flex flex-col justify-center">
          <p className="text-cream-100/90 text-sm sm:text-body leading-relaxed">{back}</p>
        </div>
      </div>
    </div>
  );
}
