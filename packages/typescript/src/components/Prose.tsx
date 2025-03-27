import { childrenArray, computed } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";

export interface Prose {
  children: Children;
}

/**
 * Creates a prose element. This is a special element that breaks the children into
 * multiple lines.
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
