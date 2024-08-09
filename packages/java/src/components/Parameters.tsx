import { Child } from "@alloy-js/core";

export interface ParametersProps {
  parameters?: Record<string, Child>; // Map parameter name to type
}

export function Parameters(props: ParametersProps) {
  const { parameters = {} } = props;
  return Object.entries(parameters)
    .map(([name, type]) => `${type} ${name}`)
    .join(", ");
};