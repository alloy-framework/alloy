import * as core from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import { CSharpMemberScope } from "../../symbols/scopes.js";
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
  refkey?: core.Refkey;
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

  const thisInterfaceSymbol = new CSharpOutputSymbol(name, {
    refkeys: props.refkey,
  });

  // this creates a new scope for the interface definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisInterfaceScope = new CSharpMemberScope("interface-decl", {
    owner: thisInterfaceSymbol,
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
      new CSharpOutputSymbol(entry[0], {
        scope: thisInterfaceScope,
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
    <core.Declaration symbol={thisInterfaceSymbol}>
      {modifiers}interface <Name />
      {typeParams}
      {props.children ?
        <core.Block newline>
          <core.Scope value={thisInterfaceScope}>{props.children}</core.Scope>
        </core.Block>
      : ";"}
    </core.Declaration>
  );
}
