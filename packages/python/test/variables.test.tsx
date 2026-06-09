import { namekey, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import {
  TestOutput,
  TestOutputDirectory,
} from "./utils.js";

describe("Python Variable", () => {
  it("declares a python variable", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration name="myVar" type="int" initializer={42} />
      </TestOutput>,
    ).toRenderTo("my_var: int = 42");
  });

  it("takes a namekey", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration
          name={namekey("my-var")}
          type="int"
          initializer={42}
        />
      </TestOutput>,
    ).toRenderTo("my_var: int = 42");
  });

  it("takes a namekey", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration
          name={namekey("my-var")}
          type="int"
          initializer={42}
        />
      </TestOutput>,
    ).toRenderTo("my_var: int = 42");
  });

  it("declares a python variable without value", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration name="myVar" type="int" omitNone />
      </TestOutput>,
    ).toRenderTo("my_var: int");
  });

  it("declares a python variable without typeAnnotations", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration name="myVar" initializer={42} />
      </TestOutput>,
    ).toRenderTo("my_var = 42");
  });

  it("declares a python variable as None when undefined", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration name="myVar" />
      </TestOutput>,
    ).toRenderTo("my_var = None");
  });

  it("declares a python variable as None when null", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration
          name="myVar"
          initializer={<py.Atom jsValue={null} />}
        />
      </TestOutput>,
    ).toRenderTo("my_var = None");
  });

  it("declares a python variable that's an array", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration
          name="numbers"
          type={<py.TypeReference name="list" typeArgs={["int"]} />}
          initializer={<py.Atom jsValue={[1, 2, 3]} />}
        />
      </TestOutput>,
    ).toRenderTo("numbers: list[int] = [1, 2, 3]");
  });

  it("declares a python variable with a python value", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration
          name="nameIdPairs"
          initializer={<py.Atom jsValue={{ John: 123, Doe: 234 }} />}
        />
      </TestOutput>,
    ).toRenderTo(
      `name_id_pairs = {"John": 123, "Doe": 234}`,
    );
  });

  it("declares a python variable with omitNone", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration name="omitNoneVar" type="int" omitNone={true} />
      </TestOutput>,
    ).toRenderTo("omit_none_var: int");
  });

  it("declares a call statement python variable", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration
          name="callStmtVar"
          initializer={12}
          callStatementVar={true}
        />
      </TestOutput>,
    ).toRenderTo("call_stmt_var=12");
  });

  it("declares a call statement python variable without name", () => {
    expect(
      <TestOutput>
        <py.VariableDeclaration
          name=""
          initializer={12}
          callStatementVar={true}
        />
      </TestOutput>,
    ).toRenderTo("12");
  });

  it("declares a python variable with an optional type", () => {
    expect(
      <TestOutput>
        <py.StatementList>
          <py.VariableDeclaration
            name="my_var"
            type={
              <py.UnionTypeExpression>{["int", "None"]}</py.UnionTypeExpression>
            }
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      my_var: int | None = None`,
    );
  });

  it("declares a python variable with an optional type omitting none", () => {
    expect(
      <TestOutput>
        <py.StatementList>
          <py.VariableDeclaration
            name="my_var"
            type={
              <py.UnionTypeExpression>{["int", "None"]}</py.UnionTypeExpression>
            }
            omitNone
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      my_var: int | None`,
    );
  });

  it("declares a python variable with a class type", () => {
    const classKey = refkey();
    expect(
      <TestOutput>
        <py.StatementList>
          <py.ClassDeclaration name="MyClass" refkey={classKey} />
          <py.VariableDeclaration
            name="my_var"
            type={<py.Reference refkey={classKey} />}
          />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo(
      `
      class MyClass:
          pass

      my_var: MyClass = None`,
    );
  });

  it("declares a python variable with a class type from a different module", () => {
    const classKey = refkey();
    expect(
      <TestOutputDirectory>
        <py.SourceFile path="classes.py">
          <py.ClassDeclaration name="MyClass" refkey={classKey} />
        </py.SourceFile>
        <py.SourceFile path="usage.py">
          <py.VariableDeclaration name="my_var" type={classKey} />
        </py.SourceFile>
      </TestOutputDirectory>,
    ).toRenderTo(
      {
        "classes.py": `
          class MyClass:
              pass

        `,
        "usage.py": `
          from typing import TYPE_CHECKING

          if TYPE_CHECKING:
              from classes import MyClass

          my_var: MyClass = None
        `,
      },
    );
  });

  it("declares a python variable receiving other variable as value", () => {
    const varKey = refkey();
    expect(
      <TestOutput>
        <py.StatementList>
          <py.VariableDeclaration
            name="my_var"
            refkey={varKey}
            initializer={42}
          />
          <py.VariableDeclaration name="my_other_var" initializer={varKey} />
        </py.StatementList>
      </TestOutput>,
    ).toRenderTo("my_var = 42\nmy_other_var = my_var");
  });
});
