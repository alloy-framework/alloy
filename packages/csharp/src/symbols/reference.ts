import { memo, Refkey, resolve } from "@alloy-js/core";
import { CSharpScope } from "../scopes/csharp.js";
import {
  CSharpNamespaceScope,
  useNamespace,
} from "../scopes/namespace-scope.js";
import { useSourceFileScope } from "../scopes/source-file-scope.js";
import { CSharpSymbol } from "./csharp.js";
import { CSharpNamespaceSymbol } from "./namespace.js";

// converts a refkey to its fully qualified name
// e.g. if refkey is for bar in enum type foo, and
// foo is in the same namespace as the refkey, then
// the result would be foo.bar.
export function ref(refkey: Refkey): () => string {
  const refNamespace = useNamespace();
  const refSfScope = useSourceFileScope()!;
  const resolveResult = resolve<CSharpScope, CSharpSymbol>(refkey as Refkey);

  return memo(() => {
    if (resolveResult.value === undefined) {
      return "<Unresolved Symbol>";
    }

    const {
      symbol,
      memberPathUp,
      commonScope,
      commonMemberContainer,
      lexicalDeclaration,
    } = resolveResult.value;
    let { pathDown, memberPathDown = [], pathUp } = resolveResult.value;
    if (commonMemberContainer) {
      // If we have a common member, the reference is in a member scope, and the target
      // is a (possibly nested) member of our current member scope.
      const firstMember = memberPathDown[0];
      const parts = [];

      // When we're in member scope accessing a proper member, prefer to prefix
      // with the container name or `this` to avoid name conflicts with
      // parameters and such.
      if (
        firstMember.symbolKind === "method" ||
        firstMember.symbolKind === "property" ||
        firstMember.symbolKind === "event" ||
        firstMember.symbolKind === "field"
      ) {
        if (firstMember.isStatic) {
          parts.push(commonMemberContainer.name);
        } else {
          parts.push("this");
        }
      }

      for (let i = 0; i < memberPathDown.length; i++) {
        const member = memberPathDown[i];
        parts.push(member.name);
      }

      return parts.join(".");
    }

    // at this point pathDown doesn't have any namespace scopes as we've
    // walked up through the members, and pathDown has the entire scope chain
    // from the reference to the global scope. So here we need to map member paths
    // from the target symbol to corresponding namespace scopes of the reference.
    const refNsLocations = pathUp.map((scope) => {
      if (scope instanceof CSharpNamespaceScope) {
        return scope.ownerSymbol;
      }
      return undefined;
    });

    for (let i = memberPathDown!.length - 1; i >= 0; i--) {
      const symbol = memberPathDown![i];
      if (symbol instanceof CSharpNamespaceSymbol) {
        const nsLocation = refNsLocations.indexOf(symbol);
        if (nsLocation > -1) {
          // the path down is the same as the path up at this point, so:
          pathDown = [];
          pathUp = [];
          // remove everything up to and including this index in member path down
          memberPathDown = memberPathDown?.slice(i + 1);
        }
      }
    }

    // check if we need to add a using.
    let targetNamespace: CSharpNamespaceScope | undefined = undefined;
    for (let i = pathUp.length - 1; i >= 0; i--) {
      const scope = pathUp[i];
      if (scope instanceof CSharpNamespaceScope) {
        targetNamespace = scope;
        break;
      }
    }
    if (targetNamespace && !targetNamespace.ownerSymbol.isGlobal) {
      if (pathUp.indexOf(targetNamespace) === -1) {
        refSfScope.addUsing(targetNamespace.enclosingNamespace!);
      }
    }

    // now we need to build up a partially qualified reference
    const idParts: string[] = [];
    let startScopeIndex = pathDown.indexOf(targetNamespace!) + 1;

    while (startScopeIndex < pathDown.length) {
      const scope = pathDown[startScopeIndex];
      if (scope instanceof CSharpNamespaceScope) {
        idParts.push(scope.enclosingNamespace!.name);
        startScopeIndex++;
      } else {
        break;
      }
    }

    if (memberPathDown && memberPathDown.length > 0) {
      for (const symbol of memberPathDown) {
        idParts.push(symbol.name);
      }
    } else {
      idParts.push(symbol.name);
    }

    return idParts.join(".");
  });
}
