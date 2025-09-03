import { memo, OutputSymbol, Refkey, resolve } from "@alloy-js/core";
import { GoScope } from "../scopes/go.js";
import { GoPackageScope } from "../scopes/package.js";
import { useSourceFileScope } from "../scopes/source-file.js";
import { GoSymbol } from "./go.js";
import { PackageSymbol } from "./package.js";

function closestPackageScope(scopes: GoScope[]): GoPackageScope | undefined {
  for (let i = scopes.length - 1; i >= 0; i--) {
    const scope = scopes[i];
    if (scope instanceof GoPackageScope) {
      return scope;
    }
  }
  return undefined;
}

// converts a refkey to its fully qualified name
// e.g. if refkey is for bar in enum type foo, and
// foo is in the same namespace as the refkey, then
// the result would be foo.bar.
export function ref(refkey: Refkey): () => [string, OutputSymbol | undefined] {
  const refSfScope = useSourceFileScope()!;
  const resolveResult = resolve<GoScope, GoSymbol>(refkey as Refkey);

  return memo(() => {
    if (resolveResult.value === undefined) {
      return ["<Unresolved Symbol>", undefined];
    }

    const result = resolveResult.value;
    const { pathDown, memberPath } = result;
    const { lexicalDeclaration } = result;

    const parts = [];

    let localSymbol: GoSymbol | undefined;

    const pkgScope = closestPackageScope(pathDown)!;
    if (pkgScope) {
      // we need to import the package
      if (!lexicalDeclaration.exported) {
        throw new Error(
          `Can't reference non-exported symbol ${lexicalDeclaration.name} from another package.`,
        );
      }
      const pkgSymbol = pkgScope.ownerSymbol as PackageSymbol;
      localSymbol = refSfScope.addImport(pkgSymbol);
    }

    if (localSymbol) {
      parts.push(localSymbol.name);
    }
    parts.push(lexicalDeclaration.name);
    for (const member of memberPath) {
      parts.push(member.name);
    }

    return [parts.join("."), result.symbol];
  });
}
