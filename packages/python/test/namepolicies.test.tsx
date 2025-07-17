import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { enumModule } from "../src/builtins/python.js";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

it("correct formatting of class name", () => {
  const result = toSourceText([
    <py.ClassDeclaration name="a-really-WeirdClass-name" />,
  ]);
  const expected = d`
    class AReallyWeirdClassName:
        pass

      
  `;
  expect(result).toRenderTo(expected);
});

it("correct formatting of Enum name and EnumMember names", () => {
  const result = toSourceText([
    <py.EnumDeclaration
      name="priority"
      style="functional"
      members={[
        { name: "high", value: 1 },
        { name: "Medium", value: 2 },
        { name: "lowValue", value: 3 },
      ]}
    />],
    { externals: [enumModule] },
  );
  const expected = d`
    from enum import Enum

    Priority = Enum('Priority', {'HIGH' : 1, 'MEDIUM' : 2, 'LOW_VALUE' : 3})
  `;
  expect(result).toRenderTo(expected);
});

it("renders a function with parameters", () => {
  const result = toSourceText([
    <py.FunctionDeclaration
      name="quirklyNamed-Function"
      parameters={[{ name: "a-parameter", type: "int" }]}
      args={true}
      kwargs={true}
    >
      print(x, y)
    </py.FunctionDeclaration>,
  ]);
  expect(result).toRenderTo(
    d`
      def quirkly_named_function(a_parameter: int, *args, **kwargs):
          print(x, y)

        
    `,
  );
});

it("correct formatting of call signature parameters names", () => {
  const result = toSourceText([
    <py.CallSignatureParameters
      parameters={[
        { name: "this-is-a-number", type: "int" },
        {
          name: "andThisIsADict",
          type: "dict",
        },
      ]}
    />,
  ]);
  expect(result).toRenderTo(`this_is_a_number: int, and_this_is_a_dict: dict`);
});

it("correct formatting of call statement vars", () => {
  const result = toSourceText([
    <py.StatementList>
      <py.ClassInstantiation
        target={"test"}
        args={[
          <py.VariableDeclaration
            name="this-is-a-long-name"
            initializer={<py.Value jsValue={"A name"} />}
            callStatementVar
          />,
          <py.VariableDeclaration
            name="andThisIsANumber"
            initializer={<py.Value jsValue={42} />}
            callStatementVar
          />,
        ]}
      />
    </py.StatementList>,
  ]);
  expect(result).toRenderTo(
    `test(this_is_a_long_name="A name", and_this_is_a_number=42)`,
  );
});

it("correct formatting of variable name", () => {
  const res = toSourceText([
    <py.VariableDeclaration name="myVar" type="int" initializer={42} />,
  ]);
  expect(res).toBe(`my_var: int = 42`);
});
