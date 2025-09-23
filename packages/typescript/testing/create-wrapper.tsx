import { SourceFile } from "#components/index.js";
import { createTestWrapper, type TestWrapper } from "@alloy-js/core/testing";
import { TSOutputSymbol, useTSScope } from "../src/index.js";

export function createTSTestWrapper(): TestWrapper {
  return createTestWrapper({
    filePath: "test.ts",
    useScope: useTSScope,
    makeSymbol: (nk, scope) => new TSOutputSymbol(nk, scope.spaces),
    SourceFile,
  });
}
