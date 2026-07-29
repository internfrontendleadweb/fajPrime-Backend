// Generic middleware factory: pass it a Zod schema, get back an Express
// middleware that validates req.body against it. On success, req.body
// is replaced with the parsed/coerced data (e.g. preferredDate becomes
// a real Date object instead of a string). On failure, responds 400
// with a clear, field-by-field error list instead of a stack trace.
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return res.status(400).json({ error: "Validation failed", details: errors });
    }

    req.body = result.data;
    next();
  };
}
