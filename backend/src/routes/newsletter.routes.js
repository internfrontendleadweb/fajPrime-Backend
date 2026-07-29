import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { writeLimiter } from "../middleware/rateLimiter.js";
import { newsletterSchema } from "../validation/schemas.js";
import { subscribeNewsletter } from "../controllers/newsletter.controller.js";

const router = Router();

router.post("/", writeLimiter, validate(newsletterSchema), asyncHandler(subscribeNewsletter));

export default router;
