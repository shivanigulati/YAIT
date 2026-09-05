import { Sprout, Rocket, BookOpen, Star, Handshake, Sparkles } from "lucide-react";
import Reveal from "../Reveal";
import Watermark from "../Watermark";
import { timeline } from "../../lib/content";

const icons = { Sprout, Rocket, BookOpen, Star, Handshake };

export default function OurStory() {
  return (
    <section id="our-story" className="relative bg-navy-900 pt-16 sm:pt-24 pb-24 sm:pb-32 overflow-hidden" data-header-surface="dark">
      <Watermark className="text-cream-100" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16 sm:mb-20">
          <p className="eyebrow mb-4">Our Story</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-100 mb-4">
            The journey of YA IT
          </h2>
          <p className="text-cream-100/60 max-w-xl mx-auto leading-relaxed">
            From a small group of volunteers to a nationwide, technology-driven seva team.
          </p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-6 sm:left-7 top-2 bottom-2 w-px bg-gradient-to-b from-gold-400/60 via-gold-400/30 to-transparent" />

          <div className="space-y-14">
            {timeline.map((phase, i) => {
              const Icon = icons[phase.icon];
              return (
                <Reveal key={phase.phase} delay={i * 0.08}>
                  <div className="relative pl-20 sm:pl-24">
                    <div className="absolute left-0 top-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-navy-800 border border-gold-400/50 flex items-center justify-center text-gold-400">
                      <Icon size={22} />
                    </div>
                    <p className="font-mono text-caption tracking-widest uppercase text-gold-400 mb-2">
                      {phase.phase} · {phase.dateRange}
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl text-cream-100 mb-1">
                      {phase.title}
                    </h2>
                    <p className="font-serif italic text-gold-300/90 mb-5">
                      {phase.subheading}
                    </p>
                    <ul className="space-y-2.5">
                      {phase.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-sm sm:text-body text-cream-100/70 leading-relaxed"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={timeline.length * 0.08}>
              <div className="relative pl-20 sm:pl-24">
                <div className="absolute left-0 top-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gold-400 flex items-center justify-center text-navy-900">
                  <Sparkles size={22} />
                </div>
                <div className="rounded-2xl border border-gold-400/40 bg-navy-800/70 px-7 py-8">
                  <p className="font-mono text-caption tracking-widest uppercase text-gold-400 mb-3">
                    Today · 2026
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl text-cream-100 mb-2">
                    100+ dedicated volunteers.
                  </h2>
                  <p className="text-cream-100/70 leading-relaxed text-sm sm:text-body">
                    Serving across technical operations, training, design, video, hosting,
                    presenting, photography, automation, AI, and digital innovation.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
