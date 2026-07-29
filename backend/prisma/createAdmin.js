// Creates an admin user for the CMS. There's no public signup page on
// purpose — admin accounts are created deliberately by whoever runs
// this script, not by anyone visiting the site.
//
// Run with: npm run admin:create

import readline from "node:readline/promises";
import bcrypt from "bcryptjs";
import { prisma } from "../src/config/db.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function main() {
  console.log("=== Create FAJ Prime Admin User ===\n");

  let name = (await rl.question("Full name: ")).trim();
  while (!name) {
    name = (await rl.question("Full name (required): ")).trim();
  }

  let email = (await rl.question("Email: ")).trim().toLowerCase();
  while (!isValidEmail(email)) {
    email = (await rl.question("Enter a valid email: ")).trim().toLowerCase();
  }

  let password = await rl.question("Password (min 8 characters): ");
  while (password.length < 8) {
    password = await rl.question("Password too short — min 8 characters: ");
  }

  rl.close();

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`\nAn admin with email ${email} already exists (id: ${existing.id}).`);
    console.log("Nothing was created. If you meant to reset their password, that's a future CMS feature.");
    await prisma.$disconnect();
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.adminUser.create({
    data: { name, email, passwordHash },
  });

  console.log(`\n✅ Admin user created: ${admin.name} <${admin.email}>`);
  console.log("You can now log in via POST /api/auth/login with this email and password.");

  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error("Failed to create admin:", err.message);
  await prisma.$disconnect();
  process.exit(1);
});
