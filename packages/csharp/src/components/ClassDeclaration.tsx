import * as core from "@alloy-js/core";
import { join } from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope } from "../symbols/scopes.js";
import { AttributeList, AttributesProp } from "./attributes/attributes.jsx";
import { DocWhen } from "./doc/comment.jsx";
import { Name } from "./Name.jsx";
import { TypeParameterConstraints } from "./type-parameters/type-parameter-constraints.jsx";
import { TypeParameterProps } from "./type-parameters/type-parameter.jsx";
import { TypeParameters } from "./type-parameters/type-parameters.jsx";

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
  extends Omit<core.DeclarationProps, "nameKind">,
    AccessModifiers,
    ClassModifiers {
  name: string;
  /** Doc comment */
  doc?: core.Children;
  refkey?: core.Refkey;

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
  baseType?: core.Children;

  /** Interfaces this class implements */
  interfaceTypes?: core.Children[];

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

  const thisClassSymbol = new CSharpOutputSymbol(name, {
    refkeys: props.refkey,
  });

  // this creates a new scope for the class definition.
  // members will automatically "inherit" this scope so
  // that refkeys to them will produce the fully-qualified
  // name e.g. Foo.Bar.
  const thisClassScope = new CSharpMemberScope("class-decl", {
    owner: thisClassSymbol,
  });

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
    <core.Declaration symbol={thisClassSymbol}>
      <DocWhen doc={props.doc} />
      <AttributeList attributes={props.attributes} endline />
      {modifiers}class <Name />
      {props.typeParameters && (
        <TypeParameters parameters={props.typeParameters} />
      )}
      {base}
      {props.typeParameters && (
        <TypeParameterConstraints parameters={props.typeParameters} />
      )}
      {!props.children && ";"}
      {props.children && (
        <core.Block newline>
          <core.Scope value={thisClassScope}>{props.children}</core.Scope>
        </core.Block>
      )}
    </core.Declaration>
  );
}
