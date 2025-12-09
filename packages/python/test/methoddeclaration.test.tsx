import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { abcModule } from "../src/index.js";
import { toSourceText } from "./utils.js";

describe("Method-like Declarations", () => {
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

  it("can be an async method", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.MethodDeclaration async name="my_method" returnType="str">
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
              returnType={"MyClass"}
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
            <py.StaticMethodDeclaration async name="utility" returnType="str">
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

  it("renders method with parameters", () => {
    const parameters = [{ name: "x", type: "int" }];
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
    const parameters = [{ name: "x", type: "int" }];
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
    const parameters = [{ name: "x", type: "int" }];
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
});
