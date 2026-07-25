import { Navigation } from "lucide-react";

export default function MapEmbed({ height = "260px", className = "" }) {
  const lat = 6.4281;
  const lng = 3.4219;
  const delta = 0.02;
  const bbox = `${lng - delta}%2C${lat - delta}%2C${lng + delta}%2C${lat + delta}`;
  // OpenStreetMap's embed requires no API key and has no referrer restrictions,
  // making it far more reliable than the Google Maps no-key embed trick.
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div
      className={`relative rounded overflow-hidden border border-slate-200/20 bg-slate-200 ${className}`}
      style={{ height }}
    >
      <iframe
        title="FAJ Prime Estates office location"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        loading="lazy"
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white text-navy-900 text-[12px] font-semibold px-3 py-2 rounded shadow-elevated hover:bg-gold-50 transition-colors"
      >
        <Navigation size={13} /> Get Directions
      </a>
    </div>
  );
}
