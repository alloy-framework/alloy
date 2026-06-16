import {
  Block,
  Children,
  Declaration,
  Name,
  Namekey,
  Refkey,
  Scope,
  useScope,
} from "@alloy-js/core";
import { useTypeSpecNamePolicy } from "../../name-policy.js";
import { NamedTypeScope } from "../../scopes/named-type.js";
import { NamespaceScope } from "../../scopes/namespace.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/doc-comment.jsx";

export interface EnumDeclarationProps {
  /** The enum name. */
  name: string | Namekey;
  /** Refkey for referencing this enum from other declarations. */
  refkey?: Refkey;
  /** Doc comment rendered as `/** ... *\/` above the declaration. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the enum. */
  directives?: Children;
  /** Decorators to apply to the enum. */
  decorators?: Children;
  /** Enum body (members, spread expressions, etc.). */
  children?: Children;
}

/**
 * A TypeSpec enum declaration.
 *
 * @example
 * ```tsx
 * <EnumDeclaration name="Direction" doc="Cardinal directions">
 *   <List comma hardline enderPunctuation>
 *     <EnumMember name="North" />
 *     <EnumMember name="South" />
 *   </List>
 * </EnumDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * /** Cardinal directions *\/
 * enum Direction {
 *   North,
 *   South,
 * }
 * ```
 */
export function EnumDeclaration(props: EnumDeclarationProps) {
  const sym = createNamedTypeSymbol(props.name, "enum", {
    refkeys: props.refkey,
    namePolicy: useTypeSpecNamePolicy().for("enum"),
  });

  const parentScope = useScope() as NamespaceScope;
  const namedTypeScope = new NamedTypeScope(sym, parentScope);

  return (
    <Declaration symbol={sym}>
      <DocWhen doc={props.doc} />
      {props.directives}
      {props.decorators}
      <Scope value={namedTypeScope}>
        enum <Name /> <Block>{props.children}</Block>
      </Scope>
    </Declaration>
  );
}
