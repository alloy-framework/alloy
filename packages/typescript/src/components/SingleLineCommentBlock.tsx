import { Prose, type Children } from "@alloy-js/core";

export interface SingleLineCommentBlockProps {
  children: Children;
}

/**
 * A single line comment block. The children are rendered as a prose element, which means that they
 * are broken into multiple lines
 */
export function SingleLineCommentBlock(props: SingleLineCommentBlockProps) {
  return (
    <>
      //{" "}
      <align string="// ">
        <Prose>{props.children}</Prose>
      </align>
    </>
  );
}
