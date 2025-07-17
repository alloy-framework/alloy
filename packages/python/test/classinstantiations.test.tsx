import { refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { createModule } from "../src/create-module.js";
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
          <py.Value jsValue={"A name"} />,
          <py.Value jsValue={42} />,
          <py.Value jsValue={true} />,
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
          <py.Value jsValue={"A name"} />,
          <py.Value jsValue={42} />,
          <py.Value jsValue={true} />,
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
          <py.Value jsValue={"A name"} />,
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
