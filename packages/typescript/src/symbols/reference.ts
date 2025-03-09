import {
  memo,
  OutputSymbolFlags,
  Refkey,
  resolve,
  untrack,
  useContext,
} from "@alloy-js/core";
import { usePackage } from "../components/PackageDirectory.jsx";
import { SourceFileContext } from "../components/SourceFile.jsx";
import { TSOutputScope } from "./scopes.js";
import { TSMemberScope } from "./ts-member-scope.js";
import { TSModuleScope } from "./ts-module-scope.js";
import { TSOutputSymbol } from "./ts-output-symbol.js";
import { TSPackageScope } from "./ts-package-scope.js";

export function ref(refkey: Refkey): () => string {
  const sourceFile = useContext(SourceFileContext);
  const resolveResult = resolve<TSOutputScope, TSOutputSymbol>(
    refkey as Refkey,
  );

  return memo(() => {
    if (resolveResult.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const { targetDeclaration, pathDown, memberPath } = resolveResult.value;

    validateSymbolReachable(pathDown);

    // Where the target declaration is relative to the referencing scope.
    // * package: target symbol is in a different package
    // * module: target symbol is in a different module
    // * local: target symbol is within the current module
    const targetLocation = pathDown[0]?.kind ?? "local";
    let localSymbol: TSOutputSymbol | undefined;

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

      // find public dependency
      for (const module of sourcePackage.exportedSymbols.values()) {
        for (const refkey of importSymbol.refkeys) {
          if (module.exportedSymbols.has(refkey)) {
            localSymbol = untrack(() =>
              sourceFile!.scope.addImport(importSymbol, module),
            );
            break;
          }
        }
      }

      if (!localSymbol) {
        throw new Error(
          "The symbol " +
            targetDeclaration.name +
            " is not exported from package",
        );
      }
    } else if (targetLocation === "module") {
      const symbolPath = [
        ...(pathDown.slice(1) as TSMemberScope[]).map((s) => s.owner),
        targetDeclaration,
      ];

      const importSymbol = symbolPath[0];
      localSymbol = untrack(() =>
        sourceFile!.scope.addImport(importSymbol, pathDown[0] as TSModuleScope),
      );
    }

    if (memberPath && memberPath.length > 0) {
      if (localSymbol) {
        memberPath[0] = localSymbol;
      }

      return addThisPrefix(
        targetDeclaration,
        buildMemberExpression(memberPath),
      );
    } else {
      return addThisPrefix(
        localSymbol ?? targetDeclaration,
        localSymbol ? localSymbol.name : targetDeclaration.name,
      );
    }
  });
}

function addThisPrefix(rootSymbol: TSOutputSymbol, name: string) {
  if (rootSymbol.flags & OutputSymbolFlags.InstanceMember) {
    return `this.${name}`;
  } else {
    return name;
  }
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
