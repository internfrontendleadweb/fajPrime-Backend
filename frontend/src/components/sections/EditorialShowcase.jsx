import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function EditorialShowcase({ items, dark = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];

  if (!items.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Image panel */}
      <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <img src={active.image} alt={active.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
          <div>
            {active.meta && (
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-300 mb-1.5">
                {active.meta}
              </p>
            )}
            <p className="font-serif text-h4 text-white">{active.title}</p>
          </div>
          <Link
            to={active.to}
            aria-label={`View ${active.title}`}
            className="flex-shrink-0 w-11 h-11 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center hover:scale-105 transition-transform"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      {/* Interactive list */}
      <div className="order-2 lg:order-1">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={item.id}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              className={`w-full text-left flex items-center gap-5 py-5 border-b transition-colors duration-300 ${
                dark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <span
                className={`font-serif text-h4 flex-shrink-0 w-10 transition-colors duration-300 ${
                  isActive ? "text-gold-500" : dark ? "text-white/25" : "text-slate-300"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p
                  className={`font-serif text-h4 transition-colors duration-300 ${
                    isActive ? (dark ? "text-white" : "text-navy-900") : dark ? "text-white/50" : "text-slate-400"
                  }`}
                >
                  {item.title}
                </p>
                <AnimatePresence>
                  {isActive && item.description && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`text-small mt-2 leading-relaxed overflow-hidden ${dark ? "text-white/60" : "text-slate-500"}`}
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <ArrowUpRight
                size={18}
                className={`flex-shrink-0 transition-all duration-300 ${
                  isActive ? "opacity-100 text-gold-500" : "opacity-0"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
