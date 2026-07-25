import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Users,
  ShieldCheck,
  MapPinned,
  Phone,
  ClipboardCheck,
  Car,
  MessageCircle,
  User2,
  UsersRound,
  Video,
} from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import InspectionBookingForm from "../components/sections/InspectionBookingForm.jsx";
import FAQAccordion from "../components/sections/FAQAccordion.jsx";
import { staggerContainer, fadeInUp } from "../animations/variants.js";
import { siteConfig } from "../constants/siteConfig.js";

const benefits = [
  { icon: CalendarCheck, text: "Flexible scheduling around your availability" },
  { icon: Users, text: "Guided walkthroughs with a dedicated agent" },
  { icon: ShieldCheck, text: "No-pressure, transparent property viewing" },
  { icon: MapPinned, text: "Multi-property inspection routes available" },
];

const processSteps = [
  { icon: ClipboardCheck, title: "Book a Slot", text: "Fill out the form below with your preferred date, time and property." },
  { icon: Phone, title: "Confirmation Call", text: "Our team calls within 24 hours to confirm every detail of your visit." },
  { icon: Car, title: "Guided Tour", text: "An FAJ Prime agent walks you through the property, answering every question." },
  { icon: MessageCircle, title: "Post-Visit Consultation", text: "We follow up to discuss next steps, pricing and payment options." },
];

const packages = [
  {
    icon: User2,
    title: "Private Viewing",
    text: "A one-on-one guided tour with a dedicated agent, scheduled entirely around your availability.",
    highlight: false,
  },
  {
    icon: UsersRound,
    title: "Group Tour",
    text: "Join a scheduled multi-property tour alongside other prospective buyers. Efficient and informative.",
    highlight: true,
  },
  {
    icon: Video,
    title: "Virtual Inspection",
    text: "Can't make it in person? Get a live video walkthrough with real-time Q&A from anywhere in the world.",
    highlight: false,
  },
];

const faqs = [
  { q: "Is site inspection free?", a: "Yes, standard private and virtual inspections are completely complimentary." },
  { q: "How far in advance should I book?", a: "We recommend booking at least 48 hours ahead to guarantee your preferred slot." },
  { q: "Can I inspect multiple properties in one visit?", a: "Yes, mention your shortlist in the form and we'll plan an efficient multi-property route." },
  { q: "Do you offer inspections for diaspora clients?", a: "Yes, our Virtual Inspection package is designed specifically for clients abroad." },
];

export default function SiteInspection() {
  return (
    <>
      <Helmet>
        <title>Book a Site Inspection | FAJ Prime Estates</title>
        <meta
          name="description"
          content="Schedule a guided site inspection with FAJ Prime Estates. Private, group or virtual. No pressure, just clarity before you decide."
        />
      </Helmet>

      <InnerHero
        title="Book a Site Inspection"
        subtitle="See it before you decide. Schedule a guided tour of any property in our portfolio."
        breadcrumbItems={[{ label: "Site Inspection" }]}
        backgroundImage="/src/assets/images/hero/site-inspection-hero.jpg"
      />

      {/* Benefits */}
      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Inspect With Us"
            title="A transparent, pressure-free experience"
            align="center"
            className="mb-14"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((b) => (
              <motion.div key={b.text} variants={fadeInUp} className="bg-surface-light rounded-lg p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={20} />
                </div>
                <p className="text-small text-slate-600 leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom">
          <SectionHeading
            eyebrow="How It Works"
            title="From booking to walkthrough in four simple steps"
            align="center"
            className="mb-14"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {processSteps.map((step, i) => (
              <motion.div key={step.title} variants={fadeInUp} className="relative bg-white rounded-lg p-6 shadow-soft">
                <p className="font-serif text-h1 text-gold-100 absolute top-3 right-4 select-none">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="w-11 h-11 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mb-4 relative">
                  <step.icon size={20} />
                </div>
                <p className="font-serif text-h4 text-navy-900 mb-2 relative">{step.title}</p>
                <p className="text-small text-slate-500 leading-relaxed relative">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Inspection Packages */}
      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Choose Your Format"
            title="Inspection packages"
            align="center"
            className="mb-14"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {packages.map((pkg) => (
              <motion.div
                key={pkg.title}
                variants={fadeInUp}
                className={`rounded-lg p-8 text-center border ${
                  pkg.highlight
                    ? "bg-navy-900 border-navy-900"
                    : "bg-surface-light border-transparent"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    pkg.highlight ? "bg-gold-500 text-navy-900" : "bg-gold-50 text-gold-600"
                  }`}
                >
                  <pkg.icon size={24} />
                </div>
                <p className={`font-serif text-h4 mb-3 ${pkg.highlight ? "text-white" : "text-navy-900"}`}>
                  {pkg.title}
                </p>
                <p className={`text-small leading-relaxed ${pkg.highlight ? "text-white/60" : "text-slate-500"}`}>
                  {pkg.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <p className="eyebrow mb-4">Book Now</p>
            <h2 className="font-serif text-h2 text-navy-900 mb-4">Schedule your inspection</h2>
            <p className="text-body text-slate-500 leading-relaxed mb-8">
              Fill out the form and our team will confirm your inspection within 24 hours. Prefer
              to speak with someone directly?
            </p>
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-navy-900 font-semibold">
              <Phone size={18} className="text-gold-500" /> {siteConfig.phone}
            </a>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg p-8 shadow-soft">
            <InspectionBookingForm />
          </div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} eyebrow="Questions" title="Site Inspection FAQs" />
    </>
  );
}
