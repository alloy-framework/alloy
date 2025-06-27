import { MemberScopeContext } from "../context/member-scope.js";
import type { Children } from "../runtime/component.js";
import { OutputScope } from "../symbols/output-scope.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";

/**
 * Declare a member scope by providing an already created scope. The scope is
 * exposed via {@link ScopeContext}.
 */
export interface MemberScopePropsWithValue {
  /**
   * The scope to use. If not provided, a new scope will be created.
   */
  value: OutputScope;

  children?: Children;
}

/**
 * Create a member scope by providing a name and optional metadata.
 */
export interface MemberScopePropsWithInfo {
  /**
   * The name of this scope.
   */
  name?: string;

  /**
   * The symbol whose members provide the symbols for this scope.
   */
  ownerSymbol: OutputSymbol;

  /**
   * Additional metadata for the scope.
   */
  metadata?: Record<string, unknown>;

  children?: Children;
}

export type MemberScopeProps =
  | MemberScopePropsWithValue
  | MemberScopePropsWithInfo;

/**
 * Declare a member scope, which is a lexical scope whose symbols are provided
 * by the owner symbol.
 *
 * @remarks
 *
 * This is used to create members of a symbol, e.g. for class members and the
 * like. In some languages, this scope may provide symbols which are can be
 * referenced lexically, but in other languages, these members may not be in
 * scope and instead must be referenced via the owner symbol itself.
 */
export function MemberScope(props: MemberScopeProps) {
  const context: MemberScopeContext = {
    ownerSymbol: props.owner,
  };
  return (
    <MemberScopeContext.Provider value={context}>
      {props.children}
    </MemberScopeContext.Provider>
  );
}
