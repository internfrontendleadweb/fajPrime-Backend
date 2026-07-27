import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { Expand } from "lucide-react";
import Modal from "../ui/Modal.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function GalleryLightbox({ images = [], title = "Gallery" }) {
  const [open, setOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!images.length) return null;

  return (
    <>
      <div className="relative grid grid-cols-2 sm:grid-cols-4 grid-rows-2 gap-2 sm:gap-3 rounded-lg overflow-hidden h-[280px] sm:h-[420px]">
        <button
          onClick={() => setOpen(true)}
          className="col-span-2 row-span-2 relative group overflow-hidden"
        >
          <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
        </button>
        {images.slice(1, 5).map((img, i) => (
          <button
            key={i}
            onClick={() => setOpen(true)}
            className="relative group overflow-hidden hidden sm:block"
          >
            <img src={img} alt={`${title} ${i + 2}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
            {i === 3 && images.length > 5 && (
              <span className="absolute inset-0 bg-navy-900/60 flex items-center justify-center text-white font-semibold text-small">
                +{images.length - 5} more
              </span>
            )}
          </button>
        ))}
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-sm text-navy-900 text-[13px] sm:text-small font-semibold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded shadow-soft"
        >
          <Expand size={16} /> View all photos
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} size="lg" className="!bg-navy-900 p-6">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="gallery-swiper rounded-lg overflow-hidden aspect-[16/10] mb-4"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`${title} ${i + 1}`} className="w-full h-full object-contain bg-navy-950" loading="lazy" decoding="async" />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          slidesPerView={5}
          spaceBetween={10}
          watchSlidesProgress
          className="thumb-swiper"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="!h-16 rounded overflow-hidden cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </>
  );
}
