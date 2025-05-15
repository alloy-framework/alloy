import { Output } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Python Class", () => {
  it("renders a method with no body as 'pass'", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Method name="foo" />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`def foo(self):\n  pass\n\n`);
  });

  it("renders a method with a body", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Method name="bar">print('hi')</py.Method>
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`def bar(self):\n  print('hi')\n\n`);
  });

  it("renders a method with parameters", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Method
            name="baz"
            parameters={[
              { name: "x", type: "int" },
              { name: "y", defaultValue: 0 },
            ]}
            args={true}
            kwargs={true}
          >
            print(x, y)
          </py.Method>
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(
      `def baz(self, x: int, y = 0, *args, **kwargs):\n  print(x, y)\n\n`,
    );
  });

  it("renders an init method with no body as 'pass'", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.InitMethod
            parameters={[{ name: "x" }, { name: "y", defaultValue: 0 }]}
          />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`def __init__(self, x, y = 0):\n  pass\n\n`);
  });
});
