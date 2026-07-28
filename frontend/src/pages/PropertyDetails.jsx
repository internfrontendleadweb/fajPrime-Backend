import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  MapPin,
  BedDouble,
  Bath,
  Car,
  Ruler,
  Home as HomeIcon,
  CheckCircle2,
  Video,
  FileText,
  Phone,
  Mail,
} from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import GalleryLightbox from "../components/sections/GalleryLightbox.jsx";
import MapEmbed from "../components/sections/MapEmbed.jsx";
import MortgageCalculator from "../components/sections/MortgageCalculator.jsx";
import ContactForm from "../components/sections/ContactForm.jsx";
import RelatedItems from "../components/sections/RelatedItems.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { api } from "../services/api.js";
import { formatCurrency } from "../utils/formatCurrency.js";

const nearbyPlaces = [
  { name: "Lekki-Epe Expressway", distance: "5 min drive" },
  { name: "Circle Mall", distance: "10 min drive" },
  { name: "Landmark Beach", distance: "12 min drive" },
  { name: "Reddington Hospital", distance: "15 min drive" },
];

export default function PropertyDetails() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [agent, setAgent] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    api.getListingBySlug(slug).then(async (found) => {
      if (cancelled) return;
      setProperty(found);

      if (found) {
        const [agents, sameLocation] = await Promise.all([
          api.getAgents(),
          api.getListings({ location: found.location }),
        ]);
        if (cancelled) return;
        setAgent(agents?.find((a) => a.id === found.agent) || null);
        setRelated(sameLocation.filter((l) => l.id !== found.id).slice(0, 3));
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return <section className="pt-40 pb-20 container-custom min-h-[40vh]" />;
  }

  if (!property) {
    return (
      <section className="pt-40 pb-20 container-custom">
        <EmptyState
          title="Property not found"
          description="This listing may have been sold or removed."
          actionLabel="Back to Listings"
          actionTo="/listings"
        />
      </section>
    );
  }

  const keyFacts = [
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms || "N/A" },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms || "N/A" },
    { icon: Car, label: "Parking", value: property.parking || "N/A" },
    { icon: Ruler, label: "Size", value: `${property.sqm} m²` },
  ];

  return (
    <>
      <Helmet>
        <title>{property.title} | FAJ Prime Estates</title>
        <meta name="description" content={property.description} />
      </Helmet>

      <InnerHero
        title={property.title}
        subtitle={property.location}
        breadcrumbItems={[{ label: "Listings", path: "/listings" }, { label: property.title }]}
      />

      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <GalleryLightbox images={property.images} title={property.title} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-14">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge status={property.status} />
                <span className="flex items-center gap-1.5 text-small text-slate-500">
                  <HomeIcon size={14} className="text-gold-500" /> {property.type}
                </span>
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <p className="flex items-center gap-1.5 text-small text-slate-500 mb-2">
                    <MapPin size={14} className="text-gold-500" /> {property.location}
                  </p>
                  <p className="font-serif text-h2 text-gold-600">{formatCurrency(property.price)}</p>
                </div>
                <button className="flex items-center gap-2 text-small font-semibold text-navy-800 border border-slate-200 rounded px-4 py-2.5 hover:border-gold-400 transition-colors">
                  <Video size={16} /> Virtual Tour
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-slate-100">
                {keyFacts.map((f) => (
                  <div key={f.label} className="text-center">
                    <f.icon size={20} className="text-gold-500 mx-auto mb-2" />
                    <p className="font-semibold text-navy-900 text-small">{f.value}</p>
                    <p className="text-[12px] text-slate-400">{f.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-serif text-h3 text-navy-900 mt-10 mb-4">Description</h2>
              <p className="text-body text-slate-600 leading-relaxed">{property.description}</p>

              <h3 className="font-serif text-h3 text-navy-900 mt-10 mb-6">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-small text-slate-600">
                    <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>

              <h3 className="font-serif text-h3 text-navy-900 mt-10 mb-4">Floor Plans</h3>
              <div className="flex items-center gap-3 bg-surface-light rounded-lg p-6 text-small text-slate-500">
                <FileText size={20} className="text-gold-500 flex-shrink-0" />
                Detailed floor plans available on request. Contact an agent below.
              </div>

              <h3 className="font-serif text-h3 text-navy-900 mt-10 mb-4">Location & Nearby</h3>
              <MapEmbed height="280px" className="mb-4" />
              <div className="grid grid-cols-2 gap-3">
                {nearbyPlaces.map((p) => (
                  <div key={p.name} className="flex items-center justify-between text-small bg-surface-light rounded p-3">
                    <span className="text-navy-800">{p.name}</span>
                    <span className="text-slate-400 text-[12px]">{p.distance}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-serif text-h3 text-navy-900 mt-10 mb-4">Mortgage Calculator</h3>
              <MortgageCalculator propertyPrice={property.price} />
            </div>

            <aside className="space-y-6">
              {agent && (
                <div className="bg-surface-light rounded-lg p-6 sticky top-28">
                  <p className="eyebrow mb-4">Listed By</p>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-14 h-14 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center font-serif text-h4 flex-shrink-0">
                      {agent.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 text-small">{agent.name}</p>
                      <p className="text-[13px] text-slate-400">{agent.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2.5 text-small text-slate-600 hover:text-gold-600 transition-colors">
                      <Phone size={14} /> {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 text-small text-slate-600 hover:text-gold-600 transition-colors">
                      <Mail size={14} /> {agent.email}
                    </a>
                  </div>

                  <Button to="/site-inspection" variant="primary" className="w-full justify-center mb-3">
                    Schedule Inspection
                  </Button>

                  <p className="text-[13px] text-slate-400 mb-3 mt-6">Or send a message</p>
                  <ContactForm agentContext={{ propertySlug: property.slug, agentId: agent.id }} />
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <RelatedItems type="property" items={related} title="Similar Properties Nearby" />
    </>
  );
}
