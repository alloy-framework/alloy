import { reactive, watch } from "@vue/reactivity";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Binder, createOutputBinder } from "../../src/binder.js";
import { Refkey } from "../../src/refkey.js";
import { flushJobs } from "../../src/scheduler.js";
import {
  OutputScope,
  OutputScopeFlags,
} from "../../src/symbols/output-scope.js";
import { OutputSymbol } from "../../src/symbols/output-symbol.js";
import { SymbolTable } from "../../src/symbols/symbol-table.js";

let binder: Binder;
beforeEach(() => {
  binder = createOutputBinder();
});

describe("OutputScope constructor", () => {
  it("initializes properties correctly with default options", () => {
    const scope = new OutputScope("testScope", { binder });
    expect(scope.name).toBe("testScope");
    expect(scope.binder).toBe(binder);
    expect(scope.id).toEqual(expect.any(Number));
    expect(scope.kind).toBe("scope");
    expect(scope.flags).toBe(OutputScopeFlags.None);
    expect(scope.metadata).toEqual({});
    expect(scope.parent).toBe(binder.globalScope);
    expect(scope.owner).toBeUndefined();
    expect(scope.symbols).toBeInstanceOf(SymbolTable);
    expect(scope.symbolNames.size).toBe(0);
    expect(scope.children.size).toBe(0);
  });

  it("initializes properties correctly with custom options", () => {
    const parentScope = new OutputScope("parentScope", { binder });
    const metadata = { foo: "bar" };

    const scope = new OutputScope("testScope", {
      binder,
      kind: "namespace",
      metadata,
      parent: parentScope,
    });

    expect(scope.name).toBe("testScope");
    expect(scope.kind).toBe("namespace");
    expect(scope.flags).toBe(OutputScopeFlags.None);
    expect(scope.metadata.foo).toBe("bar");
    expect(scope.parent).toBe(parentScope);
    expect(parentScope.children.has(scope)).toBe(true);
  });
});

describe("OutputScope reactivity", () => {
  it("is reactive on name", () => {
    const scope = new OutputScope("initialName", { binder });
    const nameSpy = vi.fn();
    watch(() => scope.name, nameSpy);

    scope.name = "newName";
    flushJobs();
    expect(nameSpy).toHaveBeenCalled();
    expect(scope.name).toBe("newName");
  });

  it("is reactive on flags", () => {
    const scope = new OutputScope("scope", { binder });
    const flagsSpy = vi.fn();
    watch(() => scope.flags, flagsSpy);

    scope.flags = OutputScopeFlags.InstanceMemberScope;
    flushJobs();
    expect(flagsSpy).toHaveBeenCalled();
    expect(scope.flags).toBe(OutputScopeFlags.InstanceMemberScope);
  });

  it("updates symbolNames when symbols are added", () => {
    const scope = new OutputScope("scope", { binder });
    const symbolNamesSpy = vi.fn();
    watch(() => scope.symbolNames.size, symbolNamesSpy);

    new OutputSymbol("symbol1", { binder, scope });
    flushJobs();
    expect(symbolNamesSpy).toHaveBeenCalled();
    expect(scope.symbolNames.has("symbol1")).toBe(true);
  });

  it("updates symbolNames when a symbol's name changes", () => {
    const scope = new OutputScope("scope", { binder });
    const symbol = new OutputSymbol("oldName", { binder, scope });
    flushJobs();

    // Verify initial state
    expect(scope.symbolNames.has("oldName")).toBe(true);
    expect(scope.symbolNames.has("newName")).toBe(false);

    // Set up tracking for symbol names
    const symbolNamesTracker = vi.fn();
    watch(
      () => ({
        hasOld: scope.symbolNames.has("oldName"),
        hasNew: scope.symbolNames.has("newName"),
      }),
      symbolNamesTracker,
      { deep: true },
    );

    // Change the name
    symbol.name = "newName";
    flushJobs();

    // Verify the changes
    expect(symbolNamesTracker).toHaveBeenCalled();
    expect(scope.symbolNames.has("oldName")).toBe(false);
    expect(scope.symbolNames.has("newName")).toBe(true);
  });

  it("doesn't get wrapped in a reactive proxy", () => {
    const scope = new OutputScope("scope", { binder });

    const rScope = reactive(scope);
    expect(rScope).toBe(scope);
  });
});

describe("OutputScope#symbols", () => {
  it("adds symbols to its collection", () => {
    const scope = new OutputScope("scope", { binder });
    const sym1 = new OutputSymbol("sym1", { binder, scope });
    const sym2 = new OutputSymbol("sym2", { binder, scope });
    flushJobs();

    expect(scope.symbols.size).toBe(2);
    expect(scope.symbols.has(sym1)).toBe(true);
    expect(scope.symbols.has(sym2)).toBe(true);
  });

  it("resolves symbol name conflicts", () => {
    const scope = new OutputScope("scope", { binder });
    const s1 = new OutputSymbol("sym", { binder, scope });
    const s2 = new OutputSymbol("sym", { binder, scope });
    const s3 = new OutputSymbol("sym", { binder, scope });
    flushJobs();

    expect(s1.name).toBe("sym");
    expect(s2.name).toBe("sym_2");
    expect(s3.name).toBe("sym_3");
    expect(scope.symbolNames.has("sym")).toBe(true);
    expect(scope.symbolNames.has("sym_2")).toBe(true);
    expect(scope.symbolNames.has("sym_3")).toBe(true);
  });

  it("updates when a symbol is deleted", () => {
    const scope = new OutputScope("scope", { binder });
    const sym = new OutputSymbol("sym", { binder, scope });
    flushJobs();

    expect(scope.symbols.size).toBe(1);
    expect(scope.symbols.has(sym)).toBe(true);
    expect(scope.symbolNames.has("sym")).toBe(true);

    sym.delete();
    flushJobs();

    expect(scope.symbols.size).toBe(0);
    expect(scope.symbols.has(sym)).toBe(false);
    expect(scope.symbolNames.has("sym")).toBe(false);
  });

  it("updates when a symbol changes scope", () => {
    const scope1 = new OutputScope("scope1", { binder });
    const scope2 = new OutputScope("scope2", { binder });
    const sym = new OutputSymbol("sym", { binder, scope: scope1 });
    flushJobs();

    expect(scope1.symbols.size).toBe(1);
    expect(scope2.symbols.size).toBe(0);

    sym.scope = scope2;
    flushJobs();

    expect(scope1.symbols.size).toBe(0);
    expect(scope2.symbols.size).toBe(1);
    expect(scope1.symbols.has(sym)).toBe(false);
    expect(scope2.symbols.has(sym)).toBe(true);
    expect(scope1.symbolNames.has("sym")).toBe(false);
    expect(scope2.symbolNames.has("sym")).toBe(true);
  });
});

describe("OutputScope#symbolsByRefkey", () => {
  it("maps refkeys to symbols", () => {
    const scope = new OutputScope("scope", { binder });

    // Use the refkey function to create refkeys
    // This is based on how refkey is being imported in binder.ts
    const key1 = "key1" as unknown as Refkey;
    const key2a = "key2a" as unknown as Refkey;
    const key2b = "key2b" as unknown as Refkey;

    // Create a symbol with a refkey
    const sym1 = new OutputSymbol("sym1", {
      binder,
      scope,
      refkeys: [key1],
    });

    // Create a symbol with multiple refkeys
    const sym2 = new OutputSymbol("sym2", {
      binder,
      scope,
      refkeys: [key2a, key2b],
    });

    flushJobs();

    expect(scope.symbolsByRefkey.get(key1)).toBe(sym1);
    expect(scope.symbolsByRefkey.get(key2a)).toBe(sym2);
    expect(scope.symbolsByRefkey.get(key2b)).toBe(sym2);
  });
});

describe("OutputScope#children", () => {
  it("tracks child scopes", () => {
    const parentScope = new OutputScope("parent", { binder });
    const child1 = new OutputScope("child1", { binder, parent: parentScope });
    const child2 = new OutputScope("child2", { binder, parent: parentScope });
    flushJobs();

    expect(parentScope.children.size).toBe(2);
    expect(parentScope.children.has(child1)).toBe(true);
    expect(parentScope.children.has(child2)).toBe(true);

    // Check that each child's parent is set correctly
    expect(child1.parent).toBe(parentScope);
    expect(child2.parent).toBe(parentScope);
  });
});

describe("OutputScope#clone", () => {
  let originalScope: OutputScope;
  const originalMetadata = { data: "original", nested: { value: 1 } };

  beforeEach(() => {
    const parentScope = new OutputScope("parent", { binder });

    originalScope = new OutputScope("original", {
      binder: binder,
      kind: "class",
      metadata: { ...originalMetadata },
      parent: parentScope,
    });

    // Add a symbol and child scope to the original
    new OutputSymbol("symbolInOriginal", { binder, scope: originalScope });
    new OutputScope("childOfOriginal", { binder, parent: originalScope });
    flushJobs();
  });

  it("clones basic properties", () => {
    const newScope = new OutputScope("newScope", { binder });
    const clonedScope = originalScope.clone({ parent: newScope });

    expect(clonedScope.name).toBe(originalScope.name);
    expect(clonedScope.kind).toBe(originalScope.kind);
    expect(clonedScope.flags).toBe(originalScope.flags);
    expect(clonedScope.id).not.toBe(originalScope.id);

    expect(clonedScope.metadata).toEqual(originalScope.metadata);

    expect(clonedScope.symbols.size).toBe(1);
    expect(clonedScope.children.size).toBe(1);
  });

  it("can override parent in clone options", () => {
    const newParent = new OutputScope("newParent", { binder });
    const clonedScope = originalScope.clone({ parent: newParent });
    flushJobs();

    expect(clonedScope.parent).toBe(newParent);
    expect(newParent.children.has(clonedScope)).toBe(true);
  });

  it("can override owner in clone options", () => {
    const newOwnerParent = new OutputScope("newOwnerParent", { binder });
    const newOwner = new OutputSymbol("newOwner", {
      binder,
      scope: newOwnerParent,
    });
    const clonedScope = originalScope.clone({ owner: newOwner });
    flushJobs();

    expect(clonedScope.owner).toBe(newOwner);
  });

  it("allows independent changes to clone properties", () => {
    const clonedScope = originalScope.clone();
    clonedScope.name = "clonedName";

    expect(originalScope.name).toBe("original");
  });
});
