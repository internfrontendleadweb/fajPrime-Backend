import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import SearchPropertyBar from "../components/sections/SearchPropertyBar.jsx";
import FilterSidebar from "../components/sections/FilterSidebar.jsx";
import Select from "../components/ui/Select.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { CardSkeleton } from "../components/ui/Skeleton.jsx";
import PropertyCard from "../components/cards/PropertyCard.jsx";
import { useFilteredListings } from "../hooks/useFilteredListings.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

const PAGE_SIZE = 6;

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function Listings() {
  const { filters, updateFilter, clearFilters, filteredListings, loading } = useFilteredListings();
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [filters.location, filters.type, filters.status, filters.bedrooms, filters.minPrice, filters.maxPrice, filters.query]);

  const totalPages = Math.max(1, Math.ceil(filteredListings.length / PAGE_SIZE));
  const paginated = useMemo(
    () => filteredListings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredListings, page]
  );

  return (
    <>
      <Helmet>
        <title>Property Listings | FAJ Prime Estates</title>
        <meta
          name="description"
          content="Browse FAJ Prime Estates' full portfolio of luxury apartments, duplexes, terraces, land and commercial properties across Nigeria."
        />
      </Helmet>

      <InnerHero
        title="Property Listings"
        subtitle="Search our full portfolio of verified, title-clean properties across Nigeria."
        breadcrumbItems={[{ label: "Listings" }]}
        backgroundImage="/images/hero/listings-hero.webp"
      />

      <section className="py-16 bg-white">
        <div className="container-custom -mt-24 relative z-20 mb-12">
          <SearchPropertyBar />
        </div>

        <div className="container-custom grid grid-cols-1 lg:grid-cols-4 gap-10">
          <FilterSidebar
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            className="hidden lg:block lg:col-span-1 h-fit sticky top-28"
          />

          <div className="lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <p className="text-small text-slate-500">
                <span className="font-semibold text-navy-900">{filteredListings.length}</span> properties found
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-small font-medium text-navy-800 border border-slate-200 rounded px-4 py-2.5"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>

                <Select
                  options={sortOptions}
                  value={filters.sort}
                  onChange={(e) => updateFilter("sort", e.target.value)}
                  containerClassName="w-44"
                  className="!py-2.5"
                />

                <div className="hidden sm:flex items-center gap-1 border border-slate-200 rounded p-1">
                  <button
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    className={`p-2 rounded ${view === "grid" ? "bg-navy-900 text-white" : "text-slate-400"}`}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    aria-label="List view"
                    className={`p-2 rounded ${view === "list" ? "bg-navy-900 text-white" : "text-slate-400"}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className={`grid gap-6 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : paginated.length ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${view}-${page}-${JSON.stringify(filters)}`}
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer(0.08)}
                  className={`grid gap-6 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-2xl"}`}
                >
                  {paginated.map((property) => (
                    <motion.div key={property.id} variants={fadeInUp} className="h-full">
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <EmptyState
                title="No properties match your filters"
                description="Try adjusting or clearing your filters to see more results."
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            )}

            {!loading && paginated.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
                className="mt-14"
              />
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-navy-900/60 lg:hidden"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="font-serif text-h4 text-navy-900">Filters</p>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <X size={22} />
                </button>
              </div>
              <FilterSidebar filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} className="!p-0 !border-0" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
