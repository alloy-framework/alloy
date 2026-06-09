import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

describe("StaticMethodDeclaration", () => {
  it("renders async static method", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.StaticMethodDeclaration async name="util" returnType="str">
              return "x"
            </py.StaticMethodDeclaration>
          </py.StatementList>
        </py.ClassDeclaration>
      </py.StatementList>
    );

        expect(
      <TestOutput>
      {decl}
      </TestOutput>,
    ).toRenderTo(`
      class MyClass:
          @staticmethod
          async def util() -> str:
              return "x"


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

        expect(
      <TestOutput>
      {decl}
      </TestOutput>,
    ).toRenderTo(`
      class MyClass:
          @staticmethod
          def foo(x: int):
              attribute = "value"


    `);
  });
});
