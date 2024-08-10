import { it, expect } from "vitest";
import "../testing/extend-expect.js";
import { code, Indent, stc } from "@alloy-js/core";

it("is applied by output", () => {

  function Foo() {
    return "Foo component"
  }
  const FooStc = stc(Foo);
  const IndentStc = stc(Indent);

  expect(code`
    ${FooStc({x: "hi"})}
    ${IndentStc().code`
      child!
    `} 
  `).toRenderTo(`
    Foo component
      child!
  `);
});