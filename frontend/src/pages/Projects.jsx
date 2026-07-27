import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InnerHero } from "../components/sections/Hero.jsx";
import Tabs from "../components/ui/Tabs.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ProjectCard from "../components/cards/ProjectCard.jsx";
import CTABanner from "../components/sections/CTABanner.jsx";
import { projects } from "../data/projects.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

const tabOptions = [
  { value: "current", label: "Current Projects" },
  { value: "past", label: "Past Projects" },
  { value: "future", label: "Future Projects" },
];

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "current";

  const filtered = useMemo(() => projects.filter((p) => p.status === status), [status]);

  const handleTabChange = (value) => {
    setSearchParams(value === "current" ? {} : { status: value });
  };

  return (
    <>
      <Helmet>
        <title>Our Projects | FAJ Prime Estates</title>
        <meta
          name="description"
          content="Explore FAJ Prime Estates' past, current and future property developments across Lagos, Abuja and Port Harcourt."
        />
      </Helmet>

      <InnerHero
        title="Our Projects"
        subtitle="A portfolio of developments: delivered, underway and on the horizon."
        breadcrumbItems={[{ label: "Projects" }]}
        backgroundImage="/images/hero/projects-hero.webp"
      />

      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <div className="flex justify-center mb-14">
            <Tabs tabs={tabOptions} active={status} onChange={handleTabChange} />
          </div>

          <AnimatePresence mode="wait">
            {filtered.length ? (
              <motion.div
                key={status}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={staggerContainer(0.1)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project) => (
                  <motion.div key={project.id} variants={fadeInUp}>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState title="No projects in this category yet" description="Check back soon or explore another tab." />
            )}
          </AnimatePresence>
        </div>
      </section>

      <CTABanner
        eyebrow="Interested in a Project?"
        title="Speak with our team about upcoming opportunities"
        subtitle="Get early access to unit availability, pricing and payment plans."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel="Book Site Inspection"
        secondaryTo="/site-inspection"
      />
    </>
  );
}
