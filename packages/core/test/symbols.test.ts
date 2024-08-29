import { expect, it } from "vitest";
import { createOutputBinder } from "../src/binder.js";

it("works", () => {
  const binder = createOutputBinder();
  const scope = binder.createScope({
    kind: "foo",
    name: "scope",
    parent: binder.globalScope,
  });

  const symbol = binder.createSymbol({
    name: "sym",
    scope,
    refkey: "foo",
  });

  expect([...scope.getSymbolNames()]).toEqual(["sym"]);

  symbol.name = "bar";

  expect([...scope.getSymbolNames()]).toEqual(["bar"]);
});

it("resolves symbol conflicts", () => {
  const binder = createOutputBinder();
  const scope = binder.createScope({
    kind: "foo",
    name: "scope",
    parent: binder.globalScope,
  });

  const _s1 = binder.createSymbol({
    name: "sym",
    scope,
    refkey: "foo",
  });

  const s2 = binder.createSymbol({
    name: "sym",
    scope,
    refkey: "foo",
  });

  expect(s2.name).toEqual("sym_2");
});
