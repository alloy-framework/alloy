import { Output } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Python Method", () => {
  it("renders a method with no body as 'pass'", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Method name="foo" isInstanceMethod={true} />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(d`
      def foo(self):
        pass
    `);
  });

  it("renders an instance method with a body", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Method name="bar" isInstanceMethod={true}>
            print('hi')
          </py.Method>
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(d`
      def bar(self):
        print('hi')
    `);
  });

  it("renders a class method with a body", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Method name="bar" isClassMethod={true}>
            print('hi')
          </py.Method>
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(d`
      def bar(cls):
        print('hi')
    `);
  });

  it("renders a function with parameters", () => {
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
      d`
        def baz(x: int, y = 0, *args, **kwargs):
          print(x, y)
      `,
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
    expect(result).toRenderTo(d`
      def __init__(self, x, y = 0):
        pass
    `);
  });
});
