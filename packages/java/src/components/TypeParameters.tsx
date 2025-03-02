import { Children, For, Indent, Show } from "@alloy-js/core";

export interface TypeParametersProps {
  generics?: Record<string, Children>;
}

/**
 * Render a set of generic types for a method or class.
 */
export function TypeParameters(props: TypeParametersProps) {
  return (
    <>
      <Show when={!props.generics || Object.keys(props.generics).length === 0}>
        {undefined}
      </Show>
      <Show when={props.generics && Object.keys(props.generics).length > 0}>
        <group>
          {"<"}
          <Indent break="soft" trailingBreak>
            <For each={Object.entries(props.generics!)} comma line>
              {([name, constraint]) => (
                <>
                  {name}
                  {constraint && <> extends {constraint}</>}
                </>
              )}
            </For>
          </Indent>
          {">"}
        </group>
      </Show>
    </>
  );
}
