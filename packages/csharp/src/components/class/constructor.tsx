import {
  Block,
  Children,
  MemberDeclaration,
  MemberName,
  Refkey,
} from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
} from "../../modifiers.js";
import { MethodSymbol } from "../../symbols/method.js";
import { useNamedTypeScope } from "../../symbols/named-type.js";
import { MethodScope } from "../method-scope.jsx";
import { ParameterProps, Parameters } from "../Parameters.jsx";

export interface ClassConstructorProps extends AccessModifiers {
  parameters?: Array<ParameterProps>;
  refkey?: Refkey;
  children?: Children;
}

// a C# class constructor
export function ClassConstructor(props: ClassConstructorProps) {
  const classSymbol = useNamedTypeScope();

  // fetch the class name from the scope
  const name = classSymbol.name;

  const ctorSymbol = new MethodSymbol(
    name,
    classSymbol.members,
    "constructor",
    {
      refkeys: props.refkey,
    },
  );

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";

  // note that scope wraps the ctor decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={ctorSymbol}>
      <MethodScope>
        {modifiers}
        <MemberName />({params})<Block newline>{props.children}</Block>
      </MethodScope>
    </MemberDeclaration>
  );
}
