import { TextTransform, type Children } from "@alloy-js/core";

export interface InlineCodeProps {
  /** Content rendered as literal code-span text, not Markdown markup. */
  children?: Children;
}

/**
 * Render a Markdown code span, choosing delimiters and padding to preserve its
 * text. Each CRLF, CR, or LF becomes one space. Empty content uses inline HTML.
 * Pipes are left literal for table renderers to escape in complete cell output.
 */
export function InlineCode(props: InlineCodeProps) {
  return <TextTransform transform={inlineCode}>{props.children}</TextTransform>;
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
