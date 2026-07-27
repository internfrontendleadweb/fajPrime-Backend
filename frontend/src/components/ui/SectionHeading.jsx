import { motion } from "framer-motion";
import { fadeInUp } from "../../animations/variants.js";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}) {
  const alignClasses = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      className={`max-w-2xl ${alignClasses} ${className}`}
    >
      {eyebrow && <p className={`eyebrow mb-4 ${light ? "text-gold-400" : ""}`}>{eyebrow}</p>}
      <h2 className={`font-serif text-h2 md:text-h2-lg ${light ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-body-lg mt-4 ${light ? "text-white/60" : "text-slate-500"}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
