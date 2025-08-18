import { code } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";

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
  it("renders a Python union expression - 2 items with optional", () => {
    const elements = [code`int`, code`str`];
    expect(
      toSourceText([
        <py.UnionTypeExpression optional>{elements}</py.UnionTypeExpression>,
      ]),
    ).toRenderTo("int | str | None");
  });
});
