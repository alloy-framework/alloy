import { MemberDeclaration, MemberName, Refkey } from "@alloy-js/core";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpSymbol } from "../../symbols/csharp.js";
import { useNamedTypeScope } from "../../symbols/named-type.js";

// properties for creating a C# enum member
export interface EnumMemberProps {
  name: string;
  refkey?: Refkey;
}

// a member within a C# enum
export function EnumMember(props: EnumMemberProps) {
  const symbol = useNamedTypeScope();

  if (!symbol) {
    throw new Error("EnumMember must be used within an EnumDeclaration.");
  }
  if (symbol.typeKind !== "enum") {
    throw new Error("EnumMember can only be used within an enum scope.");
  }

  const name = useCSharpNamePolicy().getName(props.name, "enum-member");
  const thisEnumValueSymbol = new CSharpSymbol(name, symbol.members, {
    refkeys: props.refkey,
  });

  return (
    <MemberDeclaration symbol={thisEnumValueSymbol}>
      <MemberName />
    </MemberDeclaration>
  );
}
