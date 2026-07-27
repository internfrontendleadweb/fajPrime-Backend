import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-small">
      <Link to="/" className="flex items-center gap-1 text-white/60 hover:text-gold-400 transition-colors">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-white/30" />
          {item.path ? (
            <Link to={item.path} className="text-white/60 hover:text-gold-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gold-400">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
