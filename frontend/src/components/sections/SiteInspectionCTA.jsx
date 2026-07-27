import { motion } from "framer-motion";
import { CalendarCheck, Users, ShieldCheck, MapPinned } from "lucide-react";
import Button from "../ui/Button.jsx";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  fadeInUp,
} from "../../animations/variants.js";

const benefits = [
  { icon: CalendarCheck, text: "Flexible scheduling around your availability" },
  { icon: Users, text: "Guided walkthroughs with a dedicated agent" },
  { icon: ShieldCheck, text: "No-pressure, transparent property viewing" },
  { icon: MapPinned, text: "Multi-property inspection routes available" },
];

export default function SiteInspectionCTA() {
  return (
    <section className="py-section-lg bg-white">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={slideInLeft}
        >
          <img
            src="/src/assets/images/hero/site-inspection.jpg"
            alt="Guided site inspection"
            className="rounded-lg w-full aspect-[4/3] object-cover"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={slideInRight}
        >
          <p className="eyebrow mb-4">See It Before You Decide</p>
          <h2 className="font-serif text-h2 md:text-h2-lg text-navy-900">
            Book a guided site inspection today
          </h2>
          <p className="text-body-lg text-slate-500 mt-4">
            Experience a property firsthand with a member of our team. No
            pressure, just clarity before you commit.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1)}
            className="space-y-4 mt-8"
          >
            {benefits.map((b) => (
              <motion.div
                key={b.text}
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <b.icon size={16} />
                </div>
                <p className="text-small text-slate-600">{b.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <Button to="/site-inspection" variant="primary" className="mt-10">
            Book Site Inspection
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
