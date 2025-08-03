import { ScopeContext, useScope } from "../context/scope.js";
import type { Children } from "../runtime/component.js";
import { BasicScope } from "../symbols/basic-scope.js";
import { OutputScope } from "../symbols/output-scope.js";
import { OutputSymbol } from "../symbols/output-symbol.js";

/**
 * Declare a scope by providing an already created scope. The scope is merely
 * exposed via {@link ScopeContext}.
 */
export interface ScopePropsWithValue {
  /**
   * The scope to use. If not provided, a new scope will be created.
   */
  value: OutputScope;

  children?: Children;
}

/**
 * Create a scope by providing a name and optional metadata.
 */
export interface ScopePropsWithInfo {
  /**
   * The name of this scope.
   */
  name?: string;

  /**
   * Additional metadata for the scope.
   */
  metadata?: Record<string, unknown>;

  /**
   * Create a member scope with the owner symbol providing the in-scope symbols.
   */
  ownerSymbol?: OutputSymbol;

  children?: Children;
}

export type ScopeProps = ScopePropsWithValue | ScopePropsWithInfo;

/**
 * Declare a scope for this component's children. Any symbols and scopes
 * declared in the children of this component will be in this scope.
 *
 * @see {@link ScopeContext}
 */
export function Scope(props: ScopeProps) {
  let scope: OutputScope;
  if ("value" in props) {
    scope = props.value;
  } else {
    const parentScope = useScope();
    if (parentScope && !(parentScope instanceof BasicScope)) {
      throw new Error(
        "Scope component can only make scopes within a BasicScope",
      );
    }
    scope = new BasicScope(props.name ?? "", parentScope, {
      metadata: props.metadata,
      ownerSymbol: props.ownerSymbol,
    });
  }

  return (
    <ScopeContext.Provider value={scope}>
      {props.children}
    </ScopeContext.Provider>
  );
}
