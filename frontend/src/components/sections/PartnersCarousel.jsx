import { useState, useEffect } from "react";
import { api } from "../../services/api.js";
import PartnerLogo from "../cards/PartnerLogo.jsx";

export default function PartnersCarousel() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.getPartners().then((data) => {
      if (!cancelled) setPartners(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Duplicate list for seamless infinite scroll illusion
  const loopedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container-custom mb-8">
        <p className="eyebrow text-center">Trusted By</p>
      </div>

      <div className="relative">
        <div className="flex w-max animate-marquee">
          {loopedPartners.map((partner, i) => (
            <PartnerLogo key={`${partner.id}-${i}`} partner={partner} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
