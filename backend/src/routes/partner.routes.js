import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getPartners } from "../controllers/partner.controller.js";

const router = Router();

router.get("/", asyncHandler(getPartners));

export default router;
