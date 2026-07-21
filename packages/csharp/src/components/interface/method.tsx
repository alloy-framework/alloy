import type { Children, Namekey, Refkey } from "@alloy-js/core";
import { Block, MemberDeclaration, MemberName, Scope } from "@alloy-js/core";

import type { AccessModifiers } from "../../modifiers.js";
import {
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { createMethodScope } from "../../scopes/factories.js";
import { createMethodSymbol } from "../../symbols/factories.js";
import type { AttributesProp } from "../attributes/attributes.jsx";
import { AttributeList } from "../attributes/attributes.jsx";
import { DocWhen } from "../doc/comment.jsx";
import type { ParameterProps } from "../parameters/parameters.jsx";
import { Parameters } from "../parameters/parameters.jsx";
import { TypeParameterConstraints } from "../type-parameters/type-parameter-constraints.jsx";
import type { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { TypeParameters } from "../type-parameters/type-parameters.jsx";

/** Method modifiers. Can only be one. */
export interface InterfaceMethodModifiers {
  readonly new?: boolean;
}

const getMethodModifier = makeModifiers<InterfaceMethodModifiers>(["new"]);

// properties for creating a method
export interface InterfaceMethodProps
  extends AccessModifiers, InterfaceMethodModifiers {
  name: string | Namekey;
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
  const methodSymbol = createMethodSymbol(props.name, {
    refkeys: props.refkey,
  });

  const methodScope = createMethodScope();

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
        {props.returns ?? "void"} <MemberName />
        {props.typeParameters && (
          <TypeParameters parameters={props.typeParameters} />
        )}
        <Parameters parameters={props.parameters} />
        {props.typeParameters && (
          <TypeParameterConstraints parameters={props.typeParameters} />
        )}
        {props.children ? <Block newline>{props.children}</Block> : ";"}
      </Scope>
    </MemberDeclaration>
  );
}
