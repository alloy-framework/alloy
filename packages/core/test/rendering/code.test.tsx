import { code } from "@alloy-js/core";
import { expect, it } from "vitest";
import "../../testing/extend-expect.js";

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
});

it("renders has auto-indentation", () => {
  function Foo() {
    return code`
      hi
      bye
    `;
  }

  const template = code`
    if (x === 1) {
      ${<Foo />}
    }
  `;

  expect(template).toRenderTo(`
    if (x === 1) {
      hi
      bye
    }
  `);
});

it("handles blank lines", () => {
  const template = code`
    {
      a

      x
    }
  `;

  expect(template).toRenderTo(`
    {
      a
    
      x
    }
  `);
});
