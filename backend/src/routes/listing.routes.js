import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getListings,
  getListingBySlug,
  getAgents,
} from "../controllers/listing.controller.js";

const router = Router();

router.get("/agents", asyncHandler(getAgents));
router.get("/", asyncHandler(getListings));
router.get("/:slug", asyncHandler(getListingBySlug));

export default router;
