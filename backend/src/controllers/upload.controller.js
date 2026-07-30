import { isCloudinaryConfigured } from "../config/cloudinary.js";
import { uploadBuffer, deleteByPublicId, resolveFolder } from "../utils/cloudinaryUpload.js";

// POST /api/admin/upload  (multipart/form-data, field name "image")
// Optional body/query field "folder" - one of ALLOWED_FOLDERS, falls
// back to "misc" if omitted or not recognized.
export const uploadImage = async (req, res) => {
  if (!isCloudinaryConfigured) {
    return res.status(503).json({
      error: "Image upload isn't configured yet. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env.",
    });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded. Send it as multipart/form-data under the field name 'image'." });
  }

  const folder = resolveFolder(req.body.folder || req.query.folder);
  const result = await uploadBuffer(req.file.buffer, folder);

  res.status(201).json({
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  });
};

// DELETE /api/admin/upload/:publicId
// :publicId arrives URL-encoded since Cloudinary public IDs contain
// slashes (e.g. faj-prime/properties/abc123).
export const deleteImage = async (req, res) => {
  if (!isCloudinaryConfigured) {
    return res.status(503).json({ error: "Image upload isn't configured yet." });
  }

  const publicId = decodeURIComponent(req.params.publicId);
  const result = await deleteByPublicId(publicId);

  if (result.result !== "ok" && result.result !== "not found") {
    return res.status(500).json({ error: "Failed to delete image from Cloudinary" });
  }

  res.status(204).send();
};
