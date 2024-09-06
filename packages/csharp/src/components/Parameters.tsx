import * as core from "@alloy-js/core";
import * as csharp from "../index.js";

export interface ParametersProps {
  // param name and type
  parameters: Record<string, core.Child>;
}

// param names and type
export function Parameters(props: ParametersProps): Array<core.Child | string> {
  return core.mapJoin(
    new Map(Object.entries(props.parameters)),
    (name, type) => {
      return [
        type,
        " ",
        csharp.useCSharpNamePolicy().getName(name, "parameter"),
      ];
    },
    { joiner: ", " },
  );
}
