import {
  MemberDeclaration as CoreMemberDeclaration,
  MemberDeclarationPropsWithInfo as CoreMemberDeclarationPropsWithInfo,
  MemberDeclarationPropsWithSymbol as CoreMemberDeclarationPropsWithSymbol,
} from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";
import {
  createStaticMemberSymbol,
  TSOutputSymbol,
  TSSymbolFlags,
} from "../symbols/index.js";

export interface MemberDeclarationPropsWithInfo
  extends CoreMemberDeclarationPropsWithInfo {
  /**
   * The name policy kind to apply to the memberdeclaration.
   */
  nameKind: TypeScriptElements;
  /**
   * Whether this member can be null or undefined.
   */
  nullish?: boolean;
}

export interface MemberDeclarationPropsWithSymbol
  extends CoreMemberDeclarationPropsWithSymbol {
  /**
   * The symbol for the member declaration.
   */
  symbol: TSOutputSymbol;
}

export type MemberDeclarationProps =
  | MemberDeclarationPropsWithInfo
  | MemberDeclarationPropsWithSymbol;

export function MemberDeclaration(props: Readonly<MemberDeclarationProps>) {
  let sym: TSOutputSymbol;

  if ("symbol" in props) {
    sym = props.symbol;
  } else {
    const tsFlags: TSSymbolFlags =
      props.nullish ? TSSymbolFlags.Nullish : TSSymbolFlags.None;

    sym = createStaticMemberSymbol(props.name!, {
      refkeys: props.refkey,
      tsFlags,
      metadata: props.metadata,
      namePolicy: useTSNamePolicy().for(props.nameKind!),
    });
  }

  return (
    <CoreMemberDeclaration symbol={sym}>{props.children}</CoreMemberDeclaration>
  );
}
