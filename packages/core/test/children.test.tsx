import { children, Children } from "@alloy-js/core";
import { expect, it } from "vitest";
import "../testing/extend-expect.js";

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
