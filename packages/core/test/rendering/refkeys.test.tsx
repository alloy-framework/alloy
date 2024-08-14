import { refkey, Refkey } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/core/stc";
import { expect, it } from "vitest";
import "../../testing/extend-expect.js";

it("is rendered properly in the tree", () => {
  const key = refkey("foo");

  function Reference(props: { refkey: Refkey }) {
    expect(props.refkey).toEqual(key);
    return "Reference";
  }

  expect(
    <SourceFile filetype="typescript" path="foo.ts" reference={Reference}>
      {key}
    </SourceFile>,
  ).toRenderTo("Reference");
});

it("is rendered properly in the tree with code", () => {
  const key = refkey("foo");

  function Reference(props: { refkey: Refkey }) {
    expect(props.refkey).toEqual(key);
    return "Reference";
  }

  expect(
    SourceFile({ filetype: "typescript", path: "foo.ts", reference: Reference })
      .code`
      ${key} 
    `,
  ).toRenderTo("Reference");
});
