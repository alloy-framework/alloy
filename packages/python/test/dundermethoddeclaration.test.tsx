import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.js";

describe("Dunder/Constructor Declarations", () => {
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
});
