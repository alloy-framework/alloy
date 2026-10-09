import type { Children, Refkey } from "@alloy-js/core";
import { refkey, REFKEYABLE } from "@alloy-js/core";
import { SourceFile } from "@alloy-js/core/stc";
import { expect, it } from "vitest";

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

function createCallableRefkeyable(key: Refkey) {
  return Object.assign(
    (props: { children?: Children }) => ["Generic<", props.children, ">"],
    { [REFKEYABLE]: () => key },
  );
}

it("resolves a callable refkeyable used as a bare child", () => {
  const key = refkey("foo");
  const Generic = createCallableRefkeyable(key);

  function Reference(props: { refkey: Refkey }) {
    expect(props.refkey).toEqual(key);
    return "Reference";
  }

  expect(
    <SourceFile filetype="typescript" path="foo.ts" reference={Reference}>
      {Generic}
    </SourceFile>,
  ).toRenderTo("Reference");
});

it("still invokes a callable refkeyable used as a component", () => {
  const key = refkey("foo");
  const Generic = createCallableRefkeyable(key);

  function Reference() {
    return "Reference";
  }

  expect(
    <SourceFile filetype="typescript" path="foo.ts" reference={Reference}>
      <Generic>string</Generic>
    </SourceFile>,
  ).toRenderTo("Generic<string>");
});
