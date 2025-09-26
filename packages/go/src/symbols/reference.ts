import { memo, OutputSymbol, Refkey, resolve } from "@alloy-js/core";
import { GoScope } from "../scopes/go.js";
import { GoPackageScope } from "../scopes/package.js";
import { useSourceFileScope } from "../scopes/source-file.js";
import { GoSymbol } from "./go.js";
import { PackageSymbol } from "./package.js";

function closestPackageScope(
  scopes: GoScope[],
  decl: GoSymbol,
  memberPath: GoSymbol[],
): {
  pkgSymbol: PackageSymbol | undefined;
  members: GoSymbol[];
} {
  const allMembers = [decl, ...memberPath];
  for (let i = allMembers.length - 1; i >= 0; i--) {
    const member = allMembers[i];
    if (member instanceof PackageSymbol) {
      return { pkgSymbol: member, members: allMembers.slice(i + 1) };
    }
  }
  for (let i = scopes.length - 1; i >= 0; i--) {
    const scope = scopes[i];
    if (scope instanceof GoPackageScope) {
      return {
        pkgSymbol: scope.ownerSymbol,
        members: allMembers,
      };
    }
  }
  return {
    pkgSymbol: undefined,
    members: allMembers,
  };
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

    const { pkgSymbol: pkgSymbol, members: pathFromPkg } = closestPackageScope(
      pathDown,
      lexicalDeclaration,
      memberPath,
    );
    if (pkgSymbol) {
      // we need to import the package
      for (const pathMember of pathFromPkg) {
        if (!pathMember.isExported) {
          throw new Error(
            `Can't reference non-exported symbol ${pathMember.name} from another package.`,
          );
        }
      }
      localSymbol = refSfScope.addImport(pkgSymbol);
    }

    if (localSymbol) {
      parts.push(localSymbol.name);
    }
    for (const member of pathFromPkg) {
      parts.push(member.name);
    }

    return [parts.join("."), result.symbol];
  });
}
