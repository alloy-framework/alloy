import { reactive, watch } from "@vue/reactivity";
import { describe, expect, it, vi } from "vitest";
import { Refkey } from "../../src/refkey.js";
import { flushJobs } from "../../src/scheduler.js";
import { BasicScope } from "../../src/symbols/basic-scope.js";
import { SymbolTable } from "../../src/symbols/symbol-table.js";
import { binder, createScope, createSymbol } from "./utils.js";

describe("OutputScope constructor", () => {
  it("initializes properties correctly with default options", () => {
    const scope = createScope("testScope");
    expect(scope.name).toBe("testScope");
    expect(scope.binder).toBe(binder);
    expect(scope.id).toEqual(expect.any(Number));
    expect(scope.metadata).toEqual({});
    expect(scope.symbols).toBeInstanceOf(SymbolTable);
    expect(scope.symbolNames.size).toBe(0);
    expect(scope.children.size).toBe(0);
  });

  it("initializes properties correctly with custom options", () => {
    const parentScope = createScope("parentScope");
    const metadata = { foo: "bar" };

    const scope = new BasicScope("testScope", parentScope, {
      binder,
      metadata,
    });

    expect(scope.name).toBe("testScope");
    expect(scope.metadata.foo).toBe("bar");
    expect(scope.parent).toBe(parentScope);
    expect(parentScope.children.has(scope)).toBe(true);
  });
});

describe("OutputScope reactivity", () => {
  it("is reactive on name", () => {
    const scope = createScope("initialName");
    const nameSpy = vi.fn();
    watch(() => scope.name, nameSpy);

    scope.name = "newName";
    flushJobs();
    expect(nameSpy).toHaveBeenCalled();
    expect(scope.name).toBe("newName");
  });

  it("updates symbolNames when symbols are added", () => {
    const scope = createScope("scope");
    const symbolNamesSpy = vi.fn();
    watch(() => scope.symbolNames.size, symbolNamesSpy);

    createSymbol("symbol1", scope);
    flushJobs();
    expect(symbolNamesSpy).toHaveBeenCalled();
    expect(scope.symbolNames.has("symbol1")).toBe(true);
  });

  it("updates symbolNames when a symbol's name changes", () => {
    const scope = createScope("scope");
    const symbol = createSymbol("oldName", scope);
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
    const scope = createScope("scope");

    const rScope = reactive(scope);
    expect(rScope).toBe(scope);
  });
});

describe("OutputScope#symbols", () => {
  it("adds symbols to its collection", () => {
    const scope = createScope("scope");
    const sym1 = createSymbol("sym1", scope);
    const sym2 = createSymbol("sym2", scope);
    flushJobs();

    expect(scope.symbols.size).toBe(2);
    expect(scope.symbols.has(sym1)).toBe(true);
    expect(scope.symbols.has(sym2)).toBe(true);
  });

  it("resolves symbol name conflicts", () => {
    const scope = createScope("scope");
    const s1 = createSymbol("sym", scope);
    const s2 = createSymbol("sym", scope);
    const s3 = createSymbol("sym", scope);

    flushJobs();

    expect(s1.name).toBe("sym");
    expect(s2.name).toBe("sym_2");
    expect(s3.name).toBe("sym_3");
    flushJobs();
    expect(scope.symbolNames.has("sym")).toBe(true);
    expect(scope.symbolNames.has("sym_2")).toBe(true);
    expect(scope.symbolNames.has("sym_3")).toBe(true);
  });

  it("updates when a symbol is deleted", () => {
    const scope = createScope("scope");
    const sym = createSymbol("sym", scope);
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
    const scope1 = createScope("scope1");
    const scope2 = createScope("scope2");
    const sym = createSymbol("sym", scope1);
    flushJobs();

    expect(scope1.symbols.size).toBe(1);
    expect(scope2.symbols.size).toBe(0);

    sym.spaces = [scope2.symbols];
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
    const scope = createScope("scope");

    // Use the refkey function to create refkeys
    // This is based on how refkey is being imported in binder.ts
    const key1 = "key1" as unknown as Refkey;
    const key2a = "key2a" as unknown as Refkey;
    const key2b = "key2b" as unknown as Refkey;

    // Create a symbol with a refkey
    const sym1 = createSymbol("sym1", scope, {
      refkeys: [key1],
    });

    // Create a symbol with multiple refkeys
    const sym2 = createSymbol("sym2", scope, {
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
    const parentScope = createScope("parent");
    const child1 = createScope("child1", parentScope);
    const child2 = createScope("child2", parentScope);
    flushJobs();

    expect(parentScope.children.size).toBe(2);
    expect(parentScope.children.has(child1)).toBe(true);
    expect(parentScope.children.has(child2)).toBe(true);

    // Check that each child's parent is set correctly
    expect(child1.parent).toBe(parentScope);
    expect(child2.parent).toBe(parentScope);
  });
});
