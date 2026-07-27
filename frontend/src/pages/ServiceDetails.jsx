import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import FAQAccordion from "../components/sections/FAQAccordion.jsx";
import CTABanner from "../components/sections/CTABanner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { services } from "../data/services.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

export default function ServiceDetails() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <section className="pt-40 pb-20 container-custom">
        <EmptyState
          title="Service not found"
          description="This service may have been renamed or removed."
          actionLabel="Back to Services"
          actionTo="/services"
        />
      </section>
    );
  }

  const Icon = Icons[service.icon] || Icons.Building2;
  const faqs = service.faqs.map((f) => ({ q: f.q, a: f.a }));

  return (
    <>
      <Helmet>
        <title>{service.title} | FAJ Prime Estates</title>
        <meta name="description" content={service.shortDescription} />
      </Helmet>

      <InnerHero
        title={service.title}
        subtitle={service.shortDescription}
        breadcrumbItems={[{ label: "Services", path: "/services" }, { label: service.title }]}
      />

      {/* Benefits */}
      <section className="py-section-lg bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <div className="w-16 h-16 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mb-6">
              <Icon size={28} strokeWidth={1.75} />
            </div>
            <h2 className="font-serif text-h2 text-navy-900 mb-4">Why choose this service</h2>
            <p className="text-body text-slate-500 leading-relaxed">{service.shortDescription}</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer(0.1)}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {service.benefits.map((b) => (
              <motion.div
                key={b}
                variants={fadeInUp}
                className="flex items-start gap-3 bg-surface-light rounded-lg p-5"
              >
                <CheckCircle2 size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <p className="text-small text-navy-800 font-medium">{b}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom">
          <h2 className="font-serif text-h2 text-navy-900 text-center mb-14">Our Process</h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {service.process.map((step, i) => (
              <motion.div key={step} variants={fadeInUp} className="relative bg-white rounded-lg p-6 shadow-soft">
                <p className="font-serif text-h1 text-gold-100 absolute top-3 right-4 select-none">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="relative font-serif text-h4 text-navy-900 mt-6">{step}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FAQAccordion faqs={faqs} eyebrow="Common Questions" title={`FAQs about ${service.title}`} />

      <CTABanner
        eyebrow="Get Started"
        title={`Ready to explore ${service.title.toLowerCase()}?`}
        subtitle="Speak with our team to discuss your specific needs and next steps."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel="Book Site Inspection"
        secondaryTo="/site-inspection"
      />
    </>
  );
}
