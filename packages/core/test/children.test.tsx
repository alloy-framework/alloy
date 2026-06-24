import {
  children,
  Children,
  childrenArray,
  code,
  isComponentCreator,
} from "@alloy-js/core";
import { expect, it } from "vitest";

it("handles a single element", () => {
  function Foo(props: { children?: Children }) {
    return children(() => props.children);
  }

  expect(<Foo>a b c</Foo>).toRenderTo("a b c");
});

it("handles a multiple elements", () => {
  function Foo(props: { children?: Children }) {
    const c = children(() => props.children);
    return c;
  }

  function Bar() {
    return "Bar";
  }

  expect(
    <Foo>
      <Bar />
      <Bar />
    </Foo>,
  ).toRenderTo(`BarBar`);
});

it("does not eagerly invoke intrinsic creators from indented code blocks", () => {
  // Indented lines of a `code` block are wrapped in `indent(...)` intrinsic
  // creators. `childrenArray`/`children` must keep them opaque rather than
  // invoking them during keyed-child analysis, otherwise their children
  // (e.g. refkeys) get materialized against the wrong scope. See issue #429.
  const arr = childrenArray(
    () => code`
      if (x) {
        return 1;
      }
    `,
  );

  // The indented lines are represented by intrinsic component creators that
  // are left opaque (still functions, not invoked/materialized) ...
  expect(arr.some((c) => typeof c === "function")).toBe(true);
  // ... because they are deferred component creators, which child collection
  // skips during keyed-child analysis (running them later at insert time).
  expect(arr.some((c) => isComponentCreator(c))).toBe(true);

  function Wrapper(props: { children?: Children }) {
    // Force the same children-analysis path a scope-introducing component
    // (e.g. FunctionDeclaration) uses before rendering its body.
    const collected = childrenArray(() => props.children);
    return collected;
  }

  expect(
    <Wrapper>
      {code`
        if (x) {
          return 1;
        }
      `}
    </Wrapper>,
  ).toRenderTo(`
    if (x) {
      return 1;
    }
  `);
});
