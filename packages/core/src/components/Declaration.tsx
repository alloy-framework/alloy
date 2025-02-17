import { OutputSymbol } from "../binder.js";
import { useContext } from "../context.js";
import { BinderContext } from "../context/binder.js";
import { DeclarationContext } from "../context/declaration.js";
import { Children, onCleanup } from "../jsx-runtime.js";
import { Refkey, refkey } from "../refkey.js";

export interface DeclarationProps {
  name?: string;
  refkey?: Refkey;
  symbol?: OutputSymbol;
  children?: Children;
}

/**
 * Declares a symbol in the current scope for this component's children.
 *
 * @remarks
 *
 * This component must be called in one of two ways: with a name and an optional
 * refkey, or else passing in the symbol. When called with a name and refkey, a
 * symbol will be created in the current scope (provided by
 * {@link ScopeContext}) with that name and refkey. If a refkey is not provided,
 * `refkey(props.name)` is used.
 *
 * When called with a symbol, that symbol is merely exposed via
 * {@link DeclarationContext }. It is assumed that the caller of this component
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

  let declaration;
  if (props.symbol) {
    declaration = props.symbol;
  } else {
    const rk = props.refkey ? props.refkey : refkey(props.name);
    declaration = binder.createSymbol({
      name: props.name!,
      refkey: rk,
    });

    onCleanup(() => {
      binder.deleteSymbol(declaration!);
    });
  }

  return <DeclarationContext.Provider value={declaration}>
    {props.children}
  </DeclarationContext.Provider>;
}
