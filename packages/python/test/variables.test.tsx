import { refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

describe("Python Variable", () => {
  it("declares a python variable", () => {
    const res = toSourceText(
      <py.VariableDeclaration name="myVar" type="int" initializer={42} />,
    );
    expect(res).toBe(`my_var: int = 42`);
  });

  it("declares a python variable without value", () => {
    const res = toSourceText(
      <py.VariableDeclaration name="myVar" type="int" omitNone />,
    );
    expect(res).toBe(`my_var: int`);
  });

  it("declares a python variable without typeAnnotations", () => {
    const res = toSourceText(
      <py.VariableDeclaration name="myVar" initializer={42} />,
    );
    expect(res).toBe(`my_var = 42`);
  });

  it("declares a python variable as None when undefined", () => {
    const res = toSourceText(<py.VariableDeclaration name="myVar" />);
    expect(res).toBe(`my_var = None`);
  });

  it("declares a python variable as None when null", () => {
    const res = toSourceText(
      <py.VariableDeclaration
        name="myVar"
        initializer={<py.Value jsValue={null} />}
      />,
    );
    expect(res).toBe(`my_var = None`);
  });

  it("declares a python variable with a python value", () => {
    const res = toSourceText(
      <py.VariableDeclaration
        name="nameIdPairs"
        initializer={<py.Value jsValue={{ John: 123, Doe: 234 }} />}
      />,
    );
    expect(res).toBe(`name_id_pairs = {"John": 123, "Doe": 234}`);
  });

  it("declares a python variable receiving other variable as value", () => {
    const res = toSourceText(
      <>
        <py.VariableDeclaration name="my_var" initializer={42} />
        <hbr />
        <py.VariableDeclaration name="my_other_var" initializer={refkey("my_var")} />
      </>,
    );
    expect(res).toBe(`my_var = 42\nmy_other_var = my_var`);
  });
});
