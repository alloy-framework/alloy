import { refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

describe("FunctionCallExpression", () => {
  it("renders", () => {
    expect(
      <TestOutput>
        <py.FunctionCallExpression target="foo" />
      </TestOutput>,
    ).toRenderTo(
      `
      foo()
    `,
    );
  });

  it("renders with args", () => {
    expect(
      <TestOutput>
        <py.FunctionCallExpression target="foo" args={["a", "b"]} />
      </TestOutput>,
    ).toRenderTo(
      `
      foo(a, b)
    `,
    );
  });

  it("function call with variables", () => {
    const methodRef = refkey();
    expect(
      <TestOutput>
        <py.StatementList>
          <py.FunctionDeclaration name="runFunc" refkey={methodRef} />
          <py.FunctionCallExpression
            target={methodRef}
            args={[
              <py.Atom jsValue={"A name"} />,
              <py.Atom jsValue={42} />,
              <py.Atom jsValue={true} />,
            ]}
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      def run_func():
          pass
      
      run_func("A name", 42, True)
    `,
    );
  });

  it("function call with variables and assignment", () => {
    const methodRef = refkey();
    expect(
      <TestOutput>
        <py.StatementList>
          <py.FunctionDeclaration
            name="runFunc"
            returnType="str"
            refkey={methodRef}
            parameters={[
              { name: "name", type: "str" },
              { name: "number", type: "int" },
              { name: "flag", type: "bool" },
            ]}
          />
          <py.VariableDeclaration
            name="result"
            type="str"
            initializer={
              <py.FunctionCallExpression
                target={methodRef}
                args={[
                  <py.Atom jsValue={"A name"} />,
                  <py.Atom jsValue={42} />,
                  <py.Atom jsValue={true} />,
                ]}
              />
            }
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      def run_func(name: str, number: int, flag: bool) -> str:
          pass
      
      result: str = run_func("A name", 42, True)
    `,
    );
  });

  it("Method call without a reference and with call statement vars", () => {
    expect(
      <TestOutput>
        <py.StatementList>
          <py.FunctionCallExpression
            target={"example_method"}
            args={[
              <py.VariableDeclaration
                name="name"
                initializer={"A name"}
                callStatementVar
              />,
              <py.VariableDeclaration
                name="number"
                initializer={42}
                callStatementVar
              />,
              <py.VariableDeclaration
                name="flag"
                initializer={true}
                callStatementVar
              />,
            ]}
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      example_method(name="A name", number=42, flag=True)
    `,
    );
  });

  it("Method call without a reference mixing unnamed and named vars", () => {
    expect(
      <TestOutput>
        <py.StatementList>
          <py.FunctionCallExpression
            target={"example_method"}
            args={[
              <py.Atom jsValue={"A name"} />,
              <py.VariableDeclaration
                name="number"
                initializer={42}
                callStatementVar
              />,
              <py.VariableDeclaration
                name="flag"
                initializer={true}
                callStatementVar
              />,
            ]}
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      example_method("A name", number=42, flag=True)
    `,
    );
  });
});
