import * as core from "@alloy-js/core";
import * as base from "./index.js";
import * as csharp from "../index.js";
import * as symbols from "../symbols/index.js";

// properties for creating an enum
export interface EnumProps extends Omit<base.DeclarationProps, "nameKind"> {
  accessModifier?: csharp.AccessModifier;
}

// a C# enum declaration
export function Enum(props: EnumProps) {
  const name = csharp.useCSharpNamePolicy().getName(props.name, "enum");
  const scope = symbols.useCSharpScope();

  const thisEnumSymbol = scope.binder.createSymbol<symbols.CSharpOutputSymbol>({
    name: name,
    scope,
    refkey: props.refkey ?? core.refkey(props.name),
  });

  // this creates a new scope for the enum definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisEnumScope = symbols.createCSharpMemberScope(scope.binder, scope, thisEnumSymbol, "enum");

  return <core.Declaration symbol={thisEnumSymbol}>
      {csharp.getAccessModifier(props.accessModifier)}enum <base.Name />{props.children ? (
        <>
          {"\n{"}
            <core.Scope value={thisEnumScope}>
              {props.children}
            </core.Scope>
          {"}"}
        </>
      ) : ";"}
    </core.Declaration>;
}

// properties for creating a C# enum member
export interface EnumMemberProps {
  name: string;
  refkey?: core.Refkey;
}

// a member within a C# enum
export function EnumMember(props: EnumMemberProps) {
  const scope = symbols.useCSharpScope();
  if (scope.kind === "member" && scope.name !== 'enum') {
    throw new Error("can't define an enum member outside of an enum scope");
  }
  const name = csharp.useCSharpNamePolicy().getName(props.name, "enum-member");

  return <base.Declaration name={name} refkey={props.refkey}>
      <base.Name />
    </base.Declaration>;
}
