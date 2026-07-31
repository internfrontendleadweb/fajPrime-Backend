import { prisma } from "../config/db.js";
import { env } from "../config/env.js";

// Static, always-present pages (don't depend on database content).
const STATIC_PATHS = [
  "",
  "about",
  "why-us",
  "services",
  "listings",
  "projects",
  "team",
  "blog",
  "contact",
  "site-inspection",
];

function urlEntry(loc, changefreq = "weekly", priority = "0.7") {
  return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

// GET /sitemap.xml
// Dynamically includes every real listing/project/service/blog post
// currently in the database, so new content becomes crawlable
// automatically the moment it's published - nobody has to remember to
// update a static sitemap file by hand.
export const getSitemap = async (req, res) => {
  const base = env.PUBLIC_SITE_URL.replace(/\/$/, "");

  const [listings, projects, services, blogPosts] = await Promise.all([
    prisma.listing.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.blogPost.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const entries = [
    ...STATIC_PATHS.map((p) => urlEntry(`${base}/${p}`, "weekly", p === "" ? "1.0" : "0.8")),
    ...listings.map((l) => urlEntry(`${base}/listings/${l.slug}`, "weekly", "0.9")),
    ...projects.map((p) => urlEntry(`${base}/projects/${p.slug}`, "monthly", "0.7")),
    ...services.map((s) => urlEntry(`${base}/services/${s.slug}`, "monthly", "0.6")),
    ...blogPosts.map((b) => urlEntry(`${base}/blog/${b.slug}`, "monthly", "0.6")),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>`;

  res.set("Content-Type", "application/xml");
  res.set("Cache-Control", "public, max-age=3600"); // sitemaps don't need to be regenerated on every single request
  res.send(xml);
};

// GET /robots.txt
export const getRobots = (req, res) => {
  const base = env.PUBLIC_SITE_URL.replace(/\/$/, "");
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    `Sitemap: ${base}/sitemap.xml`,
  ].join("\n");

  res.set("Content-Type", "text/plain");
  res.send(body);
};
