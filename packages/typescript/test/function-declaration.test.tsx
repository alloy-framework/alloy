import { Props, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import {
  FunctionDeclaration,
  ParameterDescriptor,
  VarDeclaration,
} from "../src/index.js";
import { toSourceText } from "./utils.js";

it("works", () => {
  expect(toSourceText(<FunctionDeclaration name="foo" />)).toBe(d`
      function foo() {
        
      }
    `);
});

it("can be exported", () => {
  expect(toSourceText(<FunctionDeclaration export name="foo" />)).toBe(d`
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

it("can be an async function", () => {
  expect(toSourceText(<FunctionDeclaration async export name="foo" />)).toBe(d`
    export async function foo() {
      
    }
  `);
});

it("can be an async function with returnType", () => {
  expect(
    toSourceText(
      <FunctionDeclaration async export name="foo" returnType="Foo"/>,
    ),
  ).toBe(d`
    export async function foo(): Promise<Foo> {
      
    }
  `);
});

it("can be an async function with returnType element", () => {
  function Foo(_props?: Props) {
    return <>Foo</>;
  }
  expect(
    toSourceText(
      <FunctionDeclaration async export name="foo" returnType={<Foo />}/>,
    ),
  ).toBe(d`
    export async function foo(): Promise<Foo> {
      
    }
  `);
});

it("supports parameters by element", () => {
  const decl =
    <FunctionDeclaration name="foo">
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
  `);
});

describe("symbols", () => {
  it("creates a nested scope", () => {
    const innerRefkey = refkey();
    const outerRefkey = refkey();
    const decl =
      <>
        <FunctionDeclaration name="foo">
          {innerRefkey}
          <VarDeclaration name="refme" refkey={innerRefkey}>1</VarDeclaration>
        </FunctionDeclaration>;
        <VarDeclaration name="refme" refkey={outerRefkey}>2</VarDeclaration>
        {outerRefkey}
      </>;
    expect(toSourceText(decl)).toBe(d`
      function foo() {
        refme
        const refme = 1;
      };
      const refme = 2;
      refme
    `);
  });

  it("throws an error when trying to access a symbol in a nested function scope", () => {
    const innerRefkey = refkey();
    const decl =
      <>
        <FunctionDeclaration name="foo">
          <VarDeclaration name="refme" refkey={innerRefkey}>1</VarDeclaration>
        </FunctionDeclaration>;
        {innerRefkey}
      </>;
    expect(() => toSourceText(decl)).toThrow(/Cannot reference a symbol/);
  });

  it("creates symbols for parameters", () => {
    const rk = refkey();

    const decl =
      <>
        <FunctionDeclaration name="foo" parameters={[["sym", { type: "any", refkey: rk }]]}>
          <FunctionDeclaration name="bar">
            {rk}
          </FunctionDeclaration>
        </FunctionDeclaration>
      </>;

    expect(toSourceText(decl)).toBe(d`
      function foo(sym: any) {
        function bar() {
          sym
        }
      }
    `);
  });

  it("creates symbols for parameters and addresses conflicts", () => {
    const decl =
      <>
        <FunctionDeclaration name="foo" parameters={[["conflict", "any"]]}>
          <VarDeclaration name="conflict">1</VarDeclaration>
        </FunctionDeclaration>
      </>;

    expect(toSourceText(decl)).toBe(d`
      function foo(conflict: any) {
        const conflict_2 = 1;
      }
    `);
  });

  it("create optional parameters", () => {
    const paramDesc: ParameterDescriptor = {
      refkey: refkey(),
      type: "any",
      optional: true,
    };
    const decl =
      <>
        <FunctionDeclaration name="foo" parameters={[["foo", paramDesc]]}>
          console.log(foo);
        </FunctionDeclaration>
      </>;

    expect(toSourceText(decl)).toBe(d`
      function foo(foo?: any) {
        console.log(foo);
      }
    `);
  });
});
