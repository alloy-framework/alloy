import { Block, Namekey, Refkey } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import {
  NamespaceContext,
  useNamespaceContext,
} from "../../contexts/namespace.js";
import { useSourceFileScope } from "../../scopes/source-file.js";
import { createNamespaceSymbol } from "../../symbols/factories.js";
import { NamespaceSymbol } from "../../symbols/namespace.js";
import { NamespaceScope } from "../namespace-scopes.jsx";
import { NamespaceName } from "./namespace-name.jsx";

export interface NamespaceProps {
  name: string | Namekey | (string | Namekey)[];
  refkey?: Refkey | Refkey[];
  children?: Children;
}

/**
 * Wraps children with namespace scopes for each level of the namespace
 * hierarchy, stopping at the `stopAt` namespace symbol (which is already in
 * scope from an enclosing NamespaceScopes).
 */
function wrapWithNamespaceScopes(
  symbol: NamespaceSymbol,
  children: Children,
  stopAt?: NamespaceSymbol,
): Children {
  if (symbol === stopAt) {
    return children;
  }

  const scopeChildren = (
    <NamespaceScope symbol={symbol}>{children}</NamespaceScope>
  );

  const enclosing = symbol.enclosingNamespace;
  if (enclosing && !enclosing.isGlobal && enclosing !== stopAt) {
    return wrapWithNamespaceScopes(enclosing, scopeChildren, stopAt);
  }

  return scopeChildren;
}

export function Namespace(props: NamespaceProps) {
  const namespaceSymbol = createNamespaceSymbol(props.name, {
    refkeys: props.refkey,
  });
  const sfScope = useSourceFileScope();

  if (!sfScope) {
    return (
      <NamespaceContext.Provider value={{ symbol: namespaceSymbol }}>
        {props.children}
      </NamespaceContext.Provider>
    );
  } else {
    const nsContext = useNamespaceContext();
    const hasOuterNamespace = nsContext && !nsContext.symbol.isGlobal;

    sfScope.hasBlockNamespace = true;
    return (
      <>
        namespace{" "}
        <NamespaceName
          symbol={namespaceSymbol}
          relative={!!hasOuterNamespace}
        />{" "}
        <Block>
          {wrapWithNamespaceScopes(
            namespaceSymbol,
            props.children,
            nsContext?.symbol,
          )}
        </Block>
      </>
    );
  }
}
