import * as core from "@alloy-js/core";
import { AccessModifier, getAccessModifier } from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { Name } from "./Name.jsx";

// properties for creating an enum
export interface EnumProps {
  name: string;
  refkey?: core.Refkey;
  children?: core.Children;
  accessModifier?: AccessModifier;
}

// a C# enum declaration
export function Enum(props: EnumProps) {
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

  if (thisEnumScope.owner)
    return (
      <core.Declaration symbol={thisEnumSymbol}>
        {getAccessModifier(props.accessModifier)}enum <Name />
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
