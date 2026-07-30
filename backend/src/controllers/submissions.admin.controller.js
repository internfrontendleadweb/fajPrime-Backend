import { prisma } from "../config/db.js";
import {
  serializeContactSubmission,
  serializeInspectionBooking,
  serializeNewsletterSubscriber,
} from "../utils/serializers.js";
import { contactStatusSchema, inspectionStatusSchema } from "../validation/adminSchemas.js";

function paginationParams(req, defaultLimit = 20) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || defaultLimit);
  return { page, limit, skip: (page - 1) * limit };
}

function validationError(res, zodError) {
  return res.status(400).json({
    error: "Validation failed",
    details: zodError.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
  });
}

// --- Contact Submissions ---

// GET /api/admin/contact-submissions?status=NEW&page=1&limit=20
export const listContactSubmissions = async (req, res) => {
  const { status } = req.query;
  const { page, limit, skip } = paginationParams(req);
  const where = status ? { status } : {};

  const [items, total] = await Promise.all([
    prisma.contactSubmission.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.contactSubmission.count({ where }),
  ]);

  res.json({
    data: items.map(serializeContactSubmission),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

// PATCH /api/admin/contact-submissions/:id
export const updateContactSubmissionStatus = async (req, res) => {
  const parsed = contactStatusSchema.safeParse(req.body);
  if (!parsed.success) return validationError(res, parsed.error);

  try {
    const updated = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
    });
    res.json(serializeContactSubmission(updated));
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw err;
  }
};

// DELETE /api/admin/contact-submissions/:id
export const deleteContactSubmission = async (req, res) => {
  try {
    await prisma.contactSubmission.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw err;
  }
};

// --- Inspection Bookings ---

// GET /api/admin/inspections?status=PENDING&page=1&limit=20
export const listInspectionBookings = async (req, res) => {
  const { status } = req.query;
  const { page, limit, skip } = paginationParams(req);
  const where = status ? { status } : {};

  const [items, total] = await Promise.all([
    prisma.inspectionBooking.findMany({
      where,
      include: { listing: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.inspectionBooking.count({ where }),
  ]);

  res.json({
    data: items.map(serializeInspectionBooking),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

// PATCH /api/admin/inspections/:id  (status, and optionally notes)
export const updateInspectionBooking = async (req, res) => {
  const parsed = inspectionStatusSchema.safeParse(req.body);
  if (!parsed.success) return validationError(res, parsed.error);

  try {
    const updated = await prisma.inspectionBooking.update({
      where: { id: req.params.id },
      data: parsed.data,
      include: { listing: true },
    });
    res.json(serializeInspectionBooking(updated));
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw err;
  }
};

// DELETE /api/admin/inspections/:id
export const deleteInspectionBooking = async (req, res) => {
  try {
    await prisma.inspectionBooking.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw err;
  }
};

// --- Newsletter Subscribers ---

// GET /api/admin/newsletter?page=1&limit=50
export const listNewsletterSubscribers = async (req, res) => {
  const { page, limit, skip } = paginationParams(req, 50);

  const [items, total] = await Promise.all([
    prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" }, skip, take: limit }),
    prisma.newsletterSubscriber.count(),
  ]);

  res.json({
    data: items.map(serializeNewsletterSubscriber),
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
};

// GET /api/admin/newsletter/export.csv
export const exportNewsletterSubscribers = async (req, res) => {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });

  const rows = ["email,subscribedAt"];
  for (const s of subscribers) {
    rows.push(`${s.email},${s.subscribedAt.toISOString()}`);
  }

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=newsletter-subscribers.csv");
  res.send(rows.join("\n"));
};

// DELETE /api/admin/newsletter/:id
export const deleteNewsletterSubscriber = async (req, res) => {
  try {
    await prisma.newsletterSubscriber.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (err) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found" });
    throw err;
  }
};
