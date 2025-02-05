import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { jsonTest } from "./utils.jsx";

it("renders primitives", () => {
  expect(jsonTest(true)).toRenderTo("true");
  expect(jsonTest(false)).toRenderTo("false");

  expect(jsonTest(10)).toRenderTo("10");
  expect(jsonTest(-10)).toRenderTo("-10");
  expect(jsonTest(1.314)).toRenderTo("1.314");

  expect(jsonTest("hello")).toRenderTo('"hello"');

  expect(jsonTest(null)).toRenderTo("null");
});
