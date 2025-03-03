import { Block, Children, Scope } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { ExtendsClause } from "./ExtendsClause.jsx";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.jsx";

export interface InterfaceProps
  extends DeclarationProps,
    ModifierProps,
    TypeParametersProps {
  extends?: Children[];
}

export function Interface(props: InterfaceProps) {
  const name = useJavaNamePolicy().getName(props.name, "interface");
  return (
    <Declaration {...props} name={name}>
      <group>
        <Modifiers {...props} />
        interface <Name />
        <TypeParameters generics={props.generics} />
        <ExtendsClause extends={props.extends} />{" "}
      </group>
      <Scope name={name} kind="interface">
        <Block>{props.children}</Block>
      </Scope>
    </Declaration>
  );
}
