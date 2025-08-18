import { describe, expect, it } from "vitest";
import * as py from "../src/index.js";
import { toSourceText } from "./utils.jsx";
import { code } from "@alloy-js/core";

describe("TypingUnionExpression", () => {
  it("renders a Python union expression - 1 item", () => {
    const elements = [code`int`]
    expect(toSourceText([<py.TypingUnionExpression>{elements}</py.TypingUnionExpression>])).toRenderTo('int');
  });
  it("renders a Python union expression - 2 items", () => {
    const elements = [code`int`, code`str`]
    expect(toSourceText([<py.TypingUnionExpression>{elements}</py.TypingUnionExpression>])).toRenderTo('int | str');
  });
  it("renders a Python union expression - 2 items with optional", () => {
    const elements = [code`int`, code`str`]
    expect(toSourceText([<py.TypingUnionExpression optional>{elements}</py.TypingUnionExpression>])).toRenderTo('int | str | None');
  });
});
