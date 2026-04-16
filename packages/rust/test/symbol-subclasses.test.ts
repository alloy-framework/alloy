import { createSymbol, watch } from "@alloy-js/core";
import { describe, expect, it, vi } from "vitest";
import { FunctionSymbol } from "../src/symbols/function-symbol.js";
import { NamedTypeSymbol } from "../src/symbols/named-type-symbol.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

describe("NamedTypeSymbol", () => {
  it("creates with the provided type kind", () => {
    const symbol = createSymbol(NamedTypeSymbol, "Item", undefined, "struct");

    expect(symbol.typeKind).toBe("struct");
  });

  it("tracks and triggers reactive type kind updates", () => {
    const symbol = createSymbol(NamedTypeSymbol, "Item", undefined, "struct");
    const typeKindSpy = vi.fn();

    watch(() => symbol.typeKind, typeKindSpy);
    symbol.typeKind = "enum";

    expect(symbol.typeKind).toBe("enum");
    expect(typeKindSpy).toHaveBeenCalled();
  });

  it("exposes members and type-parameters member spaces", () => {
    const owner = createSymbol(NamedTypeSymbol, "Owner", undefined, "trait");
    const member = createSymbol(RustOutputSymbol, "member", owner.members);
    const typeParameter = createSymbol(
      RustOutputSymbol,
      "T",
      owner.typeParameters,
    );

    expect(owner.members).toBe(owner.memberSpaceFor("members"));
    expect(owner.typeParameters).toBe(owner.memberSpaceFor("type-parameters"));
    expect(owner.members.has(member)).toBe(true);
    expect(owner.typeParameters.has(typeParameter)).toBe(true);
  });

  it("copy preserves values and mirrors reactive updates", () => {
    const symbol = createSymbol(NamedTypeSymbol, "Item", undefined, "trait", {
      visibility: "pub",
      symbolKind: "trait",
      isUnsafe: true,
    });
    const copy = symbol.copy();

    expect(copy).toBeInstanceOf(NamedTypeSymbol);
    expect(copy.typeKind).toBe("trait");
    expect(copy.visibility).toBe("pub");
    expect(copy.symbolKind).toBe("trait");
    expect(copy.isUnsafe).toBe(true);

    symbol.typeKind = "type-alias";
    symbol.visibility = "pub(crate)";

    expect(copy.typeKind).toBe("type-alias");
    expect(copy.visibility).toBe("pub(crate)");
  });
});

describe("FunctionSymbol", () => {
  it("creates with optional receiverType", () => {
    const symbol = createSymbol(FunctionSymbol, "run", undefined, {
      receiverType: "&self",
    });

    expect(symbol.receiverType).toBe("&self");
  });

  it("tracks and triggers reactive receiverType updates", () => {
    const symbol = createSymbol(FunctionSymbol, "run", undefined);
    const receiverSpy = vi.fn();

    watch(() => symbol.receiverType, receiverSpy);
    symbol.receiverType = "&mut self";

    expect(symbol.receiverType).toBe("&mut self");
    expect(receiverSpy).toHaveBeenCalled();
  });

  it("copy preserves receiverType and mirrors updates", () => {
    const symbol = createSymbol(FunctionSymbol, "run", undefined, {
      receiverType: "self",
      visibility: "pub",
      symbolKind: "function",
    });
    const copy = symbol.copy();

    expect(copy).toBeInstanceOf(FunctionSymbol);
    expect(copy.receiverType).toBe("self");
    expect(copy.visibility).toBe("pub");
    expect(copy.symbolKind).toBe("function");

    symbol.receiverType = "&self";
    symbol.visibility = "pub(super)";

    expect(copy.receiverType).toBe("&self");
    expect(copy.visibility).toBe("pub(super)");
  });
});
