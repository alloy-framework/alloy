import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { Value } from "../src/components/value.js";

describe("Value", () => {
  it("renders strings", () => {
    expect(<Value value="hello" />).toRenderTo(d`"hello"`);
  });

  it("renders integers", () => {
    expect(<Value value={42} />).toRenderTo(d`42`);
  });

  it("renders floats", () => {
    expect(<Value value={3.14} />).toRenderTo(d`3.14`);
  });

  it("renders boolean true", () => {
    expect(<Value value={true} />).toRenderTo(d`true`);
  });

  it("renders boolean false", () => {
    expect(<Value value={false} />).toRenderTo(d`false`);
  });

  it("renders null as None", () => {
    expect(<Value value={null} />).toRenderTo(d`None`);
  });

  it("renders undefined as None", () => {
    expect(<Value value={undefined} />).toRenderTo(d`None`);
  });

  it("renders arrays as vec literals", () => {
    expect(<Value value={[1, 2, 3]} />).toRenderTo(d`vec![1, 2, 3]`);
  });

  it("renders nested arrays", () => {
    expect(<Value value={[[1, 2], [3, 4]]} />).toRenderTo(d`vec![vec![1, 2], vec![3, 4]]`);
  });

  it("renders empty arrays", () => {
    expect(<Value value={[]} />).toRenderTo(d`vec![]`);
  });

  it("escapes strings with special characters", () => {
    expect(<Value value={'line1\nline2\t"quoted"\\path'} />).toRenderTo(
      d`"line1\\nline2\\t\\"quoted\\"\\\\path"`,
    );
  });
});
