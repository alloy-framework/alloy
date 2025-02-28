import { stc } from "@alloy-js/core";
import { Indent } from "@alloy-js/core/stc";
import { expect, it } from "vitest";
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
