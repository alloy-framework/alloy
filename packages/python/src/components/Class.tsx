import { Children, Indent, List, Scope, Show } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";

export interface ClassProps extends DeclarationProps {
  name: string;
  bases?: Children[];
}

export function Class(props: ClassProps) {
  const name = usePythonNamePolicy().getName(props.name, "class");
  // Determine if children are present
  const hasChildren =
    props.children !== undefined &&
    !(Array.isArray(props.children) && props.children.length === 0);
  return (
    <Declaration {...props} name={name}>
      <group>
        class {name}
        <Show when={props.bases !== undefined && props.bases.length > 0}>
          (<List children={props.bases} comma space />)
        </Show>
        :
        <Scope name={name} kind="class">
          <Indent>{hasChildren ? props.children : "pass"}</Indent>
        </Scope>
      </group>
    </Declaration>
  );
}
