import { motion } from "framer-motion";
import { Target, Eye, HeartHandshake } from "lucide-react";
import SectionHeading from "../ui/SectionHeading.jsx";
import Button from "../ui/Button.jsx";
import {
  fadeInUp,
  slideInLeft,
  staggerContainer,
} from "../../animations/variants.js";
import { vision, mission } from "../../data/companyProfile.js";

const pillars = [
  { icon: Target, title: "Our Mission", text: mission },
  { icon: Eye, title: "Our Vision", text: vision },
  {
    icon: HeartHandshake,
    title: "Our Values",
    text: "Excellence, integrity, innovation, professionalism, customer satisfaction and sustainability guide every project we deliver.",
  },
];

export default function AboutPreview() {
  return (
    <section className="py-section-lg bg-white">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={slideInLeft}
          className="relative"
        >
          <img
            src="/src/assets/images/hero/handover.jpg"
            alt="FAJ Prime development"
            className="rounded-lg w-full aspect-[4/5] object-cover"
          />
          <div className="absolute -bottom-8 -right-8 bg-navy-900 rounded-lg p-6 shadow-elevated hidden md:block max-w-[220px]">
            <p className="font-serif text-h2 text-gold-400">8+</p>
            <p className="text-small text-white/60 mt-1">
              Years building trust across Nigeria
            </p>
          </div>
        </motion.div>

        <div>
          <SectionHeading
            eyebrow="About FAJ Prime"
            title="A forward-thinking real estate company committed to lasting value."
            subtitle="We provide premium property solutions that inspire comfortable living, profitable investments and lasting legacies, one development at a time."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.12)}
            className="space-y-6 mt-10"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeInUp}
                className="flex gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
                  <p.icon size={20} />
                </div>
                <div>
                  <p className="font-serif text-h4 text-navy-900 mb-1">
                    {p.title}
                  </p>
                  <p className="text-small text-slate-500 leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Button to="/about" variant="secondary" className="mt-10">
            Learn More About Us
          </Button>
        </div>
      </div>
    </section>
  );
}
