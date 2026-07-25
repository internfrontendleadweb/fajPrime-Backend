import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../../hooks/useScrollReveal.js";
import { staggerContainer, fadeInUp } from "../../animations/variants.js";

function useCountUp(target, isInView, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const numericTarget = parseInt(String(target).replace(/\D/g, ""), 10) || 0;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * numericTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
}

function StatItem({ value, label }) {
  const { ref, isInView } = useScrollReveal();
  const count = useCountUp(value, isInView);
  const suffix = String(value).replace(/[\d,]/g, "");

  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center">
      <p className="font-serif text-h1 text-gold-500">
        {count}
        {suffix}
      </p>
      <p className="text-small text-white/60 mt-2">{label}</p>
    </motion.div>
  );
}

export default function StatsCounter({ stats, dark = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.15)}
      className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${dark ? "" : "text-navy-900"}`}
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}
