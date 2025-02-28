import { Show } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface JSDocExampleProps {
  fenced?: boolean;
  language?: string;
  children: Children;
}

export function JSDocExample(props: JSDocExampleProps) {
  return (
    <>
      @example
      <hbr />
      <Show when={props.fenced}>
        ```{props.language}
        <hbr />
      </Show>
      {props.children}
      <Show when={props.fenced}>
        <hbr />
        ```
      </Show>
    </>
  );
}
