import {
  Block,
  Children,
  Declaration,
  For,
  MemberScope,
  Refkey,
} from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpSymbol } from "../../symbols/csharp.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { DeclarationProps } from "../Declaration.jsx";
import { Name } from "../Name.jsx";
import { DocWhen } from "../doc/comment.jsx";

export interface ClassModifiers {
  readonly abstract?: boolean;
  readonly partial?: boolean;
  readonly sealed?: boolean;
  readonly static?: boolean;
}

const getClassModifiers = makeModifiers<ClassModifiers>([
  "abstract",
  "partial",
  "sealed",
  "static",
]);

// properties for creating a class
export interface ClassDeclarationProps
  extends Omit<DeclarationProps, "nameKind">,
    AccessModifiers,
    ClassModifiers {
  name: string;
  /** Doc comment */
  doc?: Children;
  typeParameters?: Record<string, Refkey>;
}

/**
 * CSharp class declaration.
 * @example
 * ```tsx
 * <ClassDeclaration public name="MyClass">
 *   <ClassMember public name="MyField" type="int" />
 *   <ClassConstructor>
 *     <Parameter name="value" type="int" />
 *     this.MyField = value;
 *   </ClassConstructor>
 * </ClassDeclaration>
 * ```
 * This will produce:
 * ```csharp
 * public class MyClass
 * {
 *   public int MyField;
 *   public MyClass(int value)
 *   {
 *     this.MyField = value;
 *   }
 * }
 * ```
 */
export function ClassDeclaration(props: ClassDeclarationProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "class");
  const symbol = createNamedTypeSymbol(name, "class", {
    refkeys: props.refkey,
  });

  let typeParams: Children;
  if (props.typeParameters) {
    const typeParamNames = new Array<string>();
    for (const entry of Object.entries(props.typeParameters)) {
      typeParamNames.push(
        useCSharpNamePolicy().getName(entry[0], "type-parameter"),
      );

      new CSharpSymbol(entry[0], symbol.typeParameters, {
        refkeys: entry[1],
      });
    }
    typeParams = (
      <group>
        {"<"}
        <For each={typeParamNames} comma line>
          {(name) => name}
        </For>
        {">"}
      </group>
    );
  }

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getClassModifiers(props),
  ]);

  return (
    <Declaration symbol={symbol}>
      <DocWhen doc={props.doc} />
      {modifiers}class <Name />
      {typeParams}
      {!props.children && ";"}
      {props.children && (
        <Block newline>
          <MemberScope owner={symbol}>{props.children}</MemberScope>
        </Block>
      )}
    </Declaration>
  );
}
