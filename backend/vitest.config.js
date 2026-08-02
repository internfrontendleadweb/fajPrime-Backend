import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // These tests share one real database rather than mocking Prisma.
    // Running test FILES in parallel (Vitest's default) would mean
    // multiple files hitting the same database at the same time,
    // which risks flaky results even though each file's own tests are
    // written to run in order. Forcing everything sequential trades a
    // little speed for tests that are reliably reproducible.
    fileParallelism: false,
    testTimeout: 15000, // real DB calls are slower than in-memory mocks
  },
});
