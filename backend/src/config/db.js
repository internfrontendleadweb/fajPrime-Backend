// Prisma 7 requires every PrismaClient to be given a driver adapter —
// there's no more "just works" default connection like in Prisma 6 and
// earlier. This file is the ONE place we create that client; every
// controller elsewhere imports { prisma } from here instead of creating
// its own client (creating multiple clients exhausts your database's
// connection limit fast).

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env.js";

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
