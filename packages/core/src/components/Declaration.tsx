import { createSymbol } from "../binder.js";
import { useContext } from "../context.js";
import { BinderContext } from "../context/binder.js";
import { DeclarationContext } from "../context/declaration.js";
import { useScope } from "../context/scope.js";
import { onCleanup } from "../reactivity.js";
import { Namekey, Refkey } from "../refkey.js";
import type { Children } from "../runtime/component.js";
import { BasicScope } from "../symbols/basic-scope.js";
import { BasicSymbol } from "../symbols/basic-symbol.js";
import { OutputSymbol } from "../symbols/output-symbol.js";

/**
 * Create a declaration by providing an already created symbol. The symbol is
 * merely exposed via {@link DeclarationContext}.
 */
export interface DeclarationPropsWithSymbol {
  /**
   * The symbol being declared. When provided, the name, refkey, and metadata
   * props are ignored.
   */
  symbol: OutputSymbol;

  children?: Children;
}

/**
 * Create a declaration by providing a symbol name and optional symbol metadata.
 */
export interface DeclarationPropsWithInfo {
  /**
   * The name of this declaration.
   */
  name: string | Namekey;

  /**
   * The unique key or array of unique keys for this declaration.
   */
  refkey?: Refkey | Refkey[];

  /**
   * Additional metadata for the declared symbol.
   */
  metadata?: Record<string, unknown>;

  children?: Children;
}

export type DeclarationProps =
  | DeclarationPropsWithSymbol
  | DeclarationPropsWithInfo;

/**
 * Declares a symbol in the current scope for this component's children.
 *
 * @remarks
 *
 * This component must be called in one of two ways: with a name and an optional
 * refkey, or else passing in the symbol. When called with a name and refkey, a
 * symbol will be created in the current scope (provided by
 * {@link ScopeContext}) with that name and refkey.
 *
 * When called with a symbol, that symbol is merely exposed via
 * {@link DeclarationContext}. It is assumed that the caller of this component
 * has created the symbol with the `createSymbol` API on the
 * {@link BinderContext }.
 *
 * @see {@link BinderContext}
 */
export function Declaration(props: DeclarationProps) {
  const binder = useContext(BinderContext);
  if (!binder) {
    throw new Error("Need binder context to create declarations");
  }

  let declaration: OutputSymbol;
  if ("symbol" in props) {
    declaration = props.symbol;
  } else {
    const scope = useScope();
    if (!(scope instanceof BasicScope)) {
      throw new Error(
        `Declaration component cannot create a symbol in a non-basic scope: ${scope}`,
      );
    }

    declaration = createSymbol(BasicSymbol, props.name, scope.symbols, {
      binder,
      refkeys: [props.refkey ?? []].flat(),
      metadata: props.metadata,
    });

    onCleanup(() => {
      declaration.delete();
    });
  }

  return (
    <DeclarationContext.Provider value={declaration}>
      {props.children}
    </DeclarationContext.Provider>
  );
}
