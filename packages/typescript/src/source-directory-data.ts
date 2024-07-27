import {
  reactive,
  SourceDirectoryContext,
  isProxy,
  toRaw,
} from "@alloy-js/core";
import { TSModuleScope } from "./symbols.js";

export interface SourceDirectoryData {
  modules: Set<TSModuleScope>;
}

const sourceDirectoryData = new WeakMap<
  SourceDirectoryContext,
  SourceDirectoryData
>();

export function getSourceDirectoryData(sdContext: SourceDirectoryContext) {
  // sometimes a module is stored in a reactive context, but we depend on
  // identity so either we need to make all source directory contexts reactive,
  // or call toRaw here.
  sdContext = toRaw(sdContext);
  if (sourceDirectoryData.has(sdContext)) {
    return sourceDirectoryData.get(sdContext)!;
  }

  const sdData: SourceDirectoryData = {
    modules: reactive(new Set()),
  };

  sourceDirectoryData.set(sdContext, sdData);

  return sdData;
}
