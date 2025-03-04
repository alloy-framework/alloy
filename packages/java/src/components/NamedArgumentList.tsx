import { For, Indent } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface NamedArgumentListProps {
  args: Record<string, Children>;
}

/**
 * Collect a set of named arguments. Will pass to object as named arguments.
 *
 * @param args -  of name to argument value
 */
export function NamedArgumentList(props: NamedArgumentListProps) {
  return (
    <group>
      (
      <Indent break="soft">
        <For each={Object.entries(props.args)} comma line>
          {([key, value]) => {
            return (
              <>
                {key} = {value}
              </>
            );
          }}
        </For>
      </Indent>
      <sbr />)
    </group>
  );
}
