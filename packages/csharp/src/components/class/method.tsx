import { Block, Children, MemberDeclaration, Refkey } from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  getAsyncModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { nonAccessibilityFromProps } from "../../symbols/csharp.js";
import { MethodSymbol } from "../../symbols/method.js";
import { useNamedTypeScope } from "../../symbols/named-type.js";
import { ParameterProps, Parameters } from "../Parameters.jsx";
import { DocWhen } from "../doc/comment.jsx";
import { MethodScope } from "../method-scope.jsx";

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
}

// a C# class method
export function ClassMethod(props: ClassMethodProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-method");
  const cls = useNamedTypeScope();

  const methodSymbol = new MethodSymbol(name, cls.members, "method", {
    refkeys: props.refkey,
    ...nonAccessibilityFromProps(props),
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
      <MethodScope>
        <DocWhen doc={props.doc} />
        {modifiers}
        {returns} {name}({params})
        {props.abstract ? ";" : <Block newline>{props.children}</Block>}
      </MethodScope>
    </MemberDeclaration>
  );
}
