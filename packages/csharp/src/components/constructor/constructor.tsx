import { MethodScope } from "#components/method-scope.jsx";
import { Block, MemberDeclaration, MemberName, Refkey } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
} from "../../modifiers.js";
import { useNamedTypeScope } from "../../scopes/contexts.js";
import { MethodSymbol } from "../../symbols/method.js";
import { ParameterProps, Parameters } from "../parameters/parameters.jsx";

/**
 * Properties for {@link Constructor} component.
 */
export interface ConstructorProps extends AccessModifiers {
  /** Constructor parameters */
  parameters?: ParameterProps[];

  /** Refkey */
  refkey?: Refkey;

  /** Constructor body */
  children?: Children;
}

export function Constructor(props: ConstructorProps) {
  const scope = useNamedTypeScope();

  const name = scope.ownerSymbol.name;

  const ctorSymbol = new MethodSymbol(name, scope.members, "constructor", {
    refkeys: props.refkey,
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  return (
    <MemberDeclaration symbol={ctorSymbol}>
      <MethodScope>
        {modifiers}
        <MemberName />
        <Parameters parameters={props.parameters} />
        <Block newline>{props.children}</Block>
      </MethodScope>
    </MemberDeclaration>
  );
}
