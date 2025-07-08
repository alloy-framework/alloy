import {
  Children,
  Declaration as CoreDeclaration,
  MemberScope,
  OutputSymbolFlags,
  Refkey,
} from "@alloy-js/core";
import { TypeScriptElements, useTSNamePolicy } from "../name-policy.js";
import { TSOutputSymbol, TSSymbolFlags } from "../symbols/index.js";

// imports for documentation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TypeDeclaration } from "./TypeDeclaration.jsx";

import { PrivateScopeContext } from "../context/private-scope.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EnumDeclaration } from "./EnumDeclaration.jsx";

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

export interface DeclarationProps extends Omit<BaseDeclarationProps, "name"> {
  /**
   * The name of this declaration.
   */
  name?: string;

  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind?: TypeScriptElements;

  /**
   * The symbol to use for this declaration.
   */
  symbol?: TSOutputSymbol;
}

/**
 * Create a TypeScript declaration. Generally, this component shouldn't be used
 * directly, and instead prefer components for specific declarations, e.g.
 * {@link EnumDeclaration}, {@link (InterfaceDeclaration:function)},
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
  let sym: TSOutputSymbol;

  if (props.symbol) {
    sym = props.symbol;
  } else {
    const namePolicy = useTSNamePolicy();

    let tsFlags: TSSymbolFlags = TSSymbolFlags.None;
    if (props.kind && props.kind === "type") {
      tsFlags |= TSSymbolFlags.TypeSymbol;
    }

    sym = new TSOutputSymbol(namePolicy.getName(props.name!, props.nameKind!), {
      refkeys: props.refkey,
      export: props.export,
      default: props.default,
      flags: props.flags,
      tsFlags,
      metadata: props.metadata,
    });
  }

  function withMemberScope(children: Children) {
    return <MemberScope owner={sym}>{children}</MemberScope>;
  }

  function withPrivateMemberScope(children: Children) {
    const context: PrivateScopeContext = {
      instanceMembers: sym.privateMemberScope!,
      staticMembers: sym.privateStaticMemberScope!,
    };
    return (
      <PrivateScopeContext.Provider value={context}>
        {children}
      </PrivateScopeContext.Provider>
    );
  }

  let children: Children = () => props.children;

  if (sym.flags & OutputSymbolFlags.MemberContainer) {
    children = withMemberScope(children);
  }

  if (sym.tsFlags & TSSymbolFlags.PrivateMemberContainer) {
    children = withPrivateMemberScope(children);
  }

  return (
    <CoreDeclaration symbol={sym}>
      {props.export ? "export " : ""}
      {props.default ? "default " : ""}
      {children}
    </CoreDeclaration>
  );
}
