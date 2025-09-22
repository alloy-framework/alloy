import { code, namekey, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.js";

describe("FunctionDeclaration", () => {
  it("renders a function with no body as 'pass'", () => {
    const result = toSourceText([<py.FunctionDeclaration name="foo" />]);
    expect(result).toRenderTo(d`
      def foo():
          pass

        
    `);
  });

  it("takes a namekey", () => {
    const result = toSourceText([
      <py.FunctionDeclaration name={namekey("foo-bar")} />,
    ]);
    expect(result).toRenderTo(d`
      def foo_bar():
          pass


    `);
  });

  it("renders a function with no body as 'pass' with return type", () => {
    const result = toSourceText([
      <py.FunctionDeclaration name="foo" returnType="int" />,
    ]);
    expect(result).toRenderTo(d`
      def foo() -> int:
          pass


    `);
  });

  it("renders a function that calls another function", () => {
    const refkeyFoo = refkey();
    const result = toSourceText([
      <py.StatementList>
        <py.FunctionDeclaration
          name="foo"
          returnType="int"
          refkey={refkeyFoo}
        />
        <py.FunctionDeclaration name="bar" returnType="int">
          <py.VariableDeclaration
            name="result"
            type="int"
            initializer={
              <py.FunctionCallExpression target={refkeyFoo} args={[]} />
            }
          />
        </py.FunctionDeclaration>
      </py.StatementList>,
    ]);
    expect(result).toRenderTo(d`
      def foo() -> int:
          pass

      def bar() -> int:
          result: int = foo()


    `);
  });

  it("renders a function with parameters", () => {
    const result = toSourceText([
      <py.FunctionDeclaration
        name="baz"
        parameters={[
          { name: "x", type: "int" },
          { name: "y", default: 0 },
          { name: "z", type: "int", default: 42 },
        ]}
        args={true}
        kwargs={true}
      >
        print(x, y)
      </py.FunctionDeclaration>,
    ]);
    expect(result).toRenderTo(
      d`
        def baz(x: int, y=0, z: int = 42, *args, **kwargs):
            print(x, y)


      `,
    );
  });

  it("can be an async function", () => {
    expect(toSourceText([<py.FunctionDeclaration async name="foo" />])).toBe(d`
      async def foo():
          pass

    `);
  });

  it("can be an async function with returnType", () => {
    expect(
      toSourceText([
        <py.FunctionDeclaration async name="foo" returnType={"Foo"} />,
      ]),
    ).toBe(d`
      async def foo() -> Foo:
          pass

    `);
  });

  it("can be an async function with returnType element with Reference", () => {
    expect(
      toSourceText([
        <py.StatementList>
          <py.ClassDeclaration name="Foo" refkey={refkey("Foo")} />
          <py.FunctionDeclaration async name="foo" returnType={refkey("Foo")} />
        </py.StatementList>,
      ]),
    ).toBe(d`
      class Foo:
          pass

      async def foo() -> Foo:
          pass

    `);
  });

  it("can be an async function with returnType element with list of References", () => {
    expect(
      toSourceText([
        <py.StatementList>
          <py.ClassDeclaration name="Foo" refkey={refkey("Foo")} />
          <py.FunctionDeclaration
            async
            name="foo"
            returnType={code`list[${refkey("Foo")}]`}
          />
        </py.StatementList>,
      ]),
    ).toBe(d`
      class Foo:
          pass

      async def foo() -> list[Foo]:
          pass

    `);
  });

  it("supports type parameters", () => {
    const decl = (
      <py.FunctionDeclaration
        name="foo"
        parameters={[{ name: "a" }, { name: "b" }]}
        typeParameters={["T", "U"]}
      >
        return a + b
      </py.FunctionDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      def foo[T, U](a, b):
          return a + b

    `);
  });

  it("renders nested functions", () => {
    const parameters = [{ name: "x", type: "int" }];
    const parameters_nested = [{ name: "y", type: "int" }];
    const parameters_nested_nested = [{ name: "z", type: "int" }];
    const fooRef = refkey();
    const barRef = refkey();
    const foobarRef = refkey();
    const decl = (
      <py.FunctionDeclaration
        name="foo"
        parameters={parameters}
        refkey={fooRef}
      >
        <py.FunctionDeclaration
          name="bar"
          parameters={parameters_nested}
          refkey={barRef}
        >
          <py.FunctionDeclaration
            name="foobar"
            parameters={parameters_nested_nested}
            refkey={foobarRef}
          >
            return z * 2
          </py.FunctionDeclaration>
          return{" "}
          <py.FunctionCallExpression
            target={foobarRef}
            args={[<py.Atom jsValue={2} />]}
          />
        </py.FunctionDeclaration>
        return{" "}
        <py.FunctionCallExpression
          target={barRef}
          args={[<py.Atom jsValue={3} />]}
        />
      </py.FunctionDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      def foo(x: int):
          def bar(y: int):
              def foobar(z: int):
                  return z * 2
              return foobar(2)
          return bar(3)

    `);
  });

  it("renders complex typing structure", () => {
    const res = toSourceTextMultiple([
      <py.SourceFile path="mod1.py">
        <py.ClassDeclaration name="Foo" refkey={refkey("Foo")} />
      </py.SourceFile>,
      <py.SourceFile path="mod2.py">
        <py.ClassDeclaration name="A" refkey={refkey("A")} />
        <py.ClassDeclaration name="B" refkey={refkey("B")} />
      </py.SourceFile>,
      <py.SourceFile path="usage.py">
        <py.FunctionDeclaration
          async
          name="foo"
          parameters={[
            {
              name: "x",
              type: refkey("A"),
            },
            {
              name: "y",
              type: refkey("B"),
            },
          ]}
          args={true}
          kwargs={true}
          returnType={refkey("Foo")}
        />
      </py.SourceFile>,
    ]);

    assertFileContents(res, {
      "mod1.py": `
            class Foo:
                pass

            `,
      "mod2.py": `
            class A:
                pass


            class B:
                pass

            `,
      "usage.py": `
            from mod1 import Foo
            from mod2 import A
            from mod2 import B

            async def foo(x: A, y: B, *args, **kwargs) -> Foo:
                pass

            `,
    });
  });
});
