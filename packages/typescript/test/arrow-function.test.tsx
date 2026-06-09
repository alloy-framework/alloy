import { Props, refkey, render, StatementList } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { ArrowFunction } from "../src/components/ArrowFunction.jsx";
import { VarDeclaration } from "../src/index.js";
import { ParameterDescriptor } from "../src/parameter-descriptor.js";
import { TestFile } from "./utils.js";

it("create basic function", () => {
  expect(
    <TestFile>
      <ArrowFunction />
    </TestFile>,
  ).toRenderTo(`
        () => {}
    `);
});

it("can be an async function", () => {
  expect(
    <TestFile>
      <ArrowFunction async />
    </TestFile>,
  ).toRenderTo(`
    async () => {}
  `);
});

it("can be an async with returnType", () => {
  expect(
    <TestFile>
      <ArrowFunction async returnType="Foo" />
    </TestFile>,
  ).toRenderTo(`
    async (): Promise<Foo> => {}
  `);
});

it("can be an async with returnType element", () => {
  function Foo(_props?: Props) {
    return <>Foo</>;
  }
  expect(
    <TestFile>
      <ArrowFunction async returnType={<Foo />} />
    </TestFile>,
  ).toRenderTo(`
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

  expect(<TestFile>{decl}</TestFile>).toRenderTo(`
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

  expect(<TestFile>{decl}</TestFile>).toRenderTo(`
    <a extends any, b extends any>() => {}
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = <ArrowFunction typeParameters={["a", "b"]}></ArrowFunction>;

  expect(<TestFile>{decl}</TestFile>).toRenderTo(`
    <a, b>() => {}
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <ArrowFunction>
      <ArrowFunction.TypeParameters>a, b</ArrowFunction.TypeParameters>
    </ArrowFunction>
  );

  expect(<TestFile>{decl}</TestFile>).toRenderTo(`
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
    expect(<TestFile>{decl}</TestFile>).toRenderTo(`
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
    expect(() =>
      render(<TestFile>{decl}</TestFile>, { insertFinalNewLine: false }),
    ).toThrow(/Cannot reference a symbol/);
  });

  it("creates symbols for parameters", () => {
    const rk = refkey();

    const decl = (
      <ArrowFunction parameters={[{ name: "sym", type: "any", refkey: rk }]}>
        <ArrowFunction>{rk}</ArrowFunction>
      </ArrowFunction>
    );

    expect(<TestFile>{decl}</TestFile>).toRenderTo(`
      (sym: any) => {
        () => {
          sym
        }
      }
    `);
  });

  it("creates symbols for parameters and addresses conflicts", () => {
    const decl = (
      <ArrowFunction parameters={[{ name: "conflict", type: "any" }]}>
        <VarDeclaration name="conflict">1</VarDeclaration>;
      </ArrowFunction>
    );

    expect(<TestFile>{decl}</TestFile>).toRenderTo(`
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
      <ArrowFunction parameters={[paramDesc]}>console.log(foo);</ArrowFunction>
    );

    expect(<TestFile>{decl}</TestFile>).toRenderTo(`
      (foo?: any) => {
        console.log(foo);
      }
    `);
  });

  it("create rest parameters", () => {
    const paramDesc: ParameterDescriptor = {
      name: "foo",
      refkey: refkey(),
      type: "any[]",
      rest: true,
    };
    const decl = (
      <ArrowFunction parameters={[paramDesc]}>console.log(foo);</ArrowFunction>
    );

    expect(<TestFile>{decl}</TestFile>).toRenderTo(`
      (...foo: any[]) => {
        console.log(foo);
      }
    `);
  });
});
