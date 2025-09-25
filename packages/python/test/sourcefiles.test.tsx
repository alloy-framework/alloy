import { Prose } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as py from "../src/index.js";
import {
  assertFileContents,
  toSourceText,
  toSourceTextMultiple,
} from "./utils.jsx";

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
              initializer={<py.Atom jsValue={42} />}
            />
            <py.VariableDeclaration
              name="y"
              type="int"
              initializer={<py.Atom jsValue={42} />}
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
              initializer={<py.Atom jsValue={42} />}
            />
          </py.StatementList>
        </py.FunctionDeclaration>
        <py.VariableDeclaration
          name="someVar"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
        <py.FunctionDeclaration name="someOtherMethod" returnType="str" />
        <py.VariableDeclaration
          name="someOtherVar"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
      </py.StatementList>
    </py.ClassDeclaration>,
    <py.FunctionDeclaration name="someFunction">
      <py.StatementList>
        <py.VariableDeclaration
          name="x"
          type="int"
          initializer={<py.Atom jsValue={42} />}
        />
        <py.VariableDeclaration
          name="y"
          type="int"
          initializer={<py.Atom jsValue={42} />}
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
          initializer={<py.Atom jsValue={42} />}
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

it("renders module documentation correctly", () => {
  const moduleDoc = (
    <py.ModuleDoc
      description={[
        <Prose>
          This module provides utility functions for data processing. It
          includes functions for validation, transformation, and analysis.
        </Prose>,
      ]}
      attributes={[
        {
          name: "DEFAULT_TIMEOUT",
          type: "int",
          children: "Default timeout value in seconds.",
        },
        {
          name: "MAX_RETRIES",
          type: "int",
          children: "Maximum number of retry attempts.",
        },
      ]}
      todo={["Add caching functionality", "Improve error messages"]}
      style="google"
    />
  );

  const content = (
    <py.SourceFile path="utils.py" doc={moduleDoc}>
      <py.VariableDeclaration name="DEFAULT_TIMEOUT" initializer={30} />
      <py.VariableDeclaration name="MAX_RETRIES" initializer={3} />
      <py.FunctionDeclaration name="process_data">pass</py.FunctionDeclaration>
    </py.SourceFile>
  );

  const res = toSourceTextMultiple([content]);
  const file = res.contents.find(
    (f) => f.kind === "file" && f.path === "utils.py",
  );
  expect(file).toBeDefined();

  assertFileContents(res, {
    "utils.py": d`
        """
        This module provides utility functions for data processing. It includes
        functions for validation, transformation, and analysis.

        Attributes:
            DEFAULT_TIMEOUT (int): Default timeout value in seconds.

            MAX_RETRIES (int): Maximum number of retry attempts.

        Todo:
            * Add caching functionality
            * Improve error messages
        """


        default_timeout = 30

        max_retries = 3

        def process_data():
            pass


        `,
  });
});

it("renders source file without documentation correctly", () => {
  const content = (
    <py.SourceFile path="simple.py">
      <py.FunctionDeclaration name="hello_world">
        print("Hello, World!")
      </py.FunctionDeclaration>
    </py.SourceFile>
  );

  const res = toSourceTextMultiple([content]);
  const file = res.contents.find(
    (f) => f.kind === "file" && f.path === "simple.py",
  );
  expect(file).toBeDefined();

  assertFileContents(res, {
    "simple.py": d`
        def hello_world():
            print("Hello, World!")


        `,
  });
});
