import { Check } from "lucide-react";
import Reveal from "../Reveal";
import Watermark from "../Watermark";
import { whyPoints } from "../../lib/content";

export default function WhyYaIt() {
  return (
    <section className="relative bg-cream-100 pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden" data-header-surface="light">
      <Watermark className="text-navy-900" />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <p className="eyebrow text-gold-800 font-semibold mb-4">Why YA IT</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-900 mb-6">
            Quiet, capable, and{" "}
            <span className="italic text-gold-500">always in service.</span>
          </h2>
          <p className="text-navy-500 max-w-xl mx-auto mb-12">
            You bring the intention. We bring the hands, the tools, and the follow-through.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {whyPoints.map((point, i) => (
            <Reveal key={point} delay={i * 0.08}>
              <div className="flex items-center gap-2.5 rounded-full bg-white border border-navy-900/10 shadow-soft px-5 py-3">
                <span className="h-5 w-5 rounded-full bg-gold-400 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-navy-900" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-navy-900">{point}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
