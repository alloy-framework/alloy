import { List, childrenArray, type Children } from "@alloy-js/core";

export interface BlockCommentProps {
  children: Children;
}

/**
 * A Go block comment. In go, line comments are the norm, so consider
 * using {@link LineComment} instead. The children of this component
 * are joined with two hard linebreaks. This is useful for creating
 * block comments with multiple paragraphs.
 */
export function BlockComment(props: BlockCommentProps) {
  return (
    <>
      /*
      <hbr />
      <List doubleHardline>{childrenArray(() => props.children)}</List>
      <hbr />
      */
    </>
  );
}

export interface LineCommentProps {
  children: Children;
}

/**
 * A Go line comment block. The children of this component
 * are joined with two hard linebreaks. This is useful for creating
 * line comments with multiple paragraphs.
 */
export function LineComment(props: LineCommentProps) {
  return (
    <>
      // <align string="// ">{props.children}</align>
    </>
  );
}
