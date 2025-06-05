import { Children, For, Indent } from "@alloy-js/core";

export interface ArgumentListProps {
  args?: Children[];
  omitParensWhenEmpty?: boolean;
}

/**
 * A list of arguments to be passed to a function, constructor, and so forth.
 * Includes parenthesis when arguments are passed, otherwise returns an
 * empty string.
 */
export function ArgumentList(props: ArgumentListProps) {
  if (props.omitParensWhenEmpty && (!props.args || props.args.length === 0)) {
    return "";
  }

  return (
    <group>
      (
      <Indent softline trailingBreak>
        <For each={props.args ?? []} comma line>
          {(value) => value}
        </For>
      </Indent>
      )
    </group>
  );
}
