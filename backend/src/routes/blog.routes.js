import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getBlogPosts, getBlogPostBySlug } from "../controllers/blog.controller.js";

const router = Router();

router.get("/", asyncHandler(getBlogPosts));
router.get("/:slug", asyncHandler(getBlogPostBySlug));

export default router;
