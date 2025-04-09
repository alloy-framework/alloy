import { Props, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { StatementList } from "../../core/src/components/StatementList.jsx";
import { ArrowFunction } from "../src/components/ArrowFunction.jsx";
import { VarDeclaration } from "../src/index.js";
import { ParameterDescriptor } from "../src/parameter-descriptor.js";
import { toSourceText } from "./utils.jsx";

it("create basic function", () => {
  expect(toSourceText(<ArrowFunction />)).toBe(d`
        () => {}
    `);
});

it("can be an async function", () => {
  expect(toSourceText(<ArrowFunction async />)).toBe(d`
    async () => {}
  `);
});

it("can be an async with returnType", () => {
  expect(toSourceText(<ArrowFunction async returnType="Foo" />)).toBe(d`
    async (): Promise<Foo> => {}
  `);
});

it("can be an async with returnType element", () => {
  function Foo(_props?: Props) {
    return <>Foo</>;
  }
  expect(toSourceText(<ArrowFunction async returnType={<Foo />} />)).toBe(d`
    async (): Promise<Foo> => {}
  `);
});

it("supports parameters by element", () => {
  const decl = (
    <ArrowFunction>
      return a + b;
      <ArrowFunction.Parameters>a, b</ArrowFunction.Parameters>
    </ArrowFunction>
  );

  expect(toSourceText(decl)).toBe(d`
    (a, b) => {
      return a + b;
    }
  `);
});

it("supports type parameters by descriptor object", () => {
  const decl = (
    <ArrowFunction
      typeParameters={[
        { name: "a", extends: "any" },
        { name: "b", extends: "any" },
      ]}
    ></ArrowFunction>
  );

  expect(toSourceText(decl)).toBe(d`
    <a extends any, b extends any>() => {}
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = <ArrowFunction typeParameters={["a", "b"]}></ArrowFunction>;

  expect(toSourceText(decl)).toBe(d`
    <a, b>() => {}
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <ArrowFunction>
      <ArrowFunction.TypeParameters>a, b</ArrowFunction.TypeParameters>
    </ArrowFunction>
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
        <ArrowFunction>
          <StatementList>
            {innerRefkey}
            <VarDeclaration name="refme" refkey={innerRefkey}>
              1
            </VarDeclaration>
          </StatementList>
        </ArrowFunction>
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
        <ArrowFunction>
          <VarDeclaration name="refme" refkey={innerRefkey}>
            1
          </VarDeclaration>
        </ArrowFunction>
        ;{innerRefkey}
      </>
    );
    expect(() => toSourceText(decl)).toThrow(/Cannot reference a symbol/);
  });

  it("creates symbols for parameters", () => {
    const rk = refkey();

    const decl = (
      <>
        <ArrowFunction parameters={[{ name: "sym", type: "any", refkey: rk }]}>
          <ArrowFunction>{rk}</ArrowFunction>
        </ArrowFunction>
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
        <ArrowFunction parameters={[{ name: "conflict", type: "any" }]}>
          <VarDeclaration name="conflict">1</VarDeclaration>;
        </ArrowFunction>
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
        <ArrowFunction parameters={[paramDesc]}>
          console.log(foo);
        </ArrowFunction>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      (foo?: any) => {
        console.log(foo);
      }
    `);
  });
});
