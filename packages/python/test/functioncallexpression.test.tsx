import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as py from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

describe("FunctionCallExpression", () => {
  it("renders", () => {
    const result = toSourceText(<py.FunctionCallExpression target="foo" />);
    expect(result).toRenderTo(d`
      foo()
    `);
  });
  it("renders with args", () => {
    const result = toSourceText(
      <py.FunctionCallExpression target="foo" args={["a", "b"]} />,
    );
    expect(result).toRenderTo(d`
      foo(a, b)
    `);
  });
});
