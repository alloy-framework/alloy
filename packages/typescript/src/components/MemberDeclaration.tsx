import {
  MemberDeclaration as CoreMemberDeclaration,
  MemberDeclarationPropsWithInfo,
} from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";
import {
  createStaticMemberSymbol,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../symbols/index.js";

export interface MemberDeclarationProps
  extends Omit<MemberDeclarationPropsWithInfo, "name"> {
  /**
   * The name of this member declaration.
   */
  name?: string;

  /** Name that shouldn't go through the name policy resolver again.  */
  exactName?: string;

  /**
   * The name policy kind to apply to the memberdeclaration.
   */
  nameKind?: TypeScriptElements;

  /**
   * The symbol to use for this memberdeclaration.
   */
  symbol?: TSOutputSymbol;
  /**
   * Whether this member can be null or undefined.
   */
  nullish?: boolean;
}

export function MemberDeclaration(props: Readonly<MemberDeclarationProps>) {
  let sym: TSOutputSymbol;

  if (props.symbol) {
    sym = props.symbol;
  } else {
    const namePolicy = useTSNamePolicy();

    const tsFlags: TSSymbolFlags =
      props.nullish ? TSSymbolFlags.Nullish : TSSymbolFlags.None;

    const name =
      props.exactName ?? namePolicy.getName(props.name!, props.nameKind!);

    sym = createStaticMemberSymbol(name, {
      refkeys: props.refkey,
      tsFlags,
      metadata: props.metadata,
    });
  }

  return (
    <CoreMemberDeclaration symbol={sym}>{props.children}</CoreMemberDeclaration>
  );
}
