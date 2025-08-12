import {
  Block,
  Children,
  MemberDeclaration,
  MemberName,
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
import { createMethodScope } from "../../scopes/factories.js";
import { createMethodSymbol } from "../../symbols/factories.js";
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
  readonly override?: boolean;
  readonly extern?: boolean;
  readonly readonly?: boolean;
}

const getMethodModifier = makeModifiers<MethodModifiers>([
  "abstract",
  "sealed",
  "static",
  "virtual",
  "override",
  "extern",
  "readonly",
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
  const methodSymbol = createMethodSymbol(props.name, {
    refkeys: props.refkey,
  });

  // scope for method declaration
  const methodScope = createMethodScope();

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
        {returns} <MemberName />
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
          <ExpressionBody>{props.children}</ExpressionBody>
        : <Block newline>{props.children}</Block>}
      </Scope>
    </MemberDeclaration>
  );
}

const ExpressionBody = (props: { children?: Children }) => {
  return (
    <>
      {" => "}
      {props.children};
    </>
  );
};
