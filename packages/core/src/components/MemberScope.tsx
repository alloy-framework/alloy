import { MemberContext } from "../context/member-scope.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScopeContext } from "../context/scope.js";
import type { Children } from "../runtime/component.js";
import { OutputScope } from "../symbols/output-scope.js";
import type { OutputSymbol } from "../symbols/output-symbol.js";
import { Scope } from "./Scope.jsx";

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
  if ("value" in props) {
    const sym = props.value;
    if (!sym.isMemberScope) {
      throw new Error(
        "MemberScope must be passed a value that is a member scope.",
      );
    }
  }

  const context: MemberContext = {
    ownerSymbol:
      "value" in props ? props.value.ownerSymbol! : props.ownerSymbol!,
  };

  return (
    <Scope {...props}>
      <MemberContext.Provider value={context}>
        {props.children}
      </MemberContext.Provider>
    </Scope>
  );
}
