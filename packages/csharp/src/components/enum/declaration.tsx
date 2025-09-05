import {
  Block,
  Children,
  Declaration,
  MemberScope,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { createNamedTypeScope } from "../../scopes/factories.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { Name } from "../Name.jsx";

// properties for creating an enum
export interface EnumDeclarationProps extends AccessModifiers {
  name: string | Namekey;
  refkey?: Refkey | Refkey[];
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
