import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading.jsx";
import Tabs from "../ui/Tabs.jsx";
import Button from "../ui/Button.jsx";
import EditorialShowcase from "./EditorialShowcase.jsx";
import { api } from "../../services/api.js";

const tabOptions = [
  { value: "current", label: "Current" },
  { value: "past", label: "Past" },
  { value: "future", label: "Future" },
];

const statusLabel = { past: "Completed", current: "In Progress", future: "Upcoming" };

export default function ProjectsPreview() {
  const [status, setStatus] = useState("current");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.getProjects(status).then((data) => {
      if (!cancelled) setProjects(data);
    });
    return () => {
      cancelled = true;
    };
  }, [status]);

  const items = useMemo(
    () =>
      projects
        .slice(0, 4)
        .map((p) => ({
          id: p.id,
          title: p.title,
          description: `${p.location} · ${p.propertyType} · ${p.completionDate}`,
          image: p.images[0],
          to: `/projects/${p.slug}`,
          meta: statusLabel[p.status],
        })),
    [status]
  );

  return (
    <section className="py-section-lg bg-surface-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Our Projects"
            title="Developments shaping Nigeria's skyline"
            className="mb-0"
          />
          <Tabs tabs={tabOptions} active={status} onChange={setStatus} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {items.length ? (
              <EditorialShowcase items={items} />
            ) : (
              <p className="text-center text-slate-400 py-14">No projects in this category yet.</p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-14">
          <Button to={`/projects?status=${status}`} variant="secondary">
            Explore All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
