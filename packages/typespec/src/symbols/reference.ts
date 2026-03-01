import {
  memo,
  OutputScope,
  OutputSymbol,
  Refkey,
  resolve,
} from "@alloy-js/core";
import { NamespaceSymbol } from "../index.js";
import { NamedTypeScope } from "../scopes/named-type.js";
import { ProgramScope } from "../scopes/program.js";
import { SourceFileScope, useSourceFileScope } from "../scopes/source-file.js";
import { Optional, relativePath } from "../util.js";
import { TypeSpecSymbol } from "./typespec.js";

export function ref(refkey: Refkey): () => Optional<OutputSymbol> {
  const scope = useSourceFileScope();
  if (!scope) {
    throw new Error("Reference used outside of a source file scope.");
  }
  const resolveResult = resolve<NamedTypeScope, TypeSpecSymbol>(refkey);
  return memo(() => {
    if (resolveResult.value === undefined) {
      return undefined;
    }
    const result = resolveResult.value;
    const { commonScope, pathUp, pathDown, memberPath, lexicalDeclaration } =
      result;

    if (!validateSymbolReachable(pathDown)) {
      return undefined;
    }

    if (commonScope instanceof ProgramScope) {
      const originFileScope = pathUp.find((s) => s instanceof SourceFileScope);
      const originPath = originFileScope?.name;
      const targetFileScope = pathDown.find(
        (s) => s instanceof SourceFileScope,
      );
      const targetPath = targetFileScope?.name;
      if (!originPath && !targetPath) {
        throw new Error("Neither origin nor target path found for reference.");
      }
      const importPath = relativePath(originPath!, targetPath!);
      scope!.addImport(importPath);
    }
    if (lexicalDeclaration instanceof NamespaceSymbol) {
      scope.addUsing(lexicalDeclaration);
    }

    return result.symbol;
  });
}

/**
 * Checks whether a symbol is reachable from the current scope by inspecting
 * the path down to the target. Symbols inside a NamedTypeScope (e.g. template
 * parameters) are not reachable from outside that scope.
 */
function validateSymbolReachable(pathDown: OutputScope[]): boolean {
  return !pathDown.some((s) => s instanceof NamedTypeScope);
}
