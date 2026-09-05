import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowUp, Heart } from "lucide-react";
import Logo from "./Logo";
import Watermark from "./Watermark";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goAreas = () => goSection("areas-we-support");
  const goGetSupport = () => goSection("get-support");
  const goOurStory = () => goSection("our-story");

  return (
    <footer className="relative bg-navy-950 text-cream-100 overflow-hidden">
      <Watermark className="text-cream-100" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="border-b border-cream-100/10 pb-10 mb-10">
          <p className="font-serif italic text-lg sm:text-xl text-gold-300/90 max-w-2xl mx-auto text-center">
            "Time Spent in Selfless Service opens up to God"
            <span className="block not-italic font-mono text-xs tracking-widest text-cream-100/50 mt-2">
              — SANT RAJINDER SINGH JI MAHARAJ
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <Logo variant="light" />
            <p className="mt-4 font-serif italic text-cream-100/70 text-sm leading-relaxed">
              Learn. Serve.{" "}
              <span className="text-gold-400">Empower. Through Technology.</span>
            </p>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-cream-100/70">
              <li>
                <button onClick={goGetSupport} className="hover:text-gold-400 transition-colors text-left">
                  Get Support
                </button>
              </li>
              <li>
                <Link to="/serve-with-us" className="hover:text-gold-400 transition-colors">
                  Serve with Us
                </Link>
              </li>
              <li>
                <button onClick={goAreas} className="hover:text-gold-400 transition-colors text-left">
                  Areas We Support
                </button>
              </li>
              <li>
                <button onClick={goOurStory} className="hover:text-gold-400 transition-colors text-left">
                  Our Story
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-4">Reach Us</h4>
            <ul className="space-y-3 text-sm text-cream-100/70">
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-gold-400 shrink-0" />
                <a href="mailto:sosyait.india@gmail.com" className="hover:text-gold-400 transition-colors">
                  sosyait.india@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold-400 shrink-0" />
                <a href="tel:+918149953796" className="hover:text-gold-400 transition-colors">
                  +91 81499 53796
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-gold-400 shrink-0" />
                <a href="tel:+919654965658" className="hover:text-gold-400 transition-colors">
                  +91 96549 65658
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-cream-100/10 text-xs text-cream-100/50">
          <p>Copyright © 2026 SOS YA IT. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <p className="flex items-center gap-1.5">
              Made by YA IT with Love <Heart size={12} className="text-gold-400 fill-gold-400" />
            </p>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="h-9 w-9 rounded-full border border-cream-100/20 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
