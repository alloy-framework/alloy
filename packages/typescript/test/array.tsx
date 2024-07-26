import { expect, it } from "vitest";
import { ArrayExpression } from "../src/index.js";
import { toSourceText } from "./utils.js";
import { d } from "@alloy-js/core/testing";

it("works", () => {
  expect(toSourceText(<ArrayExpression jsValue={[1,2,3]} />))
    .toBe(d`
      [
        1,
        2,
        3
      ]
    `);
});