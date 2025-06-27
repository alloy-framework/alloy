import { Children, code, For, Indent } from "@alloy-js/core";
import { TypeParameterProps } from "./type-parameter.jsx";
import { normalizeParameters } from "./type-parameters.jsx";

export interface TypeParameterConstraintsProps {
  /** Parameters */
  parameters: (TypeParameterProps | string)[];
}

export function TypeParameterConstraints(
  props: TypeParameterConstraintsProps,
): Children {
  const parameters = normalizeParameters(props.parameters);
  if (!parameters.some((x) => x.constraints)) {
    return null;
  }
  return (
    <group>
      <Indent line>
        <For each={parameters} hardline>
          {(param) => <TypeParameterConstraint {...param} />}
        </For>
      </Indent>
    </group>
  );
}

function TypeParameterConstraint(props: TypeParameterProps): Children {
  const constraints = arrayify(props.constraints);
  return (
    <>
      where {code`${props.name} : `}
      <group>
        <Indent softline>
          <For each={constraints} comma line>
            {(constraint) => code`${constraint}`}
          </For>
        </Indent>
      </group>
    </>
  );
}

function arrayify<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
