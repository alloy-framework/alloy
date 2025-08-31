import { describe, expect, it } from "vitest";
import { createOutputBinder } from "../../src/binder.js";
import { memberRefkey, refkey } from "../../src/refkey.js";
import { flushJobs } from "../../src/scheduler.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";
import { BasicSymbol } from "../../src/symbols/basic-symbol.js";
import { binder, createScope, createSymbol } from "./utils.js";

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
    const globalScope = createScope("global");
    const [foo] = createSymbol("foo", globalScope);
    const fooMemberScope = createScope("foo members", globalScope, {
      ownerSymbol: foo,
    });
    const [bar] = createSymbol("bar", foo.staticMembers);
    const barMemberScope = createScope("bar members", fooMemberScope, {
      ownerSymbol: bar,
    });
    const [baz, bazKey] = createSymbol("baz", bar.staticMembers);
    const bazMemberScope = createScope("baz members", barMemberScope, {
      ownerSymbol: baz,
    });
    createSymbol("otherBaz", bar.staticMembers);

    const result = binder.resolveDeclarationByKey(
      bazMemberScope,
      bazKey,
    ).value!;

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

describe("resolving type members by refkey", () => {
  it("simple member", () => {
    const globalScope = createScope("global");
    const [typeSymbol, typeKey] = createSymbol("MyType", globalScope);
    const [staticProp, staticKey] = createSymbol(
      "staticProp",
      typeSymbol.staticMembers,
    );

    // resolve a member of type
    const result = binder.resolveDeclarationByKey(
      globalScope,
      memberRefkey(typeKey, staticKey),
    ).value!;

    expect(result.symbol).toBe(staticProp);
    expect(result.lexicalDeclaration).toBe(typeSymbol);
    expect(result.memberPath).toEqual([staticProp]);
  });

  it("nested member", () => {
    const globalScope = createScope("global");
    const [typeSymbol, typeKey] = createSymbol("MyType", globalScope);
    const [staticProp, staticPropKey] = createSymbol(
      "staticProp",
      typeSymbol.staticMembers,
    );
    const [nestedProp, nestedKey] = createSymbol(
      "nestedProp",
      staticProp.staticMembers,
    );

    // resolve a member of type directly
    const result = binder.resolveDeclarationByKey(
      globalScope,
      memberRefkey(staticPropKey, nestedKey),
    ).value!;

    expect(result.symbol).toBe(nestedProp);
    expect(result.lexicalDeclaration).toBe(typeSymbol);
    expect(result.memberPath).toEqual([staticProp, nestedProp]);

    // resolve from a member refkey
    const result2 = binder.resolveDeclarationByKey(
      globalScope,
      memberRefkey(memberRefkey(typeKey, staticPropKey), nestedKey),
    ).value!;

    expect(result2.symbol).toBe(nestedProp);
    expect(result2.lexicalDeclaration).toBe(typeSymbol);
    expect(result2.memberPath).toEqual([staticProp, nestedProp]);
  });

  it("member of type", () => {
    const globalScope = createScope("global");
    const [typeSymbol] = createSymbol("MyType", globalScope);
    const [staticProp, staticKey] = createSymbol(
      "staticProp",
      typeSymbol.staticMembers,
    );

    const [value, valueKey] = createSymbol("myValue", globalScope, {
      type: typeSymbol,
    });

    // resolve a member of type
    const result = binder.resolveDeclarationByKey(
      globalScope,
      memberRefkey(valueKey, staticKey),
    ).value!;

    expect(result.symbol).toBe(staticProp);
    expect(result.lexicalDeclaration).toBe(value);
    expect(result.memberPath).toEqual([staticProp]);
  });

  it("nested member of type", () => {
    const globalScope = createScope("global");
    const [typeSymbol] = createSymbol("MyType", globalScope);
    const [staticProp, staticKey] = createSymbol(
      "staticProp",
      typeSymbol.staticMembers,
    );
    const [nestedProp, nestedKey] = createSymbol(
      "nestedProp",
      staticProp.staticMembers,
    );

    const [value, valueKey] = createSymbol("myValue", globalScope, {
      type: typeSymbol,
    });

    // resolve a member of type
    const result = binder.resolveDeclarationByKey(
      globalScope,
      memberRefkey(memberRefkey(valueKey, staticKey), nestedKey),
    ).value!;

    expect(result.symbol).toBe(nestedProp);
    expect(result.lexicalDeclaration).toBe(value);
    expect(result.memberPath).toEqual([staticProp, nestedProp]);
  });

  it("nested member of nested type", () => {
    const globalScope = createScope("global");
    const [typeSymbol] = createSymbol("MyType", globalScope);
    const [staticProp, staticKey] = createSymbol(
      "staticProp",
      typeSymbol.staticMembers,
    );
    const [nestedProp, nestedKey] = createSymbol(
      "nestedProp",
      staticProp.staticMembers,
    );

    const [value, valueKey] = createSymbol("myValue", globalScope);
    const [regularProp, regularPropKey] = createSymbol(
      "regularProp",
      value.staticMembers,
      {
        type: typeSymbol,
      },
    );

    // resolve a member of type
    const result = binder.resolveDeclarationByKey(
      globalScope,
      memberRefkey(
        memberRefkey(memberRefkey(valueKey, regularPropKey), staticKey),
        nestedKey,
      ),
    ).value!;

    expect(result.symbol).toBe(nestedProp);
    expect(result.lexicalDeclaration).toBe(value);
    expect(result.memberPath).toEqual([regularProp, staticProp, nestedProp]);
  });

  it("throws an error when resolving something that isn't a member", () => {
    const globalScope = createScope("global");
    const [typeSymbol] = createSymbol("MyType", globalScope);
    const [, ts2Key] = createSymbol("MyType2", globalScope);
    const [, staticKey] = createSymbol("staticProp", typeSymbol.staticMembers);

    expect(() => {
      const result = binder.resolveDeclarationByKey(
        globalScope,
        memberRefkey(ts2Key, staticKey),
      );

      return result.value; // force evaluation
    }).toThrow(/is not a member/);
  });
});
