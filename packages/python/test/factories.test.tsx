import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.js";

describe("Symbol factories", () => {
  it("createMethodSymbol throws outside class", () => {
    expect(() => {
      toSourceText([<py.MethodDeclaration name="m" />]);
    }).toThrow('Method "m" must be declared inside a class (member scope)');
  });

  it("createMethodSymbol succeeds inside class", () => {
    const result = toSourceText([
      <py.ClassDeclaration name="C">
        <py.MethodDeclaration name="m" />
      </py.ClassDeclaration>,
    ]);
    expect(result).toContain("def m(self):");
  });

  it("createFunctionSymbol usable in member scope (top-level function component still works nested)", () => {
    const result = toSourceText([
      <py.ClassDeclaration name="C">
        <py.StatementList>
          <py.FunctionDeclaration name="f" />
        </py.StatementList>
      </py.ClassDeclaration>,
    ]);
    // Nested free functions render without self/cls
    expect(result).toContain("def f():");
  });
});

describe("Validation Errors", () => {
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
