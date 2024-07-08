import { expect, it } from "vitest";
import { refkey } from "../src/refkey.js";

it("is stable when called with same values", () => {
  const obj = {};

  const key1 = refkey(obj);
  const key2 = refkey(obj);
  expect(key1).toBe(key2);
});

it("supports primitive values", () => {
  const key1 = refkey("hi");
  const key2 = refkey("hi");
  expect(key1).toBe(key2);
});

it("composes multiple keys", () => {
  const obj1 = {};
  const obj2 = {};

  const key1 = refkey(obj1, obj2, "hi");
  const key2 = refkey(obj1, obj2, "hi");

  expect(key1).toBe(key2);
});
