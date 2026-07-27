import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../../animations/variants.js";

export default function Timeline({ items = [] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer(0.15)}
      className="relative pl-8 md:pl-0"
    >
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div
              key={item.year}
              variants={fadeInUp}
              className={`relative md:grid md:grid-cols-2 md:gap-16 items-center`}
            >
              <div className="absolute left-8 md:left-1/2 top-1.5 w-3 h-3 rounded-full bg-gold-500 -translate-x-1/2 ring-4 ring-gold-100" />

              <div className={isEven ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}>
                <p className="font-serif text-h3 text-gold-600 mb-2 pl-6 md:pl-0">{item.year}</p>
                <p className="font-serif text-h4 text-navy-900 mb-2 pl-6 md:pl-0">{item.title}</p>
                <p className="text-small text-slate-500 leading-relaxed pl-6 md:pl-0">{item.description}</p>
              </div>
              {isEven && <div className="hidden md:block" />}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
