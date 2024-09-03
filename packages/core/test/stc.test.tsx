import { code, Indent, stc } from "@alloy-js/core";
import { expect, it } from "vitest";
import "../testing/extend-expect.js";

it("is applied by output", () => {
  function Foo() {
    return "Foo component";
  }
  const FooStc = stc(Foo);
  const IndentStc = stc(Indent);

  expect(code`
    ${FooStc({ x: "hi" })}
    ${IndentStc().code`
      child!
    `} 
  `).toRenderTo(`
    Foo component
      child!
  `);
});
