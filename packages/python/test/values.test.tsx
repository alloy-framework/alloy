import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("Value", () => {
  it("renders string value", () => {
    expect(toSourceText(<py.Value jsValue={"Test"} />)).toRenderTo('"Test"');
  });

  it("renders null/undefined object", () => {
    expect(toSourceText(<py.Value jsValue={undefined} />)).toRenderTo("None");
  });

  it("renders number", () => {
    expect(toSourceText(<py.Value jsValue={123} />)).toRenderTo("123");
  });

  it("renders boolean - True", () => {
    expect(toSourceText(<py.Value jsValue={true} />)).toRenderTo("True");
  });

  it("renders boolean - False", () => {
    expect(toSourceText(<py.Value jsValue={false} />)).toRenderTo("False");
  });

  it("renders array", () => {
    expect(toSourceText(<py.Value jsValue={[1, 2, 3]} />)).toRenderTo(
      "[1, 2, 3]",
    );
  });

  it("renders object", () => {
    expect(toSourceText(<py.Value jsValue={{ a: 1, b: 2 }} />)).toRenderTo(
      '{"a": 1, "b": 2}',
    );
  });

  it("renders more complex object", () => {
    expect(
      toSourceText(<py.Value jsValue={{ a: "1", b: 2, c: true }} />),
    ).toRenderTo('{"a": "1", "b": 2, "c": True}');
  });

  it("renders empty object", () => {
    expect(toSourceText(<py.Value jsValue={{}} />)).toRenderTo("{}");
  });

  it("renders function", () => {
    function Test() {
      return <>Test</>;
    }

    expect(toSourceText(<py.Value jsValue={Test} />)).toRenderTo("Test");
  });

  it("renders nested object", () => {
    expect(
      toSourceText(<py.Value jsValue={{ a: { b: { c: 1 } }, d: 2 }} />),
    ).toRenderTo('{"a": {"b": {"c": 1}}, "d": 2}');
  });
});
