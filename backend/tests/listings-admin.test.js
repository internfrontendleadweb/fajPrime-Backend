import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/config/db.js";
import { createTestAdmin, deleteTestAdmin, loginAs, runId } from "./setup.js";

describe("Admin Listings CRUD", () => {
  let testAdmin;
  let cookie;
  let createdListingId;

  beforeAll(async () => {
    testAdmin = await createTestAdmin();
    cookie = await loginAs(request, app, testAdmin.email, testAdmin.password);
  });

  afterAll(async () => {
    // Clean up the listing too, in case a test failed partway through
    // and the DELETE test never got to run.
    if (createdListingId) {
      await prisma.listing.delete({ where: { id: createdListingId } }).catch(() => {});
    }
    await deleteTestAdmin(testAdmin.admin.id);
  });

  it("rejects creating a listing with no auth cookie at all", async () => {
    const res = await request(app).post("/api/admin/listings").send({ title: "Should Fail" });
    expect(res.status).toBe(401);
  });

  it("rejects creating a listing with invalid/incomplete data", async () => {
    const res = await request(app)
      .post("/api/admin/listings")
      .set("Cookie", cookie)
      .send({ title: "Missing everything else" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
    expect(res.body.details.length).toBeGreaterThan(0);
  });

  it("creates a listing with valid data, auto-generating a slug", async () => {
    const res = await request(app)
      .post("/api/admin/listings")
      .set("Cookie", cookie)
      .send({
        title: `Test Listing ${runId}`,
        type: "Duplex",
        status: "For Sale",
        price: 50000000,
        location: "Lekki, Lagos",
        bedrooms: 3,
        bathrooms: 2,
        sqm: 200,
        description: "A test listing created by the automated test suite.",
      });

    expect(res.status).toBe(201);
    expect(res.body.slug).toBe(`test-listing-${runId}`);
    expect(res.body.type).toBe("Duplex"); // confirms enum translated back to display string
    expect(res.body.status).toBe("For Sale");

    createdListingId = res.body.id;
  });

  it("rejects an unrecognized type value with a clear 400", async () => {
    const res = await request(app)
      .post("/api/admin/listings")
      .set("Cookie", cookie)
      .send({
        title: `Bad Type Listing ${runId}`,
        type: "Mansion", // not a real type
        status: "For Sale",
        price: 1000000,
        location: "Somewhere",
        bedrooms: 1,
        bathrooms: 1,
        sqm: 50,
        description: "This should be rejected for an invalid type.",
      });

    expect(res.status).toBe(400);
    expect(res.body.details[0].field).toBe("type");
  });

  it("updates the listing and reflects the change", async () => {
    const res = await request(app)
      .put(`/api/admin/listings/${createdListingId}`)
      .set("Cookie", cookie)
      .send({ price: 75000000, featured: true });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(75000000);
    expect(res.body.featured).toBe(true);
    expect(res.body.title).toBe(`Test Listing ${runId}`); // untouched fields stay as-is
  });

  it("the updated listing is now visible via the PUBLIC read endpoint", async () => {
    const res = await request(app).get(`/api/listings/test-listing-${runId}`);
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(75000000);
  });

  it("deletes the listing", async () => {
    const res = await request(app)
      .delete(`/api/admin/listings/${createdListingId}`)
      .set("Cookie", cookie);

    expect(res.status).toBe(204);
  });

  it("the deleted listing now 404s on the public endpoint", async () => {
    const res = await request(app).get(`/api/listings/test-listing-${runId}`);
    expect(res.status).toBe(404);
  });

  it("deleting an already-deleted listing returns 404, not a crash", async () => {
    const res = await request(app)
      .delete(`/api/admin/listings/${createdListingId}`)
      .set("Cookie", cookie);

    expect(res.status).toBe(404);
    createdListingId = null; // already gone, nothing left for afterAll to clean up
  });
});
