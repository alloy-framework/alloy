import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { DecoratorList } from "../src/components/DecoratorList.jsx";
import { toSourceText } from "./utils.js";

/**
 * Direct contract tests for `DecoratorList`. The component is exercised
 * transitively by every method/property test, but pinning the three core
 * behaviors here makes regressions caught at the helper's own boundary —
 * not after they propagate through every consumer.
 */
describe("DecoratorList", () => {
  it("renders nothing when decorators is undefined", () => {
    expect(
      toSourceText([
        <>
          <DecoratorList />
          pass
        </>,
      ]),
    ).toRenderTo("pass");
  });

  it("renders nothing when decorators is an empty array", () => {
    expect(
      toSourceText([
        <>
          <DecoratorList decorators={[]} />
          pass
        </>,
      ]),
    ).toRenderTo("pass");
  });

  it("renders a single decorator followed by exactly one hardline", () => {
    expect(
      toSourceText([
        <>
          <DecoratorList decorators={["@one"]} />
          pass
        </>,
      ]),
    ).toRenderTo(d`
      @one
      pass
    `);
  });

  it("renders multiple decorators with no blank lines between adjacent entries", () => {
    expect(
      toSourceText([
        <>
          <DecoratorList decorators={["@one", "@two", "@three"]} />
          pass
        </>,
      ]),
    ).toRenderTo(d`
      @one
      @two
      @three
      pass
    `);
  });

  it("preserves source order: first entry is topmost (= applied last)", () => {
    expect(
      toSourceText([
        <>
          <DecoratorList decorators={["@outer", "@middle", "@inner"]} />
          pass
        </>,
      ]),
    ).toRenderTo(d`
      @outer
      @middle
      @inner
      pass
    `);
  });

  it("skips falsy entries without emitting blank lines", () => {
    expect(
      toSourceText([
        <>
          <DecoratorList decorators={["@one", false, undefined, "@two"]} />
          pass
        </>,
      ]),
    ).toRenderTo(d`
      @one
      @two
      pass
    `);
  });
});
