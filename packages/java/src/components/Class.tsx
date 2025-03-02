import { Block, Children, List, Scope, Show } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
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
        <Show when={!!props.extends}>
          <indent>
            <br />
            extends {props.extends}
          </indent>
        </Show>
        <Show when={!!props.implements}>
          <indent>
            <br />
            implements <List children={props.implements} comma space />
          </indent>
        </Show>{" "}
        <Scope name={name} kind="class">
          <Block>{props.children}</Block>
        </Scope>
      </group>
    </Declaration>
  );
}
