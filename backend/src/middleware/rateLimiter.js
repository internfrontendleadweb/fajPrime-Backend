import rateLimit from "express-rate-limit";

// Public write endpoints (forms anyone on the internet can hit) are the
// single most common target for spam bots. This limits each IP to a
// small number of submissions per window — generous enough that a real
// visitor filling out a form twice by mistake is never blocked, tight
// enough to stop a script from hammering the endpoint.
export const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions from this device. Please try again later." },
});

// Login attempts get their own, slightly more generous limiter (typos
// happen) but this is still the single most important endpoint to
// rate-limit — it's the #1 brute-force target on any site with an
// admin panel.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again in 15 minutes." },
});

// A general limiter for public read traffic (listings, blog, etc.) —
// much more generous than the write/login limiters since normal
// browsing legitimately makes many requests, but still stops a script
// from hammering the API with thousands of requests a minute.
export const publicApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please slow down and try again shortly." },
});
