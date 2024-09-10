import {
  Children,
  Declaration as CoreDeclaration,
  refkey,
  Refkey,
} from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol, TSSymbolFlags } from "../symbols/index.js";

// imports for documentation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypeDeclaration } from "./TypeDeclaration.jsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EnumDeclaration } from "./EnumDeclaration.jsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { VarDeclaration } from "./VarDeclaration.jsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FunctionDeclaration } from "./FunctionDeclaration.jsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InterfaceDeclaration } from "./Interface.jsx";

export interface BaseDeclarationProps {
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
   * Whether this is a declaration of a type (e.g. interface, type alias) or a
   * value (e.g. var, const, let).
   */
  kind?: "type" | "value";
}

export interface DeclarationProps extends BaseDeclarationProps {
  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind: TypeScriptElements;
}

/**
 * Create a TypeScript declaration. Generally, this component shouldn't be used
 * directly, and instead prefer components for specific declarations, e.g.
 * {@link EnumDeclaration}, {@link InterfaceDeclaration},
 * {@link FunctionDeclaration}, {@link TypeDeclaration}, or
 * {@link VarDeclaration}.
 */
export function Declaration(props: DeclarationProps) {
  const namePolicy = useTSNamePolicy();

  let flags: TSSymbolFlags = TSSymbolFlags.None;
  if (props.kind && props.kind === "type") {
    flags &= TSSymbolFlags.TypeSymbol;
  }

  const sym = createTSSymbol({
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
