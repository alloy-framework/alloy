import { ScopeContext } from "../context/scope.js";
import type { Children } from "../runtime/component.js";
import { OutputScope } from "../symbols/output-scope.js";

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
   * The kind of scope. This may be used by application code to determine how
   * to handle symbols in this scope. It is not used by the core framework.
   */
  kind?: string;

  /**
   * The name of this scope.
   */
  name?: string;

  /**
   * Additional metadata for the scope.
   */
  metadata?: Record<string, unknown>;

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
    scope = new OutputScope(props.name ?? "", {
      kind: props.kind,
      metadata: props.metadata,
    });
  }

  return (
    <ScopeContext.Provider value={scope}>
      {props.children}
    </ScopeContext.Provider>
  );
}
