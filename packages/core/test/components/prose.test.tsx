import { describe, expect, it } from "vitest";
import { Prose } from "../../src/components/Prose.jsx";
import "../../testing/extend-expect.js";
import { d } from "../../testing/render.js";

describe("Prose", () => {
  it("formats properly", () => {
    const template = (
      <>
        <Prose>
          This is a long paragraph that should end up being broken into multiple
          lines.
        </Prose>
        <hbr />
        <hbr />
        <Prose>
          This is another paragraph. There should be a couple breaks in front of
          it.
        </Prose>
      </>
    );

    expect(template).toRenderTo(
      d`
        This is a long paragraph that
        should end up being broken
        into multiple lines.

        This is another paragraph.
        There should be a couple
        breaks in front of it. 
      `,
      { printWidth: 30 },
    );
  });
});
