// Shared setup used by every test file. Deliberately does NOT wipe
// the database — these tests run against whatever DATABASE_URL your
// .env points to (likely your local dev database with real seeded
// content), and it would be a nasty surprise if running `npm test`
// silently deleted all your seeded listings.
//
// Instead: each test suite creates its own uniquely-named records
// (using a random suffix so re-runs never collide) and cleans up
// exactly what it created in an afterAll hook. Safe to run against
// your dev database as many times as you want.

import bcrypt from "bcryptjs";
import { prisma } from "../src/config/db.js";

// A random suffix per test run, so running the suite twice in a row
// never collides on a unique field (email, slug) from a previous run
// that didn't get cleaned up for some reason (e.g. a crashed test run).
export const runId = Math.random().toString(36).slice(2, 8);

export async function createTestAdmin() {
  const email = `test-admin-${runId}@example.com`;
  const password = "TestPassword123";
  const passwordHash = await bcrypt.hash(password, 10); // lower rounds than production - tests should be fast, not maximally secure
  const admin = await prisma.adminUser.create({
    data: { name: "Test Admin", email, passwordHash },
  });
  return { admin, email, password };
}

export async function deleteTestAdmin(adminId) {
  await prisma.adminUser.delete({ where: { id: adminId } }).catch(() => {});
}

// Logs in via a real request through the app (not a database shortcut)
// and returns the Set-Cookie header value, ready to attach to
// subsequent supertest requests with .set("Cookie", cookie).
export async function loginAs(request, app, email, password) {
  const res = await request(app).post("/api/auth/login").send({ email, password });
  const cookie = res.headers["set-cookie"];
  if (!cookie) {
    throw new Error(`Login failed in test setup: ${JSON.stringify(res.body)}`);
  }
  return cookie;
}
