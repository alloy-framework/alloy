import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

/**
 * toSourceText wraps the children in a SourceFile component
 * and renders it to a string.
 */
it("renders an empty source file", () => {
  const result = toSourceText([]);
  const expected = d`


  `;
  expect(result).toRenderTo(expected);
});

it("correct formatting of source file", () => {
  const result = toSourceText([
    <py.ClassDeclaration name="someClass">
      <py.StatementList>
        <py.FunctionDeclaration name="someMethod" returnType="str">
          <py.StatementList>
            <py.VariableDeclaration
              name="x"
              type="int"
              initializer={<py.Value jsValue={42} />}
            />
            <py.VariableDeclaration
              name="y"
              type="int"
              initializer={<py.Value jsValue={42} />}
            />
            <py.FunctionCallExpression target="foo" args={["a", "b"]} />
            <py.MemberExpression>
              <py.MemberExpression.Part id="a" />
              <py.MemberExpression.Part id="b" />
              <py.MemberExpression.Part key={"special-prop"} />
            </py.MemberExpression>
            <py.VariableDeclaration
              name="z"
              type="int"
              initializer={<py.Value jsValue={42} />}
            />
          </py.StatementList>
        </py.FunctionDeclaration>
        <py.VariableDeclaration
          name="someVar"
          type="int"
          initializer={<py.Value jsValue={42} />}
        />
        <py.FunctionDeclaration name="someOtherMethod" returnType="str" />
        <py.VariableDeclaration
          name="someOtherVar"
          type="int"
          initializer={<py.Value jsValue={42} />}
        />
      </py.StatementList>
    </py.ClassDeclaration>,
    <py.FunctionDeclaration name="someFunction">
      <py.StatementList>
        <py.VariableDeclaration
          name="x"
          type="int"
          initializer={<py.Value jsValue={42} />}
        />
        <py.VariableDeclaration
          name="y"
          type="int"
          initializer={<py.Value jsValue={42} />}
        />
        <py.FunctionCallExpression target="foo" args={["a", "b"]} />
        <py.MemberExpression>
          <py.MemberExpression.Part id="a" />
          <py.MemberExpression.Part id="b" />
          <py.MemberExpression.Part key={"special-prop"} />
        </py.MemberExpression>
        <py.VariableDeclaration
          name="z"
          type="int"
          initializer={<py.Value jsValue={42} />}
        />
      </py.StatementList>
    </py.FunctionDeclaration>,
    <py.ClassDeclaration name="someOtherClass">
      <py.StatementList>
        <py.FunctionDeclaration name="someMethod" returnType="str" />
      </py.StatementList>
    </py.ClassDeclaration>,
    <py.MemberExpression>
      <py.MemberExpression.Part id="a" />
      <py.MemberExpression.Part id="b" />
      <py.MemberExpression.Part key={"special-prop"} />
    </py.MemberExpression>,
  ]);
  const expected = d`
    class SomeClass:
        def some_method() -> str:
            x: int = 42
            y: int = 42
            foo(a, b)
            a.b["special-prop"]
            z: int = 42

        some_var: int = 42
        def some_other_method() -> str:
            pass

        some_other_var: int = 42


    def some_function():
        x: int = 42
        y: int = 42
        foo(a, b)
        a.b["special-prop"]
        z: int = 42


    class SomeOtherClass:
        def some_method() -> str:
            pass



    a.b["special-prop"]

  `;
  expect(result).toRenderTo(expected);
});
