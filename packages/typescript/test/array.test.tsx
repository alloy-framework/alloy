import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { ArrayExpression } from "../src/index.js";
import { toSourceText } from "./utils.js";

it("works", () => {
  expect(toSourceText(<ArrayExpression jsValue={[1, 2, 3]} />)).toBe(d`
    [1, 2, 3]
  `);

  expect(
    toSourceText(<ArrayExpression jsValue={[1, 2, 3, "foo".repeat(10)]} />, {
      printWidth: 20,
    }),
  ).toBe(d`
    [
      1,
      2,
      3,
      "foofoofoofoofoofoofoofoofoofoo"
    ]
  `);
});

it("accepts children", () => {
  expect(
    toSourceText(
      <ArrayExpression jsValue={[1, 2, 3]}>
        <ArrayExpression jsValue={[4, 5, 6]} />
      </ArrayExpression>,
    ),
  ).toBe(d`
    [1, 2, 3, [4, 5, 6]]
  `);
});

it("accepts only children", () => {
  expect(
    toSourceText(
      <ArrayExpression>
        <ArrayExpression jsValue={[4, 5, 6]} />
      </ArrayExpression>,
    ),
  ).toBe(d`
    [[4, 5, 6]]
  `);
});
