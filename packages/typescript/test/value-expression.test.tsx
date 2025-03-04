import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ValueExpression } from "../src/index.js";
import { toSourceText } from "./utils.jsx";

it.each([
  [undefined, "undefined"],
  [null, "null"],
  [true, "true"],
  [false, "false"],
  [42, "42"],
  [42n, "42n"],
  ["abc", `"abc"`],
  ["a\nb\rc\\", `"a\\nb\\rc\\\\"`],
  [
    [1, 2, 3],
    d`
      [1, 2, 3]
    `,
  ],
  [
    { a: 1, b: 2, c: 3 },
    d`
      {
        a: 1,
        b: 2,
        c: 3,
      }
    `,
  ],
])("works - %o => %s", (jsValue, expectedSource) => {
  expect(toSourceText(<ValueExpression jsValue={jsValue} />)).toBe(
    expectedSource,
  );
});
