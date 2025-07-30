import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

describe("Atom", () => {
  it("renders string value", () => {
    expect(toSourceText([<py.Atom jsValue={"Test"} />])).toRenderTo('"Test"');
  });

  it("renders null/undefined object", () => {
    expect(toSourceText([<py.Atom jsValue={undefined} />])).toRenderTo("None");
  });

  it("renders number", () => {
    expect(toSourceText([<py.Atom jsValue={123} />])).toRenderTo("123");
  });

  it("renders boolean - True", () => {
    expect(toSourceText([<py.Atom jsValue={true} />])).toRenderTo("True");
  });

  it("renders boolean - False", () => {
    expect(toSourceText([<py.Atom jsValue={false} />])).toRenderTo("False");
  });

  it("renders array", () => {
    expect(toSourceText([<py.Atom jsValue={[1, 2, 3]} />])).toRenderTo(
      "[1, 2, 3]",
    );
  });

  it("renders object", () => {
    expect(toSourceText([<py.Atom jsValue={{ a: 1, b: 2 }} />])).toRenderTo(
      '{"a": 1, "b": 2}',
    );
  });

  it("renders more complex object", () => {
    expect(
      toSourceText([<py.Atom jsValue={{ a: "1", b: 2, c: true }} />]),
    ).toRenderTo('{"a": "1", "b": 2, "c": True}');
  });

  it("renders empty object", () => {
    expect(toSourceText([<py.Atom jsValue={{}} />])).toRenderTo("{}");
  });

  it("renders function", () => {
    function Test() {
      return <>Test</>;
    }

    expect(toSourceText([<py.Atom jsValue={Test} />])).toRenderTo("Test");
  });

  it("renders nested object", () => {
    expect(
      toSourceText([<py.Atom jsValue={{ a: { b: { c: 1 } }, d: 2 }} />]),
    ).toRenderTo('{"a": {"b": {"c": 1}}, "d": 2}');
  });
});
