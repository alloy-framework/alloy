import { childrenArray, computed } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface JSDocParagraphProps {
  children: Children;
}

/**
 * Create a paragraph in a JSDoc comment. The text of this component is word
 * wrapped.
 */
export function JSDocParagraph(props: JSDocParagraphProps) {
  const brokenChildren = computed(() => {
    const children = childrenArray(() => props.children);
    return children
      .map((child) => {
        if (typeof child === "string") {
          return child
            .trim()
            .split(/\s+/)
            .map((word) => (
              <>
                {word}
                <br />
              </>
            ));
        }

        return child;
      })
      .flat(2);
  });

  return <fill>{brokenChildren.value}</fill>;
}
