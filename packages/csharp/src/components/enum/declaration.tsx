import type { Children, Namekey, Refkey } from "@alloy-js/core";
import { Block, Declaration, MemberScope } from "@alloy-js/core";

import type { AccessModifiers } from "../../modifiers.js";
import { computeModifiersPrefix, getAccessModifier } from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { createNamedTypeScope } from "../../scopes/factories.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import type { AttributesProp } from "../attributes/attributes.jsx";
import { AttributeList } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";
import { Name } from "../Name.jsx";

// properties for creating an enum
export interface EnumDeclarationProps extends AccessModifiers {
  name: string | Namekey;
  /** Doc comment */
  doc?: Children;
  refkey?: Refkey | Refkey[];

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <EnumDeclaration name="Color" attributes={[
   *  <Attribute name="Flags" />
   * ]} />
   * ```
   * This will produce:
   * ```csharp
   * [Flags]
   * enum Color
   * ```
   */
  attributes?: AttributesProp;

  children?: Children;
}

/**
 * A C# enum declaration
 * @example
 * ```tsx
 * <EnumDeclaration public name="Color">
 *   <EnumMember name="Red" />
 *   <EnumMember name="Green" />
 *   <EnumMember name="Blue" />
 * </EnumDeclaration>
 * ```
 * This will produce:
 * ```csharp
 * public enum Color
 * {
 *   Red,
 *   Green,
 *   Blue
 * }
 * ```
 */
export function EnumDeclaration(props: EnumDeclarationProps) {
  const symbol = createNamedTypeSymbol(props.name, "enum", {
    refkeys: props.refkey,
    namePolicy: useCSharpNamePolicy().for("enum"),
  });
  const scope = createNamedTypeScope(symbol);

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  return (
    <Declaration symbol={symbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      {modifiers}enum <Name />
      {!props.children && ";"}
      {props.children && (
        <MemberScope value={scope}>
          <Block newline>{props.children}</Block>
        </MemberScope>
      )}
    </Declaration>
  );
}
