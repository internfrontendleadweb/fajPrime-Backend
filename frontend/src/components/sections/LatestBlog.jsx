import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading.jsx";
import Button from "../ui/Button.jsx";
import BlogCard from "../cards/BlogCard.jsx";
import { api } from "../../services/api.js";
import { staggerContainer, fadeInUp } from "../../animations/variants.js";

export default function LatestBlog() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api.getBlogPosts().then((data) => {
      if (!cancelled) {
        setLatest([...data].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-section-lg bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Insights & News"
            title="From the FAJ Prime journal"
            className="mb-0"
          />
          <Button to="/blog" variant="text">
            View all articles →
          </Button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {latest.map((post) => (
            <motion.div key={post.id} variants={fadeInUp} className="h-full">
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
