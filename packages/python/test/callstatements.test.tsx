import { refkey, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { findFile, toSourceText } from "./utils.jsx";
import { createModule } from "../src/create-module.js";

it("declaration of class instance with variables", () => {
  const result = toSourceText(
    <py.StatementList>
      <py.ClassDeclaration name="A" />
      <hbr />
      <py.CallStatement type={refkey("A")} parameters={[
          { name: "name", value: <py.Value jsValue={"A name"} /> },
          { name: "number", value: <py.Value jsValue={42} /> },
          { value: <py.Value jsValue={true} /> },
        ]} />
    </py.StatementList>
  );
  const expected = d`
    class A:
      pass


    A(name="A name", number=42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("declaration of class instance with variables", () => {
  const result = toSourceText(
    <py.StatementList>
      <py.ClassDeclaration name="ClassName" />
      <hbr />
      <py.CallStatement type={refkey("ClassName")} parameters={[
          { name: "name", value: <py.Value jsValue={"A name"} /> },
          { name: "number", value: <py.Value jsValue={42} /> },
          { value: <py.Value jsValue={true} /> },
        ]} />
    </py.StatementList>
  );
  const expected = d`
    class ClassName:
      pass


    ClassName(name="A name", number=42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("correct resolving of external module", () => {
  const requestsLib = createModule({
    name: "requests",
    descriptor: {
      "models": ["Request"],
    },
  });
  const result = toSourceText(
    <py.StatementList>
      <py.CallStatement type={requestsLib["models"].Request} />
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
  const result = toSourceText(
    <py.StatementList>
      <py.MethodDeclaration name="runFunc" />
      <hbr />
      <py.CallStatement type={refkey("run_func")} parameters={[
          { name: "name", value: <py.Value jsValue={"A name"} /> },
          { name: "number", value: <py.Value jsValue={42} /> },
          { value: <py.Value jsValue={true} /> },
        ]} />
    </py.StatementList>
  );
  const expected = d`
    def run_func():
      pass


    run_func(name="A name", number=42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("function call with variables and assignment", () => {
  const result = toSourceText(
    <py.StatementList>
      <py.MethodDeclaration
      name="run_func"
      returnType="str"
      parameters={[
        { name: "name", type: "str" },
        { name: "number", type: "int" },
        { name: "flag", type: "bool" },
      ]}
      />
      <hbr />
      <py.VariableDeclaration name="result" type={<py.Reference refkey={refkey("run_func")} />} value={
        <py.CallStatement type={refkey("run_func")} parameters={[
          { name: "name", value: <py.Value jsValue={"A name"} /> },
          { name: "number", value: <py.Value jsValue={42} /> },
          { value: <py.Value jsValue={true} /> },
        ]} />
      } />

    </py.StatementList>
  );
  // TODO: Fix type once we handle types properly
  const expected = d`
    def run_func(name: str, number: int, flag: bool) -> str:
      pass


    result: run_func = run_func(name="A name", number=42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("function call without a method", () => {
  const result = toSourceText(
    <py.StatementList>
      <py.CallStatement type={"test"} parameters={[
          { name: "name", value: <py.Value jsValue={"A name"} /> },
          { name: "number", value: <py.Value jsValue={42} /> },
          { value: <py.Value jsValue={true} /> },
        ]} />
    </py.StatementList>
  );
  const expected = d`
    test(name="A name", number=42, True)
  `;
  expect(result).toRenderTo(expected);
});