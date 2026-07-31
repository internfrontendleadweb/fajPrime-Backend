import { z } from "zod";
import { stripXss } from "../utils/sanitize.js";

// Every schema includes an optional honeypot field (`website`). Real
// visitors never see or fill this field (it's hidden via CSS in the
// form), so if it arrives non-empty, the submission is almost
// certainly a bot. This field accepts ANY value at the validation
// layer on purpose — if it rejected non-empty values here, a bot would
// get a validation error back, which tips it off that the field is
// being checked. Instead, validation always passes, and each
// controller silently short-circuits to a fake success response
// without saving or emailing anything.
const honeypot = z.string().optional().or(z.literal(""));

const phoneRegex = /^[+\d][\d\s-]{6,20}$/;

// Free text from anonymous public visitors gets XSS-stripped on the
// way in — see src/utils/sanitize.js for why.
const cleanText = (schema) => schema.transform(stripXss);

export const contactSchema = z.object({
  name: cleanText(z.string().trim().min(2, "Name is required").max(120)),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number").optional().or(z.literal("")),
  subject: cleanText(z.string().trim().max(200).optional().or(z.literal(""))),
  message: cleanText(z.string().trim().min(10, "Message must be at least 10 characters").max(5000)),
  website: honeypot,
});

export const inspectionSchema = z.object({
  fullName: cleanText(z.string().trim().min(2, "Name is required").max(120)),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  location: cleanText(z.string().trim().max(200).optional().or(z.literal(""))),
  preferredDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val))
    .refine((date) => !isNaN(date.getTime()), { message: "Enter a valid date" }),
  preferredTime: z.string().trim().max(50).optional().or(z.literal("")),
  property: z.string().trim().max(200).optional().or(z.literal("")), // listing slug
  inspectionType: cleanText(z.string().trim().max(100).optional().or(z.literal(""))),
  message: cleanText(z.string().trim().max(2000).optional().or(z.literal(""))),
  website: honeypot,
});

export const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  website: honeypot,
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
