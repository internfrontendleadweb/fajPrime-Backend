import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatShortDate } from "../../utils/formatDate.js";

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="card-soft rounded-lg overflow-hidden flex flex-col h-full group">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full">
          {post.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[13px] text-slate-400 mb-2">
          {formatShortDate(post.date)} · {post.readTime} read
        </p>
        <p className="font-serif text-h4 text-navy-900 leading-snug mb-3 line-clamp-2 min-h-[52px] md:min-h-[62px] group-hover:text-gold-600 transition-colors">
          {post.title}
        </p>
        <p className="text-small text-slate-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <span className="flex items-center gap-1.5 text-small font-semibold text-gold-600 group-hover:gap-2.5 transition-all mt-auto">
          Read More <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
