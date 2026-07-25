import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Search, MapPin, Lightbulb, LayoutGrid, PenTool, Cog, HardHat, Network,
  ClipboardCheck, PackageCheck, LifeBuoy, CheckCircle2, Leaf, ShieldCheck,
  Scale, Users2, Handshake, TrendingUp, Compass,
} from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import CTABanner from "../components/sections/CTABanner.jsx";
import { staggerContainer, fadeInUp } from "../animations/variants.js";
import {
  developmentProcess,
  qualityAssurance,
  smartLuxuryFeatures,
  sustainabilityCommitment,
  hseFramework,
  corporateGovernance,
  targetMarket,
  strategicPartnerships,
  investmentOpportunities,
  competitiveAdvantage,
  futureOutlook,
  closingStatement,
} from "../data/companyProfile.js";

const processIcons = [Search, MapPin, Lightbulb, LayoutGrid, PenTool, Cog, HardHat, Network, ClipboardCheck, PackageCheck, LifeBuoy];

function PillList({ items }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.05)}
      className="flex flex-wrap gap-3"
    >
      {items.map((item) => (
        <motion.span
          key={item}
          variants={fadeInUp}
          className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-small font-medium text-navy-800"
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
}

function ChecklistGrid({ items, columns = "sm:grid-cols-2" }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer(0.06)}
      className={`grid grid-cols-1 ${columns} gap-4`}
    >
      {items.map((item) => (
        <motion.div key={item} variants={fadeInUp} className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-soft">
          <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0" />
          <p className="text-small font-medium text-navy-800">{item}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <>
      <Helmet>
        <title>Why FAJ Prime | Process, Standards & Investment Opportunities</title>
        <meta
          name="description"
          content="Discover FAJ Prime Estates' development process, quality assurance standards, sustainability commitment, governance and investment opportunities."
        />
      </Helmet>

      <InnerHero
        title="Why FAJ Prime Estates"
        subtitle="Our process, our standards, and the principles behind every development we deliver."
        breadcrumbItems={[{ label: "Why Us" }]}
      />

      {/* Competitive Advantage intro */}
      <section className="py-section-lg bg-white">
        <div className="container-custom max-w-3xl text-center">
          <p className="eyebrow mb-4">Our Competitive Advantage</p>
          <p className="font-serif text-h3 text-navy-900 leading-snug">{competitiveAdvantage}</p>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom">
          <SectionHeading eyebrow="Our Process" title="Our Development Process" align="center" className="mb-14" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.05)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {developmentProcess.map((step, i) => {
              const Icon = processIcons[i] || Compass;
              return (
                <motion.div key={step} variants={fadeInUp} className="bg-white rounded-lg p-5 shadow-soft flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-semibold">STEP {String(i + 1).padStart(2, "0")}</p>
                    <p className="text-small font-semibold text-navy-900">{step}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Quality Assurance"
            title="Every development undergoes strict quality control"
            align="center"
            className="mb-12"
          />
          <ChecklistGrid items={qualityAssurance} columns="sm:grid-cols-2 lg:grid-cols-3" />
        </div>
      </section>

      {/* Smart & Luxury Living */}
      <section className="py-section-lg bg-gradient-navy">
        <div className="container-custom">
          <SectionHeading eyebrow="Smart & Luxury Living" title="What our developments include" align="center" light className="mb-12" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer(0.05)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {smartLuxuryFeatures.map((f) => (
              <motion.div key={f} variants={fadeInUp} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                <p className="text-small text-white">{f}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sustainability + HSE + Governance */}
      <section className="py-section-lg bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div>
            <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mb-5">
              <Leaf size={22} />
            </div>
            <p className="font-serif text-h4 text-navy-900 mb-4">Sustainability Commitment</p>
            <ul className="space-y-2.5">
              {sustainabilityCommitment.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-small text-slate-600">
                  <CheckCircle2 size={15} className="text-gold-500 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mb-5">
              <ShieldCheck size={22} />
            </div>
            <p className="font-serif text-h4 text-navy-900 mb-4">Health, Safety & Environment</p>
            <ul className="space-y-2.5">
              {hseFramework.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-small text-slate-600">
                  <CheckCircle2 size={15} className="text-gold-500 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mb-5">
              <Scale size={22} />
            </div>
            <p className="font-serif text-h4 text-navy-900 mb-4">Corporate Governance</p>
            <ul className="space-y-2.5">
              {corporateGovernance.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-small text-slate-600">
                  <CheckCircle2 size={15} className="text-gold-500 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Target Market + Partnerships */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users2 size={22} className="text-gold-600" />
              <p className="font-serif text-h4 text-navy-900">Who We Serve</p>
            </div>
            <PillList items={targetMarket} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Handshake size={22} className="text-gold-600" />
              <p className="font-serif text-h4 text-navy-900">Strategic Partnerships</p>
            </div>
            <PillList items={strategicPartnerships} />
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="For Investors"
            title="Investment Opportunities"
            subtitle="FAJ Prime Estates offers structured opportunities for individuals, groups and institutions."
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
            {investmentOpportunities.map((opp) => (
              <motion.div key={opp.title} variants={fadeInUp} className="bg-surface-light rounded-lg p-6">
                <TrendingUp size={20} className="text-gold-500 mb-4" />
                <p className="font-serif text-h4 text-navy-900 mb-2">{opp.title}</p>
                <p className="text-small text-slate-500 leading-relaxed">{opp.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Future Outlook + Closing */}
      <section className="py-section-lg bg-gradient-navy">
        <div className="container-custom max-w-3xl text-center">
          <p className="eyebrow text-gold-400 mb-4">Future Outlook</p>
          <p className="text-body-lg text-white/70 leading-relaxed mb-10">{futureOutlook}</p>
          <div className="w-16 h-px bg-gold-500/50 mx-auto mb-10" />
          <p className="font-serif text-h3 text-white leading-snug">{closingStatement}</p>
        </div>
      </section>

      <CTABanner
        eyebrow="Ready to Invest?"
        title="Explore opportunities with FAJ Prime Estates"
        subtitle="Speak with our team about current investment and development opportunities."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel="View Listings"
        secondaryTo="/listings"
      />
    </>
  );
}
