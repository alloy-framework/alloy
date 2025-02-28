import { Children } from "@alloy-js/core/jsx-runtime";

export interface JSDocCommentProps {
  children: Children;
}

export function JSDocComment(props: JSDocCommentProps) {
  return (
    <>
      /**
      <align string=" * ">
        <hbr />
        {props.children}
      </align>
      <hbr /> **/
    </>
  );
}
