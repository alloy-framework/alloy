import * as core from "@alloy-js/core";
import { join } from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../modifiers.js";
import { CSharpElements, useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { Name } from "./Name.jsx";
import { ParameterProps, Parameters } from "./Parameters.jsx";
import { DocWhen } from "./doc/comment.jsx";
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

  /** Type parameters */
  typeParameters?: (string | TypeParameterProps)[];

  /** Base class that this class extends */
  baseType?: core.Children;

  /** Interfaces this class implements */
  interfaceTypes?: core.Children[];
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

  let typeParams: core.Children;

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

export interface ClassConstructorProps extends AccessModifiers {
  parameters?: Array<ParameterProps>;
  refkey?: core.Refkey;
  symbol?: core.OutputSymbol;
  children?: core.Children;
}

// a C# class constructor
export function ClassConstructor(props: ClassConstructorProps) {
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class-decl") {
    throw new Error(
      "can't define a class constructor outside of a class-decl scope",
    );
  }

  // fetch the class name from the scope
  const name = useCSharpNamePolicy().getName(scope.owner!.name, "class-method");
  const ctorSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? core.refkey(name),
  });

  // scope for ctor declaration
  const ctorDeclScope = new CSharpMemberScope("constructor-decl", {
    owner: ctorSymbol,
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";

  // note that scope wraps the ctor decl so that the params get the correct scope
  return (
    <core.Declaration symbol={ctorSymbol}>
      <core.Scope value={ctorDeclScope}>
        {modifiers}
        <Name />({params})<core.Block newline>{props.children}</core.Block>
      </core.Scope>
    </core.Declaration>
  );
}

// properties for creating a class member
export interface ClassMemberProps extends AccessModifiers {
  name: string;
  type: core.Children;
  refkey?: core.Refkey;
  /** Doc comment */
  doc?: core.Children;
}

// a C# class member (i.e. a field within a class like "private int count")
export function ClassMember(props: ClassMemberProps) {
  let nameElement: CSharpElements = "class-member-private";
  if (props.public) {
    nameElement = "class-member-public";
  }
  const name = useCSharpNamePolicy().getName(props.name, nameElement);
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class-decl") {
    throw new Error(
      "can't define a class member outside of a class-decl scope",
    );
  }

  const memberSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? core.refkey(props.name),
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);
  return (
    <core.Declaration symbol={memberSymbol}>
      <DocWhen doc={props.doc} />
      {modifiers}
      {props.type} <Name />
    </core.Declaration>
  );
}
