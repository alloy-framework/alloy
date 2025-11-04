import {
  Children,
  memo,
  OutputSymbol,
  Refkey,
  resolve,
  unresolvedRefkey,
} from "@alloy-js/core";
import { TypeSpecScope } from "../scopes/typespec.js";
import { NamespaceScope } from "../scopes/namespace.js";
import { useSourceFileScope } from "../scopes/source-file.js";
import { TypeSpecSymbol } from "./typespec.js";
import { NamespaceSymbol } from "./namespace.js";

// converts a refkey to its fully qualified name
// e.g. if refkey is for bar in enum type foo, and
// foo is in the same namespace as the refkey, then
// the result would be foo.bar.
export function ref(
  refkey: Refkey,
): () => [Children, OutputSymbol | undefined] {
  const refSfScope = useSourceFileScope()!;
  const resolveResult = resolve<TypeSpecScope, TypeSpecSymbol>(refkey);
  return memo(() => {
    if (resolveResult.value === undefined) {
      return [unresolvedRefkey(refkey), undefined];
    }

    const result = resolveResult.value;
    const { commonScope, pathDown, memberPath } = result;
    let { lexicalDeclaration } = result;

    if (!commonScope) {
      // this shouldn't be possible in typespec.
      return [unresolvedRefkey(refkey), undefined];
    }

    if (
      commonScope instanceof NamespaceScope &&
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

      // refSfScope.addUsing(nsToUse!);
      // refSfScope.add
    }

    const parts = [];
    // const referenceContext = useReferenceContext();

    // TODO properly

    return [undefined, undefined];
    // for (const nsScope of pathDown) {
    //   parts.push(<AccessExpression.Part symbol={nsScope.ownerSymbol!} />);
    // }

    // parts.push(
    //   <AccessExpression.Part
    //     symbol={lexicalDeclaration}
    //     attribute={referenceContext === "attribute"}
    //   />,
    // );

    // for (const member of memberPath) {
    //   parts.push(<AccessExpression.Part symbol={member} />);
    // }

    // return [<AccessExpression children={parts} />, result.symbol];
  });
}
