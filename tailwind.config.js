/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef2f9",
          100: "#d7e0f0",
          200: "#aabddd",
          300: "#7c96c4",
          400: "#5474a3",
          500: "#4b6d9e",
          600: "#2c4874",
          700: "#1c2f52",
          800: "#0f1c38",
          900: "#08142a",
          950: "#050b1a",
        },
        gold: {
          50: "#fbf6e8",
          100: "#f5e8c1",
          200: "#eed89a",
          300: "#eccd8f",
          400: "#e4bd4c",
          500: "#d4a843",
          600: "#c09a32",
          700: "#b8882e",
          800: "#8a6624",
          900: "#5c4318",
        },
        cream: {
          50: "#fffefc",
          100: "#f8f4ea",
          150: "#fefcf8",
          200: "#f5edd8",
          300: "#e6d5b3",
          400: "#d9c091",
          500: "#c7a668",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["Lato", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      // A small, deliberate set of type-scale steps for sizes that fall
      // between Tailwind's default scale — used instead of one-off
      // arbitrary values (text-[15px], text-[11px], etc.) so every
      // "in-between" size in the app is drawn from one defined system.
      fontSize: {
        display: ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }], // section-level display heading (was text-[2.7rem])
        body: ["0.9375rem", { lineHeight: "1.7" }], // relaxed reading-copy size (was text-[15px])
        caption: ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.05em" }], // eyebrow-adjacent labels (13px floor, was text-[11px])
        micro: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }], // smallest captions/footers (12px floor, was text-[10px] / text-[9px])
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(10, 14, 31, 0.15)",
        card: "0 20px 60px -15px rgba(10, 14, 31, 0.35)",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at 50% 0%, rgba(212,168,67,0.15), transparent 60%)",
        "gold-gradient": "linear-gradient(135deg, #d4a843, #e4bd4c, #c09a32)",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-25px, 25px) scale(0.95)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "particle-drift": {
          "0%, 100%": { transform: "translateY(0) translateX(0)", opacity: "0.15" },
          "50%": { transform: "translateY(-18px) translateX(6px)", opacity: "0.5" },
        },
        "shimmer-sweep": {
          "0%, 100%": { backgroundPosition: "-150% 0" },
          "50%": { backgroundPosition: "250% 0" },
        },
        "line-travel": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(220%)", opacity: "0" },
        },
      },
      animation: {
        blob: "blob 14s infinite ease-in-out",
        "blob-slow": "blob 20s infinite ease-in-out",
        "fade-up": "fade-up 0.7s ease-out both",
        marquee: "marquee 38s linear infinite",
        "particle-drift": "particle-drift 9s ease-in-out infinite",
        shimmer: "shimmer-sweep 7s ease-in-out infinite",
        "line-travel": "line-travel 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
