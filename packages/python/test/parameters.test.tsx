import { Output } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Parameters", () => {
  it("creates empty parameters", () => {
    const result = toSourceText(
      <py.Parameters parameters={[]} />
    );
    expect(result).toRenderTo(`\n`);
  });
  it("creates a single parameter", () => {
    const result = toSourceText(
      <py.Parameters
        parameters={[{ name: "x", type: "int", defaultValue: 10 }]}
      />
    );
    expect(result).toRenderTo(`x: int = 10\n`);
  });

  it("creates multiple parameters", () => {
    const result = toSourceText(
      <py.Parameters
        parameters={[
          { name: "x", type: "int" },
          {
            name: "y",
            type: "str",
            defaultValue: <py.Value jsValue="hello" />,
          },
        ]}
      />
    );
    expect(result).toRenderTo(`x: int, y: str = "hello"`);
  });

  it("creates multiple parameters", () => {
    const result = toSourceText(
      <py.Parameters
        parameters={[
          { name: "x", type: "int" },
          {
            name: "y",
            type: "dict",
            defaultValue: <py.Value jsValue={{ John: 123, Doe: 234 }} />,
          },
        ]}
      />
    );
    expect(result).toRenderTo(`x: int, y: dict = {"John": 123, "Doe": 234}`);
  });

  it("creates multiple parameters with *args and *kwargs", () => {
    const result = toSourceText(
      <py.Parameters
        parameters={[
          { name: "x", type: "int" },
          {
            name: "y",
            type: "dict",
            defaultValue: <py.Value jsValue={{ John: 123, Doe: 234 }} />,
          },
        ]}
        args={true}
        kwargs={true}
      />
    );
    expect(result).toRenderTo(
      `x: int, y: dict = {"John": 123, "Doe": 234}, *args, **kwargs`,
    );
  });

  it("creates error when non default argument follows default", () => {
    expect(() =>
      toSourceText(
        <py.Parameters
          parameters={[
            { name: "x", type: "int" },
            { name: "y", type: "int", defaultValue: 10 },
            { name: "z", type: "int" },
          ]}
        />
      ),
    ).toThrow(
      "Non-default argument 'z' follows default argument in Python parameters.",
    );
  });
  it("creates parameters for an instantiation", () => {
    const result = toSourceText(
      <py.CallStatementParameters
        parameters={[
          { name: "name", value: <py.Value jsValue={"A name"} /> },
          { name: "number", value: <py.Value jsValue={42} /> },
          { value: <py.Value jsValue={true} /> },
        ]}
      />
    );
    expect(result).toRenderTo(`name="A name", number=42, True`);
  });
});
