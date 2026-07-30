import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middleware/auth.js";
import { upload, handleUploadError } from "../middleware/upload.js";
import { uploadImage, deleteImage } from "../controllers/upload.controller.js";
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
import {
  listContactSubmissions,
  updateContactSubmissionStatus,
  deleteContactSubmission,
  listInspectionBookings,
  updateInspectionBooking,
  deleteInspectionBooking,
  listNewsletterSubscribers,
  exportNewsletterSubscribers,
  deleteNewsletterSubscriber,
} from "../controllers/submissions.admin.controller.js";

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

// --- Contact submissions (list/update-status/delete only - created by
// the public contact form, never created here) ---
router.get("/contact-submissions", asyncHandler(listContactSubmissions));
router.patch("/contact-submissions/:id", asyncHandler(updateContactSubmissionStatus));
router.delete("/contact-submissions/:id", asyncHandler(deleteContactSubmission));

// --- Inspection bookings ---
router.get("/inspections", asyncHandler(listInspectionBookings));
router.patch("/inspections/:id", asyncHandler(updateInspectionBooking));
router.delete("/inspections/:id", asyncHandler(deleteInspectionBooking));

// --- Newsletter subscribers ---
// IMPORTANT: /export.csv must be registered before /:id, otherwise
// Express would try to treat "export.csv" as an :id value.
router.get("/newsletter/export.csv", asyncHandler(exportNewsletterSubscribers));
router.get("/newsletter", asyncHandler(listNewsletterSubscribers));
router.delete("/newsletter/:id", asyncHandler(deleteNewsletterSubscriber));

// --- Image uploads (Cloudinary) ---
// handleUploadError must sit directly after upload.single(), so any
// error multer throws (wrong file type, too large) gets caught here
// before it ever reaches the controller.
router.post("/upload", upload.single("image"), handleUploadError, asyncHandler(uploadImage));
router.delete("/upload/:publicId", asyncHandler(deleteImage));

export default router;
