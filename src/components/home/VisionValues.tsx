import { Globe2, Sparkles, RefreshCw, Handshake } from "lucide-react";
import Reveal from "../Reveal";
import FlipCard from "../FlipCard";
import Watermark from "../Watermark";
import { coreValues } from "../../lib/content";

const icons = [Globe2, Sparkles, RefreshCw, Handshake];

export default function VisionValues() {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-16 sm:pt-24 pb-24 sm:pb-32" data-header-surface="dark">
      <Watermark className="text-cream-100" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-4">Our Vision</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-cream-100">
            What <span className="italic text-gold-400">guides our service.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={value.front} delay={i * 0.1}>
                <FlipCard icon={<Icon size={26} />} front={value.front} back={value.back} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
