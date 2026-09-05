import { Camera } from "lucide-react";
import Reveal from "../Reveal";
import { galleryMoments } from "../../lib/content";

export default function Gallery() {
  return (
    <section className="bg-cream-100 pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden" data-header-surface="light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center sm:text-left mb-12">
          <p className="eyebrow mb-4">Moments of Seva</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-900">
            What we have served, <span className="italic text-gold-500">so far</span>
          </h2>
        </Reveal>
      </div>

      <div className="group relative">
        {/* Edge fades so cards appear to enter/exit softly */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-cream-100 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-cream-100 to-transparent z-10" />

        <div className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused]">
          {[...galleryMoments, ...galleryMoments].map((moment, i) => (
            <div
              key={`${moment.title}-${i}`}
              className="shrink-0 w-[260px] sm:w-[300px] rounded-2xl bg-navy-900 shadow-card overflow-hidden transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="relative h-44 sm:h-48 bg-gradient-to-br from-navy-600 via-navy-700 to-navy-900 flex flex-col items-center justify-center gap-2">
                <Camera size={26} className="text-gold-400/70" />
                <span className="font-mono text-micro tracking-widest uppercase text-cream-100/40">
                  YA IT Photo
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-cream-100 mb-1.5">{moment.title}</h3>
                <p className="text-sm text-cream-100/55">{moment.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
