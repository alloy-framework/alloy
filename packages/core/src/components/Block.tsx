import { computed } from "@vue/reactivity";
import { createContentSlot } from "../content-slot.jsx";
import type { Children } from "../runtime/component.js";
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
  const ContentSlot = createContentSlot();
  const leadingNewline = computed(() => {
    if (!props.newline) return false;

    // When inline, we want a newline only when content breaks, otherwise a nothing..
    if (props.inline) return <sbr />;

    // When not inline, we want a hardline when the slot has contents otherwise a space.
    if (ContentSlot.hasContent) return <hbr />;

    return " ";
  });
  return (
    <group>
      {leadingNewline}
      {props.opener ?? "{"}
      <Indent
        hardline={!props.inline && ContentSlot.hasContent}
        line={props.inline && ContentSlot.hasContent}
        softline={!props.inline || ContentSlot.isEmpty}
        trailingBreak
      >
        <ContentSlot>{props.children}</ContentSlot>
      </Indent>
      {props.closer ?? "}"}
    </group>
  );
}
