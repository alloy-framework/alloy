import { createSymbol, watch } from "@alloy-js/core";
import { describe, expect, it, vi } from "vitest";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

describe("RustOutputSymbol", () => {
  it("uses expected default values", () => {
    const symbol = createSymbol(RustOutputSymbol, "item", undefined);

    expect(symbol.visibility).toBeUndefined();
    expect(symbol.symbolKind).toBe("symbol");
    expect(symbol.isAsync).toBe(false);
    expect(symbol.isUnsafe).toBe(false);
    expect(symbol.isConst).toBe(false);
  });

  it("tracks and triggers reactive property updates", () => {
    const symbol = createSymbol(RustOutputSymbol, "item", undefined);
    const visibilitySpy = vi.fn();
    const symbolKindSpy = vi.fn();
    const isAsyncSpy = vi.fn();
    const isUnsafeSpy = vi.fn();
    const isConstSpy = vi.fn();

    watch(() => symbol.visibility, visibilitySpy);
    watch(() => symbol.symbolKind, symbolKindSpy);
    watch(() => symbol.isAsync, isAsyncSpy);
    watch(() => symbol.isUnsafe, isUnsafeSpy);
    watch(() => symbol.isConst, isConstSpy);

    symbol.visibility = "pub(crate)";
    symbol.symbolKind = "function";
    symbol.isAsync = true;
    symbol.isUnsafe = true;
    symbol.isConst = true;

    expect(symbol.visibility).toBe("pub(crate)");
    expect(symbol.symbolKind).toBe("function");
    expect(symbol.isAsync).toBe(true);
    expect(symbol.isUnsafe).toBe(true);
    expect(symbol.isConst).toBe(true);
    expect(visibilitySpy).toHaveBeenCalled();
    expect(symbolKindSpy).toHaveBeenCalled();
    expect(isAsyncSpy).toHaveBeenCalled();
    expect(isUnsafeSpy).toHaveBeenCalled();
    expect(isConstSpy).toHaveBeenCalled();
  });

  it("copy preserves configured values", () => {
    const symbol = createSymbol(RustOutputSymbol, "item", undefined, {
      visibility: "pub",
      symbolKind: "trait",
      isAsync: true,
      isUnsafe: true,
      isConst: true,
    });

    const copy = symbol.copy();

    expect(copy).toBeInstanceOf(RustOutputSymbol);
    expect(copy).not.toBe(symbol);
    expect(copy.visibility).toBe("pub");
    expect(copy.symbolKind).toBe("trait");
    expect(copy.isAsync).toBe(true);
    expect(copy.isUnsafe).toBe(true);
    expect(copy.isConst).toBe(true);
  });

  it("copy stays reactively in sync with source properties", () => {
    const symbol = createSymbol(RustOutputSymbol, "item", undefined);
    const copy = symbol.copy();

    symbol.visibility = "pub(super)";
    symbol.symbolKind = "module";
    symbol.isAsync = true;
    symbol.isUnsafe = true;
    symbol.isConst = true;

    expect(copy.visibility).toBe("pub(super)");
    expect(copy.symbolKind).toBe("module");
    expect(copy.isAsync).toBe(true);
    expect(copy.isUnsafe).toBe(true);
    expect(copy.isConst).toBe(true);
  });

  it("exposes members accessor for the members space", () => {
    const owner = createSymbol(RustOutputSymbol, "owner", undefined);
    const member = createSymbol(RustOutputSymbol, "member", owner.members);

    expect(owner.members).toBe(owner.memberSpaceFor("members"));
    expect(owner.members.has(member)).toBe(true);
  });
});
