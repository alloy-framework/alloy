import { OutputScope } from "../binder.js";
import { useContext } from "../context.js";
import { BinderContext } from "../context/binder.js";
import { ScopeContext } from "../context/scope.js";
import { Children } from "../jsx-runtime.js";

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
    const binder = useContext(BinderContext)!;
    scope = binder.createScope({
      kind: props.kind,
      metadata: props.metadata,
      name: props.name ?? "",
    });
  }

  return (
    <ScopeContext.Provider value={scope}>
      {props.children}
    </ScopeContext.Provider>
  );
}
