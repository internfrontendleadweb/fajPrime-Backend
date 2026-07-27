import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { staggerContainer, fadeInUp } from "../../animations/variants.js";

export default function ServicesList({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(0.06)}
      className="border-t border-slate-200"
    >
      {items.map((item, i) => {
        const Icon = Icons[item.icon] || Icons.Building2;
        const isOpen = openIndex === i;

        return (
          <motion.div key={item.id} variants={fadeInUp} className="border-b border-slate-200">
            <Link
              to={item.to}
              onMouseEnter={() => setOpenIndex(i)}
              onMouseLeave={() => setOpenIndex(null)}
              className="group flex items-center gap-6 py-6 md:py-7"
            >
              <span className="font-serif text-h4 text-slate-300 w-10 flex-shrink-0 transition-colors duration-300 group-hover:text-gold-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="w-11 h-11 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-900">
                <Icon size={18} strokeWidth={1.75} />
              </span>

              <div className="flex-1 min-w-0">
                <p className="font-serif text-h4 md:text-h3 text-navy-900 transition-transform duration-300 group-hover:translate-x-1">
                  {item.title}
                </p>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="text-small text-slate-500 leading-relaxed mt-2 max-w-xl overflow-hidden hidden md:block"
                    >
                      {item.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <ArrowUpRight
                size={20}
                className="flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:text-gold-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
