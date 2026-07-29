import { verifyToken } from "../utils/jwt.js";
import { env } from "../config/env.js";
import { prisma } from "../config/db.js";

// Protects any route it's placed in front of. Reads the JWT from the
// httpOnly cookie (never from a header — the frontend never touches
// the token directly, the browser just sends the cookie automatically).
export async function requireAuth(req, res, next) {
  const token = req.cookies?.[env.COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const payload = verifyToken(token);

    // Confirm the admin still exists (and hasn't been deleted since
    // the token was issued) rather than trusting the token blindly.
    const admin = await prisma.adminUser.findUnique({ where: { id: payload.sub } });
    if (!admin) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    req.admin = { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
    next();
  } catch {
    return res.status(401).json({ error: "Session expired or invalid. Please log in again." });
  }
}
