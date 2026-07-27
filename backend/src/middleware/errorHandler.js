// Two pieces of middleware that go at the very END of the middleware
// chain in app.js (order matters in Express — these must be last).

// 1. Catches requests to routes that don't exist (e.g. /api/typo)
export function notFound(req, res, next) {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// 2. Catches any error thrown/passed via next(err) anywhere in the app.
// This is why every controller should wrap its logic in try/catch and
// call next(err) on failure, rather than letting the server crash.
export function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const status = err.status || 500;
  const message =
    status === 500 ? "Something went wrong on our end." : err.message;

  res.status(status).json({ error: message });
}
