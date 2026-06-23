import { Children, For, Indent } from "@alloy-js/core";

export interface ParameterDescriptor {
  name: string;
  type: Children;
  optional?: boolean;
}

export interface SpreadParameterDescriptor {
  spread: Children;
}

export type ParameterEntry = ParameterDescriptor | SpreadParameterDescriptor;

export function Parameters(props: { parameters?: ParameterEntry[] }) {
  return (
    <group>
      (
      {props.parameters && props.parameters.length > 0 && (
        <Indent softline trailingBreak>
          <For each={props.parameters} comma line>
            {(param) =>
              isSpread(param) ?
                <>...{param.spread}</>
              : <>
                  {param.name}
                  {param.optional ? "?" : ""}: {param.type}
                </>
            }
          </For>
        </Indent>
      )}
      )
    </group>
  );
}

function isSpread(param: ParameterEntry): param is SpreadParameterDescriptor {
  return "spread" in param;
}
