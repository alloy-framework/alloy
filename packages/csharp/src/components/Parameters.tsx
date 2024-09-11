import * as core from "@alloy-js/core";
import { useCSharpNamePolicy } from "../name-policy.js";

export interface ParametersProps {
  // param name and type
  parameters: Record<string, core.Child>;
}

// param names and type
export function Parameters(props: ParametersProps): Array<core.Child | string> {
  return core.mapJoin(
    new Map(Object.entries(props.parameters)),
    (name, type) => {
      return [type, " ", useCSharpNamePolicy().getName(name, "parameter")];
    },
    { joiner: ", " },
  );
}
