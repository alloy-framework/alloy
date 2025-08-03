import { useContext } from "../context.js";
import { BinderContext } from "../context/binder.js";
import { MemberDeclarationContext } from "../context/member-declaration.js";
import { useMemberContext } from "../context/member-scope.js";
import type { Refkey } from "../refkey.js";
import type { Children } from "../runtime/component.js";
import { BasicSymbol } from "../symbols/basic-symbol.js";
import { OutputSymbol } from "../symbols/output-symbol.js";

/**
 * Create a member declaration by providing a symbol name and optional symbol
 * metadata.
 */
export interface MemberDeclarationPropsWithInfo {
  /**
   * The name of this declaration.
   */
  name: string;

  /**
   * The refkey or array refkeys for this declaration.
   */
  refkey?: Refkey | Refkey[];

  /**
   * Additional metadata for the declared symbol.
   */
  metadata?: Record<string, unknown>;

  /**
   * Whether this is a static member. If not provided, the member is an instance
   * member.
   */
  static?: boolean;
  children?: Children;
}

/**
 * Create a declaration by providing an already created symbol. The symbol is
 * merely exposed via {@link DeclarationContext}.
 */
export interface MemberDeclarationPropsWithSymbol {
  /**
   * The symbol being declared. When provided, the name, refkey, and metadata
   * props are ignored.
   */
  symbol: OutputSymbol;

  children?: Children;
}

export type MemberDeclarationProps =
  | MemberDeclarationPropsWithInfo
  | MemberDeclarationPropsWithSymbol;

/**
 * Declares a symbol in the current member scope for this component's children.
 *
 * @remarks
 *
 * This component must be called in one of two ways: with a name and an optional
 * refkey, or else passing in the symbol. When called with a name and refkey, a
 * symbol will be created in the current scope (provided by
 * {@link MemberDeclarationContext}) with that name and refkey. If a refkey is not
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
  if ("symbol" in props && props.symbol) {
    declaration = props.symbol;
  } else {
    const infoProps = props as MemberDeclarationPropsWithInfo;
    if (!infoProps.name) {
      throw new Error(
        "Must provide a member name, or else provide a member symbol",
      );
    }

    const scopeContext = useMemberContext()!;
    if (!(scopeContext.ownerSymbol instanceof BasicSymbol)) {
      throw new Error(
        "MemberDeclaration component cannot create a symbol in a non-basic scope",
      );
    }
    const space =
      infoProps.static ?
        scopeContext.ownerSymbol.staticMembers
      : scopeContext.ownerSymbol.instanceMembers;
    declaration = new BasicSymbol(infoProps.name, space, {
      refkeys: infoProps.refkey,
      metadata: infoProps.metadata,
    });
  }

  return (
    <MemberDeclarationContext.Provider value={declaration}>
      {props.children}
    </MemberDeclarationContext.Provider>
  );
}
