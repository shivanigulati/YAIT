import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SubService } from "../lib/content";

export default function ServiceCard({
  sub,
  icon: Icon,
}: {
  sub: SubService;
  icon: LucideIcon;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-navy-900 border border-navy-700 shadow-soft overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(228,189,76,0.18)] hover:-translate-y-1">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="btn-press w-full text-left p-6 flex items-center justify-between gap-4"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-gold-400 flex items-center justify-center text-navy-900">
            <Icon size={18} />
          </div>
          <h3 className="font-serif text-lg text-cream-100 truncate">{sub.name}</h3>
        </div>
        <ChevronDown
          size={18}
          className={`text-gold-300/70 shrink-0 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 border-t border-cream-100/10">
              <p className="text-sm text-cream-100/70 leading-relaxed">{sub.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
