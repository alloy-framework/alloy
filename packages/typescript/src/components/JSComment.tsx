import { Children } from "@alloy-js/core/jsx-runtime";
import { Prose } from "./Prose.jsx";

export interface JSCommentProps {
  children: Children;
}

/**
 * A JS Comment. The children are rendered as a prose element, which means that they
 * are broken into multiple lines
 */
export function JSComment(props: JSCommentProps) {
  return (
    <>
      //{" "}
      <align string="// ">
        <Prose>{props.children}</Prose>
      </align>
      <hbr />
    </>
  );
}
