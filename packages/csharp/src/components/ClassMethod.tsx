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
} from "../modifiers.js";
import { useCSharpNamePolicy } from "../name-policy.js";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";
import { CSharpMemberScope, useCSharpScope } from "../symbols/scopes.js";
import { DocWhen } from "./doc/comment.jsx";
import { ParameterProps, Parameters } from "./parameters/parameters.jsx";
import { TypeParameterConstraints } from "./type-parameters/type-parameter-constraints.jsx";
import { TypeParameterProps } from "./type-parameters/type-parameter.jsx";
import { TypeParameters } from "./type-parameters/type-parameters.jsx";

/** Method modifiers. Can only be one. */
export interface ClassMethodModifiers {
  readonly abstract?: boolean;
  readonly sealed?: boolean;
  readonly static?: boolean;
  readonly virtual?: boolean;
}

const getMethodModifier = makeModifiers<ClassMethodModifiers>([
  "abstract",
  "sealed",
  "static",
  "virtual",
]);

// properties for creating a method
export interface ClassMethodProps
  extends AccessModifiers,
    ClassMethodModifiers {
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
        <DocWhen doc={props.doc} />
        {modifiers}
        {returns} {name}
        {props.typeParameters && (
          <TypeParameters parameters={props.typeParameters} />
        )}
        ({params})
        {props.typeParameters && (
          <TypeParameterConstraints parameters={props.typeParameters} />
        )}
        {props.abstract ? ";" : <Block newline>{props.children}</Block>}
      </Scope>
    </MemberDeclaration>
  );
}
