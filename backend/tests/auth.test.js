import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { createTestAdmin, deleteTestAdmin } from "./setup.js";

describe("Auth flow", () => {
  let testAdmin;

  beforeAll(async () => {
    testAdmin = await createTestAdmin();
  });

  afterAll(async () => {
    await deleteTestAdmin(testAdmin.admin.id);
  });

  it("rejects login with a wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testAdmin.email, password: "WrongPassword" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid email or password");
  });

  it("rejects login for an email that doesn't exist, with the SAME error message as a wrong password", async () => {
    // Deliberately checking this stays vague both ways - a different
    // message here would let an attacker enumerate valid admin emails.
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody-real@example.com", password: "whatever" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("Invalid email or password");
  });

  it("logs in successfully with correct credentials and sets a session cookie", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testAdmin.email, password: testAdmin.password });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.admin.email).toBe(testAdmin.email);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("rejects GET /api/auth/me with no cookie at all", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("rejects GET /api/auth/me with a garbage/tampered cookie", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Cookie", "faj_prime_session=not-a-real-token");
    expect(res.status).toBe(401);
  });

  it("returns the correct admin info from GET /api/auth/me when logged in", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: testAdmin.email, password: testAdmin.password });
    const cookie = loginRes.headers["set-cookie"];

    const meRes = await request(app).get("/api/auth/me").set("Cookie", cookie);

    expect(meRes.status).toBe(200);
    expect(meRes.body.admin.id).toBe(testAdmin.admin.id);
    expect(meRes.body.admin.email).toBe(testAdmin.email);
  });

  it("logout clears the session so a subsequent /me call is rejected", async () => {
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: testAdmin.email, password: testAdmin.password });
    const cookie = loginRes.headers["set-cookie"];

    const logoutRes = await request(app).post("/api/auth/logout").set("Cookie", cookie);
    expect(logoutRes.status).toBe(200);

    // The cookie the browser now holds after logout is the CLEARED
    // one from the logout response, not the original login cookie -
    // simulate that correctly rather than reusing the old cookie.
    const clearedCookie = logoutRes.headers["set-cookie"];
    const meRes = await request(app).get("/api/auth/me").set("Cookie", clearedCookie);
    expect(meRes.status).toBe(401);
  });
});
