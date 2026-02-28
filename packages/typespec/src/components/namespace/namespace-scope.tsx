import { Children, Scope, useScope } from "@alloy-js/core";
import { NamespaceContext } from "../../contexts/namespace.js";
import { NamespaceScope } from "../../scopes/namespace.js";
import { SourceFileScope } from "../../scopes/source-file.js";
import { NamespaceSymbol } from "../../symbols/index.js";

export interface NamespaceScopeProps {
  symbol: NamespaceSymbol;
  children: Children;
}

export function NamespaceScopeComponent(props: NamespaceScopeProps) {
  const parentScope = useScope() as NamespaceScope | SourceFileScope;
  const scope = new NamespaceScope(props.symbol, parentScope);

  return (
    <NamespaceContext.Provider value={{ symbol: props.symbol }}>
      <Scope value={scope}>{props.children}</Scope>
    </NamespaceContext.Provider>
  );
}
