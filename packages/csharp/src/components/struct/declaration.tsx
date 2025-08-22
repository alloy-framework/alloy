import * as core from "@alloy-js/core";
import { join } from "@alloy-js/core";
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

export interface StructModifiers {
  readonly new?: boolean;
  readonly readonly?: boolean;
  readonly ref?: boolean;
  readonly partial?: boolean;
}

const getStructModifiers = makeModifiers<StructModifiers>([
  "new",
  "readonly",
  "ref",
  "partial",
]);

// properties for creating a class
export interface StructDeclarationProps
  extends Omit<core.DeclarationProps, "nameKind">,
    AccessModifiers,
    StructModifiers {
  name: string;

  /** Doc comment */
  doc?: core.Children;
  refkey?: core.Refkey;

  /**
   * Type parameters for the struct
   *
   * @example
   * ```tsx
   * <StructDeclaration name="IList" typeParameters={["T"]} />
   * ```
   * This will produce:
   * ```csharp
   * public struct IList<T>
   * ```
   */
  typeParameters?: (TypeParameterProps | string)[];

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <StructDeclaration name="MyStruct" attributes={[
   *  <Attribute name="Test" />
   *  <Attribute name="Test2" args={["arg1", "arg2"]} />
   * ]} />
   * ```
   * This will produce:
   * ```csharp
   * [Test]
   * [Test2("arg1", "arg2")]
   * public struct MyStruct
   * ```
   */
  attributes?: AttributesProp;

  /** Interfaces this struct implements */
  interfaceTypes?: core.Children[];
}

/**
 * CSharp struct declaration.
 * @example
 * ```tsx
 * <StructDeclaration public name="IMyStruct">
 *   <StructMember public name="MyProperty" type="int" />
 *   <StructMethod public name="MyMethod" returnType="void">
 *     <Parameter name="value" type="int" />
 *   </StructMethod>
 * </StructDeclaration>
 * ```
 * This will produce:
 * ```csharp
 * public struct MyIface
 * {
 *   public int MyProperty { get; set; }
 *   public void MyMethod(int value);
 * }
 * ```
 */
export function StructDeclaration(props: StructDeclarationProps) {
  const name = useCSharpNamePolicy().getName(props.name!, "struct");

  const thisStructSymbol = createNamedTypeSymbol(name, "struct", {
    refkeys: props.refkey,
  });

  const thisStructScope = createNamedTypeScope(thisStructSymbol);

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getStructModifiers(props),
  ]);

  const base =
    props.interfaceTypes && props.interfaceTypes.length > 0 ?
      <> : {join(props.interfaceTypes, { joiner: ", " })}</>
    : null;

  return (
    <core.Declaration symbol={thisStructSymbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      {modifiers}struct <Name />
      {props.typeParameters && (
        <TypeParameters parameters={props.typeParameters} />
      )}
      {base}
      {props.typeParameters && (
        <TypeParameterConstraints parameters={props.typeParameters} />
      )}
      {props.children ?
        <core.Block newline>
          <core.Scope value={thisStructScope}>{props.children}</core.Scope>
        </core.Block>
      : ";"}
    </core.Declaration>
  );
}
