import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SliderNavButtons({ prevRef, nextRef, variant = "light", className = "" }) {
  const isDark = variant === "dark";

  const base =
    "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ease-out-soft disabled:opacity-30 disabled:pointer-events-none";

  const style = isDark
    ? "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500"
    : "bg-white border border-slate-200 text-navy-700 shadow-soft hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 hover:shadow-gold-glow";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button ref={prevRef} aria-label="Previous" className={`${base} ${style}`}>
        <ChevronLeft size={18} strokeWidth={2} />
      </button>
      <button ref={nextRef} aria-label="Next" className={`${base} ${style}`}>
        <ChevronRight size={18} strokeWidth={2} />
      </button>
    </div>
  );
}
