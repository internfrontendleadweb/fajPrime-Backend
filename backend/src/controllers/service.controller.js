import { prisma } from "../config/db.js";
import { serializeService } from "../utils/serializers.js";

// GET /api/services
export const getServices = async (req, res) => {
  const services = await prisma.service.findMany({ orderBy: { createdAt: "asc" } });
  res.json(services.map(serializeService));
};

// GET /api/services/:slug
export const getServiceBySlug = async (req, res) => {
  const service = await prisma.service.findUnique({ where: { slug: req.params.slug } });
  if (!service) return res.status(404).json({ error: "Service not found" });
  res.json(serializeService(service));
};
