import { expect, it } from "vitest";
import { enumModule } from "../src/builtins/python.js";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

it("correct formatting of class name", () => {
  expect(
    <TestOutput>
      <py.ClassDeclaration name="a-really-WeirdClass-name" />
    </TestOutput>,
  ).toRenderTo(
    `
    class AReallyWeirdClassName:
        pass

  `,
  );
});

it("correct formatting of Enum name and EnumMember names", () => {
  expect(
    <TestOutput externals={[enumModule]}>
      <py.FunctionalEnumDeclaration
        name="priority"
        members={[
          { name: "high", value: 1 },
          { name: "Medium", value: 2 },
          { name: "lowValue", value: 3 },
        ]}
      />
    </TestOutput>,
  ).toRenderTo(
    `
    from enum import Enum


    Priority = Enum('Priority', {'HIGH' : 1, 'MEDIUM' : 2, 'LOW_VALUE' : 3})
  `,
  );
});

it("renders a function with parameters", () => {
  expect(
    <TestOutput>
      <py.FunctionDeclaration
        name="quirklyNamed-Function"
        parameters={[{ name: "a-parameter", type: "int" }]}
        args={true}
        kwargs={true}
      >
        print(x, y)
      </py.FunctionDeclaration>
    </TestOutput>,
  ).toRenderTo(
    `
      def quirkly_named_function(a_parameter: int, *args, **kwargs):
          print(x, y)

    `,
  );
});

it("correct formatting of call signature parameters names", () => {
  expect(
    <TestOutput>
      <py.CallSignatureParameters
        parameters={[
          { name: "this-is-a-number", type: "int" },
          {
            name: "andThisIsADict",
            type: "dict",
          },
        ]}
      />
    </TestOutput>,
  ).toRenderTo(`this_is_a_number: int, and_this_is_a_dict: dict`);
});

it("correct formatting of call statement vars", () => {
  expect(
    <TestOutput>
      <py.StatementList>
        <py.ClassInstantiation
          target={"test"}
          args={[
            <py.VariableDeclaration
              name="this-is-a-long-name"
              initializer={<py.Atom jsValue={"A name"} />}
              callStatementVar
            />,
            <py.VariableDeclaration
              name="andThisIsANumber"
              initializer={<py.Atom jsValue={42} />}
              callStatementVar
            />,
          ]}
        />
      </py.StatementList>
    </TestOutput>,
  ).toRenderTo(`test(this_is_a_long_name="A name", and_this_is_a_number=42)`);
});

it("correct formatting of variable name", () => {
  expect(
    <TestOutput>
      <py.VariableDeclaration name="myVar" type="int" initializer={42} />
    </TestOutput>,
  ).toRenderTo("my_var: int = 42");
});
