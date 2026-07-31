// Centralized place to read environment variables.
// Every other file should import from here instead of calling
// process.env directly — this way, if a variable is missing,
// we find out immediately on startup instead of deep inside some
// random controller at 2am in production.

import dotenv from "dotenv";

dotenv.config();

const required = ["PORT", "NODE_ENV", "CLIENT_URL", "DATABASE_URL", "JWT_SECRET"];

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[env] Warning: ${key} is not set. Using a fallback default.`);
  }
}

export const env = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  DATABASE_URL: process.env.DATABASE_URL,
  // Email is optional — if RESEND_API_KEY is unset, src/utils/email.js
  // logs to the console instead of sending, so nothing breaks without it.
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "FAJ Prime Estates <onboarding@resend.dev>",
  ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || "",
  // Auth
  JWT_SECRET: process.env.JWT_SECRET || "dev-only-insecure-secret-change-me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  COOKIE_NAME: "faj_prime_session",
  // Image uploads (Cloudinary)
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  // The final public frontend domain (e.g. https://fajprimeestates.com) -
  // used only to build absolute URLs in the sitemap. Distinct from
  // CLIENT_URL, which is the dev/local frontend origin used for CORS.
  PUBLIC_SITE_URL: process.env.PUBLIC_SITE_URL || "http://localhost:5173",
};

export const isProduction = env.NODE_ENV === "production";
