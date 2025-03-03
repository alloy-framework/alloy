import { stc } from "@alloy-js/core";
import { hbr, indent, Indent } from "@alloy-js/core/stc";
import { describe, expect, it } from "vitest";
import "../testing/extend-expect.js";

it("is applied by output", () => {
  function Foo() {
    return "Foo component";
  }
  const FooStc = stc(Foo);

  expect([
    FooStc(),
    Indent().code`
      child!
      child2!
    `,
  ]).toRenderTo(`
    Foo component
      child!
      child2!
  `);
});

describe("works with formatting", () => {
  it("handles lines", () => {
    expect(["foo", hbr(), "bar", hbr(), "baz"]).toRenderTo(`
      foo
      bar
      baz
    `);
  });

  it("handles indents", () => {
    expect(["foo", indent().children([hbr(), "bar", hbr(), "baz"])])
      .toRenderTo(`
      foo
        bar
        baz
    `);
  });
});
