import { Children, code } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import {
  AccessModifier,
  collectAccessModifier,
  collectModifiers,
  ObjectModifiers,
} from "../object-modifiers.js";
import { Parameters } from "./Parameters.js";

export interface MethodProps extends ObjectModifiers {
  accessModifier?: AccessModifier;
  name: string;
  return?: Children;
  parameters?: Record<string, Children>;
  children?: Children;
}

export function Method(props: MethodProps) {
  const params = <Parameters parameters={props.parameters}></Parameters>;
  const name = useJavaNamePolicy().getName(props.name, "method");
  const modifiers = collectModifiers(props);
  const sBody = props.children !== undefined ?
    code`
    ${" "}{
      ${props.children}
    }
  `
  : ";";
  return code`
        ${collectAccessModifier(props.accessModifier)}${modifiers}${props.return ?? "void"} ${name}(${params})${sBody}
    `;
}
