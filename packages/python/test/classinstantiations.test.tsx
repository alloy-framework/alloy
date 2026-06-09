import { refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import { createModule } from "../src/create-module.js";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

it("declaration of class instance with variables", () => {
  const classRef = refkey();
  expect(
    <TestOutput>
      <py.StatementList>
        <py.ClassDeclaration name="one-class" refkey={classRef} />
        <py.ClassInstantiation
          target={classRef}
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
    class OneClass:
        pass

    OneClass("A name", 42, True)
  `,
  );
});

it("correct resolving of external module", () => {
  const requestsLib = createModule({
    name: "requests",
    descriptor: {
      models: ["Request"],
    },
  });
  expect(
    <TestOutput externals={[requestsLib]}>
      <py.StatementList>
        <py.ClassInstantiation target={requestsLib["models"].Request} />
      </py.StatementList>
    </TestOutput>,
  ).toRenderTo(
    `
    from requests.models import Request

    Request()
  `,
  );
});

it("Class instantiation without a reference", () => {
  expect(
    <TestOutput>
      <py.StatementList>
        <py.ClassInstantiation
          target={"ExampleClass"}
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
    ExampleClass("A name", 42, True)
  `,
  );
});

it("Class instantiation without a reference and with call statement vars", () => {
  expect(
    <TestOutput>
      <py.StatementList>
        <py.ClassInstantiation
          target={"ExampleClass"}
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
    ExampleClass(name="A name", number=42, flag=True)
  `,
  );
});

it("Class instantiation without a reference mixing unnamed and named vars", () => {
  expect(
    <TestOutput>
      <py.StatementList>
        <py.ClassInstantiation
          target={"ExampleClass"}
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
    ExampleClass("A name", number=42, flag=True)
  `,
  );
});

it("incorrect Class instantiation works", () => {
  expect(
    <TestOutput>
      <py.ClassInstantiation
        target="MyClass"
        args={[
          <py.ClassDeclaration name="NestedClass" />,
          <py.FunctionDeclaration name="myFunc" />,
          <py.StatementList>
            <py.VariableDeclaration name="x" />
          </py.StatementList>,
        ]}
      />
    </TestOutput>,
  ).toRenderTo(
    `
    MyClass(
        class NestedClass:
            pass
        ,
        def my_func():
            pass
        ,
        x = None
    )
  `,
  );
});
