import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { createModule } from "../src/create-module.js";
import { toSourceText } from "./utils.jsx";

it("declaration of class instance with variables", () => {
  // Creating the reference separately so the naming policy doesn't interfere
  const classRef = refkey();
  const result = toSourceText(
    <py.StatementList>
      <py.ClassDeclaration name="one-class" refkey={classRef} />
      <hbr />
      <py.NewExpression
        target={classRef}
        args={[
          <py.Value jsValue={"A name"} />,
          <py.Value jsValue={42} />,
          <py.Value jsValue={true} />,
        ]}
      />
    </py.StatementList>,
  );
  const expected = d`
    class OneClass:
      pass



    OneClass("A name", 42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("correct resolving of external module", () => {
  const requestsLib = createModule({
    name: "requests",
    descriptor: {
      models: ["Request"],
    },
  });
  const result = toSourceText(
    <py.StatementList>
      <py.NewExpression target={requestsLib["models"].Request} />
    </py.StatementList>,
    { externals: [requestsLib] },
  );
  const expected = d`
    from requests.models import Request

    Request()
  `;
  expect(result).toRenderTo(expected);
});

it("function call with variables", () => {
  // Creating the reference separately so the naming policy doesn't interfere
  const methodRef = refkey();
  const result = toSourceText(
    <py.StatementList>
      <py.FunctionDeclaration name="runFunc" refkey={methodRef} />
      <hbr />
      <py.NewExpression
        target={methodRef}
        args={[
          <py.Value jsValue={"A name"} />,
          <py.Value jsValue={42} />,
          <py.Value jsValue={true} />,
        ]}
      />
    </py.StatementList>,
  );
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
  const result = toSourceText(
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
      <hbr />
      <py.VariableDeclaration
        name="result"
        type={<py.Reference refkey={methodRef} />}
        initializer={
          <py.NewExpression
            target={methodRef}
            args={[
              <py.Value jsValue={"A name"} />,
              <py.Value jsValue={42} />,
              <py.Value jsValue={true} />,
            ]}
          />
        }
      />
    </py.StatementList>,
  );
  // TODO: Fix type once we handle types properly
  const expected = d`
    def run_func(name: str, number: int, flag: bool) -> str:
      pass
    
    
    
    result: run_func = run_func("A name", 42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("function call without a method", () => {
  const result = toSourceText(
    <py.StatementList>
      <py.NewExpression
        target={"test"}
        args={[
          <py.Value jsValue={"A name"} />,
          <py.Value jsValue={42} />,
          <py.Value jsValue={true} />,
        ]}
      />
    </py.StatementList>,
  );
  const expected = d`
    test("A name", 42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("function call without a method and with call statement vars", () => {
  const result = toSourceText(
    <py.StatementList>
      <py.NewExpression
        target={"test"}
        args={[
          <py.VariableDeclaration name="name" initializer={"A name"} callStatementVar />,
          <py.VariableDeclaration name="number" initializer={42} callStatementVar />,
          <py.VariableDeclaration name="flag" initializer={true} callStatementVar />,
        ]}
      />
    </py.StatementList>,
  );
  const expected = d`
    test(name="A name", number=42, flag=True)
  `;
  expect(result).toRenderTo(expected);
});
