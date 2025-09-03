import { List, Prose } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { BlockComment, LineComment } from "./comment.jsx";

describe("GoLineComment", () => {
  it("formats properly a simple comment", () => {
    const template = (
      <>
        <LineComment>Hello!</LineComment>
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
          <LineComment>
            Hello!
            <hbr />
            <hbr />
            This is another line
          </LineComment>
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
        <LineComment>
          <Prose>Hello!</Prose>
          <hbr />
          <hbr />
          <Prose>This is another line</Prose>
        </LineComment>
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
        <LineComment>
          <Prose>
            This is a very long line that should be broken into multiple lines.
            It should also be aligned properly. The line breaks in this
            paragraph should not be carried over into the JSDoc comment.
          </Prose>
        </LineComment>
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

  it("formats properly", () => {
    const template = (
      <LineComment>
        <Prose>
          This is a long paragraph that should end up being broken into multiple
          paragraphs. Moreover, the line breaks in this paragraph should not be
          carried over into the JSDoc comment.
        </Prose>
        <hbr />
        <hbr />
        <Prose>
          This is another paragraph. There should be a couple breaks in front of
          it.
        </Prose>
      </LineComment>
    );

    expect(template).toRenderTo(
      d`
        // This is a long paragraph that should
        // end up being broken into multiple
        // paragraphs. Moreover, the line breaks
        // in this paragraph should not be
        // carried over into the JSDoc comment.
        //
        // This is another paragraph. There
        // should be a couple breaks in front of
        // it.
      `,
      { printWidth: 40 },
    );
  });
});

describe("GoBlockComment", () => {
  it("formats properly a simple comment", () => {
    const template = (
      <>
        <BlockComment>Hello!</BlockComment>
        <hbr />
        Should not be part of the comment
      </>
    );

    expect(template).toRenderTo(
      d`
        /*
        Hello!
        */
        Should not be part of the comment
      `,
      { printWidth: 40 },
    );
  });

  it("should not add extra line breaks", () => {
    const template = (
      <>
        <List hardline>
          <BlockComment>
            <Prose>Hello!</Prose>
            <Prose>World!</Prose>
            <Prose>This is another line</Prose>
          </BlockComment>
        </List>
        <hbr />
        Hello
      </>
    );

    expect(template).toRenderTo(
      d`
        /*
        Hello!

        World!

        This is another line
        */
        Hello
      `,
      { printWidth: 40 },
    );
  });

  it("formats properly multiple children", () => {
    const template = (
      <>
        <BlockComment>
          <Prose>Hello!</Prose>
          <Prose>This is another line</Prose>
        </BlockComment>
        <hbr />
        foo should be outside the comment
      </>
    );

    expect(template).toRenderTo(
      d`
        /*
        Hello!

        This is another line
        */
        foo should be outside the comment
      `,
      { printWidth: 40 },
    );
  });

  it("It correctly do word wrapping", () => {
    const template = (
      <>
        <BlockComment>
          <Prose>
            This is a very long line that should be broken into multiple lines.
            It should also be aligned properly. The line breaks in this
            paragraph should not be carried over into the JSDoc comment.
          </Prose>
        </BlockComment>
        <hbr />
        <>This should not be part of the comment</>
      </>
    );

    expect(template).toRenderTo(
      d`
        /*
        This is a very long line that should be
        broken into multiple lines. It should
        also be aligned properly. The line
        breaks in this paragraph should not be
        carried over into the JSDoc comment.
        */
        This should not be part of the comment
      `,
      { printWidth: 40 },
    );
  });

  it("formats properly", () => {
    const template = (
      <BlockComment>
        <Prose>
          This is a long paragraph that should end up being broken into multiple
          paragraphs. Moreover, the line breaks in this paragraph should not be
          carried over into the JSDoc comment.
        </Prose>
        <Prose>
          This is another paragraph. There should be a couple breaks in front of
          it.
        </Prose>
      </BlockComment>
    );

    expect(template).toRenderTo(
      d`
        /*
        This is a long paragraph that should end
        up being broken into multiple
        paragraphs. Moreover, the line breaks in
        this paragraph should not be carried
        over into the JSDoc comment.
        
        This is another paragraph. There should
        be a couple breaks in front of it.
        */
      `,
      { printWidth: 40 },
    );
  });
});
