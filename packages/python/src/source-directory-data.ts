import { shallowReactive, SourceDirectoryContext } from "@alloy-js/core";
import { PythonModuleScope } from "./symbols/index.js";

export interface SourceDirectoryData {
  modules: Set<PythonModuleScope>;
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
    modules: shallowReactive(new Set()),
  };

  sourceDirectoryData.set(sdContext, sdData);

  return sdData;
}
