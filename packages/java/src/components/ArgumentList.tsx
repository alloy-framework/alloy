import { Children, For, Indent } from "@alloy-js/core";

export interface ArgumentListProps {
  args?: Children[];
}

export function ArgumentList(props: ArgumentListProps) {
  if (!props.args || props.args.length === 0) {
    return "";
  }

  return (
    <group>
      (
      <Indent break="soft" trailingBreak>
        <For each={props.args} comma line>
          {(value) => value}
        </For>
      </Indent>
      )
    </group>
  );
}
