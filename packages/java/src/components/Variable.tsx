import type { Children, Namekey } from "@alloy-js/core";
import { code } from "@alloy-js/core";

import { useJavaNamePolicy } from "../name-policy.js";
import type { ModifierProps } from "./Modifiers.jsx";
import { Modifiers } from "./Modifiers.jsx";

export interface VariableProps extends ModifierProps {
  type: Children;
  name: string | Namekey;
  value?: Children;
}

export function Variable(props: VariableProps) {
  const name = useJavaNamePolicy().getName(
    typeof props.name === "string" ? props.name : props.name.name,
    "variable",
  );
  const modifiers = <Modifiers {...props} />;

  return code`${modifiers}${props.type} ${name}${props.value ? code` = ${props.value}` : ""}`;
}
