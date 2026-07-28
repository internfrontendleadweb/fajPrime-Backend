import { prisma } from "../config/db.js";
import { serializeTestimonial } from "../utils/serializers.js";

// GET /api/testimonials
export const getTestimonials = async (req, res) => {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  res.json(testimonials.map(serializeTestimonial));
};
