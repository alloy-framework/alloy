import { Children, mapJoin } from "@alloy-js/core";

export interface ParametersProps {
  parameters?: Record<string, Children>; // Map parameter name to type
}

/**
 * Render a set of parameters for a method or constructor
 *
 * @param props - Takes record of parameter name to type
 */
export function Parameters(props: ParametersProps) {
  const { parameters = {} } = props;
  return mapJoin(
    () => Object.entries(parameters),
    ([name, type]) => {
      return [type, " ", name];
    },
    { joiner: ", " },
  );
}
