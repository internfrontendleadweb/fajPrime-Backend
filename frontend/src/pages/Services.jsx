import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { InnerHero } from "../components/sections/Hero.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import ServiceCard from "../components/cards/ServiceCard.jsx";
import CTABanner from "../components/sections/CTABanner.jsx";
import { services } from "../data/services.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Our Services | FAJ Prime Estates</title>
        <meta
          name="description"
          content="From property development to investment advisory, explore the full range of real estate services offered by FAJ Prime Estates Ltd."
        />
      </Helmet>

      <InnerHero
        title="Our Services"
        subtitle="End-to-end real estate expertise, from land acquisition to long-term property management."
        breadcrumbItems={[{ label: "Services" }]}
        backgroundImage="/src/assets/images/hero/services-hero.jpg"
      />

      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="What We Offer"
            title="Comprehensive real estate solutions"
            subtitle="Whether you're building, buying, investing or managing property, our team supports every step of the journey."
            align="center"
            className="mb-14"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={fadeInUp}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        eyebrow="Not Sure Where to Start?"
        title="Talk to our team about the right service for you"
        subtitle="Every client's needs are different. Let's find the right fit together."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel="Book Site Inspection"
        secondaryTo="/site-inspection"
      />
    </>
  );
}
