import { Block, Children, Scope, Show } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { ExtendsClause } from "./ExtendsClause.js";
import { ImplementsClause } from "./ImplementsClause.js";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.jsx";

export interface ClassProps
  extends DeclarationProps,
    ModifierProps,
    TypeParametersProps {
  extends?: Children;
  implements?: Children[];
}

export function Class(props: ClassProps) {
  const name = useJavaNamePolicy().getName(props.name, "class");

  return (
    <Declaration {...props} name={name}>
      <group>
        <Modifiers {...props} />
        class <Name />
        <Show when={!!props.generics}>
          <TypeParameters generics={props.generics} />
        </Show>
        <ExtendsClause extends={props.extends ? [props.extends] : []} />
        <ImplementsClause interfaces={props.implements} />{" "}
        <Scope name={name} kind="class">
          <Block>{props.children}</Block>
        </Scope>
      </group>
    </Declaration>
  );
}
