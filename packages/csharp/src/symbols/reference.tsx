import { AccessExpression } from "#components/access-expression/access-expression.jsx";
import {
  Children,
  memo,
  OutputSymbol,
  Refkey,
  resolve,
  unresolvedRefkey,
} from "@alloy-js/core";
import { useReferenceContext } from "../contexts/reference-context.js";
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
      return [unresolvedRefkey(refkey), undefined];
    }

    const result = resolveResult.value;
    const { commonScope, pathDown, memberPath } = result;
    let { lexicalDeclaration } = result;

    if (!commonScope) {
      // this shouldn't be possible in csharp.
      return [unresolvedRefkey(refkey), undefined];
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
    const referenceContext = useReferenceContext();

    for (const nsScope of pathDown) {
      parts.push(<AccessExpression.Part symbol={nsScope.ownerSymbol!} />);
    }

    if (referenceContext === "attribute") {
      parts.push(
        <AccessExpression.Part
          id={normalizeAttributeName(lexicalDeclaration.name)}
        />,
      );
    } else {
      parts.push(<AccessExpression.Part symbol={lexicalDeclaration} />);
    }

    for (const member of memberPath) {
      parts.push(<AccessExpression.Part symbol={member} />);
    }

    return [<AccessExpression children={parts} />, result.symbol];
  });
}

/**
 * Normalize attribute name by removing the "Attribute" suffix if present.
 * @example
 * ```ts
 * normalizeAttributeName("TestAttribute") // returns "Test"
 * ```
 */
export function normalizeAttributeName(name: string) {
  if (name !== undefined && name.endsWith("Attribute")) {
    return name.substring(0, name.length - "Attribute".length);
  }
  return name;
}
