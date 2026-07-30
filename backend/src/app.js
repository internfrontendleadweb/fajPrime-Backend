import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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
import contactRoutes from "./routes/contact.routes.js";
import inspectionRoutes from "./routes/inspection.routes.js";
import newsletterRoutes from "./routes/newsletter.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Render (and most hosts) sit behind a reverse proxy. Without this,
// express-rate-limit and req.ip would see the proxy's IP for every
// request instead of the real visitor's, making rate limiting useless.
app.set("trust proxy", 1);

// --- Security & parsing middleware ---
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json()); // parses incoming JSON request bodies
app.use(cookieParser()); // parses cookies into req.cookies (needed to read the auth session cookie)
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
app.use("/api/contact", contactRoutes);
app.use("/api/inspections", inspectionRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// More route groups (submissions/bookings management, etc.) will be
// mounted here in the next batch.

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
