import { refkey, useContext } from "@alloy-js/core";
import { PythonSourceFileContext } from "./components/SourceFile.js";
import { PythonElements, usePythonNamePolicy } from "./name-policy.js";
import {
  CreatePythonSymbolOptions,
  PythonOutputSymbol,
} from "./symbols/index.js";

export function createPythonSymbol(
  name: string,
  options: CreatePythonSymbolOptions,
  kind?: PythonElements,
  createRefkeyIfNeeded = false,
): PythonOutputSymbol {
  let processedName = name;
  const sfContext = useContext(PythonSourceFileContext);
  // Only apply the name policy if a kind is provided and name policy context is available
  if (kind) {
    const namePolicy = usePythonNamePolicy();
    if (namePolicy) {
      processedName = namePolicy.getName(name, kind);
    }
  }

  return new PythonOutputSymbol(processedName, {
    binder: options.binder,
    aliasTarget: options.aliasTarget,
    scope: options.scope,
    refkeys:
      options.refkeys ??
      (createRefkeyIfNeeded ? refkey(processedName) : undefined),
    flags: options.flags,
    metadata: options.metadata,
    module: sfContext?.module,
  });
}
