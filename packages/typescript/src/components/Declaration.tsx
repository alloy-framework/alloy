import {
  Children,
  Declaration as CoreDeclaration,
  refkey,
  Refkey,
} from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";
import { createTsSymbol, TSSymbolFlags } from "../symbols.js";

export interface DeclarationProps {
  /**
   * The base name of this declaration. May change depending on naming policy
   * and any conflicts.
   */
  name: string;

  /**
   * The unique key for this declaration.
   */
  refkey?: Refkey;

  /**
   * Whether to export this declaration from the module.
   */
  export?: boolean;

  /**
   * Whether this is the default export of the module.
   */
  default?: boolean;

  children?: Children;

  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind: TypeScriptElements;

  /**
   * Whether this is a declaration of a type (e.g. interface, type alias) or a
   * value (e.g. var, const, let).
   */
  kind?: "type" | "value";
}

export function Declaration(props: DeclarationProps) {
  const namePolicy = useTSNamePolicy();

  let flags: TSSymbolFlags = TSSymbolFlags.None;
  if (props.kind && props.kind === "type") {
    flags &= TSSymbolFlags.TypeSymbol;
  }

  const sym = createTsSymbol({
    name: namePolicy.getName(props.name, props.nameKind),
    refkey: props.refkey ?? refkey(props.name),
    export: props.export,
    default: props.default,
    flags,
  });

  return <CoreDeclaration symbol={sym}>
    {props.export ? "export " : ""}{props.default ? "default " : ""}{props.children}
  </CoreDeclaration>;
}
