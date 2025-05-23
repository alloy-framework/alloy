import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

describe("Python Variable", () => {
  it("declares a python variable", () => {
    const policy = py.createPythonNamePolicy();
    const res = toSourceText(
      <py.SourceFile path="test.py">
        <py.VariableDeclaration name="myVar" type="int" value={42} />
      </py.SourceFile>,
      policy,
    );
    expect(res).toBe(`my_var: int = 42`);
  });

  it("declares a python variable without typeAnnotations", () => {
    const policy = py.createPythonNamePolicy();
    const res = toSourceText(
      <py.SourceFile path="test.py">
        <py.VariableDeclaration name="myVar" value={42} />
      </py.SourceFile>,
      policy,
    );
    expect(res).toBe(`my_var = 42`);
  });

  it("declares a python variable as None when undefined", () => {
    const policy = py.createPythonNamePolicy();
    const res = toSourceText(
      <py.SourceFile path="test.py">
        <py.VariableDeclaration name="myVar" />
      </py.SourceFile>,
      policy,
    );
    expect(res).toBe(`my_var = None`);
  });

  it("declares a python variable as None when null", () => {
    const policy = py.createPythonNamePolicy();
    const res = toSourceText(
      <py.SourceFile path="test.py">
        <py.VariableDeclaration name="myVar" value={<py.Value jsValue={null} />} />
      </py.SourceFile>,
      policy,
    );
    expect(res).toBe(`my_var = None`);
  });

  it("declares a python variable with a python value", () => {
    const policy = py.createPythonNamePolicy();
    const res = toSourceText(
      <py.SourceFile path="test.py">
        <py.VariableDeclaration
          name="nameIdPairs"
          value={<py.Value jsValue={{ John: 123, Doe: 234 }} />}
        />
      </py.SourceFile>,
      policy,
    );
    expect(res).toBe(`name_id_pairs = {"John": 123, "Doe": 234}`);
  });
});
