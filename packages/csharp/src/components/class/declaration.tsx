import type {
  Children,
  DeclarationProps,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { Block, Declaration, join, Name, Scope } from "@alloy-js/core";

import type { AccessModifiers } from "../../modifiers.js";
import {
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { createClassScope } from "../../scopes/factories.js";
import { createNamedTypeSymbol } from "../../symbols/factories.js";
import type { AttributesProp } from "../attributes/attributes.jsx";
import { AttributeList } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";
import type { ParameterProps } from "../parameters/parameters.jsx";
import { Parameters } from "../parameters/parameters.jsx";
import { TypeParameterConstraints } from "../type-parameters/type-parameter-constraints.jsx";
import type { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { TypeParameters } from "../type-parameters/type-parameters.jsx";

export interface ClassModifiers {
  readonly abstract?: boolean;
  readonly partial?: boolean;
  readonly sealed?: boolean;
  readonly static?: boolean;
}

const getClassModifiers = makeModifiers<ClassModifiers>([
  "abstract",
  "sealed",
  "static",
  "partial",
]);

// properties for creating a class
export interface ClassDeclarationProps
  extends Omit<DeclarationProps, "nameKind">, AccessModifiers, ClassModifiers {
  name: string | Namekey;
  /** Doc comment */
  doc?: Children;
  refkey?: Refkey;

  /**
   * Type parameters for the class
   *
   * @example
   * ```tsx
   * <ClassDeclaration name="MyClass" typeParameters={["T"]} />
   * ```
   * This will produce:
   * ```csharp
   * public class MyClass<T>
   * ```
   */
  typeParameters?: (string | TypeParameterProps)[];

  /** Base class that this class extends */
  baseType?: Children;

  /** Interfaces this class implements */
  interfaceTypes?: Children[];

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <ClassDeclaration name="MyClass" attributes={[
   *  <Attribute name="Test" />
   *  <Attribute name="Test2" args={["arg1", "arg2"]} />
   * ]}>
   * ```
   * This will produce:
   * ```csharp
   * [Test]
   * [Test2("arg1", "arg2")]
   * public class MyClass
   * ```
   */
  attributes?: AttributesProp;

  /**
   * Set the primary constructor parameters
   * @example
   * ```tsx
   *  <ClassDeclaration name="MyClass" primaryConstructor={[
   *    {name: "value", type: "int"}
   *  ]}>
   * ```
   * This will produce:
   * ```csharp
   * public class MyClass(int value)
   * {
   *
   * }
   * ```
   */
  primaryConstructor?: ParameterProps[];
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
  const thisClassSymbol = createNamedTypeSymbol(props.name, "class", {
    refkeys: props.refkey,
  });

  const thisClassScope = createClassScope(thisClassSymbol);

  const bases = [
    ...(props.baseType ? [props.baseType] : []),
    ...(props.interfaceTypes || []),
  ];
  const base =
    bases.length > 0 ? <> : {join(bases, { joiner: ", " })}</> : null;
  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getClassModifiers(props),
  ]);
  return (
    <Declaration symbol={thisClassSymbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      {modifiers}class <Name />
      <Scope value={thisClassScope}>
        {props.typeParameters && (
          <TypeParameters parameters={props.typeParameters} />
        )}
        {props.primaryConstructor && (
          <Parameters parameters={props.primaryConstructor} />
        )}
        {base}
        {props.typeParameters && (
          <TypeParameterConstraints parameters={props.typeParameters} />
        )}
        {!props.children && ";"}
        {props.children && <Block newline>{props.children}</Block>}
      </Scope>
    </Declaration>
  );
}
