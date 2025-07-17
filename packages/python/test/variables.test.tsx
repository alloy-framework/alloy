import { refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { assertFileContents, toSourceText, toSourceTextMultiple } from "./utils.jsx";
import { d } from "@alloy-js/core/testing";

describe("Python Variable", () => {
  it("declares a python variable", () => {
    const res = toSourceText([
      <py.VariableDeclaration name="myVar" type="int" initializer={42} />,
    ]);
    expect(res).toBe(`my_var: int = 42`);
  });

  it("declares a python variable without value", () => {
    const res = toSourceText([
      <py.VariableDeclaration name="myVar" type="int" omitNone />,
    ]);
    expect(res).toBe(`my_var: int`);
  });

  it("declares a python variable without typeAnnotations", () => {
    const res = toSourceText([
      <py.VariableDeclaration name="myVar" initializer={42} />,
    ]);
    expect(res).toBe(`my_var = 42`);
  });

  it("declares a python variable as None when undefined", () => {
    const res = toSourceText([<py.VariableDeclaration name="myVar" />]);
    expect(res).toBe(`my_var = None`);
  });

  it("declares a python variable as None when null", () => {
    const res = toSourceText([
      <py.VariableDeclaration
        name="myVar"
        initializer={<py.Value jsValue={null} />}
      />,
    ]);
    expect(res).toBe(`my_var = None`);
  });

  it("declares a python variable with a python value", () => {
    const res = toSourceText([
      <py.VariableDeclaration
        name="nameIdPairs"
        initializer={<py.Value jsValue={{ John: 123, Doe: 234 }} />}
      />,
    ]);
    expect(res).toBe(`name_id_pairs = {"John": 123, "Doe": 234}`);
  });

  it("declares a python variable with omitNone", () => {
    const res = toSourceText([
      <py.VariableDeclaration name="omitNoneVar" type="int" omitNone={true} />,
    ]);
    expect(res).toBe(`omit_none_var: int`);
  });

  it("declares a call statement python variable", () => {
    const res = toSourceText([
      <py.VariableDeclaration
        name="callStmtVar"
        initializer={12}
        callStatementVar={true}
      />,
    ]);
    expect(res).toBe(`call_stmt_var=12`);
  });

  it("declares a call statement python variable without name", () => {
    const res = toSourceText([
      <py.VariableDeclaration
        name=""
        initializer={12}
        callStatementVar={true}
      />,
    ]);
    expect(res).toBe(`12`);
  });

  it("declares a python variable with a class type", () => {
    const res = toSourceText([
      <py.StatementList>
        <py.ClassDeclaration name="MyClass" />
        <py.VariableDeclaration name="my_var" type={<py.Reference refkey={refkey("MyClass")} />} />
      </py.StatementList>,
    ]);
    expect(res).toBe(d`
      class MyClass:
          pass

      my_var: MyClass = None`);
  });

  it("declares a python variable with a class type from a different module", () => {
    const res = toSourceTextMultiple([
      <py.SourceFile path="classes.py">
        <py.ClassDeclaration name="MyClass" />
      </py.SourceFile>,
      <py.SourceFile path="usage.py">
        <py.VariableDeclaration name="my_var" type={<py.Reference refkey={refkey("MyClass")} />} />
      </py.SourceFile>
      ,
    ]);
    assertFileContents(res, {
      "classes.py": `
        class MyClass:
            pass

      `,
      "usage.py": `
        from classes import MyClass

        my_var: MyClass = None
      `,
    });
  });

  it("declares a python variable receiving other variable as value", () => {
    const res = toSourceText([
      <py.StatementList>
        <py.VariableDeclaration name="my_var" initializer={42} />
        <py.VariableDeclaration
          name="my_other_var"
          initializer={refkey("my_var")}
        />
      </py.StatementList>,
    ]);
    expect(res).toBe(`my_var = 42\nmy_other_var = my_var`);
  });
});
