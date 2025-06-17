import * as core from "@alloy-js/core";
import { Children, MemberScope, OutputSymbolFlags } from "@alloy-js/core";
import { CSharpElements, useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";

// properties for creating a declaration
export interface DeclarationProps {
  /**
   * The name of this declaration.
   */
  name: string;

  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind: CSharpElements;

  /**
   * The symbol to use for this declaration.
   */
  symbol?: CSharpOutputSymbol;

  /**
   * The refkey or array of refkeys for this declaration.
   */
  refkey?: core.Refkey;

  /**
   * Flags for the symbol created by this component.
   */
  flags?: OutputSymbolFlags;
  children?: core.Children;
}

// declares a symbol in the program (class, enum, interface etc)
export function Declaration(props: DeclarationProps) {
  const namePolicy = useCSharpNamePolicy();

  const sym =
    props.symbol ??
    new CSharpOutputSymbol(namePolicy.getName(props.name, props.nameKind), {
      refkeys: props.refkey,
      flags: props.flags,
    });

  let children: Children = () => props.children;

  function withMemberScope(children: Children) {
    return <MemberScope owner={sym}>{children}</MemberScope>;
  }

  console.log("M<ember scope", sym.flags & OutputSymbolFlags.MemberContainer);
  if (sym.flags & OutputSymbolFlags.MemberContainer) {
    console.log("M<ember scope yes");
    children = withMemberScope(children);
  }

  return <core.Declaration symbol={sym}>{children}</core.Declaration>;
}
