import { List } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { SingleLineCommentBlock } from "../src/components/SingleLineCommentBlock.jsx";

describe("JSComment", () => {
  it("formats properly a simple comment", () => {
    const template = (
      <>
        <SingleLineCommentBlock>Hello!</SingleLineCommentBlock>
        <hbr />
        Should not be part of the comment
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

  it("should not add extra line breaks", () => {
    const template = (
      <>
        <List hardline>
          <SingleLineCommentBlock>
            Hello!
            <hbr />
            <hbr />
            This is another line
          </SingleLineCommentBlock>
        </List>
        <hbr />
        Hello
      </>
    );

    expect(template).toRenderTo(
      d`
       // Hello!
       //
       // This is another line
       Hello
       `,
      { printWidth: 40 },
    );
  });

  it("formats properly multiple children", () => {
    const template = (
      <>
        <SingleLineCommentBlock>
          Hello!
          <hbr />
          <hbr />
          This is another line
        </SingleLineCommentBlock>
        <hbr />
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
        <SingleLineCommentBlock>
          This is a very long line that should be broken into multiple lines. It
          should also be aligned properly. The line breaks in this paragraph
          should not be carried over into the JSDoc comment.
        </SingleLineCommentBlock>
        <hbr />
        <>This should not be part of the comment</>
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
