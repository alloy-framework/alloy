import { code } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";
import { d } from "@alloy-js/core/testing";

describe("UnionTypeExpression", () => {
  it("renders a Python union expression - 1 item", () => {
    const elements = [code`int`];
    expect(
      toSourceText([
        <py.UnionTypeExpression>{elements}</py.UnionTypeExpression>,
      ]),
    ).toRenderTo("int");
  });
  it("renders a Python union expression - 2 items", () => {
    const elements = [code`int`, code`str`];
    expect(
      toSourceText([
        <py.UnionTypeExpression>{elements}</py.UnionTypeExpression>,
      ]),
    ).toRenderTo("int | str");
  });
  it("renders a Python union expression - N items", () => {
    const elements = [code`int`, code`str`, code`float`, code`bool`, code`list`, code`dict`, code`set`, code`tuple`, code`frozenset`, code`bytes`, code`bytearray`, code`memoryview`, code`complex`];
    expect(
      toSourceText([
        <py.UnionTypeExpression>{elements}</py.UnionTypeExpression>,
      ]),
    ).toRenderTo(d`
        (
            int
            | str
            | float
            | bool
            | list
            | dict
            | set
            | tuple
            | frozenset
            | bytes
            | bytearray
            | memoryview
            | complex
        )`);
  });
  it("renders a Python union expression - 2 items", () => {
    const elements = [code`int`, code`str`];
    expect(
      toSourceText([
        <py.UnionTypeExpression>{elements}</py.UnionTypeExpression>,
      ]),
    ).toRenderTo("int | str");
  });
  it("renders a Python union expression - 2 items with optional", () => {
    const elements = [code`int`, code`str`];
    expect(
      toSourceText([
        <py.UnionTypeExpression optional>{elements}</py.UnionTypeExpression>,
      ]),
    ).toRenderTo("int | str | None");
  });
});
