import SectionHeading from "../ui/SectionHeading.jsx";
import Accordion from "../ui/Accordion.jsx";

export default function FAQAccordion({ faqs = [], title = "Frequently Asked Questions", eyebrow = "FAQs" }) {
  if (!faqs.length) return null;

  return (
    <section className="py-section-lg bg-surface-light">
      <div className="container-custom max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-12" />
        <div className="bg-white rounded-lg p-8 shadow-soft">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
