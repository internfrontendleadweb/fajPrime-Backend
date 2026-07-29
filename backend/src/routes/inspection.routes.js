import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.js";
import { writeLimiter } from "../middleware/rateLimiter.js";
import { inspectionSchema } from "../validation/schemas.js";
import { submitInspection } from "../controllers/inspection.controller.js";

const router = Router();

router.post("/", writeLimiter, validate(inspectionSchema), asyncHandler(submitInspection));

export default router;
