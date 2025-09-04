import { AccessExpression } from "#components/access-expression/access-expression.jsx";
import {
  Children,
  getRefkeyString,
  memo,
  OutputSymbol,
  Refkey,
  resolve,
} from "@alloy-js/core";
import { CSharpScope } from "../scopes/csharp.js";
import { CSharpNamespaceScope } from "../scopes/namespace.js";
import { useSourceFileScope } from "../scopes/source-file.js";
import { CSharpSymbol } from "./csharp.js";
import { NamespaceSymbol } from "./namespace.js";

// converts a refkey to its fully qualified name
// e.g. if refkey is for bar in enum type foo, and
// foo is in the same namespace as the refkey, then
// the result would be foo.bar.
export function ref(
  refkey: Refkey,
): () => [Children, OutputSymbol | undefined] {
  const refSfScope = useSourceFileScope()!;
  const resolveResult = resolve<CSharpScope, CSharpSymbol>(refkey as Refkey);
  return memo(() => {
    if (resolveResult.value === undefined) {
      return [`<Unresolved Symbol: ${getRefkeyString(refkey)}>`, undefined];
    }

    const result = resolveResult.value;
    const { commonScope, pathDown, memberPath } = result;
    let { lexicalDeclaration } = result;

    if (!commonScope) {
      // this shouldn't be possible in csharp.
      return [`<Unresolved Symbol: ${getRefkeyString(refkey)}>`, undefined];
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

    const parts = [];

    for (const nsScope of pathDown) {
      parts.push(<AccessExpression.Part symbol={nsScope.ownerSymbol!} />);
    }

    parts.push(<AccessExpression.Part symbol={lexicalDeclaration} />);
    for (const member of memberPath) {
      parts.push(<AccessExpression.Part symbol={member} />);
    }

    return [<AccessExpression children={parts} />, result.symbol];
  });
}
