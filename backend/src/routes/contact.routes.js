import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { writeLimiter } from "../middleware/rateLimiter.js";
import { contactSchema } from "../validation/schemas.js";
import { submitContact } from "../controllers/contact.controller.js";

const router = Router();

router.post("/", writeLimiter, validate(contactSchema), asyncHandler(submitContact));

export default router;
