import { code, namekey, refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { abcModule } from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.js";

describe("Function Declaration", () => {
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

  it("renders an __init__ function with no body as 'pass'", () => {
    const result = toSourceText([
      <py.ClassDeclaration name="MyClass">
        <py.DunderMethodDeclaration
          name="__init__"
          parameters={[{ name: "x" }]}
        />
      </py.ClassDeclaration>,
    ]);
    expect(result).toRenderTo(d`
      class MyClass:
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

  it("can be an async dunder method", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.DunderMethodDeclaration
              async
              name="__aenter__"
              returnType={"MyClass"}
            >
              return self
            </py.DunderMethodDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          async def __aenter__(self) -> MyClass:
              return self


    `);
  });

  it("can be an async constructor", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.ConstructorDeclaration async returnType={"MyClass"}>
              return super().__new__(cls)
            </py.ConstructorDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          async def __new__(cls) -> MyClass:
              return super().__new__(cls)


    `);
  });

  it("supports parameters", () => {
    const decl = (
      <py.FunctionDeclaration
        name="foo"
        parameters={[{ name: "a" }, { name: "b" }]}
      >
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
  it("renders abstract methods", () => {
    const parameters = [{ name: "x", type: "int" }];
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.MethodDeclaration
              name="methoddef"
              parameters={parameters}
              abstract
            />
            <py.ClassMethodDeclaration
              name="classdef"
              parameters={parameters}
              abstract
            />
            <py.StaticMethodDeclaration
              name="staticdef"
              parameters={parameters}
              abstract
            />
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      from abc import abstractmethod


      class MyClass:
          @abstractmethod
          def methoddef(self, x: int):
              pass

          @classmethod
          @abstractmethod
          def classdef(cls, x: int):
              pass

          @staticmethod
          @abstractmethod
          def staticdef(x: int):
              pass


    `);
  });
  it("renders dunder methods with parameters", () => {
    const parameters = [{ name: "x", type: "int" }];
    const decl = (
      <py.ClassDeclaration name="MyClass">
        <py.StatementList>
          <py.DunderMethodDeclaration name="__init__" parameters={parameters}>
            self.attribute = "value"
          </py.DunderMethodDeclaration>
          <py.DunderMethodDeclaration name="__repr__" parameters={parameters}>
            return "MyClass"
          </py.DunderMethodDeclaration>
        </py.StatementList>
      </py.ClassDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          def __init__(self, x: int):
              self.attribute = "value"

          def __repr__(self, x: int):
              return "MyClass"


    `);
  });

  it("renders dunder methods __new__", () => {
    const decl = (
      <py.ClassDeclaration name="MyClass">
        <py.StatementList>
          <py.ConstructorDeclaration args kwargs>
            pass
          </py.ConstructorDeclaration>
        </py.StatementList>
      </py.ClassDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          def __new__(cls, *args, **kwargs):
              pass


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
            from typing import TYPE_CHECKING

            if TYPE_CHECKING:
                from mod1 import Foo
                from mod2 import A
                from mod2 import B


            async def foo(x: A, y: B, *args, **kwargs) -> Foo:
                pass

            `,
    });
  });

  it("throws error when PropertyDeclaration is used outside of a class", () => {
    expect(() => {
      toSourceText([<py.PropertyDeclaration name="x" />]);
    }).toThrow('Method "x" must be declared inside a class (member scope)');
  });

  it("throws error when MethodDeclaration is used outside of a class", () => {
    expect(() => {
      toSourceText([<py.MethodDeclaration name="my_method" />]);
    }).toThrow(
      'Method "my_method" must be declared inside a class (member scope)',
    );
  });

  it("throws error when ClassMethodDeclaration is used outside of a class", () => {
    expect(() => {
      toSourceText([<py.ClassMethodDeclaration name="my_class_method" />]);
    }).toThrow(
      'Method "my_class_method" must be declared inside a class (member scope)',
    );
  });

  it("throws error when StaticMethodDeclaration is used outside of a class", () => {
    expect(() => {
      toSourceText([<py.StaticMethodDeclaration name="my_static_method" />]);
    }).toThrow(
      'Method "my_static_method" must be declared inside a class (member scope)',
    );
  });

  it("throws error when DunderMethodDeclaration is used outside of a class", () => {
    expect(() => {
      toSourceText([<py.DunderMethodDeclaration name="__init__" />]);
    }).toThrow(
      'Method "__init__" must be declared inside a class (member scope)',
    );
  });
});
