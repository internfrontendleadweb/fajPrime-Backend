import { Router } from "express";

const router = Router();

// GET /api/health
// Simple uptime/status check — useful for Render's health checks,
// and for you to confirm the server is actually running.
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "FAJ Prime API is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
