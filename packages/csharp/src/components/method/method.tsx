import {
  Block,
  Children,
  MemberDeclaration,
  refkey,
  Refkey,
  Scope,
} from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  getAsyncModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../../symbols/scopes.js";
import { AttributeList, AttributesProp } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";
import { ParameterProps, Parameters } from "../parameters/parameters.jsx";
import { TypeParameterConstraints } from "../type-parameters/type-parameter-constraints.jsx";
import { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { TypeParameters } from "../type-parameters/type-parameters.jsx";

/** Method modifiers. Can only be one. */
export interface MethodModifiers {
  readonly abstract?: boolean;
  readonly sealed?: boolean;
  readonly static?: boolean;
  readonly virtual?: boolean;
}

const getMethodModifier = makeModifiers<MethodModifiers>([
  "abstract",
  "sealed",
  "static",
  "virtual",
]);

// properties for creating a method
export interface MethodProps extends AccessModifiers, MethodModifiers {
  name: string;
  refkey?: Refkey;
  children?: Children;
  parameters?: Array<ParameterProps>;
  returns?: Children;

  /**
   * If true, the method will be declared as an async method.
   */
  async?: boolean;

  /** Doc comment */
  doc?: Children;

  /**
   * Type parameters for the method
   *
   * @example
   * ```tsx
   * <InterfaceMethod name="Test" typeParameters={["T"]} />
   * ```
   * This will produce:
   * ```csharp
   * public void Test<T>()
   * ```
   */
  typeParameters?: (TypeParameterProps | string)[];

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <ClassMethod name="MyMethod" attributes={[
   *  <Attribute name="Test" />
   *  <Attribute name="Test2" args={["arg1", "arg2"]} />
   * ]} />
   * ```
   * This will produce:
   * ```csharp
   * [Test]
   * [Test2("arg1", "arg2")]
   * public void MyMethod() { }
   * ```
   */
  attributes?: AttributesProp;

  /**
   * Use expression syntax for the method.
   * @example
   * ```tsx
   * <ClassMethod name="MyMethod" lambda>
   *   this.MyProperty.Value;
   * </ClassMethod>
   * ```
   * This will produce:
   * ```csharp
   * public void MyMethod() => this.MyProperty.Value;
   * ```
   */
  expression?: boolean;
}

// a C# class method
export function Method(props: MethodProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-method");
  const scope = useCSharpScope();
  if (
    scope.kind !== "member" ||
    (scope.name !== "class-decl" && scope.name !== "struct-decl")
  ) {
    throw new Error(
      "can't define a class method outside of a class or struct scope",
    );
  }

  const methodSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? refkey(props.name),
  });

  // scope for method declaration
  const methodScope = new CSharpMemberScope("method-decl", {
    owner: methodSymbol,
  });

  const returns = props.returns ?? (props.async ? "Task" : "void");

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getMethodModifier(props),
    getAsyncModifier(props.async),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={methodSymbol}>
      <Scope value={methodScope}>
        <DocWhen doc={props.doc} />
        <AttributeList attributes={props.attributes} endline />
        {modifiers}
        {returns} {name}
        {props.typeParameters && (
          <TypeParameters parameters={props.typeParameters} />
        )}
        <Parameters parameters={props.parameters} />
        {props.typeParameters && (
          <TypeParameterConstraints parameters={props.typeParameters} />
        )}
        {props.abstract ?
          ";"
        : props.expression ?
          <>
            {" => "}
            {props.children}
          </>
        : <Block newline>{props.children}</Block>}
      </Scope>
    </MemberDeclaration>
  );
}
