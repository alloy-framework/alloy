import {
  Block,
  Children,
  MemberDeclaration,
  refkey,
  Refkey,
  Scope,
} from "@alloy-js/core";
import {
  AccessModifier,
  computeModifiersPrefix,
  getAccessModifier,
  getAsyncModifier,
  getMethodModifier,
  MethodModifier,
} from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { ParameterProps, Parameters } from "./Parameters.jsx";

// properties for creating a method
export interface ClassMethodProps {
  name: string;
  refkey?: Refkey;
  children?: Children;
  accessModifier?: AccessModifier;
  methodModifier?: MethodModifier;
  parameters?: Array<ParameterProps>;
  returns?: Children;

  /**
   * If true, the method will be declared as an async method.
   * If the method has a return type, it will be wrapped in a `Task` automatically.
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
  const returns =
    props.async ?
      props.returns && props.returns !== "void" ?
        `Task<${props.returns}>`
      : "Task"
    : (props.returns ?? "void");

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props.accessModifier),
    getMethodModifier(props.methodModifier),
    getAsyncModifier(props.async),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={methodSymbol}>
      <Scope value={methodScope}>
        {modifiers}
        {returns} {name}({params})
        {props.methodModifier === "abstract" ?
          ";"
        : <Block newline>{props.children}</Block>}
      </Scope>
    </MemberDeclaration>
  );
}
