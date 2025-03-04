import { Children, code } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Parameters } from "./Parameters.js";
import { TypeParameters, TypeParametersProps } from "./TypeParameters.jsx";

export interface MethodProps extends ModifierProps, TypeParametersProps {
  name: string;
  return?: Children;
  throws?: Children;
  parameters?: Record<string, Children>;
  children?: Children;
}

export function Method(props: MethodProps) {
  const params = <Parameters parameters={props.parameters}></Parameters>;
  const name = useJavaNamePolicy().getName(props.name, "method");
  const modifiers = <Modifiers {...props} />;
  const throwsClause = props.throws ? code` throws ${props.throws}` : "";
  const generics =
    props.generics ?
      code`${(<TypeParameters generics={props.generics} />)}${" "}`
    : "";
  const sBody =
    props.children !== undefined ?
      code`
    ${" "}{
      ${props.children}
    }
  `
    : ";";
  return code`
        ${modifiers}${generics}${props.return ?? "void"} ${name}(${params})${throwsClause}${sBody}
    `;
}
