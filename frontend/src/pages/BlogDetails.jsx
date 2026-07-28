import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CalendarDays, Clock, User } from "lucide-react";
import Breadcrumb from "../components/layout/Breadcrumb.jsx";
import ShareButtons from "../components/sections/ShareButtons.jsx";
import RelatedItems from "../components/sections/RelatedItems.jsx";
import NewsletterSignup from "../components/sections/NewsletterSignup.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import { api } from "../services/api.js";
import { formatDate } from "../utils/formatDate.js";

export default function BlogDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    api.getBlogPostBySlug(slug).then(async (found) => {
      if (cancelled) return;
      setPost(found);

      if (found) {
        const sameCategory = await api.getBlogPosts({ category: found.category });
        if (cancelled) return;
        setRelated(sameCategory.filter((p) => p.id !== found.id).slice(0, 3));
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

  if (!post) {
    return (
      <section className="pt-40 pb-20 container-custom">
        <EmptyState
          title="Article not found"
          description="This article may have been moved or unpublished."
          actionLabel="Back to Blog"
          actionTo="/blog"
        />
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | FAJ Prime Estates</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <section className="relative bg-navy-900 pt-40 pb-16">
        <div className="container-custom">
          <Breadcrumb items={[{ label: "Blog", path: "/blog" }, { label: post.category }]} />
          <span className="inline-block bg-gold-500 text-navy-900 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mt-6 mb-4">
            {post.category}
          </span>
          <h1 className="font-serif text-h1 md:text-h1-lg text-white max-w-3xl leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 mt-8 text-small text-white/60">
            <span className="flex items-center gap-2">
              <User size={15} /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={15} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} /> {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      <section className="py-section-lg bg-white">
        <div className="container-custom">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/8] object-cover rounded-lg -mt-24 relative z-10 shadow-elevated mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <article className="lg:col-span-3">
              <p className="text-body-lg text-slate-600 leading-relaxed">{post.content}</p>

              <div className="flex items-center justify-between pt-10 mt-10 border-t border-slate-100">
                <p className="text-small text-slate-500">
                  Written by <span className="font-semibold text-navy-900">{post.author}</span>
                </p>
                <ShareButtons title={post.title} />
              </div>

              {/* Comments placeholder */}
              <div className="mt-14 pt-10 border-t border-slate-100">
                <p className="font-serif text-h4 text-navy-900 mb-4">Comments</p>
                <div className="bg-surface-light rounded-lg p-8 text-center text-small text-slate-400">
                  Comments are currently disabled for this article. For questions, please{" "}
                  <a href="/contact" className="text-gold-600 font-semibold">contact us</a> directly.
                </div>
              </div>
            </article>

            <aside>
              <div className="bg-surface-light rounded-lg p-6 sticky top-28">
                <NewsletterSignup variant="light" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <RelatedItems type="blog" items={related} title="Related Articles" />
    </>
  );
}
