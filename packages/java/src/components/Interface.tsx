import { Children, code, Scope } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.jsx";

export interface InterfaceProps
  extends DeclarationProps,
    ModifierProps,
    TypeParametersProps {
  extends?: Children;
}

export function Interface(props: InterfaceProps) {
  const name = useJavaNamePolicy().getName(props.name, "interface");
  const collectedInterfaces = "fixme"; //collectArguments(props.extends);
  const implementsExpression =
    props.extends ? code` extends ${collectedInterfaces}` : "";
  const modifiers = <Modifiers {...props} />;
  const generics =
    props.generics ? <TypeParameters generics={props.generics} /> : "";
  return (
    <Declaration {...props} name={name}>
      {modifiers}interface <Name />
      {generics}
      {implementsExpression} {"{"}
      <Scope name={name} kind="interface">
        {props.children}
      </Scope>
      {"}"}
    </Declaration>
  );
}
