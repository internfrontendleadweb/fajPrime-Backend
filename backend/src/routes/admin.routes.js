import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import {
  listingAdmin,
  projectAdmin,
  serviceAdmin,
  teamAdmin,
  testimonialAdmin,
  blogAdmin,
  partnerAdmin,
  agentAdmin,
} from "../controllers/admin.controllers.js";

const router = Router();

// Every route below requires a valid logged-in admin session.
router.use(requireAuth);

// Each resource gets the same 3 mutation routes — reading (GET) is
// already handled by the public routes from Section 3, so the CMS UI
// can just reuse those for listing/viewing content.
function mountCrud(path, controller) {
  router.post(path, asyncHandler(controller.create));
  router.put(`${path}/:id`, asyncHandler(controller.update));
  router.delete(`${path}/:id`, asyncHandler(controller.remove));
}

mountCrud("/listings", listingAdmin);
mountCrud("/projects", projectAdmin);
mountCrud("/services", serviceAdmin);
mountCrud("/team", teamAdmin);
mountCrud("/testimonials", testimonialAdmin);
mountCrud("/blog", blogAdmin);
mountCrud("/partners", partnerAdmin);
mountCrud("/agents", agentAdmin);

export default router;
