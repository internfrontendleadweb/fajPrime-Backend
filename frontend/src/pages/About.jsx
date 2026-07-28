import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Target, Eye, Sparkles, CheckCircle2, Quote } from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import Timeline from "../components/sections/Timeline.jsx";
import StatsCounter from "../components/sections/StatsCounter.jsx";
import CTABanner from "../components/sections/CTABanner.jsx";
import Button from "../components/ui/Button.jsx";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "../animations/variants.js";
import { siteConfig } from "../constants/siteConfig.js";
import { companyStory, vision, mission, coreValues, whyChooseUs, competitiveAdvantage } from "../data/companyProfile.js";
import { api } from "../services/api.js";

const timelineItems = [
  { year: "2014", title: "Founded as UDSREALTY Nigeria Limited", description: "Began as a trusted real estate solutions provider, connecting clients with quality property investments across Lagos." },
  { year: "2018", title: "Transition to FAJ Prime Estates", description: "Rebranded into a full-scale luxury real estate development company to meet growing demand for premium residential communities." },
  { year: "2020", title: "First Development Delivered", description: "Completed FAJ Gardens, an 18-unit terrace duplex community in Lekki, fully sold out at handover." },
  { year: "2022", title: "Abuja Expansion", description: "Extended operations to Abuja, delivering FAJ Heights in the prestigious Maitama district." },
  { year: "2026", title: "FAJ Prime Heights Underway", description: "Broke ground on our largest residential tower yet, rising in Ikoyi with resort-style, smart-home-enabled amenities." },
];

const stats = [
  { value: "500+", label: "Properties Delivered" },
  { value: "12+", label: "Active Developments" },
  { value: "1,200+", label: "Happy Clients" },
  { value: "8+", label: "Years of Excellence" },
];

export default function About() {
  const [chairman, setChairman] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api.getTeam().then((team) => {
      if (!cancelled) setChairman(team.find((t) => t.id === "tm-01") || null);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | FAJ Prime Estates</title>
        <meta
          name="description"
          content="Learn about FAJ Prime Estates Ltd., formerly UDSREALTY Nigeria Limited. Our story, mission, vision, core values and journey to becoming Africa's leading luxury real estate developer."
        />
      </Helmet>

      <InnerHero
        title="Building Trust. Delivering Value."
        subtitle={siteConfig.secondaryTagline}
        breadcrumbItems={[{ label: "About" }]}
        backgroundImage="/images/hero/about-hero.webp"
      />

      {/* Our Story */}
      <section className="py-section-lg bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
          >
            <img
              src="/images/hero/about-story.webp"
              alt="FAJ Prime team on site"
              className="rounded-lg w-full aspect-[4/5] object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInRight}
          >
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="font-serif text-h2 md:text-h2-lg text-navy-900">
              From UDSREALTY to FAJ Prime: a legacy of trust
            </h2>
            <p className="text-body-lg text-slate-500 mt-6 leading-relaxed">{companyStory.story}</p>
            <p className="text-body text-slate-500 mt-4 leading-relaxed">{companyStory.welcome}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom">
          <SectionHeading eyebrow="What Drives Us" title="Mission & Vision" align="center" className="mb-14" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.15)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-lg p-8 shadow-soft text-center">
              <div className="w-14 h-14 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto mb-6">
                <Eye size={24} />
              </div>
              <p className="font-serif text-h4 text-navy-900 mb-3">Our Vision</p>
              <p className="text-small text-slate-500 leading-relaxed">{vision}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-lg p-8 shadow-soft text-center">
              <div className="w-14 h-14 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto mb-6">
                <Target size={24} />
              </div>
              <p className="font-serif text-h4 text-navy-900 mb-3">Our Mission</p>
              <p className="text-small text-slate-500 leading-relaxed">{mission}</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-white rounded-lg p-8 shadow-soft text-center">
              <div className="w-14 h-14 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mx-auto mb-6">
                <Sparkles size={24} />
              </div>
              <p className="font-serif text-h4 text-navy-900 mb-3">Our Promise</p>
              <p className="text-small text-slate-500 leading-relaxed">{competitiveAdvantage}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Principles"
            title="Core Values"
            subtitle="Six commitments that guide every decision we make, from land acquisition to handover."
            align="center"
            className="mb-14"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreValues.map((value) => (
              <motion.div key={value.title} variants={fadeInUp} className="flex gap-4 p-6 rounded-lg bg-surface-light">
                <div className="w-10 h-10 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="font-serif text-h4 text-navy-900 mb-1.5">{value.title}</p>
                  <p className="text-small text-slate-500 leading-relaxed">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose FAJ Prime */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="What sets FAJ Prime apart"
            align="center"
            className="mb-14"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.06)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                className="flex items-center gap-3 bg-white rounded-lg p-5 shadow-soft"
              >
                <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0" />
                <p className="text-small font-medium text-navy-800">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button to="/why-us" variant="secondary">
              See Our Full Process & Standards
            </Button>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Journey" title="Company Timeline" align="center" className="mb-16" />
          <Timeline items={timelineItems} />
        </div>
      </section>

      {/* Achievements / Statistics */}
      <section className="py-section-lg bg-gradient-navy">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Impact"
            title="Numbers that reflect our commitment"
            align="center"
            light
            className="mb-14"
          />
          <StatsCounter stats={stats} />
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-section-lg bg-white">
        <div className="container-custom max-w-3xl text-center">
          <Quote size={40} className="text-gold-200 mx-auto mb-6" fill="currentColor" />
          <p className="font-serif text-h3 md:text-h2 text-navy-900 leading-snug">
            "Every property we develop carries our name, and our name carries our promise: to
            build spaces our clients can trust for a lifetime."
          </p>
          {chairman && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <img
                src={chairman.image}
                alt={chairman.name}
                className="w-12 h-12 rounded-full object-cover bg-slate-100"
                loading="lazy"
                decoding="async"
              />
              <div className="text-left">
                <p className="font-semibold text-small text-navy-900">{chairman.name}</p>
                <p className="text-[13px] text-slate-400">{chairman.role}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow mb-4">Our Culture</p>
            <h2 className="font-serif text-h2 text-navy-900">
              A team united by craftsmanship and integrity
            </h2>
            <p className="text-body-lg text-slate-500 mt-6 leading-relaxed">{companyStory.about}</p>
          </div>
          <img
            src="/images/hero/company-culture.webp"
            alt="FAJ Prime team culture"
            className="rounded-lg w-full aspect-[4/3] object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <CTABanner
        eyebrow="Work With Us"
        title="Ready to start your property journey with FAJ Prime?"
        subtitle="Explore our listings or speak with a member of our team today."
        primaryLabel="View Listings"
        primaryTo="/listings"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </>
  );
}
