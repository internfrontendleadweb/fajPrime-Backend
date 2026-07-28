import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SectionHeading from "../ui/SectionHeading.jsx";
import Button from "../ui/Button.jsx";
import SliderNavButtons from "../ui/SliderNavButtons.jsx";
import PropertyCard from "../cards/PropertyCard.jsx";
import { api } from "../../services/api.js";
import "swiper/css";

export default function FeaturedListingsSlider() {
  const [featured, setFeatured] = useState([]);
  const prevRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    api.getListings({ featured: true }).then((data) => {
      if (!cancelled) setFeatured(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const nextRef = useRef(null);

  return (
    <section className="py-section-lg bg-surface-light">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Featured Listings"
            title="Handpicked properties for discerning buyers"
            className="mb-0"
          />
          <Button to="/listings" variant="text" className="flex-shrink-0">
            View all listings →
          </Button>
        </div>

        <Swiper
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          spaceBetween={24}
          slidesPerView={1.1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          className="featured-listings-swiper !pb-2"
        >
          {featured.map((property) => (
            <SwiperSlide key={property.id}>
              <PropertyCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-10">
          <SliderNavButtons prevRef={prevRef} nextRef={nextRef} variant="light" />
        </div>
      </div>
    </section>
  );
}
