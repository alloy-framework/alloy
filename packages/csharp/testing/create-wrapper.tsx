import { SourceFile } from "#components/index.js";
import { createTestWrapper, type TestWrapper } from "@alloy-js/core/testing";
import { CSharpSymbol, useSourceFileScope } from "../src/index.js";

export function createCSharpTestWrapper(): TestWrapper {
  return createTestWrapper({
    filePath: "test.cs",
    useScope: useSourceFileScope,
    makeSymbol: (nk, scope) => new CSharpSymbol(nk, scope.spaces),
    SourceFile,
  });
}
