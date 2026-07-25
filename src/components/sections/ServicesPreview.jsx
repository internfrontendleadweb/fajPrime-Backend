import SectionHeading from "../ui/SectionHeading.jsx";
import ServicesList from "./ServicesList.jsx";
import { services } from "../../data/services.js";

export default function ServicesPreview() {
  const preview = services.slice(0, 6).map((s) => ({
    id: s.id,
    title: s.title,
    description: s.shortDescription,
    icon: s.icon,
    to: `/services/${s.slug}`,
  }));

  return (
    <section className="py-section-lg bg-white">
      <div className="container-custom">
        <SectionHeading
          eyebrow="What We Offer"
          title="End-to-end real estate expertise"
          subtitle="From development to management, we support every stage of your property journey."
          className="mb-14"
        />

        <ServicesList items={preview} />
      </div>
    </section>
  );
}
