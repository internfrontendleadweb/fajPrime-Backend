import { prisma } from "../config/db.js";
import { serializeListing, serializeAgent } from "../utils/serializers.js";
import { toEnum, listingTypeReverse, listingStatusReverse } from "../utils/enumMaps.js";

// GET /api/listings
// Supports the same filters the frontend's mock applyListingFilters() did:
// location, type, status, bedrooms (minimum), minPrice, maxPrice, query (search),
// plus featured, and page/limit for pagination (new — mock data had no pagination
// since it was only ever 14 hardcoded rows).
export const getListings = async (req, res) => {
  const { location, type, status, bedrooms, minPrice, maxPrice, query, featured } = req.query;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 12);

  const where = {};

  if (location) where.location = { contains: location, mode: "insensitive" };
  if (type) where.type = toEnum(listingTypeReverse, type);
  if (status) where.status = toEnum(listingStatusReverse, status);
  if (featured !== undefined) where.featured = featured === "true";
  if (bedrooms) where.bedrooms = { gte: parseInt(bedrooms) };

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseInt(minPrice);
    if (maxPrice) where.price.lte = parseInt(maxPrice);
  }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
    ];
  }

  const [listings, total] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.listing.count({ where }),
  ]);

  res.json({
    data: listings.map(serializeListing),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

// GET /api/listings/:slug
export const getListingBySlug = async (req, res) => {
  const listing = await prisma.listing.findUnique({ where: { slug: req.params.slug } });
  if (!listing) return res.status(404).json({ error: "Listing not found" });
  res.json(serializeListing(listing));
};

// GET /api/listings/agents — supporting endpoint for the property details page,
// which needs to look up an agent by the id stored on a listing.
export const getAgents = async (req, res) => {
  const agents = await prisma.agent.findMany({ orderBy: { name: "asc" } });
  res.json(agents.map(serializeAgent));
};
