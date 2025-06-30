import { Children, List } from "@alloy-js/core";
import type { ParameterDescriptor } from "../parameter-descriptor.js";
import { VariableDeclaration } from "./VariableDeclaration.js";

/**
 * Render a single parameter as a VariableDeclaration (for symbol creation) or as *args/**kwargs.
 */
function Parameter(param: ParameterDescriptor) {
  return (
    <VariableDeclaration
      name={param.name}
      type={param.type}
      initializer={param.default}
      omitNone={true}
    />
  );
}

export interface ParametersProps {
  parameters?: ParameterDescriptor[];
  args?: boolean;
  kwargs?: boolean;
}

/**
 * Render a set of parameters for a Python method or function, enforcing Python rules.
 */
export function Parameters(props: ParametersProps) {
  const { parameters = [], args, kwargs } = props;

  // Validation: non-default args can't follow default args
  let seenDefault = false;
  for (const param of parameters) {
    if (param.default) seenDefault = true;
    else if (seenDefault) {
      throw new Error(
        `Non-default argument '${param.name}' follows default argument in Python parameters.`,
      );
    }
  }

  // Render
  // Build a flat array of all parameter elements (named, *args, **kwargs)
  const allParams = [
    ...parameters.map((param) => <Parameter {...param} />),
    ...(args ? ["*args"] : []),
    ...(kwargs ? ["**kwargs"] : []),
  ];

  return (
    <List comma space>
      {allParams}
    </List>
  );
}
