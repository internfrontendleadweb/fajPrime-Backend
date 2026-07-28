import { useMemo, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { InnerHero } from "../components/sections/Hero.jsx";
import BlogCard from "../components/cards/BlogCard.jsx";
import NewsletterSignup from "../components/sections/NewsletterSignup.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { api } from "../services/api.js";
import { formatShortDate } from "../utils/formatDate.js";
import { staggerContainer, fadeInUp } from "../animations/variants.js";

const PAGE_SIZE = 6;

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    api.getBlogPosts().then((data) => {
      if (!cancelled) {
        setBlogPosts(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(blogPosts.map((p) => p.category))],
    [blogPosts]
  );

  const sorted = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [blogPosts]
  );
  const featured = sorted[0];
  const popular = sorted.slice(1, 4);

  const filtered = useMemo(() => {
    return sorted.slice(1).filter((post) => {
      if (activeCategory !== "All" && post.category !== activeCategory) return false;
      if (query && !post.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [sorted, activeCategory, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) {
    return <section className="pt-40 pb-20 container-custom min-h-[40vh]" />;
  }

  return (
    <>
      <Helmet>
        <title>Insights & News | FAJ Prime Estates</title>
        <meta
          name="description"
          content="Market insights, buying guides and company news from FAJ Prime Estates, Nigeria's trusted real estate authority."
        />
      </Helmet>

      <InnerHero
        title="Insights & News"
        subtitle="Market trends, buying guides and stories from the world of Nigerian real estate."
        breadcrumbItems={[{ label: "Blog" }]}
        backgroundImage="/images/hero/blog-hero.webp"
      />

      {/* Featured Article */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface-light rounded-lg overflow-hidden"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-8 lg:pr-12">
              <span className="inline-block bg-gold-500 text-navy-900 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4">
                Featured · {featured.category}
              </span>
              <p className="font-serif text-h2 text-navy-900 leading-snug mb-4">{featured.title}</p>
              <p className="text-body text-slate-500 leading-relaxed mb-6">{featured.excerpt}</p>
              <p className="text-[13px] text-slate-400 mb-4">
                {formatShortDate(featured.date)} · {featured.readTime} read · By {featured.author}
              </p>
              <span className="flex items-center gap-1.5 text-small font-semibold text-gold-600 group-hover:gap-2.5 transition-all">
                Read Full Article <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Main grid + sidebar */}
      <section className="pb-section-lg bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                      activeCategory === cat
                        ? "bg-navy-900 border-navy-900 text-white"
                        : "border-slate-200 text-slate-500 hover:border-gold-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-56">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2.5 text-small border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>
            </div>

            {paginated.length ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${query}-${page}`}
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer(0.08)}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {paginated.map((post) => (
                    <motion.div key={post.id} variants={fadeInUp} className="h-full">
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <EmptyState title="No articles found" description="Try a different search term or category." />
            )}

            {paginated.length > 0 && (
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} className="mt-14" />
            )}
          </div>

          <aside className="space-y-10">
            <div>
              <p className="eyebrow mb-5">Popular Posts</p>
              <div className="space-y-5">
                {popular.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="flex gap-3 group">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 rounded object-cover flex-shrink-0 bg-slate-100"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <p className="text-small font-medium text-navy-900 leading-snug group-hover:text-gold-600 transition-colors line-clamp-2">
                        {post.title}
                      </p>
                      <p className="text-[12px] text-slate-400 mt-1">{formatShortDate(post.date)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-surface-light rounded-lg p-6">
              <NewsletterSignup variant="light" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
