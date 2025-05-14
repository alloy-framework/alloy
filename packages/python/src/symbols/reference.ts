import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { SourceFileContext } from "../components/index.js";
import { PythonOutputSymbol } from "./python-output-symbol.js";

// You can define this as an empty interface for now
export type PythonOutputScope = any;

/**
 * Resolve reference to symbol reference, and handle dependency management
 *
 * @param refkey - Reference key to symbol
 */
export function ref(refkey: Refkey) {
  const sourceFile = useContext(SourceFileContext);
  const result = resolve<PythonOutputScope, PythonOutputSymbol>(
    refkey as Refkey,
  );

  return memo(() => {
    if (result.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration } = result.value;

    // For Python, you may want to add an import if the symbol is from another module
    return untrack(() => sourceFile!.addImport(targetDeclaration));
  });
}
