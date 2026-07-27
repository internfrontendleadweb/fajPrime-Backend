import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange, className = "" }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-10 h-10 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:border-gold-400 hover:text-gold-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded text-small font-medium transition-colors ${
            page === currentPage
              ? "bg-navy-900 text-white"
              : "border border-slate-200 text-slate-600 hover:border-gold-400 hover:text-gold-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-10 h-10 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:border-gold-400 hover:text-gold-600 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
