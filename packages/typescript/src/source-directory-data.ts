import { isProxy, reactive, SourceDirectoryContext } from "@alloy-js/core";
import { TSModuleScope } from "./symbols.js";

export interface SourceDirectoryData {
  modules: Set<TSModuleScope>;
}

const sourceDirectoryData = new WeakMap<
  SourceDirectoryContext,
  SourceDirectoryData
>();

export function getSourceDirectoryData(sdContext: SourceDirectoryContext) {
  if (sourceDirectoryData.has(sdContext)) {
    return sourceDirectoryData.get(sdContext)!;
  }

  const sdData: SourceDirectoryData = {
    modules: reactive(new Set()),
  };

  sourceDirectoryData.set(sdContext, sdData);

  return sdData;
}
