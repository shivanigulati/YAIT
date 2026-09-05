import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MonitorPlay, Speaker, ClipboardList, Bot, BarChart3, ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import ServiceCard from "../ServiceCard";
import { serviceCategories } from "../../lib/content";

const iconMap = {
  MonitorPlay,
  Speaker,
  ClipboardList,
  Bot,
  BarChart3,
};

const gridVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction >= 0 ? -48 : 48,
    opacity: 0,
  }),
};

export default function AreasWeSupport() {
  const [[activeIndex, direction], setActive] = useState<[number, number]>([0, 0]);
  const activeCategory = serviceCategories[activeIndex];
  const ActiveIcon = iconMap[activeCategory.icon];

  const selectTab = (index: number) => {
    if (index === activeIndex) return;
    setActive([index, index > activeIndex ? 1 : -1]);
  };

  const goPrev = () => {
    const nextIndex = (activeIndex - 1 + serviceCategories.length) % serviceCategories.length;
    setActive([nextIndex, -1]);
  };

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % serviceCategories.length;
    setActive([nextIndex, 1]);
  };

  return (
    <section id="areas-we-support" className="scroll-mt-20 bg-cream-100 pt-24 sm:pt-32 pb-16 sm:pb-24" data-header-surface="light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          {/* <p className="eyebrow text-gold-800 font-semibold mb-4">How We Serve</p> */}
          <h2 className="font-serif text-3xl sm:text-4xl text-navy-900 mb-6">Ways We Serve</h2>
          <p className="text-navy-500">
            Technical support offered with care — wherever your seva calls for it.
          </p>
        </Reveal>

        {/* Category tabs */}
        <Reveal delay={0.1} className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
          {serviceCategories.map((category, i) => {
            const Icon = iconMap[category.icon];
            const isActive = i === activeIndex;
            return (
              <button
                key={category.id}
                onClick={() => selectTab(i)}
                className={`btn-press inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 border ${
                  isActive
                    ? "bg-navy-900 text-gold-300 border-gold-400/70 shadow-[0_0_18px_rgba(228,189,76,0.35)] scale-[1.04]"
                    : "bg-navy-800 text-cream-200 border-navy-700 hover:bg-navy-700 hover:text-gold-200 hover:border-navy-600"
                }`}
                aria-pressed={isActive}
              >
                <Icon size={15} className={isActive ? "text-gold-400" : "text-gold-300/60"} />
                {category.title}
              </button>
            );
          })}
        </Reveal>

        {/* Active category intro */}
        <div className="text-center mb-10 min-h-[3.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="inline-flex items-center gap-2 text-navy-900 font-serif text-lg sm:text-xl mb-1.5">
                <ActiveIcon size={18} className="text-gold-500" />
                {activeCategory.title}
              </div>
              <p className="text-navy-500 text-sm sm:text-base max-w-3xl mx-auto sm:whitespace-nowrap">
                {activeCategory.tagline}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sliding card grid */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={activeCategory.id}
              custom={direction}
              variants={gridVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeCategory.subServices.map((sub) => (
                <ServiceCard key={sub.name} sub={sub} icon={ActiveIcon} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next + dots navigation */}
        <div className="mt-8 sm:mt-10 flex items-center justify-between gap-4">
          <button
            onClick={goPrev}
            className="btn-press inline-flex items-center gap-1.5 rounded-full bg-navy-900 hover:bg-navy-800 border border-gold-400/40 text-gold-300 hover:text-gold-200 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 shadow-soft"
            aria-label="Previous category"
          >
            <ArrowLeft size={15} />
            Prev
          </button>

          <div className="flex items-center gap-2">
            {serviceCategories.map((category, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={category.id}
                  onClick={() => selectTab(i)}
                  aria-label={`Go to ${category.title}`}
                  aria-current={isActive}
                  className={`btn-press rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 h-2.5 bg-gold-400 shadow-[0_0_10px_rgba(228,189,76,0.6)]"
                      : "w-2.5 h-2.5 bg-navy-900/20 hover:bg-navy-900/40"
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={goNext}
            className="btn-press inline-flex items-center gap-1.5 rounded-full bg-navy-900 hover:bg-navy-800 border border-gold-400/40 text-gold-300 hover:text-gold-200 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-300 shadow-soft"
            aria-label="Next category"
          >
            Next
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
