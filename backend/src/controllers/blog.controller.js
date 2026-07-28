import { prisma } from "../config/db.js";
import { serializeBlogPost } from "../utils/serializers.js";

// GET /api/blog?category=Market Insights&page=&limit=
export const getBlogPosts = async (req, res) => {
  const { category } = req.query;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);

  const where = {};
  if (category) where.category = { equals: category, mode: "insensitive" };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  res.json({
    data: posts.map(serializeBlogPost),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

// GET /api/blog/:slug
export const getBlogPostBySlug = async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug } });
  if (!post) return res.status(404).json({ error: "Blog post not found" });
  res.json(serializeBlogPost(post));
};
