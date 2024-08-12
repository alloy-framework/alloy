import { expect, it } from "vitest";
import { ArrayExpression, FunctionDeclaration } from "../src/index.js";
import { toSourceText } from "./utils.js";
import { d } from "@alloy-js/core/testing";

it("works", () => {
  expect(toSourceText(<FunctionDeclaration name="foo" />))
    .toBe(d`
      function foo() {
        
      }
    `);
});

it("can be exported", () => {
  expect(toSourceText(<FunctionDeclaration export name="foo" />))
    .toBe(d`
      export function foo() {
        
      }
    `);
});

it("can be a default export", () => {
  expect(toSourceText(<FunctionDeclaration export default name="foo" />))
    .toBe(d`
      export default function foo() {
        
      }
    `);
});

it("can be a default export", () => {
  expect(toSourceText(<FunctionDeclaration export default name="foo" />))
    .toBe(d`
      export default function foo() {
        
      }
    `);
});

it("supports parameters by element", () => {
  const decl = <FunctionDeclaration name="foo">
    return a + b;
    <FunctionDeclaration.Parameters>a, b</FunctionDeclaration.Parameters>
  </FunctionDeclaration>;

  // there is an extra line break here because the return statement ends in a
  // line break, which is not significant but we don't know that at transform
  // time. Ideally the renderer would take care of this - I think it's the same
  // problem as handling removal of linebreaks when the only contents of a line
  // are something undefined, e.g. how
  // 
  // <>a
  // {undefined}
  // b</>
  // 
  // should render to
  //
  // a
  // b
  //
  // so in principle this can be fixed later.
  expect(toSourceText(decl)).toBe(d`
    function foo(a, b) {
      return a + b;

    }
  `)
});