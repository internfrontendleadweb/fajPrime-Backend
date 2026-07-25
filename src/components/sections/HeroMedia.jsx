import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroMedia({
  videoSrc = "/src/assets/images/hero/hero.mp4",
  posterImage = "/src/assets/images/hero/apartment.png",
  images = [
    "/src/assets/images/hero/home-hero-1.png",
    "/src/assets/images/hero/home-hero-2.png",
    "/src/assets/images/hero/home-hero-3.png",
  ],
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const listener = (e) => setReducedMotion(e.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  // Reduced motion (any viewport): static poster only, no autoplay/animation.
  if (reducedMotion) {
    return (
      <img src={posterImage} alt="" className="w-full h-full object-cover" />
    );
  }

  // Desktop: full-bleed looping background video.
  if (isDesktop) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterImage}
        className="w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }

  // Mobile: lighter-weight Ken Burns crossfade slider, same cinematic feel with far less data.
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      loop
      className="hero-kenburns-swiper w-full h-full"
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <div className="w-full h-full overflow-hidden">
            <img
              src={img}
              alt=""
              className="hero-kenburns-img w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
