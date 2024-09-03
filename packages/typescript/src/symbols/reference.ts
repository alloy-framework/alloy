import { memo, Refkey, resolve, untrack, useContext } from "@alloy-js/core";
import { usePackage } from "../components/PackageDirectory.jsx";
import { SourceFileContext } from "../components/SourceFile.jsx";
import { TSOutputScope } from "./scopes.js";
import { TSMemberScope } from "./ts-member-scope.js";
import { TSModuleScope } from "./ts-module-scope.js";
import { TSOutputSymbol } from "./ts-output-symbol.js";
import { TSPackageScope } from "./ts-package-scope.js";

export function ref(refkey: Refkey) {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<TSOutputScope, TSOutputSymbol>(
    refkey as Refkey,
  );

  return memo(() => {
    if (resolveResult.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration, pathDown } = resolveResult.value;

    validateSymbolReachable(pathDown);

    // Where the target declaration is relative to the referencing scope.
    // * package: target symbol is in a different package
    // * module: target symbol is in a different module
    // * local: target symbol is within the current module
    const targetLocation = pathDown[0]?.kind ?? "local";

    if (targetLocation === "package") {
      // need package import
      const pkg = usePackage();
      const sourcePackage = pathDown[0] as TSPackageScope;

      if (pkg && !sourcePackage.builtin) {
        pkg.scope.addDependency(sourcePackage);
      }
      const symbolPath = [
        ...(pathDown.slice(2) as TSMemberScope[]).map((s) => s.owner),
        targetDeclaration,
      ];

      const importSymbol = symbolPath[0];

      let localSymbol;
      // find public dependency
      for (const module of sourcePackage.exportedSymbols.values()) {
        if (module.exportedSymbols.has(importSymbol.refkey)) {
          localSymbol = untrack(() =>
            sourceFile!.scope.addImport(importSymbol, module),
          );
        }
      }

      if (!localSymbol) {
        throw new Error(
          "The symbol " +
            targetDeclaration.name +
            " is not exported from package",
        );
      }

      symbolPath[0] = localSymbol;
      return buildMemberExpression(symbolPath);
    } else if (targetLocation === "module") {
      const symbolPath = [
        ...(pathDown.slice(1) as TSMemberScope[]).map((s) => s.owner),
        targetDeclaration,
      ];

      const importSymbol = symbolPath[0];
      const localSymbol = untrack(() =>
        sourceFile!.scope.addImport(importSymbol, pathDown[0] as TSModuleScope),
      );
      symbolPath[0] = localSymbol;

      return buildMemberExpression(symbolPath);
    }

    // local reference
    const syms = (pathDown as TSMemberScope[]).map((s) => s.owner);
    syms.push(targetDeclaration);
    return buildMemberExpression(syms);
  });
}

function buildMemberExpression(symbolPath: TSOutputSymbol[]) {
  return symbolPath.map((sym) => sym.name).join(".");
}

function validateSymbolReachable(path: TSOutputScope[]) {
  for (const scope of path) {
    if (scope.kind === "function") {
      throw new Error(
        "Cannot reference a symbol inside a function from outside a function",
      );
    }
  }
}
