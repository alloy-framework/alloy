import {
  BlockProps,
  Children,
  Indent,
  List,
  Name,
  Scope,
  childrenArray,
  computed,
} from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js";
import {
  BaseDeclarationProps,
  Declaration,
  DeclarationProps,
} from "./Declaration.js";

export interface ClassDeclarationProps extends BaseDeclarationProps {
  bases?: Children[];
}

/** For some reason, when rendering a Block in the Python implementation,
 * it renders a newline after the last line. That doesn't seems to happen
 * in the other language implementations. We are adding this class so we can
 * remove the newline when rendering a ClassDeclaration, and we do that by
 * basically copying the original class and removing the trailingBreak in the
 * Indent component. With that, we are also to be able to test it properly,
 * as we aren't able to assert for the newline correctly.
 */
export function PythonBlock(props: BlockProps) {
  const childCount = computed(() => childrenArray(() => props.children).length);
  return (
    <group>
      {props.newline && <br />}
      {props.opener ?? "{"}
      <Indent softline={childCount.value === 0}>{props.children}</Indent>
      {props.closer ?? "}"}
    </group>
  );
}

export function ClassDeclaration(props: ClassDeclarationProps) {
  const name = usePythonNamePolicy().getName(props.name!, "class");
  // Propagate the name after the name policy was applied
  const updatedProps: DeclarationProps = {
    ...props,
    name: name,
    nameKind: "class",
  };

  const hasChildren =
    childrenArray(() => props.children).filter((c) => Boolean(c)).length > 0;
  const basesPart = props.bases && (
    <>
      (<List children={props.bases} comma space />)
    </>
  );
  return (
    <Declaration {...updatedProps}>
      class <Name />
      <Scope name={updatedProps.name} kind="class">
        {basesPart}
        <PythonBlock opener=":" closer="" newline={false}>
          {hasChildren ? props.children : "pass"}
        </PythonBlock>
      </Scope>
    </Declaration>
  );
}
