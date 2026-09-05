type StepIndicatorProps = {
  steps: string[];
  current: number; // 1-indexed
};

export default function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-cream-100/10 pb-5 mb-8">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-caption sm:text-xs tracking-widest uppercase">
        {steps.map((label, i) => {
          const stepNum = i + 1;
          const active = stepNum === current;
          const done = stepNum < current;
          return (
            <span key={label} className="flex items-center gap-2">
              <span
                className={
                  active
                    ? "text-cream-100 font-semibold"
                    : done
                    ? "text-gold-400"
                    : "text-cream-100/30"
                }
              >
                {String(stepNum).padStart(2, "0")} {label}
              </span>
              {stepNum !== steps.length && <span className="text-cream-100/20">·</span>}
            </span>
          );
        })}
      </div>
      <span className="font-mono text-micro tracking-widest uppercase text-gold-300 bg-navy-800 border border-gold-400/40 rounded-full px-3 py-1 w-fit">
        ticket_system
      </span>
    </div>
  );
}
