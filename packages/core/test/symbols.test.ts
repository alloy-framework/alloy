import { expect, it } from "vitest";
import { createOutputBinder, OutputSymbolFlags } from "../src/binder.js";
import { refkey } from "../src/refkey.js";

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

it("resolves member symbols", () => {
  const binder = createOutputBinder();
  const scope = binder.createScope({
    kind: "foo",
    name: "top scope",
    parent: binder.globalScope,
  });

  const rootSym = binder.createSymbol({
    name: "root",
    scope,
    refkey: refkey(),
    flags: OutputSymbolFlags.InstanceMemberContainer,
  });

  expect(rootSym.instanceMemberScope).toBeDefined();

  const memberSym = binder.createSymbol({
    name: "member",
    scope: rootSym.instanceMemberScope!,
    refkey: refkey(),
    flags: OutputSymbolFlags.None,
  });

  // test that we can resolve the base symbol.
  const resolution = binder.resolveDeclarationByKey(scope, rootSym.refkey);
  expect(resolution.value).toBeDefined();
  const resolvedBase = resolution.value!.targetDeclaration;
  expect(resolvedBase).toBe(rootSym);

  const memberResolution = binder.resolveInstanceMemberByKey(
    scope,
    resolvedBase.refkey,
    [memberSym.refkey],
  );
  expect(memberResolution.value).toBeDefined();
});

it("resolves member symbols lazily", () => {
  const binder = createOutputBinder();
  const scope = binder.createScope({
    kind: "foo",
    name: "top scope",
    parent: binder.globalScope,
  });

  const rootSym = binder.createSymbol({
    name: "root",
    scope,
    refkey: refkey(),
    flags: OutputSymbolFlags.InstanceMemberContainer,
  });

  const memberSymRefkey = refkey();

  // resolve the member symbol first
  const memberResolution = binder.resolveInstanceMemberByKey(
    scope,
    rootSym.refkey,
    [memberSymRefkey],
  );
  expect(memberResolution.value).toBeUndefined();

  // then create the symbol
  binder.createSymbol({
    name: "member",
    scope: rootSym.instanceMemberScope!,
    refkey: memberSymRefkey,
    flags: OutputSymbolFlags.None,
  });

  // now member resolution should be there
  expect(memberResolution.value).toBeDefined();
});
