import { Children, For, Indent } from "@alloy-js/core";
import { DocWhen } from "../doc/doc-comment.jsx";

export interface ParameterDescriptor {
  name: string;
  type: Children;
  optional?: boolean;
  /** Doc comment rendered as `/** ... *\/` above the parameter. */
  doc?: Children;
  /** Directives (`#suppress`, `#deprecated`) to apply to the parameter. */
  directives?: Children;
  /** Decorators to apply to the parameter. */
  decorators?: Children;
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
                  <DocWhen doc={param.doc} />
                  {param.directives}
                  {param.decorators}
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
