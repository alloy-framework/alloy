// prettier-ignore
import { Indent } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import "../../testing/extend-expect.js";

describe("Indent component", () => {
  it("indents explicitly indented content on a subsequent line", () => {
    expect(<>
      one
      <Indent>hi</Indent>
    </>).toRenderTo("one\n  hi");
  });

  it("indents explicitly indented content", () => {
    expect(
      <>
        one
        <Indent>
          hi<hbr />
          bye
        </Indent>
      </>,
    ).toRenderTo(`
      one
        hi
        bye
    `);
  });

  it("indents memos", () => {
    function getValue() {
      return "hi";
    }

    expect(
      <>
      base
      <Indent>
        {getValue()}
      </Indent>
      <Indent>
        {getValue()}<hbr />
        bye
      </Indent>
      <Indent>
        bye<hbr />
        {getValue()}
      </Indent>
    </>,
    ).toRenderTo(`
      base
        hi
        hi
        bye
        bye
        hi
    `);
  });

  it("doesn't indent components on the same line with explicit indent", () => {
    function Foo() {
      return "Foo";
    }

    expect(
      <>
      base
      <Indent>
        <Foo /><Foo />
      </Indent>
    </>,
    ).toRenderTo(`
      base
        FooFoo
    `);
  });

  it("works with nested indents", () => {
    expect(
      <>
      base
      <Indent>
        1<hbr />
        2
        <Indent>
          3<hbr />
          4
          <Indent>
            5<hbr />
            6
          </Indent><hbr />
          7<hbr />
          8
        </Indent><hbr />
        9<hbr />
        10
      </Indent><hbr />
      11<hbr />
      12
    </>,
    ).toRenderTo(`
      base
        1
        2
          3
          4
            5
            6
          7
          8
        9
        10
      11
      12
    `);
  });
});
