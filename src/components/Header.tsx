import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "About", to: "/#about" },
  { label: "Ways to Serve", to: "/#areas-we-support" },
  { label: "Our Story", to: "/#our-story" },
];

const HEADER_HEIGHT = 80;

/**
 * Watches the page's `[data-header-surface]` sections and reports whether
 * the section currently sitting behind the header is "light" or "dark",
 * so the header's text/logo can switch color to stay readable — without
 * ever needing a background of its own.
 */
function useHeaderSurface() {
  const [surface, setSurface] = useState<"light" | "dark">("dark");
  const location = useLocation();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-surface]")
    );
    if (sections.length === 0) return;

    const checkY = HEADER_HEIGHT / 2;
    let ticking = false;

    const update = () => {
      ticking = false;

      // Right at the top of the page (including any elastic overscroll
      // bounce), trust the first section directly rather than rect math,
      // which can briefly report the wrong thing during the bounce.
      if (window.scrollY <= 4) {
        const value = sections[0]?.getAttribute("data-header-surface");
        if (value === "light" || value === "dark") setSurface(value);
        return;
      }

      let current: HTMLElement | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= checkY && rect.bottom > checkY) {
          current = section;
          break;
        }
      }

      // Fallback for gaps between sections: use the nearest one above the check line.
      if (!current) {
        let closestDist = Infinity;
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= checkY) {
            const dist = checkY - rect.top;
            if (dist < closestDist) {
              closestDist = dist;
              current = section;
            }
          }
        }
      }

      if (!current) current = sections[0];

      const value = current?.getAttribute("data-header-surface");
      if (value === "light" || value === "dark") setSurface(value);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    // Re-check shortly after mount too: images/fonts can shift layout
    // just after the initial paint, before any scroll event fires.
    const settleTimer = window.setTimeout(update, 150);

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [location.pathname]);

  return surface;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const surface = useHeaderSurface();
  const onDark = surface === "dark";

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleNav = (to: string) => {
    if (to.startsWith("/#")) {
      const hash = to.slice(1);
      if (location.pathname !== "/") {
        navigate(to);
      } else {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(to);
    }
    setOpen(false);
  };

  const labelColor = onDark ? "text-cream-100/90" : "text-navy-900/85";
  const menuIconColor = onDark ? "text-cream-100" : "text-navy-900";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[80px] items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="YA IT Home">
            <Logo variant={onDark ? "light" : "dark"} />
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.to)}
                className={`font-sans text-sm font-medium transition-colors hover:text-gold-500 ${labelColor}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleNav("/#get-support")}
              className={`font-sans text-sm font-medium transition-colors hover:text-gold-500 ${labelColor}`}
            >
              Get Support
            </button>
            <Link
              to="/volunteer"
              className="font-sans text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors"
            >
              Become a Volunteer
            </Link>
          </div>

          <button
            className={`lg:hidden p-2 transition-colors ${menuIconColor}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-navy-900/98 backdrop-blur-md"
          >
            <div className="px-4 sm:px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.to)}
                  className="text-left py-3 font-sans text-base font-medium text-cream-100/85 hover:text-gold-400"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-5">
                <button
                  onClick={() => handleNav("/#get-support")}
                  className="text-left py-2 font-sans text-base font-medium text-cream-100/85 hover:text-gold-400"
                >
                  Get Support
                </button>
                <Link
                  to="/volunteer"
                  className="text-left py-2 font-sans text-base font-semibold text-gold-400"
                >
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
