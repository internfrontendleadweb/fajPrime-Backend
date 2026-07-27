import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const statusLabel = { past: "Completed", current: "In Progress", future: "Upcoming" };

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="card-soft rounded-lg overflow-hidden block group">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={project.images[0]}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-navy-900 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
          {statusLabel[project.status]}
        </span>
      </div>

      <div className="p-5">
        <p className="font-serif text-h4 text-navy-900 mb-2">{project.title}</p>
        <p className="flex items-center gap-1.5 text-small text-slate-500 mb-4">
          <MapPin size={14} className="text-gold-500 flex-shrink-0" />
          {project.location}
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between text-[13px] text-slate-500 mb-1.5">
            <span>Progress</span>
            <span className="font-semibold text-navy-900">{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold-500 rounded-full transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-small text-slate-500">{project.completionDate}</span>
          <span className="flex items-center gap-1 text-small font-semibold text-gold-600 group-hover:gap-2 transition-all">
            Explore <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
