// Turns a title into a URL-safe slug, e.g. "Luxury 5-Bedroom Duplex!"
// -> "luxury-5-bedroom-duplex". Used whenever an admin creates content
// without manually specifying a slug.
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // strip anything that isn't a letter, number, space, or hyphen
    .replace(/[\s_]+/g, "-") // spaces/underscores -> hyphens
    .replace(/-+/g, "-") // collapse repeated hyphens
    .replace(/^-|-$/g, ""); // trim leading/trailing hyphens
}

// If "luxury-duplex" is already taken, tries "luxury-duplex-2",
// "luxury-duplex-3", etc. until it finds one that's free.
export async function ensureUniqueSlug(prismaModel, baseSlug, excludeId = null) {
  let slug = baseSlug;
  let counter = 2;

  while (true) {
    const existing = await prismaModel.findUnique({ where: { slug } });
    if (!existing || existing.id === excludeId) {
      return slug;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}
