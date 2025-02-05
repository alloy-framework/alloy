import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { jsonTest } from "./utils.jsx";

it("renders empty arrays", () => {
  const template = jsonTest([]);

  expect(template).toRenderTo(`[]`);
});

it("renders arrays", () => {
  const template = jsonTest([1, "hello"]);

  expect(template).toRenderTo(`
    [
      1,
      "hello"
    ]
  `);
});

it("renders nested arrays", () => {
  const template = jsonTest([1, ["hello"]]);

  expect(template).toRenderTo(`
    [
      1,
      ["hello"]
    ]
  `);
});
