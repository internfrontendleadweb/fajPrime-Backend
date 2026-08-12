import { prisma } from "../config/db.js";
import { isCloudinaryConfigured } from "../config/cloudinary.js";
import { deleteByPublicId } from "./cloudinaryUpload.js";

const imageFields = [
  ["listing", "images"],
  ["project", "images"],
  ["teamMember", "image"],
  ["testimonial", "image"],
  ["blogPost", "image"],
  ["partner", "logo"],
  ["agent", "photo"],
];

async function isUrlReferenced(url) {
  const checks = imageFields.map(([modelName, field]) => {
    const model = prisma[modelName];
    const where = field === "images" ? { [field]: { has: url } } : { [field]: url };
    return model.count({ where });
  });
  return (await Promise.all(checks)).some(Boolean);
}

// This is deliberately best-effort and runs only after database writes have
// succeeded. A Cloudinary outage never makes a content update/delete fail.
export async function removeTrackedAssetIfUnused({ url, publicId }) {
  const asset = publicId
    ? await prisma.mediaAsset.findUnique({ where: { publicId } })
    : await prisma.mediaAsset.findUnique({ where: { url } });
  if (!asset || await isUrlReferenced(asset.url)) return false;

  if (!isCloudinaryConfigured) return false;
  const result = await deleteByPublicId(asset.publicId);
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary rejected deletion for tracked asset ${asset.publicId}`);
  }

  await prisma.mediaAsset.delete({ where: { id: asset.id } });
  return true;
}

export async function removeTrackedUrlsIfUnused(urls) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  const results = await Promise.allSettled(uniqueUrls.map((url) => removeTrackedAssetIfUnused({ url })));
  results.forEach((result, index) => {
    if (result.status === "rejected") console.error(`Unable to remove unused tracked asset: ${uniqueUrls[index]}`, result.reason);
  });
}
