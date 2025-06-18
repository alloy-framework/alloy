import { computed } from "@vue/reactivity";
import type { Children } from "../runtime/component.js";
import { childrenArray } from "../utils.jsx";
import { Indent } from "./Indent.jsx";

export interface BlockProps {
  /**
   * The opening punctuation of the block. Defaults to "\{".
   */
  opener?: string;

  /**
   * The closing punctuation of the block. Defaults to "\}".
   */
  closer?: string;

  /**
   * Whether the block starts on a new line. When true, a hardline is added
   * prior to the block. If `inline` is true, this will only apply if the block is also split due to breaking.
   */
  newline?: boolean;

  /** The block's contents */
  children?: Children;

  /** If true the block will not indent the content into new lines */
  inline?: boolean;
}

/**
 * Create an indented block of source text. The block has `opener` text which is
 * added prior to the block, which defaults to `"{"`, and `closer` text which is
 * added after the block, which defaults to `"}"`.
 */
export function Block(props: BlockProps) {
  const childCount = computed(() => childrenArray(() => props.children).length);
  return (
    <group>
      {props.newline && (props.inline ? <softline /> : <br />)}
      {props.opener ?? "{"}
      <Indent
        line={props.inline && childCount.value > 0}
        softline={childCount.value === 0}
        trailingBreak
      >
        {props.children}
      </Indent>
      {props.closer ?? "}"}
    </group>
  );
}
