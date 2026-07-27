import SectionHeading from "../ui/SectionHeading.jsx";
import PropertyCard from "../cards/PropertyCard.jsx";
import BlogCard from "../cards/BlogCard.jsx";

export default function RelatedItems({ type = "property", items = [], title }) {
  if (!items.length) return null;

  return (
    <section className="py-section-lg bg-surface-light">
      <div className="container-custom">
        <SectionHeading
          eyebrow={type === "property" ? "You May Also Like" : "Related Articles"}
          title={title || (type === "property" ? "Similar Properties" : "Keep Reading")}
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) =>
            type === "property" ? (
              <PropertyCard key={item.id} property={item} />
            ) : (
              <BlogCard key={item.id} post={item} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
