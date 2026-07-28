// app.js configures the Express application: middleware + routes.
// server.js (separate file) is what actually starts it listening.
// Splitting these two lets us import `app` directly in tests later
// without needing a real network port open.

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import healthRoutes from "./routes/health.routes.js";
import listingRoutes from "./routes/listing.routes.js";
import projectRoutes from "./routes/project.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import teamRoutes from "./routes/team.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import partnerRoutes from "./routes/partner.routes.js";

const app = express();

// --- Security & parsing middleware ---
app.use(helmet()); // sets safe HTTP headers
app.use(
  cors({
    origin: env.CLIENT_URL, // only her frontend is allowed to call this API
    credentials: true,
  })
);
app.use(express.json()); // parses incoming JSON request bodies
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined")); // request logging

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the FAJ Prime Estates API" });
});

app.use("/api/health", healthRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/partners", partnerRoutes);

// More route groups (auth, admin CRUD, contact form, etc.) will be
// mounted here in later sections.

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
