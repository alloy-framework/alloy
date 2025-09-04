import {
  Children,
  Declaration as CoreDeclaration,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";
import {
  createTypeSymbol,
  createValueSymbol,
  TSOutputSymbol,
} from "../symbols/index.js";

// imports for documentation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypeDeclaration } from "./TypeDeclaration.jsx";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EnumDeclaration } from "./EnumDeclaration.jsx";

export interface DeclarationPropsBase {
  children?: Children;

  /**
   * Documentation for this declaration
   */
  doc?: Children;
}

export interface DeclarationPropsWithSymbol extends DeclarationPropsBase {
  /**
   * The symbol to use for this declaration.
   */
  symbol: TSOutputSymbol;
}

export interface DeclarationPropsWithInfo extends DeclarationPropsBase {
  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind: TypeScriptElements;

  /**
   * The base name of this declaration. May change depending on naming policy
   * and any conflicts.
   */
  name: string | Namekey;

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
}

/**
 * The base props for declaration components.
 */
export type CommonDeclarationProps = Omit<DeclarationPropsWithInfo, "nameKind">;

export type DeclarationProps =
  | DeclarationPropsWithSymbol
  | DeclarationPropsWithInfo;

/**
 * Create a TypeScript declaration. Generally, this component shouldn't be used
 * directly, and instead prefer components for specific declarations, e.g.
 * {@link EnumDeclaration}, {@link (InterfaceDeclaration:function)},
 * {@link TypeDeclaration}, etc.
 *
 * @remarks
 *
 * This component will wrap its contents in a {@link @alloy-js/core#Declaration} component,
 * so children can make use of declaration context.
 */
export function Declaration(props: DeclarationProps) {
  let sym: TSOutputSymbol;

  if ("symbol" in props) {
    sym = props.symbol;
  } else {
    if (props.kind === "type") {
      sym = createTypeSymbol(props.name!, {
        refkeys: props.refkey,
        export: props.export,
        default: props.default,
        metadata: props.metadata,
        namePolicy: useTSNamePolicy().for(props.nameKind!),
      });
    } else {
      sym = createValueSymbol(props.name!, {
        refkeys: props.refkey,
        export: props.export,
        default: props.default,
        metadata: props.metadata,
        namePolicy: useTSNamePolicy().for(props.nameKind!),
      });
    }
  }

  return (
    <CoreDeclaration symbol={sym}>
      {sym.export ? "export " : ""}
      {sym.default ? "default " : ""}
      {props.children}
    </CoreDeclaration>
  );
}
