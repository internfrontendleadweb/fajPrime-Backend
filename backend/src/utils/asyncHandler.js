// Wraps an async route handler so any thrown error / rejected promise
// automatically gets passed to next(err) -> our errorHandler middleware,
// instead of crashing the server or needing try/catch in every controller.
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
