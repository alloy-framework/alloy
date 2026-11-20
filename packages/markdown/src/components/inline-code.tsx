import type { Children } from "@alloy-js/core";

import { useTableContext } from "../context/table.js";

export interface InlineCodeProps {
  /**
   * Direct strings are escaped automatically. JSX and other non-string
   * children are wrapped in single backticks unchanged; callers own escaping.
   */
  children?: Children;
}

/**
 * Render a Markdown code span. Direct strings use adaptive delimiters and
 * padding, with each CRLF, CR, or LF replaced by one space.
 * Empty strings and omitted content use inline HTML.
 * Direct string pipes are escaped inside table cells and left literal elsewhere.
 */
export function InlineCode(props: InlineCodeProps) {
  const inTable = useTableContext();
  return () => {
    const content = props.children ?? "";
    return typeof content === "string" ? (
      inlineCode(inTable ? content.replace(/\|/g, "\\|") : content)
    ) : (
      <>
        {"`"}
        {content}
        {"`"}
      </>
    );
  };
}

function inlineCode(content: string): string {
  const text = content.replace(/\r\n|\r|\n/g, " ");
  // CommonMark has no empty code-span syntax.
  if (text.length === 0) return "<code></code>";

  let delimiterLength = 1;
  for (const match of text.matchAll(/`+/g)) {
    delimiterLength = Math.max(delimiterLength, match[0].length + 1);
  }
  const delimiter = "`".repeat(delimiterLength);
  const needsPadding =
    text.startsWith("`") ||
    text.endsWith("`") ||
    (text.startsWith(" ") && text.endsWith(" ") && /[^ ]/.test(text));
  const padding = needsPadding ? " " : "";
  return delimiter + padding + text + padding + delimiter;
}
