import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { InnerHero } from "../components/sections/Hero.jsx";
import PropertyCard from "../components/cards/PropertyCard.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { useFavorites } from "../hooks/useFavorites.js";
import { listings } from "../data/listings.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

export default function Favorites() {
  const { favorites } = useFavorites();
  const savedProperties = listings.filter((l) => favorites.includes(l.id));

  return (
    <>
      <Helmet>
        <title>Saved Properties | FAJ Prime Estates</title>
        <meta name="description" content="Your saved and favorited properties from FAJ Prime Estates." />
      </Helmet>

      <InnerHero title="Saved Properties" subtitle="Properties you've favorited for later." breadcrumbItems={[{ label: "Favorites" }]} />

      <section className="py-section-lg bg-white">
        <div className="container-custom">
          {savedProperties.length ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer(0.08)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {savedProperties.map((property) => (
                <motion.div key={property.id} variants={fadeInUp} className="h-full">
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              title="No saved properties yet"
              description="Tap the heart icon on any property to save it here for later."
              actionLabel="Browse Listings"
              actionTo="/listings"
            />
          )}
        </div>
      </section>
    </>
  );
}
