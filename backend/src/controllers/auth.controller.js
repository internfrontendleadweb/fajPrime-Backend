import bcrypt from "bcryptjs";
import { prisma } from "../config/db.js";
import { signToken } from "../utils/jwt.js";
import { env, isProduction } from "../config/env.js";

// Shared cookie options — used when setting AND clearing the cookie,
// since clearCookie must be called with the exact same options it was
// set with, or the browser won't recognize it as the same cookie.
const cookieOptions = {
  httpOnly: true, // JavaScript on the frontend can never read this cookie — only the browser sends it automatically
  secure: isProduction, // HTTPS-only in production; allowed over plain http on localhost for local dev
  sameSite: isProduction ? "none" : "lax", // "none" is required for cross-domain cookies once frontend/backend are on different hosts
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT_EXPIRES_IN default
};

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Deliberately vague error message for both "no such email" and
  // "wrong password" — being specific here tells an attacker which
  // emails are valid admin accounts.
  const invalidCredentials = () =>
    res.status(401).json({ error: "Invalid email or password" });

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) return invalidCredentials();

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordMatches) return invalidCredentials();

  const token = signToken(admin);
  res.cookie(env.COOKIE_NAME, token, cookieOptions);

  res.json({
    success: true,
    admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
  });
};

// POST /api/auth/logout
export const logout = (req, res) => {
  res.clearCookie(env.COOKIE_NAME, cookieOptions);
  res.json({ success: true });
};

// GET /api/auth/me  (protected by requireAuth — req.admin is already populated)
export const me = (req, res) => {
  res.json({ admin: req.admin });
};
