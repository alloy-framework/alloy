import { List } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface CodeProps {
  /** Language of the code block */
  lang?: string;

  /** Body of the code block */
  children?: Children;
}

/**
 * Render a Markdown code block
 */
export function Code(props: CodeProps) {
  const tripleBackticks = "```";
  return (
    <List>
      {tripleBackticks + props.lang}
      {props.children}
      {tripleBackticks}
    </List>
  );
}
