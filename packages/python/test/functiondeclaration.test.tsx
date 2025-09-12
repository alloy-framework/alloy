import { code, Prose, refkey } from "@alloy-js/core";
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

  it("renders a function with no body as 'pass' with return type", () => {
    const result = toSourceText([
      <py.FunctionDeclaration name="foo" returnType={{ children: "int" }} />,
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
          returnType={{ children: "int" }}
          refkey={refkeyFoo}
        />
        <py.FunctionDeclaration name="bar" returnType={{ children: "int" }}>
          <py.VariableDeclaration
            name="result"
            type={{ children: "int" }}
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

  it("renders an instance function with a body", () => {
    const result = toSourceText([
      <py.ClassDeclaration name="MyClass">
        <py.MethodDeclaration name="bar">print('hi')</py.MethodDeclaration>
      </py.ClassDeclaration>,
    ]);
    expect(result).toRenderTo(d`
      class MyClass:
          def bar(self):
              print('hi')


              
    `);
  });

  it("renders a function with parameters", () => {
    const result = toSourceText([
      <py.FunctionDeclaration
        name="baz"
        parameters={[
          { name: "x", type: { children: "int" } },
          { name: "y", default: 0 },
          { name: "z", type: { children: "int" }, default: 42 },
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
        <py.FunctionDeclaration
          async
          name="foo"
          returnType={{ children: "Foo" }}
        />,
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
          <py.FunctionDeclaration
            async
            name="foo"
            returnType={{ children: refkey("Foo") }}
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

  it("can be an async function with returnType element with list of References", () => {
    expect(
      toSourceText([
        <py.StatementList>
          <py.ClassDeclaration name="Foo" refkey={refkey("Foo")} />
          <py.FunctionDeclaration
            async
            name="foo"
            returnType={{ children: code`list[${refkey("Foo")}]` }}
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

  it("can be an async method", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.MethodDeclaration
              async
              name="my_method"
              returnType={{ children: "str" }}
            >
              return "async result"
            </py.MethodDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          async def my_method(self) -> str:
              return "async result"


    `);
  });

  it("can be an async class method", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.ClassMethodDeclaration
              async
              name="create_async"
              returnType={{ children: "MyClass" }}
            >
              return cls()
            </py.ClassMethodDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          @classmethod
          async def create_async(cls) -> MyClass:
              return cls()


    `);
  });

  it("can be an async static method", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.StaticMethodDeclaration
              async
              name="utility"
              returnType={{ children: "str" }}
            >
              return "utility result"
            </py.StaticMethodDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          @staticmethod
          async def utility() -> str:
              return "utility result"


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
              returnType={{ children: "MyClass" }}
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
            <py.ConstructorDeclaration
              async
              returnType={{ children: "MyClass" }}
            >
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
  it("renders method with parameters", () => {
    const parameters = [{ name: "x", type: { children: "int" } }];
    const decl = (
      <py.ClassDeclaration name="MyClass">
        <py.MethodDeclaration name="foo" parameters={parameters}>
          self.attribute = "value"
        </py.MethodDeclaration>
      </py.ClassDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          def foo(self, x: int):
              self.attribute = "value"


    `);
  });
  it("renders class method with parameters", () => {
    const parameters = [{ name: "x", type: { children: "int" } }];
    const decl = (
      <py.ClassDeclaration name="MyClass">
        <py.ClassMethodDeclaration name="foo" parameters={parameters}>
          self.attribute = "value"
        </py.ClassMethodDeclaration>
      </py.ClassDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          @classmethod
          def foo(cls, x: int):
              self.attribute = "value"


    `);
  });
  it("renders static method with parameters", () => {
    const parameters = [{ name: "x", type: { children: "int" } }];
    const decl = (
      <py.ClassDeclaration name="MyClass">
        <py.StaticMethodDeclaration name="foo" parameters={parameters}>
          attribute = "value"
        </py.StaticMethodDeclaration>
      </py.ClassDeclaration>
    );

    expect(toSourceText([decl])).toBe(d`
      class MyClass:
          @staticmethod
          def foo(x: int):
              attribute = "value"


    `);
  });
  it("renders abstract methods", () => {
    const parameters = [{ name: "x", type: { children: "int" } }];
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
  it("renders empty property, setter, deleter", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration name="x">
              <py.PropertyDeclaration.Setter />
              <py.PropertyDeclaration.Deleter />
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      class MyClass:
          @property
          def x(self):
              raise NotImplementedError

          @x.setter
          def x(self, value) -> None:
              raise NotImplementedError

          @x.deleter
          def x(self) -> None:
              raise NotImplementedError


    `);
  });
  it("renders normal property, setter, deleter with children and type", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration name="x" type={{ children: "int" }}>
              something
              <py.PropertyDeclaration.Setter>
                something else
              </py.PropertyDeclaration.Setter>
              <py.PropertyDeclaration.Deleter>
                some other thing
              </py.PropertyDeclaration.Deleter>
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      class MyClass:
          @property
          def x(self) -> int:
              something

          @x.setter
          def x(self, value: int) -> None:
              something else

          @x.deleter
          def x(self) -> None:
              some other thing


    `);
  });
  it("renders normal property, setter, deleter with children and type, overriding the setter type", () => {
    const propertyDoc = (
      <py.FunctionDoc
        description={[<Prose>Property documentation.</Prose>]}
        style="google"
      />
    );
    const setterDoc = (
      <py.FunctionDoc
        description={[
          <Prose>We can receive a string, a float, or a str.</Prose>,
        ]}
        style="google"
      />
    );
    const deleterDoc = (
      <py.FunctionDoc
        description={[<Prose>Deleter documentation.</Prose>]}
        style="google"
      />
    );
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration
              name="x"
              type={{ children: "int" }}
              doc={propertyDoc}
            >
              something
              <py.PropertyDeclaration.Setter
                type={{
                  children: [
                    { children: "int" },
                    { children: "float" },
                    { children: "str" },
                  ],
                }}
                doc={setterDoc}
              >
                self._string = str(value)
              </py.PropertyDeclaration.Setter>
              <py.PropertyDeclaration.Deleter doc={deleterDoc}>
                some other thing
              </py.PropertyDeclaration.Deleter>
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      class MyClass:
          @property
          def x(self) -> int:
              """
              Property documentation.
              """
              something

          @x.setter
          def x(self, value: int | float | str) -> None:
              """
              We can receive a string, a float, or a str.
              """
              self._string = str(value)

          @x.deleter
          def x(self) -> None:
              """
              Deleter documentation.
              """
              some other thing


    `);
  });
  it("renders property and function with the same name, renaming the latter to avoid conflict", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration name="x">
              something
              <py.PropertyDeclaration.Setter />
              <py.PropertyDeclaration.Deleter />
            </py.PropertyDeclaration>
            <py.MethodDeclaration name="x" />
          </py.StatementList>
        </py.ClassDeclaration>
        <py.FunctionDeclaration name="x" />
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      class MyClass:
          @property
          def x(self):
              something

          @x.setter
          def x(self, value) -> None:
              raise NotImplementedError

          @x.deleter
          def x(self) -> None:
              raise NotImplementedError

          def x_2_test(self):
              pass


      def x():
          pass

    `);
  });
  it("renders abstract property with getter, setter, deleter", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.PropertyDeclaration
              name="value"
              type={{ children: "int" }}
              abstract
            >
              return self._value
              <py.PropertyDeclaration.Setter type={{ children: "int" }}>
                self._value = value
              </py.PropertyDeclaration.Setter>
              <py.PropertyDeclaration.Deleter>
                del self._value
              </py.PropertyDeclaration.Deleter>
            </py.PropertyDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

    expect(toSourceText([decl], { externals: [abcModule] })).toBe(d`
      from abc import abstractmethod

      class MyClass:
          @property
          @abstractmethod
          def value(self) -> int:
              return self._value

          @value.setter
          @abstractmethod
          def value(self, value: int) -> None:
              self._value = value

          @value.deleter
          @abstractmethod
          def value(self) -> None:
              del self._value


    `);
  });
  it("renders dunder methods with parameters", () => {
    const parameters = [{ name: "x", type: { children: "int" } }];
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
    const parameters = [{ name: "x", type: { children: "int" } }];
    const parameters_nested = [{ name: "y", type: { children: "int" } }];
    const parameters_nested_nested = [{ name: "z", type: { children: "int" } }];
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
              type: { children: refkey("A") },
            },
            {
              name: "y",
              type: { children: refkey("B") },
            },
          ]}
          args={true}
          kwargs={true}
          returnType={{ children: refkey("Foo") }}
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

  it("throws error when PropertyDeclaration is used outside of a class", () => {
    expect(() => {
      toSourceText([<py.PropertyDeclaration name="x" />]);
    }).toThrow(
      'PropertyDeclaration "x" must be declared inside a class (member scope)',
    );
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
