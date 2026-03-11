import { createSymbol } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { rustNameConflictResolver } from "../src/name-conflict-resolver.js";
import { RustOutputSymbol } from "../src/symbols/rust-output-symbol.js";

describe("rustNameConflictResolver", () => {
  it("keeps local declarations unchanged and renames imported symbols", () => {
    const local = createSymbol(RustOutputSymbol, "Widget", undefined);
    const importTargetA = createSymbol(RustOutputSymbol, "Widget", undefined);
    const importTargetB = createSymbol(RustOutputSymbol, "Widget", undefined);
    const importedA = createSymbol(RustOutputSymbol, "Widget", undefined, {
      aliasTarget: importTargetA,
    });
    const importedB = createSymbol(RustOutputSymbol, "Widget", undefined, {
      aliasTarget: importTargetB,
    });

    rustNameConflictResolver("Widget", [importedA, local, importedB]);

    expect(local.name).toBe("Widget");
    expect(importedA.name).toBe("Widget_2");
    expect(importedB.name).toBe("Widget_3");
  });

  it("keeps the first imported symbol when all conflicts are imports", () => {
    const importTargetA = createSymbol(RustOutputSymbol, "Result", undefined);
    const importTargetB = createSymbol(RustOutputSymbol, "Result", undefined);
    const importedA = createSymbol(RustOutputSymbol, "Result", undefined, {
      aliasTarget: importTargetA,
    });
    const importedB = createSymbol(RustOutputSymbol, "Result", undefined, {
      aliasTarget: importTargetB,
    });

    rustNameConflictResolver("Result", [importedA, importedB]);

    expect(importedA.name).toBe("Result");
    expect(importedB.name).toBe("Result_2");
  });

  it("treats metadata-marked symbols as imported", () => {
    const local = createSymbol(RustOutputSymbol, "Config", undefined);
    const imported = createSymbol(RustOutputSymbol, "Config", undefined, {
      metadata: { rustImportedSymbol: true },
    });

    rustNameConflictResolver("Config", [local, imported]);

    expect(local.name).toBe("Config");
    expect(imported.name).toBe("Config_2");
  });
});
