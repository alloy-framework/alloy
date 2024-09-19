import { Children } from "@alloy-js/core/jsx-runtime";
import { OutputSymbol, OutputSymbolFlags } from "../binder.js";
import { useContext } from "../context.js";
import { BinderContext } from "../context/binder.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MemberDeclarationContext } from "../context/member-declaration.js";
import { MemberScopeContext } from "../context/member-scope.js";
import { Refkey, refkey } from "../refkey.js";

export interface MemberDeclarationProps {
  name?: string;
  refkey?: Refkey;
  symbol?: OutputSymbol;
  children?: Children;
  static?: boolean;
}

/**
 * Declares a symbol in the current member scope for this component's children.
 *
 * @remarks
 *
 * This component must be called in one of two ways: with a name and an optional
 * refkey, or else passing in the symbol. When called with a name and refkey, a
 * symbol will be created in the current scope (provided by
 * {@link MemberScopeContext}) with that name and refkey. If a refkey is not
 * provided, `refkey(props.name)` is used.
 *
 * When called with a symbol, that symbol is merely exposed via
 * {@link MemberDeclarationContext}. It is assumed that the caller of this component
 * has created the symbol with the `createSymbol` API on the
 * {@link BinderContext}.
 *
 * @see {@link BinderContext}
 */
export function MemberDeclaration(props: MemberDeclarationProps) {
  const binder = useContext(BinderContext);
  if (!binder) {
    throw new Error("Need binder context to create declarations");
  }

  let declaration;
  if (props.symbol) {
    declaration = props.symbol;
  } else {
    if (!props.name) {
      throw new Error(
        "Must provide a member name, or else provide a member symbol",
      );
    }
    const rk = props.refkey ? props.refkey : refkey(props.name);
    declaration = binder.createSymbol({
      name: props.name!,
      refkey: rk,
      flags: props.static ?
        OutputSymbolFlags.StaticMember
      : OutputSymbolFlags.InstanceMember,
    });
  }

  return <MemberDeclarationContext.Provider value={declaration}>
    {props.children}
  </MemberDeclarationContext.Provider>;
}
