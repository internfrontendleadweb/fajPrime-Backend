import { prisma } from "../config/db.js";
import { serializePartner } from "../utils/serializers.js";

// GET /api/partners
export const getPartners = async (req, res) => {
  const partners = await prisma.partner.findMany({ orderBy: { createdAt: "asc" } });
  res.json(partners.map(serializePartner));
};
