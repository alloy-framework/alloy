import {
  Refkey,
  ResolutionResult,
  resolve,
  ScopeContext,
  SourceDirectoryContext,
  useContext,
  useScope,
} from "@alloy-js/core";
import { SourceFileContext } from "./SourceFile.js";
import { memo, untrack } from "@alloy-js/core/jsx-runtime";
import { TSOutputScope, TSOutputSymbol, TSPackageScope } from "../symbols.js";
import { usePackage } from "./PackageDirectory.jsx";

export interface ReferenceProps {
  refkey: Refkey;
}

export function Reference({ refkey }: ReferenceProps) {
  const sourceFile = useContext(SourceFileContext);
  const result = resolve<TSOutputScope, TSOutputSymbol>(refkey as Refkey);

  return memo(() => {
    if (result.value === undefined) {
      return;
    }

    const { targetDeclaration, pathDown, pathUp, commonScope } = result.value;

    if (commonScope!.kind === "global" && pathDown[0].kind === "package") {
      // need package import
      const pkg = usePackage();
      const sourcePackage = pathDown[0];
      if (sourcePackage.kind !== "package") {
        throw new Error("Expected source to be package.");
      }
      pkg.addDependency(sourcePackage)
      // find public dependency
      for (const [publicPath, module] of sourcePackage.exportedSymbols) {
        if (module.exportedSymbols.has(targetDeclaration.refkey)) {
          return untrack(() => sourceFile!.addImport(targetDeclaration, sourcePackage, publicPath));
        }
      }

      throw new Error("The symbol " + targetDeclaration.name + " is not exported from package " + pkg.scope.name);
    } else if (pathDown.length > 0 && pathDown[0].kind === "module") {
      // need relative module import
      // todo: it may be faster to pull this out of pathUp
      return untrack(() => sourceFile!.addImport(targetDeclaration));
    }
    return targetDeclaration.name;
  });
}
