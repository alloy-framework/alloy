import { describe, expect, it } from "vitest";
import "../../testing/extend-expect.js";

describe("empty lines are preserved", () => {
  it("fragment", () => {
    const frag = <>
      hi

    </>;

    expect(<>
      { frag }
      hi
    </>).toRenderTo(`
      hi

      hi
    `);
  });

  it("memo for fragment", () => {
    const frag = <>
      hi

    </>;
    function getTrue() {
      return true;
    }

    expect(<>
      { getTrue() ? frag : undefined }
      hi
    </>).toRenderTo(`
      hi

      hi
    `);
  });

  it("after components", () => {
    function Foo() {
      return "hi";
    }

    expect(<>
      <Foo />

      hi
    </>).toRenderTo(`
      hi

      hi
    `);
  });
});

// this would be a nice feature to have
describe("empty lines are removed when the only thing on the line is a falsy value", () => {
  it("false", () => {
    expect(<>
      {false}
      hi
    </>).toRenderTo("hi");
  });

  it("undefined", () => {
    expect(<>
      {undefined}
      hi
    </>).toRenderTo("hi");
  });
});
