import { Children } from "@alloy-js/core/jsx-runtime";

export interface JSDocCommentProps {
  children: Children;
}

/**
 * A JSDoc comment block. This is a low-level component that merely creates the
 * block. Consider using {@link JSDoc} if you want to create more complex
 * comments.
 */
export function JSDocComment(props: JSDocCommentProps) {
  return (
    <>
      /**
      <align string=" * ">
        <hbr />
        {props.children}
      </align>
      <hbr /> */
    </>
  );
}
