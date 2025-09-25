import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.js";

describe("ConstructorDeclaration", () => {
  it("renders async constructor with return type", () => {
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

  it("renders __new__ with spread args", () => {
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
