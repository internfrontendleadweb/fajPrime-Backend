import { isCloudinaryConfigured } from "../config/cloudinary.js";
import { uploadBuffer, resolveFolder } from "../utils/cloudinaryUpload.js";
import { prisma } from "../config/db.js";
import { removeTrackedAssetIfUnused } from "../utils/mediaAssets.js";

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
  await prisma.mediaAsset.create({ data: { url: result.secure_url, publicId: result.public_id } });

  res.status(201).json({
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  });
};

// DELETE /api/admin/upload/:publicId only deletes a tracked, currently unused
// asset. It cannot be used to remove arbitrary Cloudinary files.
export const deleteImage = async (req, res) => {
  if (!isCloudinaryConfigured) {
    return res.status(503).json({ error: "Image upload isn't configured yet." });
  }

  const deleted = await removeTrackedAssetIfUnused({ publicId: decodeURIComponent(req.params.publicId) });
  if (!deleted) return res.status(409).json({ error: "This image is still in use or is not managed by this application." });

  res.status(204).send();
};
