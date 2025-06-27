import { Block, Children, MemberDeclaration, Refkey } from "@alloy-js/core";
import {
  AccessModifiers,
  computeModifiersPrefix,
  getAccessModifier,
  makeModifiers,
} from "../../modifiers.js";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { MethodSymbol } from "../../symbols/method.js";
import { useNamedTypeScope } from "../../symbols/named-type.js";
import { ParameterProps, Parameters } from "../Parameters.jsx";
import { DocWhen } from "../doc/comment.jsx";
import { MethodScope } from "../method-scope.jsx";

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
  returns?: Children;

  /** Doc comment */
  doc?: Children;
}

// a C# interface method
export function InterfaceMethod(props: InterfaceMethodProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-method");
  const ownerSymbol = useNamedTypeScope();

  if (ownerSymbol.typeKind !== "interface") {
    throw new Error(
      "can't define an interface method outside of an interface scope",
    );
  }

  const methodSymbol = new MethodSymbol(name, ownerSymbol.members, "method", {
    refkeys: props.refkey,
  });

  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getMethodModifier(props),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration symbol={methodSymbol}>
      <MethodScope>
        <DocWhen doc={props.doc} />
        {modifiers}
        {props.returns ?? "void"} {name}({params})
        {props.children ?
          <Block newline>{props.children}</Block>
        : ";"}
      </MethodScope>
    </MemberDeclaration>
  );
}
