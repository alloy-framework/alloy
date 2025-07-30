import {
  Block,
  Declaration,
  Name,
  Refkey,
  refkey,
  Scope,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { CSharpOutputSymbol } from "../../symbols/csharp-output-symbol.js";
import {
  CSharpMemberScope,
  useCSharpMemberScope,
} from "../../symbols/scopes.js";
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
  const scope = useCSharpMemberScope(["class-decl", "struct-decl"]);

  const name = useCSharpNamePolicy().getName(scope.owner!.name, "class-method");
  const ctorSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? refkey(name),
  });

  const ctorDeclScope = new CSharpMemberScope("constructor-decl", {
    owner: ctorSymbol,
  });

  const modifiers = computeModifiersPrefix([getAccessModifier(props)]);

  return (
    <Declaration symbol={ctorSymbol}>
      <Scope value={ctorDeclScope}>
        {modifiers}
        <Name />
        <Parameters parameters={props.parameters} />
        <Block newline>{props.children}</Block>
      </Scope>
    </Declaration>
  );
}
