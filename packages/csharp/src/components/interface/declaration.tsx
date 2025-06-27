import * as core from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpSymbol } from "../../symbols/csharp.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { DocWhen } from "../doc/comment.jsx";
import { Name } from "../Name.jsx";

export interface InterfaceModifiers {
  readonly partial?: boolean;
}

const getInterfaceModifiers = makeModifiers<InterfaceModifiers>(["partial"]);

// properties for creating a class
export interface InterfaceDeclarationProps
  extends Omit<core.DeclarationProps, "nameKind">,
    AccessModifiers,
    InterfaceModifiers {
  name: string;

  /** Doc comment */
  doc?: core.Children;
  refkey?: core.Refkey | core.Refkey[];
  typeParameters?: Record<string, core.Refkey>;
}

/**
 * CSharp interface declaration.
 * @example
 * ```tsx
 * <InterfaceDeclaration public name="IMyInterface">
 *   <InterfaceMember public name="MyProperty" type="int" />
 *   <InterfaceMethod public name="MyMethod" returnType="void">
 *     <Parameter name="value" type="int" />
 *   </InterfaceMethod>
 * </InterfaceDeclaration>
 * ```
 * This will produce:
 * ```csharp
 * public interface MyIface
 * {
 *   public int MyProperty { get; set; }
 *   public void MyMethod(int value);
 * }
 * ```
 */
export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "interface");

  const symbol = createNamedTypeSymbol(name, "interface", {
    refkeys: props.refkey,
  });

  let typeParams: core.Children;
  if (props.typeParameters) {
    const typeParamNames = new Array<string>();
    for (const entry of Object.entries(props.typeParameters)) {
      typeParamNames.push(
        useCSharpNamePolicy().getName(entry[0], "type-parameter"),
      );
      // create a symbol for each type param so its
      // refkey resolves to the type param's name

      new CSharpSymbol(entry[0], symbol.typeParameters, {
        refkeys: entry[1],
      });
    }
    typeParams = (
      <group>
        {"<"}
        <core.For each={typeParamNames} comma line>
          {(name) => name}
        </core.For>
        {">"}
      </group>
    );
  }

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getInterfaceModifiers(props),
  ]);
  return (
    <core.Declaration symbol={symbol}>
      <DocWhen doc={props.doc} />
      {modifiers}interface <Name />
      {typeParams}
      {props.children ?
        <core.Block newline>
          <core.MemberScope owner={symbol}>{props.children}</core.MemberScope>
        </core.Block>
      : ";"}
    </core.Declaration>
  );
}
