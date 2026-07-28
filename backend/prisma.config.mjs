// Prisma 7 moved the database connection URL out of schema.prisma and
// into this config file, which the Prisma CLI (migrate, generate, studio)
// reads directly. Your actual app code (src/config/db.js) is separate
// and reads DATABASE_URL itself via a driver adapter — this file is
// only for CLI commands.
//
// NOTE: we load dotenv manually with an explicit path (rather than the
// `env()` helper Prisma's docs show) because the CLI's config loader
// doesn't reliably resolve a relative ".env" the way normal Node code
// does — this explicit path works regardless of that.

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "prisma/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
