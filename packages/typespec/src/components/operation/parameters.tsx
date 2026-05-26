import { Children, For, Indent } from "@alloy-js/core";

export interface ParameterDescriptor {
  name: string;
  type: Children;
  optional?: boolean;
}

export function Parameters(props: { parameters?: ParameterDescriptor[] }) {
  return (
    <group>
      (
      {props.parameters && props.parameters.length > 0 && (
        <Indent softline trailingBreak>
          <For each={props.parameters} comma line>
            {(param) => (
              <>
                {param.name}
                {param.optional ? "?" : ""}: {param.type}
              </>
            )}
          </For>
        </Indent>
      )}
      )
    </group>
  );
}
