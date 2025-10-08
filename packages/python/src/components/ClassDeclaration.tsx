import { Children, List, Name, Show, childrenArray } from "@alloy-js/core";
import { createPythonSymbol } from "../symbol-creation.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { MemberScope } from "./MemberScope.jsx";
import { PythonBlock } from "./PythonBlock.jsx";

export interface ClassDeclarationProps extends BaseDeclarationProps {
  /**
   * The base classes that this class inherits from.
   */
  bases?: Children[];
}

/**
 * Create a Python class declaration.
 *
 * @example
 * ```tsx
 * <ClassDeclaration name="MyClass" bases={["BaseClass"]}>
 *   <VariableDeclaration name="a" type="int" />
 *   <VariableDeclaration name="b" type="str" />
 *   <py.FunctionDeclaration name="my_method" parameters={[{ name: "a", type: "int" }, { name: "b", type: "str" }]} returnType="int">
 *     return a + b
 *   </py.FunctionDeclaration>
 * </ClassDeclaration>
 * ```
 * renders to
 * ```py
 * class MyClass(BaseClass):
 *   a: int = None
 *   b: str = None
 *   def my_method(self, a: int, b: str) -> int:
 *     return a + b
 * ```
 * @remarks
 *
 * Any child declarations (methods, fields, nested classes) will be placed
 * in the class scope. This component creates a class scope to hold its
 * members.
 */
export function ClassDeclaration(props: ClassDeclarationProps) {
  const basesPart = props.bases && (
    <>
      (<List children={props.bases} comma space />)
    </>
  );

  const sym = createPythonSymbol(
    props.name!,
    {
      refkeys: props.refkey,
    },
    "class",
  );

  const hasChildren =
    childrenArray(() => props.children).filter((c) => Boolean(c)).length > 0;

  return (
    <Declaration symbol={sym}>
      class <Name />
      <MemberScope ownerSymbol={sym}>
        {basesPart}
        <PythonBlock opener=":">
          <Show when={Boolean(props.doc)}>
            {props.doc}
            <line />
          </Show>
          {hasChildren ? props.children : "pass"}
        </PythonBlock>
      </MemberScope>
    </Declaration>
  );
}
