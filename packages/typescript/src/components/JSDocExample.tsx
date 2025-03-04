import { Show } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface JSDocExampleProps {
  fenced?: boolean;
  language?: string;
  children: Children;
}

/**
 * Create a JSDoc example set off with `@example`. When the `fenced` prop is true, a `language` prop can
 * also be set.
 */
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
