import { Scope } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamespaceContext } from "../contexts/namespace.js";
import { createTypeSpecNamespaceScope } from "../scopes/namespace.js";
import { NamespaceSymbol } from "../symbols/namespace.js";

export interface NamespaceScopProps {
  symbol: NamespaceSymbol;
  children: Children;
}

export function NamespaceScope(props: NamespaceScopProps) {
  const scope = createTypeSpecNamespaceScope(props.symbol);
  return (
    <NamespaceContext.Provider value={{ symbol: props.symbol }}>
      <Scope value={scope}>{props.children}</Scope>
    </NamespaceContext.Provider>
  );
}

export interface NamespaceScopesProps {
  symbol: NamespaceSymbol;
  children: Children;
}

export function NamespaceScopes(props: NamespaceScopesProps) {
  function wrapWithScope(symbol: NamespaceSymbol, children: Children) {
    const scopeChildren = (
      <NamespaceScope symbol={symbol}>{children}</NamespaceScope>
    );

    if (symbol.enclosingNamespace) {
      return wrapWithScope(symbol.enclosingNamespace, scopeChildren);
    }

    return scopeChildren;
  }

  return (
    <NamespaceContext.Provider value={{ symbol: props.symbol }}>
      {wrapWithScope(props.symbol, props.children)}
    </NamespaceContext.Provider>
  );
}
