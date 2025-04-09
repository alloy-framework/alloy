import { Props, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { StatementList } from "../../core/src/components/StatementList.jsx";
import { FunctionArrowExpression } from "../src/components/FunctionArrowExpression.jsx";
import { VarDeclaration } from "../src/index.js";
import { ParameterDescriptor } from "../src/parameter-descriptor.js";
import { toSourceText } from "./utils.jsx";

it("create basic function", () => {
  expect(toSourceText(<FunctionArrowExpression />)).toBe(d`
        () => {}
    `);
});

it("can be an async function", () => {
  expect(toSourceText(<FunctionArrowExpression async />)).toBe(d`
    async () => {}
  `);
});

it("can be an async with returnType", () => {
  expect(toSourceText(<FunctionArrowExpression async returnType="Foo" />))
    .toBe(d`
    async (): Promise<Foo> => {}
  `);
});

it("can be an async with returnType element", () => {
  function Foo(_props?: Props) {
    return <>Foo</>;
  }
  expect(toSourceText(<FunctionArrowExpression async returnType={<Foo />} />))
    .toBe(d`
    async (): Promise<Foo> => {}
  `);
});

it("supports parameters by element", () => {
  const decl = (
    <FunctionArrowExpression>
      return a + b;
      <FunctionArrowExpression.Parameters>
        a, b
      </FunctionArrowExpression.Parameters>
    </FunctionArrowExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    (a, b) => {
      return a + b;
    }
  `);
});

it("supports type parameters by descriptor object", () => {
  const decl = (
    <FunctionArrowExpression
      typeParameters={[
        { name: "a", extends: "any" },
        { name: "b", extends: "any" },
      ]}
    ></FunctionArrowExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    <a extends any, b extends any>() => {}
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = (
    <FunctionArrowExpression
      typeParameters={["a", "b"]}
    ></FunctionArrowExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    <a, b>() => {}
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <FunctionArrowExpression>
      <FunctionArrowExpression.TypeParameters>
        a, b
      </FunctionArrowExpression.TypeParameters>
    </FunctionArrowExpression>
  );

  expect(toSourceText(decl)).toBe(d`
    <a, b>() => {}
  `);
});

describe("symbols", () => {
  it("creates a nested scope", () => {
    const innerRefkey = refkey();
    const outerRefkey = refkey();
    const decl = (
      <StatementList>
        <FunctionArrowExpression>
          <StatementList>
            {innerRefkey}
            <VarDeclaration name="refme" refkey={innerRefkey}>
              1
            </VarDeclaration>
          </StatementList>
        </FunctionArrowExpression>
        <VarDeclaration name="refme" refkey={outerRefkey}>
          2
        </VarDeclaration>
        {outerRefkey}
      </StatementList>
    );
    expect(toSourceText(decl)).toBe(d`
      () => {
        refme;
        const refme = 1;
      };
      const refme = 2;
      refme;
    `);
  });

  it("throws an error when trying to access a symbol in a nested scope", () => {
    const innerRefkey = refkey();
    const decl = (
      <>
        <FunctionArrowExpression>
          <VarDeclaration name="refme" refkey={innerRefkey}>
            1
          </VarDeclaration>
        </FunctionArrowExpression>
        ;{innerRefkey}
      </>
    );
    expect(() => toSourceText(decl)).toThrow(/Cannot reference a symbol/);
  });

  it("creates symbols for parameters", () => {
    const rk = refkey();

    const decl = (
      <>
        <FunctionArrowExpression
          parameters={[{ name: "sym", type: "any", refkey: rk }]}
        >
          <FunctionArrowExpression>{rk}</FunctionArrowExpression>
        </FunctionArrowExpression>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      (sym: any) => {
        () => {
          sym
        }
      }
    `);
  });

  it("creates symbols for parameters and addresses conflicts", () => {
    const decl = (
      <>
        <FunctionArrowExpression
          parameters={[{ name: "conflict", type: "any" }]}
        >
          <VarDeclaration name="conflict">1</VarDeclaration>;
        </FunctionArrowExpression>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      (conflict: any) => {
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
        <FunctionArrowExpression parameters={[paramDesc]}>
          console.log(foo);
        </FunctionArrowExpression>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      (foo?: any) => {
        console.log(foo);
      }
    `);
  });
});

