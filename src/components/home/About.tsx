import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import Watermark from "../Watermark";

function AboutImage() {
  return (
    <div className="relative aspect-[4/3] lg:aspect-[4/3.4] w-full overflow-hidden rounded-3xl shadow-card">
      {/*
        Swap this placeholder for the real photo once it's available:
        <img
          src="/about-photo.jpg"
          alt="YA IT volunteers serving through technology"
          className="absolute inset-0 h-full w-full object-cover"
        />
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
      <Watermark className="text-cream-100" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
        <span className="font-mono text-micro tracking-[0.28em] uppercase text-gold-400/70">
          Photo coming soon
        </span>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative bg-cream-100 pt-10 sm:pt-14 pb-16 sm:pb-20" data-header-surface="light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <Reveal>
            <p className="eyebrow text-gold-800 font-semibold mb-4">About YA IT</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-display leading-[1.15] text-navy-900 mb-4">
              Technology in the service of{" "}
              <span className="italic text-gold-500">something larger than itself.</span>
            </h2>
            <p className="text-navy-500 leading-relaxed text-body sm:text-base mb-3">
              Rooted in the teachings of Sant Rajinder Singh Ji Maharaj, YA IT is a
              technology-driven seva initiative that connects Science of Spirituality
              communities with volunteers who wish to serve through their professional
              skills.
            </p>
            <p className="text-navy-500 leading-relaxed text-body sm:text-base mb-6">
              We believe every talent is an opportunity to express love through selfless
              service, uplift others, and create meaningful impact. Inspired by His
              teachings of love, compassion, humility, and excellence, we bring together
              technology, creativity, and compassionate collaboration to support projects
              that strengthen our community while nurturing the personal, professional, and
              spiritual growth of every volunteer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#get-support" className="btn-gold">
                Get Support
              </a>
              <Link to="/serve-with-us" className="btn-outline-dark">
                Serve with Us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <AboutImage />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
