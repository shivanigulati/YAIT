import { Link } from "react-router-dom";
import Reveal from "../Reveal";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 sm:py-32" data-header-surface="dark">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 left-1/4 h-72 w-72 rounded-full bg-gold-400/10 blur-[100px]" />
        <div className="absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-navy-400/20 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-100 leading-tight">
            Everyone has <span className="italic text-gold-400">something unique</span> to
            offer.
          </h2>
          <p className="mt-5 text-cream-100/65 max-w-lg mx-auto">
            Bring your skills, your time, or simply your intention to serve — there is a
            place for it here.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link to="/volunteer" className="btn-gold">
              Become a Volunteer
            </Link>
            <a href="#get-support" className="btn-outline-light">
              Get Support
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
