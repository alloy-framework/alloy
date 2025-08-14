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
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([scope]);
    expect(result.fullSymbolPath).toEqual([scope]);
  });

  it("from a different scope for the same member", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalSym = new BasicSymbol("global", undefined, { binder });
    const scope = new BasicScope("global", undefined, {
      binder,
      ownerSymbol: globalSym,
    });

    const sym = new BasicSymbol("foo", scope.symbols, {
      binder,
      refkeys: [key],
    });

    const resolveScope = new BasicScope("other global", undefined, {
      binder,
      ownerSymbol: globalSym,
    });
    const result = binder.resolveDeclarationByKey(resolveScope, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.commonScope).toBe(resolveScope);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.pathDown).toEqual([]);
    expect(result.pathUp).toEqual([]);
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([scope]);
    expect(result.fullSymbolPath).toEqual([scope]);
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
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([scope]);
    expect(result.fullSymbolPath).toEqual([scope, childScope]);
  });

  it("from a parent scope for the same member", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalSym = new BasicSymbol("global", undefined, { binder });
    const scope = new BasicScope("global", undefined, {
      ownerSymbol: globalSym,
    });
    const childScope = new BasicScope("child", scope);
    const sym = new BasicSymbol("foo", childScope.symbols, {
      binder,
      refkeys: [key],
    });

    const referenceScope = new BasicScope("otherGlobal global", undefined, {
      ownerSymbol: globalSym,
    });
    const result = binder.resolveDeclarationByKey(referenceScope, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.commonScope).toBe(referenceScope);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.pathDown).toEqual([childScope]);
    expect(result.pathUp).toEqual([]);
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([scope]);
    expect(result.fullSymbolPath).toEqual([scope, childScope]);
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
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([scope, childScope]);
    expect(result.fullSymbolPath).toEqual([scope]);
  });

  it("from a different child scope for the same member", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalSym = new BasicSymbol("global", undefined, { binder });
    const scope = new BasicScope("global", undefined, {
      ownerSymbol: globalSym,
    });
    const otherGlobalScope = new BasicScope("other global", undefined, {
      ownerSymbol: globalSym,
    });
    const childMember = new BasicSymbol("child", scope.symbols);
    const childScope = new BasicScope("child", otherGlobalScope, {
      ownerSymbol: childMember,
    });
    const sym = new BasicSymbol("foo", scope.symbols, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(childScope, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.commonScope).toBe(otherGlobalScope);
    expect(result.pathDown).toEqual([]);
    expect(result.pathUp).toEqual([childScope]);
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([scope, childScope]);
    expect(result.fullSymbolPath).toEqual([scope]);
  });
  it("from a different child scope for the same member with a different root scope", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const rootRefScope = new BasicScope("root", undefined, { binder });
    const globalSym = new BasicSymbol("global", undefined, { binder });
    const scope = new BasicScope("global", undefined, {
      ownerSymbol: globalSym,
    });
    const otherGlobalScope = new BasicScope("other global", rootRefScope, {
      ownerSymbol: globalSym,
    });
    const childMember = new BasicSymbol("child", scope.symbols);
    const childScope = new BasicScope("child", otherGlobalScope, {
      ownerSymbol: childMember,
    });
    const sym = new BasicSymbol("foo", scope.symbols, {
      binder,
      refkeys: [key],
    });

    const result = binder.resolveDeclarationByKey(childScope, key).value!;

    expect(result.symbol).toBe(sym);
    expect(result.lexicalDeclaration).toBe(sym);
    expect(result.commonScope).toBe(otherGlobalScope);
    expect(result.pathDown).toEqual([]);
    expect(result.pathUp).toEqual([childScope]);
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([rootRefScope, scope, childScope]);
    expect(result.fullSymbolPath).toEqual([rootRefScope, scope]);
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
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([scope, childScope2]);
    expect(result.fullSymbolPath).toEqual([scope, childScope1]);
  });

  it("from a member scope", () => {
    const key = refkey();
    const binder = createOutputBinder();
    const globalScope = new BasicScope("global", undefined, { binder });
    const object = new BasicSymbol("object", globalScope.symbols, {
      binder,
      refkeys: key,
    });
    const memberScope = new BasicScope("object members", globalScope, {
      binder,
      ownerSymbol: object,
    });

    const result = binder.resolveDeclarationByKey(memberScope, key).value!;

    expect(result.symbol).toBe(object);
    expect(result.lexicalDeclaration).toBe(object);
    expect(result.commonScope).toBe(globalScope);
    expect(result.pathDown).toEqual([]);
    expect(result.pathUp).toEqual([memberScope]);
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([globalScope, memberScope]);
    expect(result.fullSymbolPath).toEqual([globalScope]);
  });

  it("from another scope for the same member", () => {});
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
    expect(result.fullReferencePath).toEqual([globalScope]);
    expect(result.fullSymbolPath).toEqual([globalScope]);
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
    expect(result.fullReferencePath).toEqual([globalScope]);
    expect(result.fullSymbolPath).toEqual([globalScope]);
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
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([
      globalScope,
      fooMemberScope,
      barMemberScope,
    ]);
    expect(result.fullSymbolPath).toEqual([
      globalScope,
      fooMemberScope,
      barMemberScope,
    ]);
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

    new BasicSymbol("otherBaz", bar.staticMembers, {
      binder,
    });

    const result = binder.resolveDeclarationByKey(bazMemberScope, key).value!;

    expect(result.symbol).toBe(baz);
    expect(result.commonScope).toBe(barMemberScope);
    expect(result.pathUp).toEqual([bazMemberScope]);
    expect(result.pathDown.length).toBe(0);
    expect(result.lexicalDeclaration).toBe(baz);
    expect(result.memberPath).toEqual([]);
    expect(result.fullReferencePath).toEqual([
      globalScope,
      fooMemberScope,
      barMemberScope,
      bazMemberScope,
    ]);
    expect(result.fullSymbolPath).toEqual([
      globalScope,
      fooMemberScope,
      barMemberScope,
    ]);
  });
});
