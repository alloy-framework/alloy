import { expect, it } from "vitest";
import { pret, PrettyString } from "./pretty-string.js";

function expectRender(
  pretty: PrettyString,
  expected: {
    toString: string;
    toAnsi: string;
  },
) {
  expect(pretty.toString()).toBe(expected.toString);
  expect(pretty.toAnsi()).toBe(expected.toAnsi);
}

it("interpolate basic string", () => {
  const result = pret`foo ${"bar"} baz`;
  expectRender(result, {
    toString: "foo bar baz",
    toAnsi: "foo bar baz",
  });
});

// cspell:ignore mbar
it("interpolate pretty segment", () => {
  const result = pret`foo ${pret.red("bar")} baz`;
  expectRender(result, {
    toString: "foo bar baz",
    toAnsi: "foo \x1b[31mbar\x1b[39m baz",
  });
});

it("interpolate another pretty string", () => {
  const a = pret`foo ${pret.red("bar")} baz`;
  const result = pret`Hi, ${a}`;
  expectRender(result, {
    toString: "Hi, foo bar baz",
    toAnsi: "Hi, foo \x1b[31mbar\x1b[39m baz",
  });
});
