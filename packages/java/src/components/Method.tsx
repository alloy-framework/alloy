import { Children, code } from "@alloy-js/core";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { Parameters } from "./Parameters.js";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectGenerics, GenericTypes } from "../generics.js";

export interface MethodProps extends ObjectModifiers, GenericTypes {
  name: string;
  return?: Children;
  parameters?: Record<string, Children>;
  children?: Children;
}

export function Method(props: MethodProps) {
  const params = <Parameters parameters={props.parameters}></Parameters>;
  const name = useJavaNamePolicy().getName(props.name, "method");
  const modifiers = collectModifiers(props);
  const generics = props.generics ?
    code`${collectGenerics(props.generics)}${" "}`
  : "";
  const sBody = props.children !== undefined ?
    code`
    ${" "}{
      ${props.children}
    }
  `
  : ";";
  return code`
        ${modifiers}${generics}${props.return ?? "void"} ${name}(${params})${sBody}
    `;
}
