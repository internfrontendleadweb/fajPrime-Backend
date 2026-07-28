import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getTestimonials } from "../controllers/testimonial.controller.js";

const router = Router();

router.get("/", asyncHandler(getTestimonials));

export default router;
