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
    const { targetDeclaration, memberPath } = resolveResult.value;

    let ref = "";
    if (targetDeclaration !== sourceFile.symbol) {
      const currentPath = sourceFile.symbol.name;
      const targetPath = targetDeclaration.name;
      ref += relative(dirname(currentPath), targetPath);
    }

    ref += "#";

    if (!memberPath || memberPath.length === 0) {
      return ref;
    }

    ref += "/";

    ref += memberPath
      .slice(1)
      .map((segment) => segment.name)
      .join("/");

    return ref;
  });
}
