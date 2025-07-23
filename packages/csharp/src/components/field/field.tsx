import { Children, Declaration, Name, refkey, Refkey } from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
} from "../../modifiers.js";
import { CSharpElements, useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import { useCSharpScope } from "../../symbols/scopes.js";
import { DocWhen } from "../doc/comment.jsx";

export interface FieldProps extends AccessModifiers {
  name: string;
  type: Children;
  refkey?: Refkey;
  /** Doc comment */
  doc?: Children;
}

/** Render a c# field */
export function Field(props: FieldProps) {
  let nameElement: CSharpElements = "class-member-private";
  if (props.public) {
    nameElement = "class-member-public";
  }
  const name = useCSharpNamePolicy().getName(props.name, nameElement);
  const scope = useCSharpScope();
  if (
    scope.kind !== "member" ||
    (scope.name !== "class-decl" && scope.name !== "struct-decl")
  ) {
    throw new Error(
      "can't define a class member outside of a class or struct scope",
    );
  }

  const memberSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? refkey(props.name),
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);
  return (
    <Declaration symbol={memberSymbol}>
      <DocWhen doc={props.doc} />
      {modifiers}
      {props.type} <Name />
    </Declaration>
  );
}
