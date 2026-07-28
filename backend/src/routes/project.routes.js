import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getProjects, getProjectBySlug } from "../controllers/project.controller.js";

const router = Router();

router.get("/", asyncHandler(getProjects));
router.get("/:slug", asyncHandler(getProjectBySlug));

export default router;
