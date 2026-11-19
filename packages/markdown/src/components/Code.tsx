import { TextTransform } from "@alloy-js/core";
import type { Children } from "@alloy-js/core/jsx-runtime";

export interface CodeProps {
  /**
   * Optional Markdown info string (language followed by optional metadata).
   * Must be a single line. Backticks are supported by using tilde fences.
   */
  lang?: string;

  /** Body of the code block */
  children?: Children;
}

/**
 * Render a Markdown code block with a fence longer than any matching run in
 * the rendered body. String and JSX children are supported.
 */
export function Code(props: CodeProps) {
  return (
    <TextTransform
      transform={(body) => {
        const info = props.lang ?? "";
        if (/[\r\n]/.test(info)) {
          throw new Error(
            "Code lang must be a single-line Markdown info string.",
          );
        }
        const marker = info.includes("`") ? "~" : "`";
        const runs = body.match(marker === "`" ? /`+/g : /~+/g) ?? [];
        const length = runs.reduce(
          (length, run) => Math.max(length, run.length + 1),
          3,
        );
        const fence = marker.repeat(length);
        return `${fence}${info.trim()}\n${body}\n${fence}`;
      }}
    >
      {props.children}
    </TextTransform>
  );
}
