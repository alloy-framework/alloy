import { Scope } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamespaceContext } from "../contexts/namespace.js";
import { createCSharpNamespaceScope } from "../scopes/namespace-scope.js";
import { CSharpNamespaceSymbol } from "../symbols/namespace.js";

export interface NamespaceScopProps {
  symbol: CSharpNamespaceSymbol;
  children: Children;
}

export function NamespaceScope(props: NamespaceScopProps) {
  const scope = createCSharpNamespaceScope(props.symbol);
  return (
    <NamespaceContext.Provider value={{ symbol: props.symbol }}>
      <Scope value={scope}>{props.children}</Scope>
    </NamespaceContext.Provider>
  );
}

export interface NamespaceScopesProps {
  symbol: CSharpNamespaceSymbol;
  children: Children;
}

export function NamespaceScopes(props: NamespaceScopesProps) {
  function wrapWithScope(symbol: CSharpNamespaceSymbol, children: Children) {
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
