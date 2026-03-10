import { Scope } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { NamespaceContext } from "../contexts/namespace.js";
import { createCSharpNamespaceScope } from "../scopes/namespace.js";
import { NamespaceSymbol } from "../symbols/namespace.js";

export interface NamespaceScopProps {
  symbol: NamespaceSymbol;
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
  /**
   * Target namespace whose scope chain should be established for `children`.
   *
   * For dotted namespaces, this is typically the most nested segment symbol.
   */
  symbol: NamespaceSymbol;

  /**
   * Optional ancestor namespace that is already in scope.
   *
   * Wrapping stops before this symbol to avoid duplicating existing namespace
   * scopes in the reference chain.
   */
  stopAt?: NamespaceSymbol;
  children: Children;
}

/**
 * Applies `NamespaceScope` wrappers from `symbol` up through its enclosing
 * namespaces until the root (or `stopAt`, when provided).
 */
export function NamespaceScopes(props: NamespaceScopesProps) {
  function wrapWithScope(symbol: NamespaceSymbol, children: Children) {
    if (symbol === props.stopAt) {
      return children;
    }

    const scopeChildren = (
      <NamespaceScope symbol={symbol}>{children}</NamespaceScope>
    );

    if (symbol.enclosingNamespace && symbol.enclosingNamespace !== props.stopAt) {
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
