import cloudinary from "../config/cloudinary.js";

// Folders an admin is allowed to upload into — keeps the Cloudinary
// media library organized the same way as public/images/ was, and
// stops anyone from writing to an arbitrary path via a crafted request.
export const ALLOWED_FOLDERS = [
  "hero",
  "projects",
  "properties",
  "partners",
  "team",
  "blog",
];

export function resolveFolder(requested) {
  const folder = ALLOWED_FOLDERS.includes(requested) ? requested : "misc";
  return `faj-prime/${folder}`;
}

// Cloudinary's SDK wants either a file path or a stream — since our
// file lives in memory (multer's memoryStorage), we upload it via a
// stream built from that buffer, wrapped in a Promise so the rest of
// the app can just `await` it like any other async call.
export function uploadBuffer(buffer, folder) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }], // Cloudinary auto-optimizes on delivery
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

export function deleteByPublicId(publicId) {
  return cloudinary.uploader.destroy(publicId);
}
