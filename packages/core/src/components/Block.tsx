import { Children, childrenArray, computed, Indent } from "@alloy-js/core";

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
   * prior to the block.
   */
  newline?: boolean;

  /** The block's contents */
  children?: Children;
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
      {props.newline && <br />}
      {props.opener ?? "{"}
      <Indent softline={childCount.value === 0} trailingBreak>
        {props.children}
      </Indent>
      {props.closer ?? "}"}
    </group>
  );
}
