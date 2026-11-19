import type { Children } from "../runtime/component.js";

export interface TextTransformProps {
  /**
   * Transform the formatted child text. Called once per print, not during
   * component rendering. Must be pure.
   */
  transform: (text: string) => string;

  /** Content to format and transform. */
  children?: Children;
}

/**
 * Transform rendered text without rendering child components a second time.
 *
 * Children retain their context, references, and reactive bindings. Their
 * layout is formatted independently using the current file's print options;
 * the transformed text then participates in the surrounding layout.
 *
 * This component counts as content even when its children or result are empty.
 */
export function TextTransform(props: TextTransformProps) {
  return (
    <textTransform transform={props.transform}>{props.children}</textTransform>
  );
}
