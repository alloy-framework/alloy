import { expect, it } from "vitest";
import { ArrayExpression } from "../src/index.js";
import { TestFile } from "./utils.js";

it("works", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[1, 2, 3]} />
    </TestFile>,
  ).toRenderTo(`
    [1, 2, 3]
  `);

  expect(
    <TestFile>
      <ArrayExpression jsValue={[1, 2, 3, "foo".repeat(10)]} />
    </TestFile>,
  ).toRenderTo(
    `
    [
      1,
      2,
      3,
      "foofoofoofoofoofoofoofoofoofoo"
    ]
  `,
    {
      printWidth: 20,
    },
  );
});

it("accepts children", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[1, 2, 3]}>
        <ArrayExpression jsValue={[4, 5, 6]} />
      </ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
    [1, 2, 3, [4, 5, 6]]
  `);
});

it("accepts only children", () => {
  expect(
    <TestFile>
      <ArrayExpression>
        <ArrayExpression jsValue={[4, 5, 6]} />
      </ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
    [[4, 5, 6]]
  `);
});

it("renders a falsy jsValue", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[undefined]}></ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
    [undefined]
  `);
});

it("renders a falsy jsValue with no leading comma", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[null]}></ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
    [null]
  `);
});

it("renders a falsy jsValue and children", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[false]}>"Hello"</ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
    [false, "Hello"]
  `);
});

it("renders a falsy jsValue but not invisible children", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[false]}>
        {null}
        {undefined}
      </ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
    [false]
  `);
});

it("renders a falsy jsValue and visible children", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[false]}>"Hello"</ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
    [false, "Hello"]
  `);
});

it("renders a falsy jsValue and visible falsy children", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[false]}>false</ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
      [false, false]
    `);
});

it("renders a falsy jsValue but not invisible falsy children", () => {
  expect(
    <TestFile>
      <ArrayExpression jsValue={[false]}>{false}</ArrayExpression>
    </TestFile>,
  ).toRenderTo(`
      [false]
    `);
});
