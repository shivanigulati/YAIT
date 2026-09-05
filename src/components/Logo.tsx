type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

/** Brand image used in the header. */
function Emblem({ variant }: { variant: "light" | "dark" }) {
  return (
    <img
      src="/logo.png"
      alt=""
      aria-hidden="true"
      className="h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-contain"
      style={variant === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textPrimary = "text-gold-400";
  const textSecondary = variant === "light" ? "text-cream-100" : "text-navy-900/55";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Emblem variant={variant} />
      <div className="leading-tight">
        <div className={`font-mono text-micro sm:text-micro tracking-[0.22em] uppercase ${textSecondary}`}>
          Science of Spirituality
        </div>
        <div className={`font-serif font-medium text-base sm:text-lg tracking-wide ${textPrimary}`}>
          Young Adults IT
        </div>
      </div>
    </div>
  );
}
