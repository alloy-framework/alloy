import { List, childrenArray } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { JSDocComment } from "./JSDocComment.jsx";

export interface JSDocProps {
  children: Children;
}

export function JSDoc(props: JSDocProps) {
  return (
    <JSDocComment>
      <List
        joiner={
          <>
            <hbr />
            <hbr />
          </>
        }
      >
        {childrenArray(() => props.children)}
      </List>
    </JSDocComment>
  );
}
