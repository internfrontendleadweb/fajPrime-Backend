import { z } from "zod";

const urlOrPath = z.string().trim().min(1, "Required");
const optionalUrlOrPath = urlOrPath.optional().or(z.literal(""));

// --- Listing ---
export const listingCreateSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().optional(), // auto-generated from title if omitted
  type: z.string().trim().min(1, "Type is required"), // validated against enum map in the controller
  status: z.string().trim().min(1, "Status is required"),
  price: z.coerce.number().int().positive("Price must be a positive number"),
  currency: z.string().trim().default("NGN"),
  location: z.string().trim().min(2).max(200),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  parking: z.coerce.number().int().min(0).default(0),
  sqm: z.coerce.number().int().positive(),
  featured: z.coerce.boolean().default(false),
  description: z.string().trim().min(10),
  amenities: z.array(z.string().trim()).default([]),
  images: z.array(urlOrPath).default([]),
  agentId: z.string().trim().optional().or(z.literal("")),
});
export const listingUpdateSchema = listingCreateSchema.partial();

// --- Project ---
export const projectCreateSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().optional(),
  status: z.string().trim().min(1, "Status is required"),
  location: z.string().trim().min(2).max(200),
  progress: z.coerce.number().int().min(0).max(100).default(0),
  completionDate: z.string().trim().min(2),
  propertyType: z.string().trim().min(2),
  units: z.coerce.number().int().positive(),
  description: z.string().trim().min(10),
  amenities: z.array(z.string().trim()).default([]),
  images: z.array(urlOrPath).default([]),
});
export const projectUpdateSchema = projectCreateSchema.partial();

// --- Service ---
export const serviceCreateSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().optional(),
  icon: z.string().trim().min(1, "Icon name is required"),
  shortDescription: z.string().trim().min(10),
  benefits: z.array(z.string().trim()).default([]),
  process: z.array(z.string().trim()).default([]),
  faqs: z
    .array(z.object({ q: z.string().trim().min(1), a: z.string().trim().min(1) }))
    .default([]),
});
export const serviceUpdateSchema = serviceCreateSchema.partial();

// --- Team Member ---
export const teamCreateSchema = z.object({
  group: z.string().trim().min(1, "Group is required"), // "board" or "management"
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(150),
  bio: z.string().trim().min(10),
  image: urlOrPath,
  linkedin: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).default(0),
});
export const teamUpdateSchema = teamCreateSchema.partial();

// --- Testimonial ---
export const testimonialCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  location: z.string().trim().min(2).max(150),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  review: z.string().trim().min(10),
  image: urlOrPath,
});
export const testimonialUpdateSchema = testimonialCreateSchema.partial();

// --- Blog Post ---
export const blogCreateSchema = z.object({
  title: z.string().trim().min(3).max(250),
  slug: z.string().trim().optional(),
  category: z.string().trim().min(2).max(100),
  date: z.coerce.date().default(() => new Date()),
  readTime: z.string().trim().min(1).max(30),
  author: z.string().trim().min(2).max(120),
  image: urlOrPath,
  excerpt: z.string().trim().min(10).max(500),
  content: z.string().trim().min(20),
});
export const blogUpdateSchema = blogCreateSchema.partial();

// --- Partner ---
export const partnerCreateSchema = z.object({
  name: z.string().trim().min(2).max(150),
  logo: urlOrPath,
});
export const partnerUpdateSchema = partnerCreateSchema.partial();

// --- Agent ---
export const agentCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(150),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email(),
  photo: optionalUrlOrPath,
});
export const agentUpdateSchema = agentCreateSchema.partial();

// --- Status updates for submissions/bookings (admin-only fields) ---
export const contactStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CLOSED"], {
    message: "Status must be one of: NEW, CONTACTED, CLOSED",
  }),
});

export const inspectionStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"], {
    message: "Status must be one of: PENDING, CONFIRMED, COMPLETED, CANCELLED",
  }),
  notes: z.string().trim().max(2000).optional(),
});
