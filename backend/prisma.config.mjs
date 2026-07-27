// Prisma 7 moved the database connection URL out of schema.prisma and
// into this config file, which the Prisma CLI (migrate, generate, studio)
// reads directly. Your actual app code (src/config/db.js) is separate
// and reads DATABASE_URL itself via a driver adapter — this file is
// only for CLI commands.

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
