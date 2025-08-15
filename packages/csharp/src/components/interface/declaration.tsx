import * as core from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { createNamedTypeScope } from "../../scopes/factories.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import { AttributeList, AttributesProp } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";
import { Name } from "../Name.jsx";
import { TypeParameterConstraints } from "../type-parameters/type-parameter-constraints.jsx";
import { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { TypeParameters } from "../type-parameters/type-parameters.jsx";

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
  refkey?: core.Refkey;

  /**
   * Type parameters for the interface
   *
   * @example
   * ```tsx
   * <InterfaceDeclaration name="IList" typeParameters={["T"]} />
   * ```
   * This will produce:
   * ```csharp
   * public interface IList<T>
   * ```
   */
  typeParameters?: (TypeParameterProps | string)[];

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <InterfaceDeclaration name="MyInterface" attributes={[
   *  <Attribute name="Test" />
   *  <Attribute name="Test2" args={["arg1", "arg2"]} />
   * ]} />
   * ```
   * This will produce:
   * ```csharp
   * [Test]
   * [Test2("arg1", "arg2")]
   * public interface MyInterface
   * ```
   */
  attributes?: AttributesProp;
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

  // this creates a new scope for the interface definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisInterfaceScope = createNamedTypeScope(symbol);

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getInterfaceModifiers(props),
  ]);
  return (
    <core.Declaration symbol={symbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      {modifiers}interface <Name />
      <core.Scope value={thisInterfaceScope}>
        {props.typeParameters && (
          <TypeParameters parameters={props.typeParameters} />
        )}
        {props.typeParameters && (
          <TypeParameterConstraints parameters={props.typeParameters} />
        )}
        {props.children ?
          <core.Block newline>{props.children}</core.Block>
        : ";"}
      </core.Scope>
    </core.Declaration>
  );
}
