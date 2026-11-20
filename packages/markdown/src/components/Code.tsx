import { computed, List, memo } from "@alloy-js/core";
import type { Children } from "@alloy-js/core/jsx-runtime";

export interface CodeProps {
  /**
   * Optional Markdown info string (language followed by optional metadata).
   * Must be a single line. Backticks are supported by using tilde fences.
   */
  lang?: string;

  /**
   * Body of the code block. Direct strings determine the fence length.
   * JSX children render unchanged and must not contain closing fences.
   */
  children?: Children;
}

/**
 * Render a Markdown code block. Direct string bodies use content-safe fences.
 * JSX children render normally without being inspected for fence conflicts.
 */
export function Code(props: CodeProps) {
  const body = memo(() => props.children);
  const info = computed(() => {
    const info = props.lang ?? "";
    if (/[\r\n]/.test(info)) {
      throw new Error("Code lang must be a single-line Markdown info string.");
    }
    return info.trim();
  });
  const fence = computed(() => {
    const marker = info.value.includes("`") ? "~" : "`";
    const content = body();
    const runs =
      typeof content === "string"
        ? (content.match(marker === "`" ? /`+/g : /~+/g) ?? [])
        : [];
    const length = runs.reduce(
      (length, run) => Math.max(length, run.length + 1),
      3,
    );
    return marker.repeat(length);
  });
  return (
    <List>
      {fence.value + info.value}
      {body()}
      {fence.value}
    </List>
  );
}
