import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { enumModule } from "../src/builtins/python.js";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

it("correct formatting of class name", () => {
  const result = toSourceText(
    <py.ClassDeclaration name="a-really-WeirdClass-name" />,
  );
  const expected = d`
    class AReallyWeirdClassName:
      pass
  `;
  expect(result).toRenderTo(expected);
});

it("correct formatting of Enum name and EnumMember names", () => {
  const result = toSourceText(
    <py.EnumDeclaration
      name="priority"
      style="functional"
      members={[
        { name: "high", value: 1 },
        { name: "Medium", value: 2 },
        { name: "lowValue", value: 3 },
      ]}
    />,
    { externals: [enumModule] },
  );
  const expected = d`
    from enum import Enum

    Priority = Enum('Priority', {'HIGH' : 1, 'MEDIUM' : 2, 'LOW_VALUE' : 3})
  `;
  expect(result).toRenderTo(expected);
});

it("renders a function with parameters", () => {
  const result = toSourceText(
    <py.MethodDeclaration
      name="quirklyNamed-Function"
      parameters={[
        { name: "a-parameter", type: "int" },
        { name: "anotherParameter", defaultValue: 0 },
      ]}
      args={true}
      kwargs={true}
    >
      print(x, y)
    </py.MethodDeclaration>,
  );
  expect(result).toRenderTo(
    d`
      def quirkly_named_function(a_parameter: int, another_parameter = 0, *args, **kwargs):
        print(x, y)
    `,
  );
});

it("correct formatting of instance parameters names", () => {
  const result = toSourceText(
    <py.Parameters
      parameters={[
        { name: "this-is-a-number", type: "int" },
        {
          name: "andThisIsADict",
          type: "dict",
        },
      ]}
    />,
  );
  expect(result).toRenderTo(`this_is_a_number: int, and_this_is_a_dict: dict`);
});

it("correct formatting of instance parameters names", () => {
  const result = toSourceText(
    <py.CallStatementParameters
      parameters={[
        { name: "this-is-a-long-name", value: <py.Value jsValue={"A name"} /> },
        { name: "andThisIsANumber", value: <py.Value jsValue={42} /> },
      ]}
    />,
  );
  expect(result).toRenderTo(
    `this_is_a_long_name="A name", and_this_is_a_number=42`,
  );
});

it("correct formatting of variable name", () => {
  const res = toSourceText(
    <py.VariableDeclaration name="myVar" type="int" value={42} />,
  );
  expect(res).toBe(`my_var: int = 42`);
});
