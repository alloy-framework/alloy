import { Children, List, Name, Show, createContentSlot } from "@alloy-js/core";
import { createPythonSymbol } from "../symbol-creation.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { DecoratorList } from "./DecoratorList.jsx";
import { MemberScope } from "./MemberScope.jsx";
import { PythonBlock } from "./PythonBlock.jsx";

export interface ClassDeclarationProps extends BaseDeclarationProps {
  /**
   * The base classes that this class inherits from.
   */
  bases?: Children[];
  /**
   * Decorators rendered above the `class` keyword, in source order —
   * `decorators[0]` is topmost. By Python's bottom-up application order, the
   * topmost entry is the outermost decorator (applied last).
   *
   * Each entry should produce a complete decorator line (typically starting
   * with `@`). Falsy entries are skipped, so conditional decorators can be
   * provided inline when needed.
   *
   * Wrappers like `DataclassDeclaration` build their intrinsic decorator
   * (e.g. `@dataclass(...)`) and append it to this list at the position that
   * keeps `@dataclass` closest to the class — i.e. user `decorators` end up
   * **above** the intrinsic one, matching how Pydantic's `@field_validator`
   * sits above `@classmethod` on methods.
   *
   * Do **not** pass a wrapper's intrinsic decorator here. For example, when
   * using `DataclassDeclaration`, do not include `@dataclass(...)` in
   * `decorators` — the component renders it for you, and stacking it twice
   * would produce invalid Python.
   */
  decorators?: Children[];
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

  const ContentSlot = createContentSlot();

  return (
    <Declaration symbol={sym}>
      <DecoratorList decorators={props.decorators} />
      class <Name />
      <MemberScope ownerSymbol={sym}>
        {basesPart}
        <PythonBlock opener=":">
          <Show when={Boolean(props.doc)}>
            {props.doc}
            <line />
          </Show>
          <ContentSlot.WhenEmpty>pass</ContentSlot.WhenEmpty>
          <ContentSlot>{props.children}</ContentSlot>
        </PythonBlock>
      </MemberScope>
    </Declaration>
  );
}
