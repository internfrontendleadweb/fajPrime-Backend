import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getListings, getListingBySlug, getAgents } from "../controllers/listing.controller.js";

const router = Router();

// IMPORTANT: /agents must be registered before /:slug, otherwise Express
// would treat the literal word "agents" as a slug value and it would
// never reach getAgents.
router.get("/agents", asyncHandler(getAgents));
router.get("/", asyncHandler(getListings));
router.get("/:slug", asyncHandler(getListingBySlug));

export default router;
