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
