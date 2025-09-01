import { describe, expect, it } from "vitest";
import { createScope, createSymbol } from "./utils.js";

describe("OutputSymbol#moveTo", () => {
  it("moves the symbol to a new symbol table", () => {
    const scope = createScope("scope");
    const [symbol] = createSymbol("sym", scope);
    expect(symbol.spaces).toEqual([scope.symbols]);
    const newScope = createScope("new-scope");
    scope.symbols.moveTo(newScope.symbols);
    expect(scope.symbols.has(symbol)).toBe(false);
    expect(newScope.symbols.has(symbol)).toBe(true);
    expect(symbol.spaces).toEqual([newScope.symbols]);
  });
});
