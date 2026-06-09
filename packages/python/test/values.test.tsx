import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { TestOutput } from "./utils.js";

describe("Atom", () => {
  it("renders string value", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={"Test"} />
      </TestOutput>,
    ).toRenderTo('"Test"');
  });

  it("renders null/undefined object", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={undefined} />
      </TestOutput>,
    ).toRenderTo("None");
  });

  it("renders number", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={123} />
      </TestOutput>,
    ).toRenderTo("123");
  });

  it("renders floating point number", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={123.456} />
      </TestOutput>,
    ).toRenderTo("123.456");
  });

  it("renders floating point number when hinted", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={123.456} asFloat />
      </TestOutput>,
    ).toRenderTo("123.456");
  });

  it("renders floating point number with decimal point zero when hinted", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={123.0} asFloat />
      </TestOutput>,
    ).toRenderTo("123.0");
  });

  it("renders integer as float when hinted", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={123} asFloat />
      </TestOutput>,
    ).toRenderTo("123.0");
  });

  it("renders small positive float when hinted", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={0.07} asFloat />
      </TestOutput>,
    ).toRenderTo("0.07");
  });

  it("renders large positive numbers as float when hinted", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={2 ** 64} asFloat />
      </TestOutput>,
    ).toRenderTo("18446744073709551616.0");
  });

  it("renders boolean - True", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={true} />
      </TestOutput>,
    ).toRenderTo("True");
  });

  it("renders boolean - False", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={false} />
      </TestOutput>,
    ).toRenderTo("False");
  });

  it("renders array", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={[1, 2, 3]} />
      </TestOutput>,
    ).toRenderTo("[1, 2, 3]");
  });

  it("renders object", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={{ a: 1, b: 2 }} />
      </TestOutput>,
    ).toRenderTo('{"a": 1, "b": 2}');
  });

  it("renders more complex object", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={{ a: "1", b: 2, c: true }} />
      </TestOutput>,
    ).toRenderTo('{"a": "1", "b": 2, "c": True}');
  });

  it("renders empty object", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={{}} />
      </TestOutput>,
    ).toRenderTo("{}");
  });

  it("renders function", () => {
    function Test() {
      return <>Test</>;
    }

    expect(
      <TestOutput>
        <py.Atom jsValue={Test} />
      </TestOutput>,
    ).toRenderTo("Test");
  });

  it("renders nested object", () => {
    expect(
      <TestOutput>
        <py.Atom jsValue={{ a: { b: { c: 1 } }, d: 2 }} />
      </TestOutput>,
    ).toRenderTo('{"a": {"b": {"c": 1}}, "d": 2}');
  });
});
