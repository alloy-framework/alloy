import {
  memo,
  OutputScope,
  Refkey,
  resolve,
  unresolvedRefkey,
} from "@alloy-js/core";
import { dirname, relative } from "pathe";
import { useJsonFileContext } from "../context/JsonFileContext.js";
import { JsonOutputSymbol } from "./json-symbol.js";
export * from "./json-symbol.js";

export function ref(refkey: Refkey) {
  const sourceFile = useJsonFileContext();
  if (!sourceFile) {
    return unresolvedRefkey(refkey);
  }

  const resolveResult = resolve<OutputScope, JsonOutputSymbol>(refkey);

  return memo(() => {
    if (resolveResult.value === undefined) {
      return unresolvedRefkey(refkey);
    }
    const {
      pathDown,
      pathUp,
      lexicalDeclaration,
      memberPath,
      commonScope,
      fullSymbolPath,
    } = resolveResult.value;

    let ref = "";
    let isCrossFile = false;
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
      isCrossFile = true;
      ref += relative(dirname(currentPath), targetPath);
    }

    ref += "#";

    if (
      commonScope === undefined &&
      pathDown.length === 0 &&
      memberPath.length === 0
    ) {
      // we are referring to the root of a file
      return ref;
    }

    ref += "/";

    if (isCrossFile) {
      // the lexical declaration is the file symbol, so we just need any
      // additional members.
      ref += memberPath.map((s) => s.name).join("/");
    } else {
      // merge together the member scopes, lexical declaration, and member path
      ref += fullSymbolPath
        .slice(1)
        .map((s) => s.ownerSymbol!.name)
        .concat(lexicalDeclaration.name)
        .concat(memberPath.map((s) => s.name))
        .join("/");
    }

    return ref;
  });
}
