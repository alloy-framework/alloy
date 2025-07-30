import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { createModule } from "../src/create-module.js";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

it("declaration of class instance with variables", () => {
  // Creating the reference separately so the naming policy doesn't interfere
  const classRef = refkey();
  const result = toSourceText([
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
    </py.StatementList>,
  ]);
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
    [
      <py.StatementList>
        <py.ClassInstantiation target={requestsLib["models"].Request} />
      </py.StatementList>,
    ],
    { externals: [requestsLib] },
  );
  const expected = d`
    from requests.models import Request

    Request()
  `;
  expect(result).toRenderTo(expected);
});

it("Class instantiation without a reference", () => {
  const result = toSourceText([
    <py.StatementList>
      <py.ClassInstantiation
        target={"ExampleClass"}
        args={[
          <py.Atom jsValue={"A name"} />,
          <py.Atom jsValue={42} />,
          <py.Atom jsValue={true} />,
        ]}
      />
    </py.StatementList>,
  ]);
  const expected = d`
    ExampleClass("A name", 42, True)
  `;
  expect(result).toRenderTo(expected);
});

it("Class instantiation without a reference and with call statement vars", () => {
  const result = toSourceText([
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
    </py.StatementList>,
  ]);
  const expected = d`
    ExampleClass(name="A name", number=42, flag=True)
  `;
  expect(result).toRenderTo(expected);
});

it("Class instantiation without a reference mixing unnamed and named vars", () => {
  const result = toSourceText([
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
    </py.StatementList>,
  ]);
  const expected = d`
    ExampleClass("A name", number=42, flag=True)
  `;
  expect(result).toRenderTo(expected);
});

it("incorrect Class instantiation works", () => {
  const result = toSourceText([
    <py.ClassInstantiation
      target="MyClass"
      args={[
        <py.ClassDeclaration name="NestedClass" />,
        <py.FunctionDeclaration name="myFunc" />,
        <py.StatementList>
          <py.VariableDeclaration name="x" />
        </py.StatementList>,
      ]}
    />,
  ]);

  const expected = d`
    MyClass(
        class NestedClass:
            pass
        ,
        def my_func():
            pass
        ,
        x = None
    )
  `;
  expect(result).toRenderTo(expected);
});
