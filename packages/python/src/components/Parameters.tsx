import { Children, List } from "@alloy-js/core";
import { Declaration } from "./Declaration.js";
import { Variable } from "./Variable.js";

export interface NamedParameter {
  name: string;
  type?: Children;
  defaultValue?: Children;
}

/**
 * Render a single parameter as a Declaration (for symbol creation) or as *args/**kwargs.
 */
function Parameter(param: NamedParameter) {
  // Use Variable to render the parameter, wrapped in Declaration for symbol creation
  return (
    <Declaration name={param.name}>
      <Variable
        name={param.name}
        type={param.type}
        value={param.defaultValue}
        omitNone={true}
      />
    </Declaration>
  );
}

export interface ParametersProps {
  parameters?: NamedParameter[];
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
    if (param.defaultValue) seenDefault = true;
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
