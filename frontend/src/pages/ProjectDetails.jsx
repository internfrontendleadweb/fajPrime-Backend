import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Building2, Layers, CalendarClock, CheckCircle2 } from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import GalleryLightbox from "../components/sections/GalleryLightbox.jsx";
import CTABanner from "../components/sections/CTABanner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import Button from "../components/ui/Button.jsx";
import { api } from "../services/api.js";

const statusLabel = { past: "Completed", current: "In Progress", future: "Upcoming" };

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api.getProjectBySlug(slug).then((data) => {
      if (!cancelled) {
        setProject(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <section className="pt-40 pb-20 container-custom min-h-[40vh]" />;
  }

  if (!project) {
    return (
      <section className="pt-40 pb-20 container-custom">
        <EmptyState
          title="Project not found"
          description="This project may have been renamed or removed."
          actionLabel="Back to Projects"
          actionTo="/projects"
        />
      </section>
    );
  }

  const facts = [
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Building2, label: "Property Type", value: project.propertyType },
    { icon: Layers, label: "Total Units", value: project.units },
    { icon: CalendarClock, label: "Timeline", value: project.completionDate },
  ];

  return (
    <>
      <Helmet>
        <title>{project.title} | FAJ Prime Estates</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <InnerHero
        title={project.title}
        subtitle={project.location}
        breadcrumbItems={[{ label: "Projects", path: "/projects" }, { label: project.title }]}
      />

      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <GalleryLightbox images={project.images} title={project.title} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-14">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gold-500 text-navy-900 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
                  {statusLabel[project.status]}
                </span>
              </div>

              <h2 className="font-serif text-h2 text-navy-900 mb-4">Project Overview</h2>
              <p className="text-body-lg text-slate-600 leading-relaxed">{project.description}</p>

              <div className="mt-10">
                <div className="flex items-center justify-between text-small text-slate-500 mb-2">
                  <span>Construction Progress</span>
                  <span className="font-semibold text-navy-900">{project.progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold-500 rounded-full transition-all duration-700"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <h3 className="font-serif text-h3 text-navy-900 mt-12 mb-6">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-small text-slate-600">
                    <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <aside>
              <div className="bg-surface-light rounded-lg p-6 sticky top-28">
                <p className="font-serif text-h4 text-navy-900 mb-6">Project Facts</p>
                <div className="space-y-5">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center flex-shrink-0">
                        <f.icon size={16} />
                      </div>
                      <div>
                        <p className="text-[13px] text-slate-400">{f.label}</p>
                        <p className="text-small font-semibold text-navy-900">{f.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button to="/site-inspection" variant="primary" className="w-full justify-center mt-8">
                  Book Site Inspection
                </Button>
                <Button to="/contact" variant="secondary" className="w-full justify-center mt-3">
                  Contact an Agent
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Explore More"
        title="Discover other developments from FAJ Prime"
        primaryLabel="View All Projects"
        primaryTo="/projects"
        secondaryLabel="View Listings"
        secondaryTo="/listings"
      />
    </>
  );
}
