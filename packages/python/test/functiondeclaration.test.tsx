import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.js";

describe("Function Declaration", () => {
  it("renders a function with no body as 'pass'", () => {
    const result = toSourceText([
      <py.FunctionDeclaration name="foo" instanceFunction={true} />,
    ]);
    expect(result).toRenderTo(d`
      def foo(self):
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
          instanceFunction={true}
          returnType="int"
          refkey={refkeyFoo}
        />
        <py.FunctionDeclaration
          name="bar"
          instanceFunction={true}
          returnType="int"
        >
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
      def foo(self) -> int:
          pass

      def bar(self) -> int:
          result: int = foo()


    `);
  });

  it("renders an instance function with a body", () => {
    const result = toSourceText([
      <py.FunctionDeclaration name="bar" instanceFunction={true}>
        print('hi')
      </py.FunctionDeclaration>,
    ]);
    expect(result).toRenderTo(d`
      def bar(self):
          print('hi')


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

  it("renders an __init__ function with no body as 'pass'", () => {
    const result = toSourceText([
      <py.InitFunctionDeclaration parameters={[{ name: "x" }]} />,
    ]);
    expect(result).toRenderTo(d`
      def __init__(self, x):
          pass

        
    `);
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
        <py.FunctionDeclaration async name="foo" returnType="Foo" />,
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
          <py.ClassDeclaration name="Foo" />
          <py.FunctionDeclaration
            async
            name="foo"
            returnType={<py.Reference refkey={refkey("Foo")} />}
          />
        </py.StatementList>,
      ]),
    ).toBe(d`
      class Foo:
          pass

      async def foo() -> Foo:
          pass

    `);
  });

  it("supports parameters", () => {
    const decl = (
      <py.FunctionDeclaration name="foo" parameters={["a", "b"]}>
        return a + b
      </py.FunctionDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      def foo(a, b):
          return a + b

    `);
  });
  it("supports type parameters", () => {
    const decl = (
      <py.FunctionDeclaration
        name="foo"
        parameters={["a", "b"]}
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
  it("renders function with parameters", () => {
    const parameters = [{ name: "x", type: "int" }];
    const decl = (
      <py.FunctionDeclaration
        name="foo"
        instanceFunction={true}
        parameters={parameters}
      >
        self.attribute = "value"
      </py.FunctionDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      def foo(self, x: int):
          self.attribute = "value"

    `);
  });
  it("renders __init__ function with parameters", () => {
    const parameters = [{ name: "x", type: "int" }];
    const decl = (
      <py.InitFunctionDeclaration parameters={parameters}>
        self.attribute = "value"
      </py.InitFunctionDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      def __init__(self, x: int):
          self.attribute = "value"

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
        <py.ClassDeclaration name="Foo" />
      </py.SourceFile>,
      <py.SourceFile path="mod2.py">
        <py.ClassDeclaration name="A" />
        <py.ClassDeclaration name="B" />
      </py.SourceFile>,
      <py.SourceFile path="usage.py">
        <py.FunctionDeclaration
          async
          name="foo"
          parameters={[
            { name: "x", type: <py.Reference refkey={refkey("A")} /> },
            { name: "y", type: <py.Reference refkey={refkey("B")} /> },
          ]}
          args={true}
          kwargs={true}
          returnType={<py.Reference refkey={refkey("Foo")} />}
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
