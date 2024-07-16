import { it, expect, describe } from "vitest";
import { Children } from "../../src/jsx-runtime.js";
import "../../testing/extend-expect.js";
import { code } from "../../src/utils.js";

it("renders simple strings", () => {
  expect(code`foo`).toRenderTo("foo");
});


it("renders removes indents", () => {
  expect(code`
    foo  
  `).toRenderTo("foo");
});

it("renders allows substitutions of elements", () => {
  function Foo() {
    return "hi";
  }
  expect(code`
    foo ${<Foo />} bar
  `).toRenderTo("foo hi bar");
})

it("renders has auto-indentation", () => {
  function Foo() {
    return code`
      hi
      bye
    `
  }

  const template = code`
    if (x === 1) {
      ${<Foo />}
    }
  `

  expect(template).toRenderTo(`
    if (x === 1) {
      hi
      bye
    }
  `);
})