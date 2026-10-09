import type { Children } from "@alloy-js/core";
import { Scope, useScope } from "@alloy-js/core";

import { NamespaceContext } from "../../contexts/namespace.js";
import { NamespaceScope } from "../../scopes/namespace.js";
import type { SourceFileScope } from "../../scopes/source-file.js";
import type { NamespaceSymbol } from "../../symbols/index.js";

/** @internal */
export interface NamespaceScopeProps {
  symbol: NamespaceSymbol;
  children: Children;
}

/** @internal */
export function NamespaceScopeComponent(props: NamespaceScopeProps) {
  const parentScope = useScope() as NamespaceScope | SourceFileScope;
  const scope = new NamespaceScope(props.symbol, parentScope);

  return (
    <NamespaceContext.Provider value={{ symbol: props.symbol }}>
      <Scope value={scope}>{props.children}</Scope>
    </NamespaceContext.Provider>
  );
}
