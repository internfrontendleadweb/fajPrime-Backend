// This module is the single seam between the frontend and the backend.
// Every function here calls the real Express API instead of local mock
// data — return shapes are kept identical to what the mock version
// returned, so page components consume it exactly the same way.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

function toQueryString(params = {}) {
  const usable = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ""
  );
  if (usable.length === 0) return "";
  return "?" + new URLSearchParams(usable).toString();
}

export const api = {
  // limit=100 fetches the full matching set — pages currently do their
  // own client-side pagination/sorting rather than server-side.
  getListings: async (filters = {}) => {
    const qs = toQueryString({ ...filters, limit: 100 });
    const result = await request(`/listings${qs}`);
    return result?.data || [];
  },
  getListingBySlug: (slug) => request(`/listings/${slug}`),
  getAgents: () => request(`/listings/agents`),

  getProjects: (status) => request(`/projects${toQueryString({ status })}`),
  getProjectBySlug: (slug) => request(`/projects/${slug}`),

  getServices: () => request(`/services`),
  getServiceBySlug: (slug) => request(`/services/${slug}`),

  getTeam: () => request(`/team`),

  getBlogPosts: async (filters = {}) => {
    const qs = toQueryString({ ...filters, limit: 100 });
    const result = await request(`/blog${qs}`);
    return result?.data || [];
  },
  getBlogPostBySlug: (slug) => request(`/blog/${slug}`),

  getTestimonials: () => request(`/testimonials`),
  getPartners: () => request(`/partners`),

  // Form submission endpoints are built in Section 4 — these still
  // simulate success for now so the forms remain functional in the UI.
  submitContactForm: (payload) =>
    new Promise((resolve) => setTimeout(() => resolve({ success: true, payload }), 800)),
  submitInspectionBooking: (payload) =>
    new Promise((resolve) => setTimeout(() => resolve({ success: true, payload }), 800)),
  subscribeNewsletter: (email) =>
    new Promise((resolve) => setTimeout(() => resolve({ success: true, email }), 500)),
};
