import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Public read endpoints", () => {
  it("GET /api/health returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/listings returns a paginated list shape", async () => {
    const res = await request(app).get("/api/listings");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.meta).toHaveProperty("total");
    expect(res.body.meta).toHaveProperty("page");
  });

  it("GET /api/listings/:slug with a slug that doesn't exist returns 404", async () => {
    const res = await request(app).get("/api/listings/this-slug-does-not-exist-anywhere");
    expect(res.status).toBe(404);
  });

  it("GET /api/listings supports filtering by type without erroring", async () => {
    const res = await request(app).get("/api/listings?type=Duplex");
    expect(res.status).toBe(200);
    // Every result should actually be a Duplex, not just "didn't crash"
    for (const listing of res.body.data) {
      expect(listing.type).toBe("Duplex");
    }
  });

  it("GET /api/projects returns an array", async () => {
    const res = await request(app).get("/api/projects");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/services returns an array", async () => {
    const res = await request(app).get("/api/services");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/team returns an array", async () => {
    const res = await request(app).get("/api/team");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/testimonials returns an array", async () => {
    const res = await request(app).get("/api/testimonials");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/blog returns a paginated list shape", async () => {
    const res = await request(app).get("/api/blog");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("GET /api/partners returns an array", async () => {
    const res = await request(app).get("/api/partners");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("an unknown route returns a clean 404, not a crash", async () => {
    const res = await request(app).get("/api/this-route-does-not-exist");
    expect(res.status).toBe(404);
  });
});
