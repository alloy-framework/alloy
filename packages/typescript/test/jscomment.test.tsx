import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { JSComment } from "../src/components/JSComment.jsx";

describe("JSComment", () => {
  it("formats properly a simple comment", () => {
    const template = (
      <>
        <JSComment>Hello!</JSComment>Should not be part of the comment
      </>
    );

    expect(template).toRenderTo(
      d`
      // Hello!
      Should not be part of the comment
      `,
      { printWidth: 40 },
    );
  });

  it("formats properly multiple children", () => {
    const template = (
      <>
        <JSComment>
          Hello!
          <hbr />
          <hbr />
          This is another line
        </JSComment>
        foo should be outside the comment
      </>
    );

    expect(template).toRenderTo(
      d`
       // Hello!
       //
       // This is another line
       foo should be outside the comment
       `,
      { printWidth: 40 },
    );
  });

  it("It correctly do word wrapping", () => {
    const template = (
      <>
        <JSComment>
          This is a very long line that should be broken into multiple lines. It
          should also be aligned properly. The line breaks in this paragraph
          should not be carried over into the JSDoc comment.
        </JSComment>
        This should not be part of the comment
      </>
    );

    expect(template).toRenderTo(
      d`
       // This is a very long line that should
       // be broken into multiple lines. It
       // should also be aligned properly. The
       // line breaks in this paragraph should
       // not be carried over into the JSDoc
       // comment.
       This should not be part of the comment
    `,
      { printWidth: 40 },
    );
  });
});
