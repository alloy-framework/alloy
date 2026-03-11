import { describe, expect, it } from "vitest";

describe("@alloy-js/rust", () => {
  it("package is loadable", async () => {
    const mod = await import("@alloy-js/rust");
    expect(mod).toBeDefined();
  });
});
