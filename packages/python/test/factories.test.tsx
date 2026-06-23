import { render } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

describe("Symbol factories", () => {
  it("createMethodSymbol throws outside class", () => {
    expect(() => {
      render(
        <TestOutput>
          <py.MethodDeclaration name="m" />
        </TestOutput>,
      );
    }).toThrow('Method "m" must be declared inside a class (member scope)');
  });

  it("createMethodSymbol succeeds inside class", () => {
    expect(
      <TestOutput>
        <py.ClassDeclaration name="C">
          <py.MethodDeclaration name="m" />
        </py.ClassDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
      class C:
          def m(self):
              pass


      `,
    );
  });

  it("createFunctionSymbol usable in member scope (top-level function component still works nested)", () => {
    expect(
      <TestOutput>
        <py.ClassDeclaration name="C">
          <py.StatementList>
            <py.FunctionDeclaration name="f" />
          </py.StatementList>
        </py.ClassDeclaration>
      </TestOutput>,
    ).toRenderTo(
      `
      class C:
          def f():
              pass


      `,
    );
  });
});

describe("Validation Errors", () => {
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
