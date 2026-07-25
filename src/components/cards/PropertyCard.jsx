import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Heart, BedDouble, Bath, Car, Ruler, MapPin } from "lucide-react";
import Badge from "../ui/Badge.jsx";
import { formatCompactPrice } from "../../utils/formatCurrency.js";
import { useFavorites } from "../../hooks/useFavorites.js";
import "swiper/css";
import "swiper/css/navigation";

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  return (
    <div className="card-soft rounded-lg overflow-hidden group h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
        <Swiper
          modules={[Navigation]}
          navigation
          className="h-full w-full property-card-swiper"
        >
          {property.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`Photo ${i + 1} of ${property.title}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Badge status={property.status} className="absolute top-4 left-4 z-10" />

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(property.id);
          }}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-soft hover:scale-110 transition-transform"
        >
          <Heart size={16} className={favorited ? "fill-gold-500 text-gold-500" : "text-navy-800"} />
        </button>
      </div>

      <Link to={`/listings/${property.slug}`} className="flex-1 flex flex-col p-5">
        <p className="font-serif text-h4 text-navy-900 leading-snug mb-2 line-clamp-2 min-h-[52px] md:min-h-[62px]">
          {property.title}
        </p>

        <p className="flex items-center gap-1.5 text-small text-slate-500 mb-4">
          <MapPin size={14} className="text-gold-500 flex-shrink-0" />
          {property.location}
        </p>

        <p className="font-serif text-h4 text-gold-600 mb-4">{formatCompactPrice(property.price)}</p>

        <div className="flex items-center gap-4 pt-4 mt-auto border-t border-slate-100 text-small text-slate-500">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedDouble size={16} /> {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath size={16} /> {property.bathrooms}
            </span>
          )}
          {property.parking > 0 && (
            <span className="flex items-center gap-1.5">
              <Car size={16} /> {property.parking}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Ruler size={16} /> {property.sqm}m²
          </span>
        </div>
      </Link>
    </div>
  );
}
