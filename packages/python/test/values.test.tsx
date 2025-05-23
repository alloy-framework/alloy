import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";

describe("Value", () => {
  it("renders string value", () => {
    expect(<py.Value jsValue={"Test"} />).toRenderTo('"Test"');
  });

  it("renders null/undefined object", () => {
    expect(<py.Value jsValue={undefined} />).toRenderTo("None");
  });

  it("renders number", () => {
    expect(<py.Value jsValue={123} />).toRenderTo("123");
  });

  it("renders boolean", () => {
    expect(<py.Value jsValue={true} />).toRenderTo("True");
  });

  it("renders other objects", () => {
    function Test() {
      return <>Test</>;
    }
    expect(<py.Value jsValue={Test} />).toRenderTo("Test");
  });

  it("renders array", () => {
    expect(<py.Value jsValue={[1, 2, 3]} />).toRenderTo("[1, 2, 3]");
  });

  it("renders object", () => {
    expect(<py.Value jsValue={{ a: 1, b: 2 }} />).toRenderTo('{"a": 1, "b": 2}');
  });

  it("renders empty object", () => {
    expect(<py.Value jsValue={{}} />).toRenderTo("{}");
  });

  it("renders function", () => {
    function Test() {
      return <>Test</>;
    }

    expect(<py.Value jsValue={Test} />).toRenderTo("Test");
  });

  it("renders nested object", () => {
    expect(<py.Value jsValue={{ a: { b: { c: 1 } }, d: 2 }} />).toRenderTo(
      '{"a": {"b": {"c": 1}}, "d": 2}',
    );
  });
});
