import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getServices, getServiceBySlug } from "../controllers/service.controller.js";

const router = Router();

router.get("/", asyncHandler(getServices));
router.get("/:slug", asyncHandler(getServiceBySlug));

export default router;
