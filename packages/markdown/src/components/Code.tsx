import { List } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface CodeProps {
  /** Language of the code block */
  lang?: string;

  /** Content of the codeblock, use instead of children. */
  content?: string;
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
      {props.content ?? <List children={props.children} />}
      {tripleBackticks}
    </List>
  );
}
