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
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../../symbols/scopes.js";
import { AttributeList } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";
import { ParameterProps, Parameters } from "../parameters/parameters.jsx";
import { TypeParameterConstraints } from "../type-parameters/type-parameter-constraints.jsx";
import { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { TypeParameters } from "../type-parameters/type-parameters.jsx";

/** Method modifiers. Can only be one. */
export interface InterfaceMethodModifiers {
  readonly new?: boolean;
}

const getMethodModifier = makeModifiers<InterfaceMethodModifiers>(["new"]);

// properties for creating a method
export interface InterfaceMethodProps
  extends AccessModifiers,
    InterfaceMethodModifiers {
  name: string;
  refkey?: Refkey;
  children?: Children;
  parameters?: Array<ParameterProps>;
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
  returns?: Children;

  /** Doc comment */
  doc?: Children;

  /**
   * Define attributes to attach
   * @example
   * ```tsx
   * <InterfaceMethod name="MyMethod" attributes={[
   *  <Attribute name="Test" />
   *  <Attribute name="Test2" args={["arg1", "arg2"]} />
   * ]} />
   * ```
   * This will produce:
   * ```csharp
   * [Test]
   * [Test2("arg1", "arg2")]
   * void MyMethod();
   * ```
   */
  attributes?: AttributesProp;
}

// a C# interface method
export function InterfaceMethod(props: InterfaceMethodProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-method");
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "interface-decl") {
    throw new Error(
      "can't define an interface method outside of an interface scope",
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

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getMethodModifier(props),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={methodSymbol}>
      <Scope value={methodScope}>
        <DocWhen doc={props.doc} />
        <AttributeList attributes={props.attributes} endline />
        {modifiers}
        {props.returns ?? "void"} {name}
        {props.typeParameters && (
          <TypeParameters parameters={props.typeParameters} />
        )}
        <Parameters parameters={props.parameters} />
        {props.typeParameters && (
          <TypeParameterConstraints parameters={props.typeParameters} />
        )}
        {props.children ?
          <Block newline>{props.children}</Block>
        : ";"}
      </Scope>
    </MemberDeclaration>
  );
}
