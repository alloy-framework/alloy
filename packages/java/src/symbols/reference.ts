import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { SourceFileContext } from "../components/index.js";
import { JavaOutputScope } from "./scopes.js";
import { JavaOutputSymbol } from "./java-output-symbol.js";

/**
 * Resolve reference to symbol reference, and handle dependency management
 *
 * @param refkey Reference key to symbol
 */
export function ref(refkey: Refkey) {
  const sourceFile = useContext(SourceFileContext);
  const result = resolve<JavaOutputScope, JavaOutputSymbol>(refkey as Refkey);

  return memo(() => {
    if (result.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration, pathDown, pathUp, commonScope } = result.value;

    return untrack(() => sourceFile!.addImport(targetDeclaration));
  });
}
