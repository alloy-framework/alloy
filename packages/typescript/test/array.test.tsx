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

it("renders a falsy jsValue", () => {
  expect(
    toSourceText(<ArrayExpression jsValue={[undefined]}></ArrayExpression>),
  ).toBe(d`
    [undefined]
  `);
});

it("renders a falsy jsValue with no leading comma", () => {
  expect(toSourceText(<ArrayExpression jsValue={[null]}></ArrayExpression>))
    .toBe(d`
    [null]
  `);
});

it("renders a falsy jsValue and children", () => {
  expect(
    toSourceText(<ArrayExpression jsValue={[false]}>"Hello"</ArrayExpression>),
  ).toBe(d`
    [false, "Hello"]
  `);
});

it("renders a falsy jsValue but not invisible children", () => {
  expect(
    toSourceText(
      <ArrayExpression jsValue={[false]}>
        {null}
        {undefined}
      </ArrayExpression>,
    ),
  ).toBe(d`
    [false]
  `);
});

it("renders a falsy jsValue and visible children", () => {
  expect(
    toSourceText(<ArrayExpression jsValue={[false]}>"Hello"</ArrayExpression>),
  ).toBe(d`
    [false, "Hello"]
  `);
});

it("renders a falsy jsValue and visible falsy children", () => {
  expect(
    toSourceText(<ArrayExpression jsValue={[false]}>false</ArrayExpression>),
  ).toBe(d`
      [false, false]
    `);
});

it("renders a falsy jsValue but not invisible falsy children", () => {
  expect(
    toSourceText(<ArrayExpression jsValue={[false]}>{false}</ArrayExpression>),
  ).toBe(d`
      [false]
    `);
});
