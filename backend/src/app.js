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

// More route groups (listings, projects, blog, auth, etc.) will be
// mounted here in later sections, e.g.:
// app.use("/api/listings", listingRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
