import { childrenArray, Children, Indent, List, Scope, Show } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";

export interface ClassDeclarationProps extends DeclarationProps {
  name: string;
  bases?: Children[];
}

export function ClassDeclaration(props: ClassDeclarationProps) {
  const name = usePythonNamePolicy().getName(props.name, "class");
  // Determine if children are present
  const hasChildren =
    childrenArray(() => props.children).filter((c) => Boolean(c)).length > 0;
  
  const updatedProps: ClassDeclarationProps = {
    ...props,
    name: name,
  };
  return (
    <Declaration {...updatedProps} name={updatedProps.name}>
      <group>
        class {updatedProps.name}
        <Show when={updatedProps.bases !== undefined && updatedProps.bases.length > 0}>
          (<List children={updatedProps.bases} comma space />)
        </Show>
        :
        <Scope name={updatedProps.name} kind="class">
          <Indent>{hasChildren ? updatedProps.children : "pass"}</Indent>
        </Scope>
      </group>
    </Declaration>
  );
}
