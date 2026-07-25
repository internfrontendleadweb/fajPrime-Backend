import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import { fadeInUp } from "../../animations/variants.js";

export default function CTABanner({
  eyebrow,
  title,
  subtitle,
  primaryLabel = "Book Site Inspection",
  primaryTo = "/site-inspection",
  secondaryLabel,
  secondaryTo,
  pattern = true,
}) {
  return (
    <section className="relative bg-gradient-navy py-20 overflow-hidden">
      {pattern && (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid slice"
        >
          <pattern id="ctaPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ctaPattern)" />
        </svg>
      )}

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="container-custom relative z-10 text-center max-w-2xl mx-auto"
      >
        {eyebrow && <p className="eyebrow text-gold-400 mb-4">{eyebrow}</p>}
        <h2 className="font-serif text-h2 md:text-h2-lg text-white">{title}</h2>
        {subtitle && <p className="text-body-lg text-white/60 mt-4">{subtitle}</p>}

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Button to={primaryTo} variant="primary">
            {primaryLabel}
          </Button>
          {secondaryLabel && (
            <Button to={secondaryTo} variant="ghost">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
