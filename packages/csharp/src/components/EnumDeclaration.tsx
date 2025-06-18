import * as core from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
} from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { Name } from "./Name.jsx";

// properties for creating an enum
export interface EnumDeclarationProps extends AccessModifiers {
  name: string;
  refkey?: core.Refkey;
  children?: core.Children;
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
  const name = useCSharpNamePolicy().getName(props.name!, "enum");
  const scope = useCSharpScope();

  const thisEnumSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? core.refkey(props.name),
  });

  // this creates a new scope for the enum definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisEnumScope = new CSharpMemberScope("enum-decl", {
    parent: scope,
    owner: thisEnumSymbol,
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  if (thisEnumScope.owner)
    return (
      <core.Declaration symbol={thisEnumSymbol}>
        {modifiers}enum <Name />
        {!props.children && ";"}
        {props.children && (
          <core.Scope value={thisEnumScope}>
            <core.Block newline>{props.children}</core.Block>
          </core.Scope>
        )}
      </core.Declaration>
    );
}

// properties for creating a C# enum member
export interface EnumMemberProps {
  name: string;
  refkey?: core.Refkey;
}

// a member within a C# enum
export function EnumMember(props: EnumMemberProps) {
  const scope = useCSharpScope();
  if (scope.kind === "member" && scope.name !== "enum-decl") {
    throw new Error(
      "can't define an enum member outside of an enum-decl scope",
    );
  }

  const name = useCSharpNamePolicy().getName(props.name, "enum-member");
  const thisEnumValueSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? core.refkey(props.name),
  });

  return (
    <core.Declaration symbol={thisEnumValueSymbol}>
      <Name />
    </core.Declaration>
  );
}
