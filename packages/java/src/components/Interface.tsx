import { Block, Children } from "@alloy-js/core";
import { CommonDeclarationProps, Declaration } from "./Declaration.js";
import { ExtendsClause } from "./ExtendsClause.jsx";
import { LexicalScope } from "./LexicalScope.jsx";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.jsx";

export interface InterfaceProps
  extends CommonDeclarationProps,
    ModifierProps,
    TypeParametersProps {
  extends?: Children[];
}

export function Interface(props: InterfaceProps) {
  return (
    <Declaration {...props} name={props.name} nameKind="interface">
      <group>
        <Modifiers {...props} />
        interface <Name />
        <TypeParameters generics={props.generics} />
        <ExtendsClause extends={props.extends} />{" "}
      </group>
      <LexicalScope>
        <Block>{props.children}</Block>
      </LexicalScope>
    </Declaration>
  );
}
