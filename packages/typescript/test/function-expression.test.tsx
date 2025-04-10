import { Props, refkey, StatementList } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { FunctionExpression } from "../src/components/FunctionExpression.jsx";
import { VarDeclaration } from "../src/index.js";
import { ParameterDescriptor } from "../src/parameter-descriptor.js";
import { toSourceText } from "./utils.jsx";

it("create basic function", () => {
  expect(toSourceText(<FunctionExpression />)).toBe(d`
      function () {}
    `);
});

it("can be an async function", () => {
  expect(toSourceText(<FunctionExpression async />)).toBe(d`
    async function () {}
  `);
});

it("can be an async function with returnType", () => {
  expect(toSourceText(<FunctionExpression async returnType="Foo" />)).toBe(d`
    async function (): Promise<Foo> {}
  `);
});

it("can be an async function with returnType element", () => {
  function Foo(_props?: Props) {
    return <>Foo</>;
  }
  expect(toSourceText(<FunctionExpression async returnType={<Foo />} />))
    .toBe(d`
    async function (): Promise<Foo> {}
  `);
});

it("supports parameters by element", () => {
  const decl = (
    <FunctionExpression>
      return a + b;
      <FunctionExpression.Parameters>a, b</FunctionExpression.Parameters>
    </FunctionExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    function (a, b) {
      return a + b;
    }
  `);
});

it("supports type parameters by descriptor object", () => {
  const decl = (
    <FunctionExpression
      typeParameters={[
        { name: "a", extends: "any" },
        { name: "b", extends: "any" },
      ]}
    ></FunctionExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    function <a extends any, b extends any>() {}
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = (
    <FunctionExpression typeParameters={["a", "b"]}></FunctionExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    function <a, b>() {}
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <FunctionExpression>
      <FunctionExpression.TypeParameters>
        a, b
      </FunctionExpression.TypeParameters>
    </FunctionExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    function <a, b>() {}
  `);
});

describe("symbols", () => {
  it("creates a nested scope", () => {
    const innerRefkey = refkey();
    const outerRefkey = refkey();
    const decl = (
      <StatementList>
        <FunctionExpression>
          <StatementList>
            {innerRefkey}
            <VarDeclaration name="refme" refkey={innerRefkey}>
              1
            </VarDeclaration>
          </StatementList>
        </FunctionExpression>
        <VarDeclaration name="refme" refkey={outerRefkey}>
          2
        </VarDeclaration>
        {outerRefkey}
      </StatementList>
    );
    expect(toSourceText(decl)).toBe(d`
      function () {
        refme;
        const refme = 1;
      };
      const refme = 2;
      refme;
    `);
  });

  it("throws an error when trying to access a symbol in a nested function scope", () => {
    const innerRefkey = refkey();
    const decl = (
      <>
        <FunctionExpression>
          <VarDeclaration name="refme" refkey={innerRefkey}>
            1
          </VarDeclaration>
        </FunctionExpression>
        ;{innerRefkey}
      </>
    );
    expect(() => toSourceText(decl)).toThrow(/Cannot reference a symbol/);
  });

  it("creates symbols for parameters", () => {
    const rk = refkey();

    const decl = (
      <>
        <FunctionExpression
          parameters={[{ name: "sym", type: "any", refkey: rk }]}
        >
          <FunctionExpression>{rk}</FunctionExpression>
        </FunctionExpression>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function (sym: any) {
        function () {
          sym
        }
      }
    `);
  });

  it("creates symbols for parameters and addresses conflicts", () => {
    const decl = (
      <>
        <FunctionExpression parameters={[{ name: "conflict", type: "any" }]}>
          <VarDeclaration name="conflict">1</VarDeclaration>;
        </FunctionExpression>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function (conflict: any) {
        const conflict_2 = 1;
      }
    `);
  });

  it("create optional parameters", () => {
    const paramDesc: ParameterDescriptor = {
      name: "foo",
      refkey: refkey(),
      type: "any",
      optional: true,
    };
    const decl = (
      <>
        <FunctionExpression parameters={[paramDesc]}>
          console.log(foo);
        </FunctionExpression>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      function (foo?: any) {
        console.log(foo);
      }
    `);
  });
});
