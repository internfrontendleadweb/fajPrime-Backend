import {
  listingTypeMap,
  listingStatusMap,
  projectStatusMap,
  teamGroupMap,
} from "./enumMaps.js";

export function serializeListing(l) {
  return {
    id: l.id,
    slug: l.slug,
    title: l.title,
    type: listingTypeMap[l.type],
    status: listingStatusMap[l.status],
    price: l.price,
    currency: l.currency,
    location: l.location,
    bedrooms: l.bedrooms,
    bathrooms: l.bathrooms,
    parking: l.parking,
    sqm: l.sqm,
    featured: l.featured,
    agent: l.agentId, // frontend looks this up against a separate agents list
    description: l.description,
    amenities: l.amenities,
    images: l.images,
  };
}

export function serializeAgent(a) {
  return {
    id: a.id,
    name: a.name,
    role: a.role,
    phone: a.phone,
    email: a.email,
  };
}

export function serializeProject(p) {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    status: projectStatusMap[p.status],
    location: p.location,
    progress: p.progress,
    completionDate: p.completionDate,
    propertyType: p.propertyType,
    units: p.units,
    description: p.description,
    amenities: p.amenities,
    images: p.images,
  };
}

export function serializeService(s) {
  return {
    id: s.id,
    slug: s.slug,
    title: s.title,
    icon: s.icon,
    shortDescription: s.shortDescription,
    benefits: s.benefits,
    process: s.process,
    faqs: s.faqs,
  };
}

export function serializeTeamMember(t) {
  return {
    id: t.id,
    group: teamGroupMap[t.group],
    name: t.name,
    role: t.role,
    bio: t.bio,
    image: t.image,
    linkedin: t.linkedin,
  };
}

export function serializeTestimonial(t) {
  return {
    id: t.id,
    name: t.name,
    location: t.location,
    rating: t.rating,
    review: t.review,
    image: t.image,
  };
}

export function serializeBlogPost(b) {
  return {
    id: b.id,
    slug: b.slug,
    category: b.category,
    title: b.title,
    date: b.date.toISOString().slice(0, 10), // matches "2026-06-12" string format
    readTime: b.readTime,
    author: b.author,
    image: b.image,
    excerpt: b.excerpt,
    content: b.content,
  };
}

export function serializePartner(p) {
  return {
    id: p.id,
    name: p.name,
    logo: p.logo,
  };
}
