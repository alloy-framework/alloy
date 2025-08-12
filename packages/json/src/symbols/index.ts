import { memo, OutputScope, Refkey, resolve } from "@alloy-js/core";
import { dirname, relative } from "pathe";
import { useJsonFileContext } from "../context/JsonFileContext.js";
import { JsonOutputSymbol } from "./json-symbol.js";
export * from "./json-symbol.js";

export function ref(refkey: Refkey) {
  const sourceFile = useJsonFileContext();
  if (!sourceFile) {
    return "<Unresolved Symbol>";
  }

  const resolveResult = resolve<OutputScope, JsonOutputSymbol>(refkey);

  return memo(() => {
    if (resolveResult.value === undefined) {
      return "<Unresolved Symbol>";
    }
    const {
      pathUp,
      lexicalDeclaration,
      memberPath,
      commonScope,
      fullSymbolPath,
    } = resolveResult.value;
    let ref = "";

    // When we have no common scope and we don't path up through the symbol
    // we're referencing (i.e. the symbol we're referencing isn't the symbol for
    // the file the reference occurs in), append the file path.
    if (
      commonScope === undefined &&
      pathUp[0] &&
      pathUp[0].ownerSymbol !== lexicalDeclaration
    ) {
      const currentPath = sourceFile.symbol.name;
      const targetPath = lexicalDeclaration.name;
      ref += relative(dirname(currentPath), targetPath);
    }

    ref += "#";

    // when fullPath is non-empty, it means we are resolving something that is a
    // member of a symbol that is in-scope. So we need to use the full path to
    // recover the symbol names of the scopes, and then use the member path. The
    // first entry of the fullPath is the root scope of this file so we ignore
    // it.
    if (fullSymbolPath.length <= 1 && memberPath.length === 0) {
      return ref;
    }

    ref += "/";
    ref += fullSymbolPath
      .slice(1)
      .map((s) => s.ownerSymbol!.name)
      .concat(memberPath.map((s) => s.name))
      .join("/");

    return ref;
  });
}
