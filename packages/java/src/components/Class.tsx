import { Block, Children, Show } from "@alloy-js/core";
import { CommonDeclarationProps, Declaration } from "./Declaration.js";
import { ExtendsClause } from "./ExtendsClause.js";
import { ImplementsClause } from "./ImplementsClause.js";
import { LexicalScope } from "./LexicalScope.jsx";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.jsx";

export interface ClassProps
  extends CommonDeclarationProps,
    ModifierProps,
    TypeParametersProps {
  extends?: Children;
  implements?: Children[];
}

export function Class(props: ClassProps) {
  return (
    <Declaration {...props} name={props.name} nameKind="class">
      <group>
        <Modifiers {...props} />
        class <Name />
        <Show when={!!props.generics}>
          <TypeParameters generics={props.generics} />
        </Show>
        <ExtendsClause extends={props.extends ? [props.extends] : []} />
        <ImplementsClause interfaces={props.implements} />{" "}
        <LexicalScope>
          <Block>{props.children}</Block>
        </LexicalScope>
      </group>
    </Declaration>
  );
}
