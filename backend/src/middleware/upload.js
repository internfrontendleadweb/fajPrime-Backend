import multer from "multer";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB - generous for a raw phone photo, still sane

// Memory storage: the file lives briefly in RAM as a Buffer, never
// touches this server's disk. We stream that buffer straight to
// Cloudinary and discard it — Render's filesystem is ephemeral anyway
// (wiped on every redeploy), so saving files locally would just lose
// them the next time the service restarts.
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    return cb(new Error(`Unsupported file type: ${file.mimetype}. Use JPEG, PNG, WebP, or AVIF.`));
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
});

// Multer's own errors (file too large, too many files) come through
// as a special error type that needs its own handling — a generic
// try/catch in the controller won't format these nicely on its own.
export function handleUploadError(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large. Maximum size is 8MB." });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
}
