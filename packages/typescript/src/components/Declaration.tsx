import {
  Children,
  Declaration as CoreDeclaration,
  MemberScope,
  OutputSymbolFlags,
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
import { InterfaceDeclaration } from "./Interface.jsx";

export interface BaseDeclarationProps {
  /**
   * The base name of this declaration. May change depending on naming policy
   * and any conflicts.
   */
  name: string;

  /**
   * The refkey or array of refkeys for this declaration.
   */
  refkey?: Refkey | Refkey[];

  /**
   * Whether to export this declaration from the module.
   */
  export?: boolean;

  /**
   * Whether this is the default export of the module.
   */
  default?: boolean;

  /**
   * Flags for the symbol created by this component.
   */
  flags?: OutputSymbolFlags;

  children?: Children;

  /**
   * Whether this is a declaration of a type (e.g. interface, type alias) or a
   * value (e.g. var, const, let).
   */
  kind?: "type" | "value";

  /**
   * Arbitrary metadata about this declaration.
   */
  metadata?: Record<string, unknown>;

  /**
   * Documentation for this declaration
   */
  doc?: Children;
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
 * {@link TypeDeclaration}, etc.
 *
 * @remarks
 *
 * This component will wrap its contents in a {@link @alloy-js/core#Declaration} component,
 * so children can make use of declaration context. Additionally, if the
 * provided symbol flags have {@link @alloy-js/core#OutputSymbolFlags.MemberContainer}, this
 * component will create a {@link @alloy-js/core#MemberScope}.
 *
 */
export function Declaration(props: DeclarationProps) {
  const namePolicy = useTSNamePolicy();

  let tsFlags: TSSymbolFlags = TSSymbolFlags.None;
  if (props.kind && props.kind === "type") {
    tsFlags &= TSSymbolFlags.TypeSymbol;
  }

  const sym = createTSSymbol({
    name: namePolicy.getName(props.name, props.nameKind),
    refkey: props.refkey,
    export: props.export,
    default: props.default,
    flags: props.flags,
    tsFlags,
    metadata: props.metadata,
  });

  let children: Children;
  if (sym.flags & OutputSymbolFlags.MemberContainer) {
    children = <MemberScope owner={sym}>{props.children}</MemberScope>;
  } else {
    children = () => props.children;
  }

  return (
    <CoreDeclaration symbol={sym}>
      {props.export ? "export " : ""}
      {props.default ? "default " : ""}
      {children}
    </CoreDeclaration>
  );
}
