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

  expect(toSourceText(decl)).toBe(d`
    function foo(a, b) {

    }  
  `)
});