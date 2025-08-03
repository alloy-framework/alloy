import { describe, expect, it } from "vitest";
import { createOutputBinder, refkey } from "../../src/index.browser.js";
import { flushJobs } from "../../src/scheduler.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";
import { BasicSymbol } from "../../src/symbols/basic-symbol.js";

describe("dynamic refkey resolution", () => {
  it("resolves symbols by refkey when symbol is added later", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const scope = new BasicScope("global", undefined);

    const resolvedSym = binder.resolveDeclarationByKey(undefined, key);

    const sym = new BasicSymbol("foo", scope.symbols, {
      binder,
      refkeys: [key],
    });

    expect(resolvedSym.value?.symbol).toBe(sym);
  });

  it("handles deleted symbols by updating resolutions", () => {
    const key = refkey();
    const binder = createOutputBinder();

    const resolvedSym = binder.resolveDeclarationByKey(undefined, key);
    const scope = new BasicScope("global", undefined);
    const sym = new BasicSymbol("foo", scope.symbols, {
      binder,
      refkeys: [key],
    });

    flushJobs();
    expect(resolvedSym.value?.symbol).toBe(sym);

    sym.delete();
    flushJobs();
    expect(resolvedSym.value).toBe(undefined);
  });
});

describe("resolving lexical declarations by refkey", () => {
  it("from the same scope", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const scope = new BasicScope("global", undefined);
    const sym = new BasicSymbol("foo", scope.symbols, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(scope, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.commonScope).toBe(scope);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.pathDown).toEqual([]);
    expect(result.pathUp).toEqual([]);
    expect(result.memberPath).toBeUndefined();
  });

  it("from a parent scope", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const scope = new BasicScope("global", undefined);
    const childScope = new BasicScope("child", scope);
    const sym = new BasicSymbol("foo", childScope.symbols, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(scope, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.commonScope).toBe(scope);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.pathDown).toEqual([childScope]);
    expect(result.pathUp).toEqual([]);
    expect(result.memberPath).toBeUndefined();
  });

  it("from a child scope", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const scope = new BasicScope("global", undefined);
    const childScope = new BasicScope("child", scope);
    const sym = new BasicSymbol("foo", scope.symbols, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(childScope, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.commonScope).toBe(scope);
    expect(result.pathDown).toEqual([]);
    expect(result.pathUp).toEqual([childScope]);
    expect(result.memberPath).toBeUndefined();
  });

  it("from a parallel scope", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const scope = new BasicScope("global", undefined);
    const childScope1 = new BasicScope("child", scope);
    const childScope2 = new BasicScope("child2", scope);

    const sym = new BasicSymbol("foo", childScope1.symbols, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(childScope2, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.pathDown).toEqual([childScope1]);
    expect(result.pathUp).toEqual([childScope2]);
    expect(result.commonScope).toBe(scope);
    expect(result.memberPath).toBeUndefined();
  });
});

describe("resolving members by refkey", () => {
  it("simple member", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalScope = new BasicScope("global", undefined, { binder });
    const foo = new BasicSymbol("foo", globalScope.symbols, {
      binder,
    });

    const bar = new BasicSymbol("bar", foo.staticMembers, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(globalScope, key).value!;

    // we successfully resolve the symbol, so:
    expect(result.symbol).toBe(bar);

    // the member is off of a declaration in our current scope, so:
    expect(result.commonScope).toBe(globalScope);
    expect(result.pathUp.length).toBe(0);
    expect(result.pathDown.length).toBe(0);

    // the declaration symbol carrying the resolved member is:
    expect(result.lexicalDeclaration).toBe(foo);

    // the path to the resolved symbol is
    expect(result.memberPath).toEqual([bar]);
  });

  it("nested members", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalScope = new BasicScope("global", undefined, { binder });
    const foo = new BasicSymbol("foo", globalScope.symbols, {
      binder,
    });

    const bar = new BasicSymbol("bar", foo.staticMembers, {
      binder,
    });

    const baz = new BasicSymbol("baz", bar.staticMembers, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(globalScope, key).value!;

    expect(result.symbol).toBe(baz);
    expect(result.commonScope).toBe(globalScope);
    expect(result.pathUp.length).toBe(0);
    expect(result.pathDown.length).toBe(0);
    expect(result.lexicalDeclaration).toBe(foo);
    expect(result.memberPath).toEqual([bar, baz]);
  });

  it("nested members, while declaring a neighboring member", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalScope = new BasicScope("global", undefined, { binder });
    const foo = new BasicSymbol("foo", globalScope.symbols, {
      binder,
    });

    const fooMemberScope = new BasicScope("foo members", globalScope, {
      ownerSymbol: foo,
    });

    const bar = new BasicSymbol("bar", foo.staticMembers, {
      binder,
    });

    const barMemberScope = new BasicScope("bar members", fooMemberScope, {
      ownerSymbol: bar,
    });

    const baz = new BasicSymbol("baz", bar.staticMembers, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(barMemberScope, key).value!;

    expect(result.symbol).toBe(baz);
    expect(result.commonScope).toBe(barMemberScope);
    expect(result.pathUp.length).toBe(0);
    expect(result.pathDown.length).toBe(0);
    expect(result.lexicalDeclaration).toBe(baz);
    expect(result.memberPath).toEqual([baz]);
  });

  it("nested members, while declaring a neighboring nested member", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalScope = new BasicScope("global", undefined, { binder });
    const foo = new BasicSymbol("foo", globalScope.symbols, {
      binder,
    });

    const fooMemberScope = new BasicScope("foo members", globalScope, {
      ownerSymbol: foo,
    });

    const bar = new BasicSymbol("bar", foo.staticMembers, {
      binder,
    });

    const barMemberScope = new BasicScope("bar members", fooMemberScope, {
      ownerSymbol: bar,
    });

    const baz = new BasicSymbol("baz", bar.staticMembers, {
      binder,
      refkeys: [key],
    });

    const bazMemberScope = new BasicScope("baz members", barMemberScope, {
      ownerSymbol: baz,
    });

    const otherBaz = new BasicSymbol("otherBaz", bar.staticMembers, {
      binder,
    });

    const result = binder.resolveDeclarationByKey(bazMemberScope, key).value!;

    expect(result.symbol).toBe(baz);
    expect(result.commonScope).toBe(barMemberScope);
    expect(result.pathUp).toEqual([bazMemberScope]);
    expect(result.pathDown.length).toBe(0);
    expect(result.lexicalDeclaration).toBe(baz);
    expect(result.memberPath).toEqual([otherBaz]);
  });
});
