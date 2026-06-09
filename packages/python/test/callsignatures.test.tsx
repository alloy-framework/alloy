import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.jsx";

describe("Call Signature Parameters", () => {
  it("renders simple function parameters", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters parameters={["a", "b"]} />
      </TestOutput>,
    ).toRenderTo(`
      a, b
    `);
  });
  it("renders ParameterDescriptor parameters", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters
              parameters={[{ name: "a" }, { name: "b" }]}
            />
      </TestOutput>,
    ).toRenderTo(`
      a, b
    `);
  });
  it("renders ParameterDescriptor parameters with types", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters
              parameters={[
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "str",
                },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      a: int, b: str
    `);
  });
  it("renders optional ParameterDescriptor parameters with types", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters
              parameters={[
                {
                  name: "a",
                  type: "int",
                  default: null,
                },
                {
                  name: "b",
                  type: "str",
                  default: null,
                },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      a: int = None, b: str = None
    `);
  });
  it("renders optional ParameterDescriptor parameters default", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters
              parameters={[
                { name: "a", default: 5 },
                { name: "b", default: "hello" },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      a=5, b="hello"
    `);
  });
  it("renders optional ParameterDescriptor parameters with types and default", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters
              parameters={[
                {
                  name: "a",
                  type: "int",
                  default: 5,
                },
                {
                  name: "b",
                  type: "str",
                  default: "hello",
                },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      a: int = 5, b: str = "hello"
    `);
  });
  it("renders keyword-only parameters with * marker", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters
              parameters={[
                { name: "a", type: "str" },
                "*",
                { name: "b", type: "int", default: 10 },
                { name: "c", type: "bool", default: true },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      a: str, *, b: int = 10, c: bool = True
    `);
  });
  it("renders only keyword-only parameters with * marker at start", () => {
        expect(
      <TestOutput>
      <py.CallSignatureParameters
              parameters={[
                "*",
                { name: "a", type: "str", default: "hello" },
                { name: "b", type: "int", default: 42 },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      *, a: str = "hello", b: int = 42
    `);
  });
});

describe("Call Signature", () => {
  it("renders a call signature with strings", () => {
        expect(
      <TestOutput>
      <py.CallSignature parameters={["a", "b"]} />
      </TestOutput>,
    ).toRenderTo(`
      (a, b)
    `);
  });
  it("renders a call signature with parameter descriptors", () => {
        expect(
      <TestOutput>
      <py.CallSignature parameters={[{ name: "a" }, { name: "b" }]} />
      </TestOutput>,
    ).toRenderTo(`
      (a, b)
    `);
  });
  it("renders a call signature with mixed strings and parameter descriptors", () => {
        expect(
      <TestOutput>
      <py.CallSignature parameters={["a", { name: "b" }]} />
      </TestOutput>,
    ).toRenderTo(`
      (a, b)
    `);
  });
  it("renders a simple call signature with args and kwargs", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[{ name: "a" }, { name: "b" }]}
              args
              kwargs
            />
      </TestOutput>,
    ).toRenderTo(`
      (a, b, *args, **kwargs)
    `);
  });
  it("renders a simple call signature with type parameters", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[{ name: "a" }, { name: "b" }]}
              typeParameters={["T", "U"]}
            />
      </TestOutput>,
    ).toRenderTo(`
      [T, U](a, b)
    `);
  });
  it("renders a simple call signature with return type", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[{ name: "a" }, { name: "b" }]}
              returnType="int"
            />
      </TestOutput>,
    ).toRenderTo(`
      (a, b) -> int
    `);
  });
});

describe("Call Signature - Parameter Descriptors", () => {
  it("renders a call signature with parameter descriptors", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "str",
                },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, b: str)
    `);
  });
  it("renders a call signature with parameter descriptors, args and kwargs", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "str",
                },
              ]}
              args
              kwargs
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, b: str, *args, **kwargs)
    `);
  });
  it("renders a call signature with parameter descriptors and return type", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "str",
                },
              ]}
              returnType="int"
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, b: str) -> int
    `);
  });
  it("renders a call signature with parameter descriptors for a class function", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "str",
                },
              ]}
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, b: str)
    `);
  });
  it("renders a call signature with all", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "str",
                },
              ]}
              args
              kwargs
              returnType="int"
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, b: str, *args, **kwargs) -> int
    `);
  });
  it("renders a more complex call signature with parameter descriptors", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              typeParameters={["T", "U"]}
              parameters={[
                {
                  name: "a",
                  type: "int",
                },
                {
                  name: "b",
                  type: "str",
                  default: "default_value",
                },
              ]}
              returnType="int"
            />
      </TestOutput>,
    ).toRenderTo(`
      [T, U](a: int, b: str = "default_value") -> int
    `);
  });
  it("renders a call signature with keyword-only parameters using * marker", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                { name: "id", type: "str" },
                "*",
                { name: "locale", type: "str", default: "en-US" },
                { name: "debug", type: "bool", default: false },
              ]}
              returnType="str"
            />
      </TestOutput>,
    ).toRenderTo(`
      (id: str, *, locale: str = "en-US", debug: bool = False) -> str
    `);
  });
  it("renders a call signature with only keyword-only parameters", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                "*",
                { name: "name", type: "str", default: "alice" },
                { name: "age", type: "int", default: 30 },
              ]}
              returnType="None"
            />
      </TestOutput>,
    ).toRenderTo(`
      (*, name: str = "alice", age: int = 30) -> None
    `);
  });
  it("renders a call signature with positional, keyword-only, and *args/**kwargs", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                { name: "a", type: "int" },
                "*",
                { name: "b", type: "str", default: "hello" },
              ]}
              args
              kwargs
              returnType="None"
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, *, b: str = "hello", *args, **kwargs) -> None
    `);
  });
  it("renders a call signature with positional-only parameters using / marker", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                { name: "a", type: "int" },
                { name: "b", type: "str" },
                "/",
                { name: "c", type: "bool" },
              ]}
              returnType="None"
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, b: str, /, c: bool) -> None
    `);
  });
  it("renders a call signature with positional-only, regular, and keyword-only parameters", () => {
        expect(
      <TestOutput>
      <py.CallSignature
              parameters={[
                { name: "a", type: "int" },
                "/",
                { name: "b", type: "str" },
                "*",
                { name: "c", type: "bool", default: true },
              ]}
              returnType="None"
            />
      </TestOutput>,
    ).toRenderTo(`
      (a: int, /, b: str, *, c: bool = True) -> None
    `);
  });
});
