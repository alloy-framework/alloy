import {
  computed,
  OutputScope,
  OutputSymbol,
  Ref,
  Refkey,
  resolve,
} from "@alloy-js/core";
import { isNamespaceSymbol, NamespaceSymbol } from "../index.js";
import { NamedTypeScope } from "../scopes/named-type.js";
import { ProgramScope } from "../scopes/program.js";
import { SourceFileScope, useSourceFileScope } from "../scopes/source-file.js";
import { relativePath } from "../util.js";
import { TypeSpecSymbol } from "./typespec.js";

export interface RefResult {
  symbol: OutputSymbol;
  /**
   * The access path to render for this reference. After namespace members
   * are consumed for `using` resolution, this contains only non-namespace
   * members that must be rendered as a dot-separated path.
   *
   * Examples:
   *   - `TypeSpec.Record` → accessPath = [] (Record is directly accessible)
   *   - `TypeSpec.Lifecycle.Read` → accessPath = [Read] (Lifecycle is the
   *     lexical declaration, Read is a member to render)
   */
  accessPath: OutputSymbol[];
}

export function ref(refkey: Refkey): Ref<RefResult | undefined> {
  const scope = useSourceFileScope();
  if (!scope) {
    throw new Error("Reference used outside of a source file scope.");
  }
  const resolveResult = resolve<NamedTypeScope, TypeSpecSymbol>(refkey);
  return computed(() => {
    if (resolveResult.value === undefined) {
      return undefined;
    }
    const result = resolveResult.value;
    const { commonScope, pathUp, pathDown } = result;
    let { lexicalDeclaration } = result;
    // Copy memberPath since we mutate it by shifting namespace members
    const memberPath = [...result.memberPath];

    if (!validateSymbolReachable(pathDown)) {
      return undefined;
    }

    // Shift namespace members off the front of memberPath. Each shifted
    // namespace becomes the new lexical declaration, and the deepest
    // namespace is the one we add a `using` for. This mirrors how C#
    // handles nested namespace resolution.
    let nsToUse: NamespaceSymbol | undefined;
    while (
      isNamespaceSymbol(lexicalDeclaration as TypeSpecSymbol) &&
      memberPath.length > 0
    ) {
      nsToUse = lexicalDeclaration as NamespaceSymbol;
      lexicalDeclaration = memberPath.shift()!;
    }

    // Library symbol resolution has three modes:
    // 1. implicitlyUsed (e.g. TypeSpec core) — emit nothing
    // 2. packageImport set (e.g. @typespec/http) — emit `import "pkg"` + `using Ns`
    // 3. Neither (e.g. TypeSpec.Reflection) — falls through to the general
    //    path below, which emits only `using` (no file import is generated
    //    because library symbols have no SourceFileScope in their pathDown).
    const targetSym = result.symbol as TypeSpecSymbol;

    if (targetSym.implicitlyUsed) {
      return { symbol: lexicalDeclaration, accessPath: memberPath };
    }

    if (targetSym.packageImport) {
      scope.addImport(targetSym.packageImport);
      if (nsToUse) {
        scope.addUsing(nsToUse);
      }
      return { symbol: lexicalDeclaration, accessPath: memberPath };
    }

    if (commonScope instanceof ProgramScope) {
      const originFileScope = pathUp.find((s) => s instanceof SourceFileScope);
      const targetFileScope = pathDown.find(
        (s) => s instanceof SourceFileScope,
      );
      if (originFileScope && targetFileScope) {
        const importPath = relativePath(originFileScope.name, targetFileScope.name);
        scope!.addImport(importPath);
      }
    }

    if (nsToUse) {
      scope.addUsing(nsToUse);
    }

    return { symbol: lexicalDeclaration, accessPath: memberPath };
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
