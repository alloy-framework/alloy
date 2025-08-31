import { memo, OutputSymbol, Refkey, resolve } from "@alloy-js/core";
import { CSharpScope } from "../scopes/csharp.js";
import { CSharpNamespaceScope } from "../scopes/namespace.js";
import { useSourceFileScope } from "../scopes/source-file.js";
import { CSharpSymbol } from "./csharp.js";
import { NamespaceSymbol } from "./namespace.js";

// converts a refkey to its fully qualified name
// e.g. if refkey is for bar in enum type foo, and
// foo is in the same namespace as the refkey, then
// the result would be foo.bar.
export function ref(refkey: Refkey): () => [string, OutputSymbol | undefined] {
  const refSfScope = useSourceFileScope()!;
  const resolveResult = resolve<CSharpScope, CSharpSymbol>(refkey as Refkey);

  return memo(() => {
    if (resolveResult.value === undefined) {
      return ["<Unresolved Symbol>", undefined];
    }

    const result = resolveResult.value;
    const { commonScope, pathDown, memberPath } = result;
    let { lexicalDeclaration } = result;

    const parts = [];
    if (!commonScope) {
      // this shouldn't be possible in csharp.
      return ["<Unresolved Symbol>", undefined];
    }

    if (
      commonScope instanceof CSharpNamespaceScope &&
      commonScope.ownerSymbol.isGlobal &&
      lexicalDeclaration.symbolKind === "namespace" &&
      memberPath.length > 0
    ) {
      // we need to using the namespace
      let nsToUse: NamespaceSymbol;
      while (
        lexicalDeclaration.symbolKind === "namespace" &&
        memberPath.length > 0
      ) {
        nsToUse = lexicalDeclaration as NamespaceSymbol;
        lexicalDeclaration = memberPath.shift()!;
      }

      refSfScope.addUsing(nsToUse!);
    }

    for (const nsScope of pathDown) {
      parts.push(nsScope.ownerSymbol!.name);
    }

    parts.push(lexicalDeclaration.name);

    for (const member of memberPath) {
      parts.push(member.name);
    }

    return [parts.join("."), result.symbol];
  });
}
