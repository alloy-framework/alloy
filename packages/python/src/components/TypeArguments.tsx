import { Children, For } from "@alloy-js/core";

export interface TypeArgumentsProps {
  args: Children[];
}

/**
 * Render Python-style type arguments, e.g. [T, P].
 */
export function TypeArguments(props: TypeArgumentsProps) {
  if (!props.args || props.args.length === 0) {
    return undefined;
  }

  return (
    <>
      [
      <For each={props.args} joiner=", ">
        {(arg) => arg}
      </For>
      ]
    </>
  );
}
