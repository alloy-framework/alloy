import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { FunctionCallExpression } from "../src/components/function-call-expression.js";

describe("FunctionCallExpression", () => {
  it("renders no-arg calls", () => {
    expect(<FunctionCallExpression target="self.data.len" />).toRenderTo(
      d`self.data.len()`,
    );
  });

  it("renders calls with arguments", () => {
    expect(
      <FunctionCallExpression
        target="self.data.insert"
        args={["key", "entry"]}
      />,
    ).toRenderTo(d`self.data.insert(key, entry)`);
  });

  it("renders turbofish type arguments without call arguments", () => {
    expect(
      <FunctionCallExpression target="collect" typeArgs={["Vec<_>"]} />,
    ).toRenderTo(d`collect::<Vec<_>>()`);
  });

  it("renders turbofish type arguments with call arguments", () => {
    expect(
      <FunctionCallExpression
        target="f"
        typeArgs={["String", "u32"]}
        args={["raw", "10"]}
      />,
    ).toRenderTo(d`f::<String, u32>(raw, 10)`);
  });

  it("wraps multiple arguments across lines", () => {
    expect(
      <FunctionCallExpression
        target="self.data.insert"
        args={[
          "key",
          "entry",
          "Context::new(session_id, metadata, now, source, trace_id, actor)",
        ]}
      />,
    ).toRenderTo(d`
      self.data.insert(
        key,
        entry,
        Context::new(session_id, metadata, now, source, trace_id, actor)
      )
    `);
  });
});
