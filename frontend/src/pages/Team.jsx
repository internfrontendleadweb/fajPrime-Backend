import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { InnerHero } from "../components/sections/Hero.jsx";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import TeamCard from "../components/cards/TeamCard.jsx";
import CTABanner from "../components/sections/CTABanner.jsx";
import { team } from "../data/team.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

export default function Team() {
  const board = team.filter((t) => t.group === "board");
  const management = team.filter((t) => t.group === "management");

  return (
    <>
      <Helmet>
        <title>Our Team | FAJ Prime Estates</title>
        <meta
          name="description"
          content="Meet the Board of Directors and Management Team behind FAJ Prime Estates Ltd., the people building Nigeria's most trusted real estate brand."
        />
      </Helmet>

      <InnerHero
        title="Our Team"
        subtitle="The people behind FAJ Prime's commitment to trust, value and lasting legacies."
        breadcrumbItems={[{ label: "Team" }]}
        backgroundImage="/images/hero/team-hero.webp"
      />

      {/* Board of Directors */}
      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Leadership"
            title="Board of Directors"
            subtitle="Guiding FAJ Prime's strategic direction with decades of combined industry experience."
            align="center"
            className="mb-14"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {board.map((member) => (
              <motion.div key={member.id} variants={fadeInUp}>
                <TeamCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-section-lg bg-surface-light">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Day-to-Day Leadership"
            title="Management Team"
            subtitle="The team executing on our promise of trust, quality and lasting value, every single day."
            align="center"
            className="mb-14"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {management.map((member) => (
              <motion.div key={member.id} variants={fadeInUp}>
                <TeamCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTABanner
        eyebrow="Join Our Journey"
        title="Want to work with a team you can trust?"
        subtitle="Reach out to discuss your property goals with our team."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel="View Listings"
        secondaryTo="/listings"
      />
    </>
  );
}
