import * as core from "@alloy-js/core";
import { AccessModifier, getAccessModifier } from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { useCSharpScope, createCSharpMemberScope } from "../symbols/scopes.js";
import { Name } from "./Name.jsx";

// properties for creating an enum
export interface EnumProps extends Omit<core.DeclarationProps, "nameKind"> {
  accessModifier?: AccessModifier;
}

// a C# enum declaration
export function Enum(props: EnumProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "enum");
  const scope = useCSharpScope();

  const thisEnumSymbol = scope.binder.createSymbol<CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  // this creates a new scope for the enum definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisEnumScope = createCSharpMemberScope(
    scope.binder,
    scope,
    thisEnumSymbol,
    "enum",
  );

  return <core.Declaration symbol={thisEnumSymbol}>
      {getAccessModifier(props.accessModifier)}enum <Name />{!props.children && ";"}{props.children && 
        <>
          {"\n{"}
            <core.Scope value={thisEnumScope}>
              {props.children}
            </core.Scope>
          {"}"}
        </>
        }
    </core.Declaration>;
}

// properties for creating a C# enum member
export interface EnumMemberProps {
  name: string;
  refkey?: core.Refkey;
}

// a member within a C# enum
export function EnumMember(props: EnumMemberProps) {
  const scope = useCSharpScope();
  if (scope.kind === "member" && scope.name !== "enum") {
    throw new Error("can't define an enum member outside of an enum scope");
  }
  const name = useCSharpNamePolicy().getName(props.name, "enum-member");

  return <core.Declaration name={name} refkey={props.refkey}>
      <Name />
    </core.Declaration>;
}
