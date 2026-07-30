import { createAdminCrud } from "./adminCrudFactory.js";
import {
  serializeListing,
  serializeProject,
  serializeService,
  serializeTeamMember,
  serializeTestimonial,
  serializeBlogPost,
  serializePartner,
  serializeAgent,
} from "../utils/serializers.js";
import {
  listingTypeReverse,
  listingStatusReverse,
  projectStatusReverse,
  teamGroupReverse,
  toEnum,
} from "../utils/enumMaps.js";
import {
  listingCreateSchema,
  listingUpdateSchema,
  projectCreateSchema,
  projectUpdateSchema,
  serviceCreateSchema,
  serviceUpdateSchema,
  teamCreateSchema,
  teamUpdateSchema,
  testimonialCreateSchema,
  testimonialUpdateSchema,
  blogCreateSchema,
  blogUpdateSchema,
  partnerCreateSchema,
  partnerUpdateSchema,
  agentCreateSchema,
  agentUpdateSchema,
} from "../validation/adminSchemas.js";

// Small helper: converts a display-string enum field (e.g. "Duplex")
// to its DB enum value (e.g. "DUPLEX"), or sends a 400 response and
// returns null if the value isn't recognized.
function requireEnum(reverseMap, value, fieldName, res) {
  const enumValue = toEnum(reverseMap, value);
  if (!enumValue) {
    res.status(400).json({
      error: "Validation failed",
      details: [{ field: fieldName, message: `"${value}" is not a recognized ${fieldName}` }],
    });
    return null;
  }
  return enumValue;
}

// --- Listings ---
export const listingAdmin = createAdminCrud({
  modelName: "listing",
  schema: listingCreateSchema,
  updateSchema: listingUpdateSchema,
  serialize: serializeListing,
  hasSlug: true,
  toDbFields: (data, res) => {
    const out = { ...data };
    if (out.agentId === "") delete out.agentId;
    if (out.type !== undefined) {
      const mapped = requireEnum(listingTypeReverse, out.type, "type", res);
      if (!mapped) return null;
      out.type = mapped;
    }
    if (out.status !== undefined) {
      const mapped = requireEnum(listingStatusReverse, out.status, "status", res);
      if (!mapped) return null;
      out.status = mapped;
    }
    return out;
  },
});

// --- Projects ---
export const projectAdmin = createAdminCrud({
  modelName: "project",
  schema: projectCreateSchema,
  updateSchema: projectUpdateSchema,
  serialize: serializeProject,
  hasSlug: true,
  toDbFields: (data, res) => {
    const out = { ...data };
    if (out.status !== undefined) {
      const mapped = requireEnum(projectStatusReverse, out.status, "status", res);
      if (!mapped) return null;
      out.status = mapped;
    }
    return out;
  },
});

// --- Services ---
export const serviceAdmin = createAdminCrud({
  modelName: "service",
  schema: serviceCreateSchema,
  updateSchema: serviceUpdateSchema,
  serialize: serializeService,
  hasSlug: true,
});

// --- Team Members ---
export const teamAdmin = createAdminCrud({
  modelName: "teamMember",
  schema: teamCreateSchema,
  updateSchema: teamUpdateSchema,
  serialize: serializeTeamMember,
  toDbFields: (data, res) => {
    const out = { ...data };
    if (out.linkedin === "") delete out.linkedin;
    if (out.group !== undefined) {
      const mapped = requireEnum(teamGroupReverse, out.group, "group", res);
      if (!mapped) return null;
      out.group = mapped;
    }
    return out;
  },
});

// --- Testimonials ---
export const testimonialAdmin = createAdminCrud({
  modelName: "testimonial",
  schema: testimonialCreateSchema,
  updateSchema: testimonialUpdateSchema,
  serialize: serializeTestimonial,
});

// --- Blog Posts ---
export const blogAdmin = createAdminCrud({
  modelName: "blogPost",
  schema: blogCreateSchema,
  updateSchema: blogUpdateSchema,
  serialize: serializeBlogPost,
  hasSlug: true,
});

// --- Partners ---
export const partnerAdmin = createAdminCrud({
  modelName: "partner",
  schema: partnerCreateSchema,
  updateSchema: partnerUpdateSchema,
  serialize: serializePartner,
});

// --- Agents ---
export const agentAdmin = createAdminCrud({
  modelName: "agent",
  schema: agentCreateSchema,
  updateSchema: agentUpdateSchema,
  serialize: serializeAgent,
  toDbFields: (data) => {
    const out = { ...data };
    if (out.photo === "") delete out.photo;
    return out;
  },
});
