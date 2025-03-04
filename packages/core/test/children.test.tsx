import { children, Children, printTree, renderTree } from "@alloy-js/core";
import { expect, it } from "vitest";

it("handles a single element", () => {
  function Foo(props: { children?: Children }) {
    return children(() => props.children);
  }

  const res = renderTree(<Foo>a b c</Foo>);
  expect(printTree(res)).toBe("a b c");
});

it("handles a multiple elements", () => {
  function Foo(props: { children?: Children }) {
    const c = children(() => props.children);
    return c;
  }

  function Bar() {
    return "Bar";
  }

  const res = renderTree(
    <Foo>
      <Bar />
      <Bar />
    </Foo>,
  );

  expect(printTree(res)).toBe(`BarBar`);
});
