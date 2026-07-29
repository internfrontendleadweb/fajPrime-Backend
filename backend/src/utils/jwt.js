import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

// The token only ever carries the admin's id and role — never the
// password hash or anything sensitive. Anything else the frontend
// needs about the logged-in admin comes from GET /api/auth/me, which
// looks it up fresh from the database each time.
export function signToken(admin) {
  return jwt.sign({ sub: admin.id, role: admin.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET); // throws if invalid/expired
}
