import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ArrayExpression } from "../src/index.js";
import { toSourceText } from "./utils.js";

it("works", () => {
  expect(toSourceText(<ArrayExpression jsValue={[1,2,3]} />)).toBe(d`
      [
        1,
        2,
        3
      ]
    `);
});
