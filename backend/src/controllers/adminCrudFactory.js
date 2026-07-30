import { prisma } from "../config/db.js";
import { slugify, ensureUniqueSlug } from "../utils/slug.js";

// Builds { create, update, remove } controllers for a given Prisma
// model. Every admin content resource (Listing, Project, Service,
// TeamMember, Testimonial, BlogPost, Partner, Agent) shares the exact
// same shape of logic — validate, translate enums, generate a slug if
// needed, write to the DB, handle the same handful of Prisma error
// codes consistently. Writing this once here means every resource
// automatically behaves the same way, and a bug fixed here fixes it
// everywhere at once.
//
// options:
//   modelName   - the prisma model key, e.g. "listing" (prisma.listing.*)
//   schema      - Zod schema for create (full validation)
//   updateSchema - Zod schema for update (partial validation)
//   serialize   - function to shape the DB row for the API response
//   toDbFields  - function(parsedBody) -> object ready for prisma (e.g.
//                 translates display-string enums to DB enum values)
//   hasSlug     - if true, auto-generates/uniquifies a slug from `title`
export function createAdminCrud({ modelName, schema, updateSchema, serialize, toDbFields, hasSlug = false }) {
  const model = prisma[modelName];

  const create = async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
      });
    }

    const data = toDbFields ? await toDbFields(parsed.data, res) : parsed.data;
    if (!data) return; // toDbFields already sent an error response (e.g. invalid enum value)

    if (hasSlug) {
      const base = data.slug ? slugify(data.slug) : slugify(data.title);
      data.slug = await ensureUniqueSlug(model, base);
    }

    try {
      const created = await model.create({ data });
      res.status(201).json(serialize(created));
    } catch (err) {
      handlePrismaError(err, res);
    }
  };

  const update = async (req, res) => {
    const { id } = req.params;
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.issues.map((i) => ({ field: i.path.join("."), message: i.message })),
      });
    }

    const data = toDbFields ? await toDbFields(parsed.data, res, true) : parsed.data;
    if (!data) return;

    if (hasSlug && (data.slug || data.title)) {
      const base = slugify(data.slug || data.title);
      data.slug = await ensureUniqueSlug(model, base, id);
    }

    try {
      const updated = await model.update({ where: { id }, data });
      res.json(serialize(updated));
    } catch (err) {
      handlePrismaError(err, res);
    }
  };

  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      await model.delete({ where: { id } });
      res.status(204).send();
    } catch (err) {
      handlePrismaError(err, res);
    }
  };

  return { create, update, remove };
}

function handlePrismaError(err, res) {
  // P2025: record to update/delete doesn't exist
  if (err.code === "P2025") {
    return res.status(404).json({ error: "Not found" });
  }
  // P2002: unique constraint violation (e.g. duplicate slug/email)
  if (err.code === "P2002") {
    return res.status(409).json({ error: `A record with that ${err.meta?.target || "value"} already exists` });
  }
  // P2003: foreign key constraint (e.g. agentId doesn't point to a real Agent)
  if (err.code === "P2003") {
    return res.status(400).json({ error: "Referenced record does not exist" });
  }
  throw err; // anything else -> the global error handler
}
