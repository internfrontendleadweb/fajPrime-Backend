// Centralized place to read environment variables.
// Every other file should import from here instead of calling
// process.env directly — this way, if a variable is missing,
// we find out immediately on startup instead of deep inside some
// random controller at 2am in production.

import dotenv from "dotenv";

dotenv.config();

const required = ["PORT", "NODE_ENV", "CLIENT_URL", "DATABASE_URL"];

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
};

export const isProduction = env.NODE_ENV === "production";
