import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Function Base", () => {
  it("renders simple function parameters", () => {
    const result = toSourceText(
      <py.FunctionParameters parameters={["a", "b"]} />,
    );
    expect(result).toRenderTo(d`
      a, b
    `);
  });
  it("renders ParameterDescriptor parameters", () => {
    const result = toSourceText(
      <py.FunctionParameters parameters={[{ name: "a" }, { name: "b" }]} />,
    );
    expect(result).toRenderTo(d`
      a, b
    `);
  });
  it("renders ParameterDescriptor parameters with types", () => {
    const result = toSourceText(
      <py.FunctionParameters
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str" },
        ]}
      />,
    );
    expect(result).toRenderTo(d`
      a: int, b: str
    `);
  });
  it("renders optional ParameterDescriptor parameters with types", () => {
    const result = toSourceText(
      <py.FunctionParameters
        parameters={[
          { name: "a", type: "int", optional: true },
          { name: "b", type: "str", optional: true },
        ]}
      />,
    );
    expect(result).toRenderTo(d`
      a: int = None, b: str = None
    `);
  });
  it("renders optional ParameterDescriptor parameters default", () => {
    const result = toSourceText(
      <py.FunctionParameters
        parameters={[
          { name: "a", default: 5 },
          { name: "b", default: "hello" },
        ]}
      />,
    );
    expect(result).toRenderTo(d`
      a=5, b="hello"
    `);
  });
  it("renders optional ParameterDescriptor parameters with types and default", () => {
    const result = toSourceText(
      <py.FunctionParameters
        parameters={[
          { name: "a", type: "int", optional: true, default: 5 },
          { name: "b", type: "str", optional: true, default: "hello" },
        ]}
      />,
    );
    expect(result).toRenderTo(d`
      a: int = 5, b: str = "hello"
    `);
  });
});
