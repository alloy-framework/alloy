import {
  Block,
  Children,
  MemberDeclaration,
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
import { ParameterProps, Parameters } from "../Parameters.jsx";

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
}

// a C# interface method
export function InterfaceMethod(props: InterfaceMethodProps) {
  const name = useCSharpNamePolicy().getName(props.name, "class-method");
  // const scope = useCSharpScope();
  // if (scope.kind !== "member" || scope.name !== "interface-decl") {
  //   throw new Error(
  //     `can't define an interface method outside of an interface scope it was: ${scope.kind}, ${scope.name}`,
  //   );
  // }

  const params =
    props.parameters ? <Parameters parameters={props.parameters} /> : "";

  const modifiers = computeModifiersPrefix([
    getAccessModifier(props),
    getMethodModifier(props),
  ]);
  // note that scope wraps the method decl so that the params get the correct scope
  return (
    <MemberDeclaration {...props}>
      <Scope name={props.name} kind="method-decl">
        {modifiers}
        {props.returns ?? "void"} {name}({params})
        {props.children ?
          <Block newline>{props.children}</Block>
        : ";"}
      </Scope>
    </MemberDeclaration>
  );
}
