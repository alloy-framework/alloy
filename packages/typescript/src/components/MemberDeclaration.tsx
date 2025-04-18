import {
  MemberDeclaration as CoreMemberDeclaration,
  MemberDeclarationPropsWithInfo,
  OutputSymbolFlags,
} from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";
import {
  createTSSymbol,
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
   * Whether this is a memberdeclaration of a type (e.g. interface, type alias) or a
   * value (e.g. var, const, let).
   */
  kind?: "type" | "value";

  /**
   * The name policy kind to apply to the memberdeclaration.
   */
  nameKind?: TypeScriptElements;

  /**
   * Flags for the symbol created by this component.
   */
  flags?: OutputSymbolFlags;

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

    let tsFlags: TSSymbolFlags =
      props.nullish ? TSSymbolFlags.Nullish : TSSymbolFlags.None;

    if (props.kind === "type") {
      tsFlags |= TSSymbolFlags.TypeSymbol;
    }

    sym = createTSSymbol({
      name: props.exactName ?? namePolicy.getName(props.name!, props.nameKind!),
      refkey: props.refkey,
      flags: props.flags,
      tsFlags,
      metadata: props.metadata,
    });
  }

  return (
    <CoreMemberDeclaration symbol={sym}>{props.children}</CoreMemberDeclaration>
  );
}
