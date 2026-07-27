// This module is the single seam where mock data gets swapped for real API calls.
// Every function currently resolves from local /src/data files, but the async
// shape is identical to what a real fetch() call would return, so page
// components never need to change when a backend is introduced.

import { listings } from "../data/listings";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { team } from "../data/team";
import { blogPosts } from "../data/blogPosts";
import { testimonials } from "../data/testimonials";
import { partners } from "../data/partners";

const simulateDelay = (data, ms = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const api = {
  getListings: (filters = {}) => simulateDelay(applyListingFilters(listings, filters)),
  getListingBySlug: (slug) => simulateDelay(listings.find((l) => l.slug === slug) || null),

  getProjects: (status) =>
    simulateDelay(status ? projects.filter((p) => p.status === status) : projects),
  getProjectBySlug: (slug) => simulateDelay(projects.find((p) => p.slug === slug) || null),

  getServices: () => simulateDelay(services),
  getServiceBySlug: (slug) => simulateDelay(services.find((s) => s.slug === slug) || null),

  getTeam: () => simulateDelay(team),

  getBlogPosts: () => simulateDelay(blogPosts),
  getBlogPostBySlug: (slug) => simulateDelay(blogPosts.find((b) => b.slug === slug) || null),

  getTestimonials: () => simulateDelay(testimonials),
  getPartners: () => simulateDelay(partners),

  submitContactForm: (payload) => simulateDelay({ success: true, payload }, 800),
  submitInspectionBooking: (payload) => simulateDelay({ success: true, payload }, 800),
  subscribeNewsletter: (email) => simulateDelay({ success: true, email }, 500),
};

function applyListingFilters(data, filters) {
  return data.filter((item) => {
    if (filters.location && item.location !== filters.location) return false;
    if (filters.type && item.type !== filters.type) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.bedrooms && item.bedrooms < Number(filters.bedrooms)) return false;
    if (filters.minPrice && item.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && item.price > Number(filters.maxPrice)) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !item.location.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });
}
