import { code, namekey, refkey, render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { abcModule } from "../src/index.js";
import {
  TestOutput,
  TestOutputDirectory,
} from "./utils.js";

describe("Function Declaration", () => {
  it("renders multiple decorators above def without blank lines", () => {
    expect(
      <TestOutput>
        <py.FunctionDeclaration name="f" decorators={["@a", "@b", "@c"]}>
          pass
        </py.FunctionDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
      @a
      @b
      @c
      def f():
          pass

    `,
    );
  });

  it("renders a function with no body as 'pass'", () => {
    expect(
      <TestOutput>
        <py.FunctionDeclaration name="foo" />
      </TestOutput>,
    ).toRenderTo(
      `
      def foo():
          pass

    `,
    );
  });

  it("takes a namekey", () => {
    expect(
      <TestOutput>
        <py.FunctionDeclaration name={namekey("foo-bar")} />
      </TestOutput>,
    ).toRenderTo(
      `
      def foo_bar():
          pass

    `,
    );
  });

  it("renders a function with no body as 'pass' with return type", () => {
    expect(
      <TestOutput>
        <py.FunctionDeclaration name="foo" returnType="int" />
      </TestOutput>,
    ).toRenderTo(
      `
      def foo() -> int:
          pass

    `,
    );
  });

  it("renders a function that calls another function", () => {
    const refkeyFoo = refkey();
    expect(
      <TestOutput>
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
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      def foo() -> int:
          pass

      def bar() -> int:
          result: int = foo()

    `,
    );
  });

  it("renders a function with parameters", () => {
    expect(
      <TestOutput>
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
        </py.FunctionDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
        def baz(x: int, y=0, z: int = 42, *args, **kwargs):
            print(x, y)

      `,
    );
  });

  it("renders an __init__ function with no body as 'pass'", () => {
    expect(
      <TestOutput>
        <py.ClassDeclaration name="MyClass">
          <py.DunderMethodDeclaration
            name="__init__"
            parameters={[{ name: "x" }]}
          />
        </py.ClassDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
      class MyClass:
          def __init__(self, x):
              pass


    `,
    );
  });

  it("can be an async function", () => {
    expect(
      <TestOutput>
        <py.FunctionDeclaration async name="foo" />
      </TestOutput>,
    ).toRenderTo(
      `
      async def foo():
          pass

    `,
    );
  });

  it("can be an async function with returnType", () => {
    expect(
      <TestOutput>
        <py.FunctionDeclaration async name="foo" returnType={"Foo"} />
      </TestOutput>,
    ).toRenderTo(
      `
      async def foo() -> Foo:
          pass

    `,
    );
  });

  it("can be an async function with returnType element with Reference", () => {
    expect(
      <TestOutput>
        <py.StatementList>
          <py.ClassDeclaration name="Foo" refkey={refkey("Foo")} />
          <py.FunctionDeclaration async name="foo" returnType={refkey("Foo")} />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      class Foo:
          pass

      async def foo() -> Foo:
          pass

    `,
    );
  });

  it("can be an async function with returnType element with list of References", () => {
    expect(
      <TestOutput>
        <py.StatementList>
          <py.ClassDeclaration name="Foo" refkey={refkey("Foo")} />
          <py.FunctionDeclaration
            async
            name="foo"
            returnType={code`list[${refkey("Foo")}]`}
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      class Foo:
          pass

      async def foo() -> list[Foo]:
          pass

    `,
    );
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

    expect(<TestOutput>{decl}</TestOutput>).toRenderTo(
      `
      class MyClass:
          async def __aenter__(self) -> MyClass:
              return self


    `,
    );
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

    expect(<TestOutput>{decl}</TestOutput>).toRenderTo(
      `
      class MyClass:
          async def __new__(cls) -> MyClass:
              return super().__new__(cls)


    `,
    );
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

    expect(<TestOutput>{decl}</TestOutput>).toRenderTo(
      `
      def foo(a, b):
          return a + b

    `,
    );
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

    expect(<TestOutput>{decl}</TestOutput>).toRenderTo(
      `
      def foo[T, U](a, b):
          return a + b

    `,
    );
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

    expect(<TestOutput externals={[abcModule]}>{decl}</TestOutput>).toRenderTo(
      `
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


    `,
    );
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

    expect(<TestOutput>{decl}</TestOutput>).toRenderTo(
      `
      class MyClass:
          def __init__(self, x: int):
              self.attribute = "value"

          def __repr__(self, x: int):
              return "MyClass"


    `,
    );
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

    expect(<TestOutput>{decl}</TestOutput>).toRenderTo(
      `
      class MyClass:
          def __new__(cls, *args, **kwargs):
              pass


    `,
    );
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

    expect(<TestOutput>{decl}</TestOutput>).toRenderTo(
      `
      def foo(x: int):
          def bar(y: int):
              def foobar(z: int):
                  return z * 2
              return foobar(2)
          return bar(3)

    `,
    );
  });

  it("renders complex typing structure", () => {
    expect(
      <TestOutputDirectory>
        <py.SourceFile path="mod1.py">
          <py.ClassDeclaration name="Foo" refkey={refkey("Foo")} />
        </py.SourceFile>
        <py.SourceFile path="mod2.py">
          <py.ClassDeclaration name="A" refkey={refkey("A")} />
          <py.ClassDeclaration name="B" refkey={refkey("B")} />
        </py.SourceFile>
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
        </py.SourceFile>
      </TestOutputDirectory>,
    ).toRenderTo(
      {
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
      },
    );
  });

  it("throws error when PropertyDeclaration is used outside of a class", () => {
    expect(() => {
      render(
        <TestOutput>
          <py.PropertyDeclaration name="x" />
        </TestOutput>,
      );
    }).toThrow('Method "x" must be declared inside a class (member scope)');
  });

  it("throws error when MethodDeclaration is used outside of a class", () => {
    expect(() => {
      render(
        <TestOutput>
          <py.MethodDeclaration name="my_method" />
        </TestOutput>,
      );
    }).toThrow(
      'Method "my_method" must be declared inside a class (member scope)',
    );
  });

  it("throws error when ClassMethodDeclaration is used outside of a class", () => {
    expect(() => {
      render(
        <TestOutput>
          <py.ClassMethodDeclaration name="my_class_method" />
        </TestOutput>,
      );
    }).toThrow(
      'Method "my_class_method" must be declared inside a class (member scope)',
    );
  });

  it("throws error when StaticMethodDeclaration is used outside of a class", () => {
    expect(() => {
      render(
        <TestOutput>
          <py.StaticMethodDeclaration name="my_static_method" />
        </TestOutput>,
      );
    }).toThrow(
      'Method "my_static_method" must be declared inside a class (member scope)',
    );
  });

  it("throws error when DunderMethodDeclaration is used outside of a class", () => {
    expect(() => {
      render(
        <TestOutput>
          <py.DunderMethodDeclaration name="__init__" />
        </TestOutput>,
      );
    }).toThrow(
      'Method "__init__" must be declared inside a class (member scope)',
    );
  });
});
