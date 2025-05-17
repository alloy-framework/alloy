import { Output } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Parameters", () => {
  it("creates empty parameters", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Parameters parameters={[]} />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`\n`);
  });
  it("creates a single parameter", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Parameters
            parameters={[{ name: "x", type: "int", defaultValue: 10 }]}
          />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`x: int = 10\n`);
  });

  it("creates multiple parameters", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Parameters
            parameters={[
              { name: "x", type: "int" },
              {
                name: "y",
                type: "str",
                defaultValue: <py.Value value="hello" />,
              },
            ]}
          />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`x: int, y: str = "hello"`);
  });

  it("creates multiple parameters", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Parameters
            parameters={[
              { name: "x", type: "int" },
              {
                name: "y",
                type: "dict",
                defaultValue: <py.Value value={{ John: 123, Doe: 234 }} />,
              },
            ]}
          />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(`x: int, y: dict = {"John": 123, "Doe": 234}`);
  });

  it("creates multiple parameters with *args and *kwargs", () => {
    const result = toSourceText(
      <Output>
        <py.SourceFile path="test.py">
          <py.Parameters
            parameters={[
              { name: "x", type: "int" },
              {
                name: "y",
                type: "dict",
                defaultValue: <py.Value value={{ John: 123, Doe: 234 }} />,
              },
            ]}
            args={true}
            kwargs={true}
          />
        </py.SourceFile>
      </Output>,
    );
    expect(result).toRenderTo(
      `x: int, y: dict = {"John": 123, "Doe": 234}, *args, **kwargs`,
    );
  });

  it("creates error when non default argument follows default", () => {
    expect(() =>
      toSourceText(
        <Output>
          <py.SourceFile path="test.py">
            <py.Parameters
              parameters={[
                { name: "x", type: "int" },
                { name: "y", type: "int", defaultValue: 10 },
                { name: "z", type: "int" },
              ]}
            />
          </py.SourceFile>
        </Output>,
      ),
    ).toThrow(
      "Non-default argument 'z' follows default argument in Python parameters.",
    );
  });
});
