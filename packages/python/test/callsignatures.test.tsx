import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Call Signature Parameters", () => {
  it("renders simple function parameters", () => {
    const result = toSourceText(
      <py.CallSignatureParameters parameters={["a", "b"]} />,
    );
    expect(result).toRenderTo(d`
      a, b
    `);
  });
  it("renders ParameterDescriptor parameters", () => {
    const result = toSourceText(
      <py.CallSignatureParameters
        parameters={[{ name: "a" }, { name: "b" }]}
      />,
    );
    expect(result).toRenderTo(d`
      a, b
    `);
  });
  it("renders ParameterDescriptor parameters with types", () => {
    const result = toSourceText(
      <py.CallSignatureParameters
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
      <py.CallSignatureParameters
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
      <py.CallSignatureParameters
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
      <py.CallSignatureParameters
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

describe("Call Signature", () => {
  it("renders a simple call signature", () => {
    const result = toSourceText(<py.CallSignature parameters={["a", "b"]} />);
    expect(result).toRenderTo(d`
      (a, b)
    `);
  });
  it("renders a simple call signature with args and kwargs", () => {
    const result = toSourceText(
      <py.CallSignature parameters={["a", "b"]} args kwargs />,
    );
    expect(result).toRenderTo(d`
      (a, b, *args, **kwargs)
    `);
  });
  it("renders a simple call signature with type parameters", () => {
    const result = toSourceText(
      <py.CallSignature parameters={["a", "b"]} typeParameters={["T", "U"]} />,
    );
    expect(result).toRenderTo(d`
      [T, U](a, b)
    `);
  });
  it("renders a simple call signature with return type", () => {
    const result = toSourceText(
      <py.CallSignature parameters={["a", "b"]} returnType="int" />,
    );
    expect(result).toRenderTo(d`
      (a, b) -> int
    `);
  });
  it("renders a simple call signature for a class function", () => {
    const result = toSourceText(
      <py.CallSignature parameters={["a", "b"]} classFunction />,
    );
    expect(result).toRenderTo(d`
      (cls, a, b)
    `);
  });
  it("renders a simple call signature for an instance function", () => {
    const result = toSourceText(
      <py.CallSignature parameters={["a", "b"]} instanceFunction />,
    );
    expect(result).toRenderTo(d`
      (self, a, b)
    `);
  });
  it("throws an error for a call signature that's instance and class function at the same time", () => {
    expect(() =>
      toSourceText(
        <py.CallSignature
          parameters={["a", "b"]}
          instanceFunction
          classFunction
        />,
      ),
    ).toThrowError(/Cannot be both an instance function and a class function/);
  });
  it("renders a simple call signature with all properties", () => {
    const result = toSourceText(
      <py.CallSignature
        parameters={["a", "b"]}
        instanceFunction
        args
        kwargs
        returnType="int"
      />,
    );
    expect(result).toRenderTo(d`
      (self, a, b, *args, **kwargs) -> int
    `);
  });
});

describe("Call Signature - Parameter Descriptors", () => {
  it("renders a call signature with parameter descriptors", () => {
    const result = toSourceText(
      <py.CallSignature
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str" },
        ]}
      />,
    );
    expect(result).toRenderTo(d`
      (a: int, b: str)
    `);
  });
  it("renders a call signature with parameter descriptors, args and kwargs", () => {
    const result = toSourceText(
      <py.CallSignature
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str" },
        ]}
        args
        kwargs
      />,
    );
    expect(result).toRenderTo(d`
      (a: int, b: str, *args, **kwargs)
    `);
  });
  it("renders a call signature with parameter descriptors and return type", () => {
    const result = toSourceText(
      <py.CallSignature
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str" },
        ]}
        returnType="int"
      />,
    );
    expect(result).toRenderTo(d`
      (a: int, b: str) -> int
    `);
  });
  it("renders a call signature with parameter descriptors for a class function", () => {
    const result = toSourceText(
      <py.CallSignature
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str" },
        ]}
        classFunction
      />,
    );
    expect(result).toRenderTo(d`
      (cls, a: int, b: str)
    `);
  });
  it("renders a call signature with parameter descriptors for an instance function", () => {
    const result = toSourceText(
      <py.CallSignature
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str" },
        ]}
        instanceFunction
      />,
    );
    expect(result).toRenderTo(d`
      (self, a: int, b: str)
    `);
  });
  it("renders a call signature with all", () => {
    const result = toSourceText(
      <py.CallSignature
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str" },
        ]}
        instanceFunction
        args
        kwargs
        returnType="int"
      />,
    );
    expect(result).toRenderTo(d`
      (self, a: int, b: str, *args, **kwargs) -> int
    `);
  });
  it("renders a more complex call signature with parameter descriptors", () => {
    const result = toSourceText(
      <py.CallSignature
        typeParameters={["T", "U"]}
        parameters={[
          { name: "a", type: "int" },
          { name: "b", type: "str", default: "default_value" },
        ]}
        returnType="int"
      />,
    );
    expect(result).toRenderTo(d`
      [T, U](a: int, b: str = "default_value") -> int
    `);
  });
});
