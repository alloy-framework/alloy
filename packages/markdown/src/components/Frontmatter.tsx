import { List } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { stringify } from "yaml";

export interface FrontmatterProps {
  /** Js value to automatically serialize as yaml */
  jsValue?: Record<string, unknown>;
  children?: Children;
}

/**
 * Create a frontmatter block for markdown files.
 *
 * @example
 *
 * ```markdown
 * ---
 * title: "My Title"
 * ---
 * ```
 */
export function Frontmatter(props: FrontmatterProps) {
  return (
    <List>
      {"---"}
      {props.jsValue ?
        stringify(props.jsValue).trim()
      : <List children={props.children} />}
      {"---"}
    </List>
  );
}
