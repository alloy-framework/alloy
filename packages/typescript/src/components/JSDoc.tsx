import { List, childrenArray, type Children } from "@alloy-js/core";
import { JSDocComment } from "./JSDocComment.jsx";

export interface JSDocProps {
  children: Children;
}

/**
 * A JSDoc comment. The children of this component are joined with two hard
 * linebreaks. This is useful for creating JSDoc comments with multiple paragraphs.
 */
export function JSDoc(props: JSDocProps) {
  return (
    <JSDocComment>
      <List doubleHardline>{childrenArray(() => props.children)}</List>
    </JSDocComment>
  );
}
