import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Building2;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative block p-8 rounded-lg bg-white border border-slate-100 shadow-soft hover:shadow-elevated hover:-translate-y-1 hover:border-gold-200 transition-all duration-300 ease-out-soft"
    >
      <div className="w-14 h-14 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors duration-300">
        <Icon size={24} strokeWidth={1.75} />
      </div>

      <p className="font-serif text-h4 text-navy-900 mb-3">{service.title}</p>
      <p className="text-small text-slate-500 leading-relaxed mb-6">{service.shortDescription}</p>

      <span className="inline-flex items-center gap-1.5 text-small font-semibold text-gold-600">
        Learn more
        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </span>
    </Link>
  );
}
