import { childrenArray, computed } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface Prose {
  children: Children;
}

/**
 * Create a block of text which will break once a word exceeds the configured line width.
 * The children are expected to be strings, and a <br /> is added between each word.
 */
export function Prose(props: Prose) {
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
