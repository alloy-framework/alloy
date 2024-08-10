import { expect, it } from "vitest";
import * as jv from "../src/components/index.js";
import "@alloy-js/core/testing";

it("renders string value", () => {
  expect(<jv.Value value={"Test"} />).toRenderTo("\"Test\"");
});

it("renders null/undefined object", () => {
  expect(<jv.Value value={undefined} />).toRenderTo("null");
});

it("renders number", () => {
  expect(<jv.Value value={123} />).toRenderTo("123");
});

it("renders boolean", () => {
  expect(<jv.Value value={true} />).toRenderTo("true");
});

it("renders other objects", () => {
  function Test() {
    return <>
      Test
    </>
  }

  expect(<jv.Value value={Test} />).toRenderTo("Test");
});
