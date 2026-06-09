import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

describe("ClassMethodDeclaration", () => {
  it("renders async class method", () => {
    const decl = (
      <py.StatementList>
        <py.ClassDeclaration name="MyClass">
          <py.StatementList>
            <py.ClassMethodDeclaration
              async
              name="create"
              returnType={"MyClass"}
            >
              return cls()
            </py.ClassMethodDeclaration>
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
          @classmethod
          async def create(cls) -> MyClass:
              return cls()


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

        expect(
      <TestOutput>
      {decl}
      </TestOutput>,
    ).toRenderTo(`
      class MyClass:
          @classmethod
          def foo(cls, x: int):
              self.attribute = "value"


    `);
  });
});
