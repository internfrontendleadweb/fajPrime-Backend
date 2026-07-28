import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getTeam } from "../controllers/team.controller.js";

const router = Router();

router.get("/", asyncHandler(getTeam));

export default router;
