import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

describe("FunctionCallExpression", () => {
  it("renders", () => {
    const result = toSourceText([<py.FunctionCallExpression target="foo" />]);
    expect(result).toRenderTo(d`
      foo()
    `);
  });
  it("renders with args", () => {
    const result = toSourceText([
      <py.FunctionCallExpression target="foo" args={["a", "b"]} />,
    ]);
    expect(result).toRenderTo(d`
      foo(a, b)
    `);
  });

  it("function call with variables", () => {
    // Creating the reference separately so the naming policy doesn't interfere
    const methodRef = refkey();
    const result = toSourceText([
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
      </py.StatementList>,
    ]);
    const expected = d`
      def run_func():
          pass
      
      run_func("A name", 42, True)
    `;
    expect(result).toRenderTo(expected);
  });

  it("function call with variables and assignment", () => {
    // Creating the reference separately so the naming policy doesn't interfere
    const methodRef = refkey();
    const result = toSourceText([
      <py.StatementList>
        <py.FunctionDeclaration
          name="runFunc"
          returnType={{ children: "str" }}
          refkey={methodRef}
          parameters={[
            { name: "name", type: { children: "str" } },
            { name: "number", type: { children: "int" } },
            { name: "flag", type: { children: "bool" } },
          ]}
        />
        <py.VariableDeclaration
          name="result"
          type={{ children: "str" }}
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
      </py.StatementList>,
    ]);
    const expected = d`
      def run_func(name: str, number: int, flag: bool) -> str:
          pass
      
      result: str = run_func("A name", 42, True)
    `;
    expect(result).toRenderTo(expected);
  });

  it("Method call without a reference and with call statement vars", () => {
    const result = toSourceText([
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
      </py.StatementList>,
    ]);
    const expected = d`
      example_method(name="A name", number=42, flag=True)
    `;
    expect(result).toRenderTo(expected);
  });

  it("Method call without a reference mixing unnamed and named vars", () => {
    const result = toSourceText([
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
      </py.StatementList>,
    ]);
    const expected = d`
      example_method("A name", number=42, flag=True)
    `;
    expect(result).toRenderTo(expected);
  });
});
