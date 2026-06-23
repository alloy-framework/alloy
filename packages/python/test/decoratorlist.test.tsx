import { describe, expect, it } from "vitest";
import { DecoratorList } from "../src/components/DecoratorList.jsx";
import { TestOutput } from "./utils.js";

/**
 * Direct contract tests for `DecoratorList`. The component is exercised
 * transitively by every method/property test, but pinning the three core
 * behaviors here makes regressions caught at the helper's own boundary —
 * not after they propagate through every consumer.
 */
describe("DecoratorList", () => {
  it("renders nothing when decorators is undefined", () => {
    expect(
      <TestOutput>
        {[
          <>
            <DecoratorList />
            pass
          </>,
        ]}
      </TestOutput>,
    ).toRenderTo("pass");
  });

  it("renders nothing when decorators is an empty array", () => {
    expect(
      <TestOutput>
        {[
          <>
            <DecoratorList decorators={[]} />
            pass
          </>,
        ]}
      </TestOutput>,
    ).toRenderTo("pass");
  });

  it("renders a single decorator followed by exactly one hardline", () => {
    expect(
      <TestOutput>
        {[
          <>
            <DecoratorList decorators={["@one"]} />
            pass
          </>,
        ]}
      </TestOutput>,
    ).toRenderTo(
      `
        @one
        pass
      `,
    );
  });

  it("renders multiple decorators with no blank lines between adjacent entries", () => {
    expect(
      <TestOutput>
        {[
          <>
            <DecoratorList decorators={["@one", "@two", "@three"]} />
            pass
          </>,
        ]}
      </TestOutput>,
    ).toRenderTo(
      `
        @one
        @two
        @three
        pass
      `,
    );
  });

  it("preserves source order: first entry is topmost (= applied last)", () => {
    expect(
      <TestOutput>
        {[
          <>
            <DecoratorList decorators={["@outer", "@middle", "@inner"]} />
            pass
          </>,
        ]}
      </TestOutput>,
    ).toRenderTo(
      `
        @outer
        @middle
        @inner
        pass
      `,
    );
  });

  it("skips falsy entries without emitting blank lines", () => {
    expect(
      <TestOutput>
        {[
          <>
            <DecoratorList decorators={["@one", false, undefined, "@two"]} />
            pass
          </>,
        ]}
      </TestOutput>,
    ).toRenderTo(
      `
        @one
        @two
        pass
      `,
    );
  });
});
