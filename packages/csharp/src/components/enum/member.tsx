import type { Children, Namekey, Refkey } from "@alloy-js/core";
import { createSymbol, MemberDeclaration, MemberName } from "@alloy-js/core";

import { useCSharpNamePolicy } from "../../name-policy.js";
import { useNamedTypeScope } from "../../scopes/contexts.js";
import { CSharpSymbol } from "../../symbols/csharp.js";
import type { AttributesProp } from "../attributes/attributes.jsx";
import { AttributeList } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";

// properties for creating a C# enum member
export interface EnumMemberProps {
  name: string | Namekey;
  /** Doc comment */
  doc?: Children;
  refkey?: Refkey;

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <EnumMember name="Red" attributes={[<Attribute name="Obsolete" />]} />
   * ```
   * This will produce:
   * ```csharp
   * [Obsolete]
   * Red
   * ```
   */
  attributes?: AttributesProp;
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

  const thisEnumValueSymbol = createSymbol(
    CSharpSymbol,
    props.name,
    symbol.members,
    {
      refkeys: props.refkey,
      namePolicy: useCSharpNamePolicy().for("enum-member"),
    },
  );

  return (
    <MemberDeclaration symbol={thisEnumValueSymbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      <MemberName />
    </MemberDeclaration>
  );
}
