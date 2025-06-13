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
  getMethodModifier,
  MethodModifiers,
} from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { ParameterProps, Parameters } from "./Parameters.jsx";

// properties for creating a method
export interface ClassMethodProps extends AccessModifiers, MethodModifiers {
  name: string;
  refkey?: Refkey;
  children?: Children;
  parameters?: Array<ParameterProps>;
  returns?: Children;

  /**
   * If true, the method will be declared as an async method.
   */
  async?: boolean;
}

// a C# class method
export function ClassMethod(props: ClassMethodProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-method");
  const scope = useCSharpScope();
  if (scope.kind !== "member" || scope.name !== "class-decl") {
    throw new Error("can't define a class method outside of a class scope");
  }

  const methodSymbol = new CSharpOutputSymbol(name, {
    scope,
    refkeys: props.refkey ?? refkey(props.name),
  });

  // scope for method declaration
  const methodScope = new CSharpMemberScope("method-decl", {
    owner: methodSymbol,
  });

  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";
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
        {modifiers}
        {returns} {name}({params})
        {props.abstract ? ";" : <Block newline>{props.children}</Block>}
      </Scope>
    </MemberDeclaration>
  );
}
