import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import { requireAuth } from "../middleware/auth.js";
import { loginSchema } from "../validation/schemas.js";
import { login, logout, me } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", authLimiter, validate(loginSchema), asyncHandler(login));
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
