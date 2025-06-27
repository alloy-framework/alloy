import {
  Children,
  MemberDeclaration,
  MemberName,
  Refkey,
} from "@alloy-js/core";
import {
  computeModifiersPrefix,
  DeclarationModifiers,
  getAccessModifier,
} from "../../modifiers.js";
import { CSharpElements, useCSharpNamePolicy } from "../../name-policy.js";
import {
  accessibilityFromProps,
  nonAccessibilityFromProps,
} from "../../symbols/csharp.js";
import { FieldSymbol } from "../../symbols/field.js";
import { useNamedTypeScope } from "../../symbols/named-type.js";

export interface ClassFieldProps extends DeclarationModifiers {
  name: string;
  type: Children;
  refkey?: Refkey;
}

export function ClassField(props: ClassFieldProps) {
  let nameElement: CSharpElements = "class-member-private";
  if (props.public) {
    nameElement = "class-member-public";
  }
  const name = useCSharpNamePolicy().getName(props.name, nameElement);
  const classSymbol = useNamedTypeScope();

  const memberSymbol = new FieldSymbol(name, classSymbol.members, {
    accessibility: accessibilityFromProps(props),
    refkeys: props.refkey,
    ...nonAccessibilityFromProps(props),
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);
  return (
    <MemberDeclaration symbol={memberSymbol}>
      {modifiers}
      {props.type} <MemberName />
    </MemberDeclaration>
  );
}
