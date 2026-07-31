// app.js configures the Express application: middleware + routes.
// server.js (separate file) is what actually starts it listening.
// Splitting these two lets us import `app` directly in tests later
// without needing a real network port open.

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import hpp from "hpp";

import { env, allowedOrigins } from "./config/env.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { cacheControl } from "./middleware/cache.js";
import { publicApiLimiter } from "./middleware/rateLimiter.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { getSitemap, getRobots } from "./controllers/seo.controller.js";
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
app.use(helmet()); // sets safe HTTP headers
app.use(compression()); // gzip-compresses every response - smaller payloads, faster page loads
app.use(
  cors({
    // A function instead of a fixed string, so BOTH your live domain
    // and localhost work at the same time — not one or the other.
    // Requests with no Origin header (curl, server-to-server, mobile
    // apps) are allowed through since CORS only matters to browsers
    // anyway; it's not a meaningful security boundary for those callers.
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const err = new Error(`Origin ${origin} is not allowed by CORS`);
      err.status = 403;
      callback(err);
    },
    credentials: true,
  })
);
app.use(hpp()); // strips duplicate query params (e.g. ?status=A&status=B) - stops a class of parameter-pollution attacks
app.use(express.json()); // parses incoming JSON request bodies
app.use(cookieParser()); // parses cookies into req.cookies (needed to read the auth session cookie)
app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined")); // request logging

// --- Routes ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the FAJ Prime Estates API" });
});

app.get("/sitemap.xml", asyncHandler(getSitemap));
app.get("/robots.txt", getRobots);

app.use("/api/health", healthRoutes);
// Public content routes: cached for 60s (repeat requests within that
// window are served without hitting the database) and rate-limited
// generously (normal browsing makes plenty of requests; this only
// stops a script from hammering the API).
app.use("/api/listings", publicApiLimiter, cacheControl(60), listingRoutes);
app.use("/api/projects", publicApiLimiter, cacheControl(60), projectRoutes);
app.use("/api/services", publicApiLimiter, cacheControl(300), serviceRoutes); // services change rarely - cache longer
app.use("/api/team", publicApiLimiter, cacheControl(300), teamRoutes);
app.use("/api/testimonials", publicApiLimiter, cacheControl(300), testimonialRoutes);
app.use("/api/blog", publicApiLimiter, cacheControl(60), blogRoutes);
app.use("/api/partners", publicApiLimiter, cacheControl(300), partnerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/inspections", inspectionRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// More route groups will be mounted here in later sections.

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
