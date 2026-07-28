import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading.jsx";
import { api } from "../../services/api.js";
import "swiper/css";
import "swiper/css/effect-fade";

const AUTOPLAY_MS = 6000;

export default function TestimonialsCarousel() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.getTestimonials().then((data) => {
      if (!cancelled) setTestimonials(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Drives the thin progress bar in sync with autoplay.
  const [progressKey, setProgressKey] = useState(0);
  useEffect(() => setProgressKey((k) => k + 1), [activeIndex]);

  const active = testimonials[activeIndex];

  if (!active) return null;

  return (
    <section className="relative py-section-lg bg-navy-900 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <pattern
          id="testimonialPattern"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M22 0L44 22L22 44L0 22Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#testimonialPattern)" />
      </svg>

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by families and investors alike"
          align="center"
          light
          className="mb-16"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Giant watermark quote mark behind the text */}
          <Quote
            size={220}
            className="absolute -top-16 left-1/2 -translate-x-1/2 text-white/[0.035] pointer-events-none"
            fill="currentColor"
          />

          {/* Side nav arrows, flanking the quote */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous testimonial"
            className="hidden md:flex absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/15 text-white/60 items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors z-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next testimonial"
            className="hidden md:flex absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/15 text-white/60 items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-colors z-10"
          >
            <ChevronRight size={18} />
          </button>

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: AUTOPLAY_MS, disableOnInteraction: false }}
            loop
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="relative z-[1] text-center"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <p className="font-serif italic text-h3 md:text-h2 text-white/95 leading-snug font-normal min-h-[130px] md:min-h-[150px] flex items-center justify-center px-4 md:px-10">
                  "{t.review}"
                </p>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center gap-1 mt-6 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < active.rating
                    ? "fill-gold-500 text-gold-500"
                    : "text-white/15"
                }
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-3">
            <img
              src={active.image}
              alt={active.name}
              className="w-11 h-11 rounded-full object-cover bg-white/10 border border-gold-500/40"
              loading="lazy"
              decoding="async"
            />
            <div className="text-left">
              <p className="text-small font-semibold text-white tracking-wide">
                {active.name}
              </p>
              <p className="text-[12px] text-white/45 uppercase tracking-wider mt-0.5">
                {active.location}
              </p>
            </div>
          </div>

          {/* Autoplay progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="relative h-1.5 rounded-full bg-white/15 overflow-hidden transition-all duration-300"
                style={{ width: i === activeIndex ? "28px" : "6px" }}
              >
                {i === activeIndex && (
                  <motion.span
                    key={progressKey}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: AUTOPLAY_MS / 1000,
                      ease: "linear",
                    }}
                    className="absolute inset-y-0 left-0 bg-gold-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
