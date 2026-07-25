import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-lg shadow-soft p-8 h-full flex flex-col">
      <Quote size={32} className="text-gold-200 mb-4" fill="currentColor" />

      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < testimonial.rating ? "fill-gold-500 text-gold-500" : "text-slate-200"}
          />
        ))}
      </div>

      <p className="text-body text-slate-600 leading-relaxed flex-1 mb-6">"{testimonial.review}"</p>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          loading="lazy"
          className="w-11 h-11 rounded-full object-cover bg-slate-100"
        />
        <div>
          <p className="font-semibold text-small text-navy-900">{testimonial.name}</p>
          <p className="text-[13px] text-slate-400">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}
