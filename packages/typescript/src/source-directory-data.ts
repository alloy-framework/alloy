import type { SourceDirectoryContext } from "@alloy-js/core";
import { shallowReactive } from "@alloy-js/core";

import type { TSModuleScope } from "./symbols/index.js";

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
    modules: shallowReactive(new Set()),
  };

  sourceDirectoryData.set(sdContext, sdData);

  return sdData;
}
