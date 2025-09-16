import { MemberDeclaration, MemberName, Namekey, Refkey } from "@alloy-js/core";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { useNamedTypeScope } from "../../scopes/contexts.js";
import { CSharpSymbol } from "../../symbols/csharp.js";

// properties for creating a C# enum member
export interface EnumMemberProps {
  name: string | Namekey;
  refkey?: Refkey;
}

// a member within a C# enum
export function EnumMember(props: EnumMemberProps) {
  const scope = useNamedTypeScope();

  if (!scope) {
    throw new Error("EnumMember must be used within an EnumDeclaration.");
  }

  const symbol = scope.ownerSymbol;

  if (symbol.typeKind !== "enum") {
    throw new Error("EnumMember must be used within an EnumDeclaration.");
  }

  const thisEnumValueSymbol = new CSharpSymbol(props.name, symbol.members, {
    refkeys: props.refkey,
    namePolicy: useCSharpNamePolicy().for("enum-member"),
  });

  return (
    <MemberDeclaration symbol={thisEnumValueSymbol}>
      <MemberName />
    </MemberDeclaration>
  );
}
