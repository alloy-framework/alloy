import { describe, expect, it } from "vitest";
import "../../testing/extend-expect.js";
import {
  BasePartProps,
  createAccessExpression,
} from "../components/AccessExpression.jsx";
import { code } from "../index.js";
import { printTree, renderTree } from "../render.js";
import { Children } from "../runtime/component.js";

interface TestPartProps extends BasePartProps {
  name?: string;
  args?: Children;
}

interface TestPart extends Record<string, unknown> {
  name: string | undefined;
  args: Children | undefined;
  isFirst: boolean;
}

const { Expression, Part } = createAccessExpression<TestPartProps, TestPart>({
  createDescriptor(props, symbol, first) {
    return {
      name: symbol?.name ?? props.name,
      args: props.args,
      isFirst: first,
    };
  },

  getBase(part) {
    return part.name ?? "";
  },

  formatPart(part, _prevPart, _inCallChain) {
    if (part.args !== undefined) {
      return code`.${part.name}(${part.args})`;
    }
    return code`.${part.name}`;
  },

  isCallPart(part) {
    return part.args !== undefined;
  },
});

describe("createAccessExpression", () => {
  it("renders a single part as the base", () => {
    expect(
      <Expression>
        <Part name="foo" />
      </Expression>,
    ).toRenderTo("foo");
  });

  it("renders multiple parts with dot access", () => {
    expect(
      <Expression>
        <Part name="foo" />
        <Part name="bar" />
        <Part name="baz" />
      </Expression>,
    ).toRenderTo("foo.bar.baz");
  });

  it("renders parts with call arguments", () => {
    expect(
      <Expression>
        <Part name="foo" />
        <Part name="bar" args="x, y" />
      </Expression>,
    ).toRenderTo("foo.bar(x, y)");
  });

  it("returns empty for no parts", () => {
    expect(<Expression>{false}</Expression>).toRenderTo("");
  });

  it("flattens nested Expression instances", () => {
    const inner = (
      <Expression>
        <Part name="bar" />
        <Part name="baz" />
      </Expression>
    );

    expect(
      <Expression>
        <Part name="foo" />
        {inner}
      </Expression>,
    ).toRenderTo("foo.bar.baz");
  });

  it("ignores non-Part children", () => {
    expect(
      <Expression>
        <Part name="foo" />
        {"some string"}
        <Part name="bar" />
      </Expression>,
    ).toRenderTo("foo.bar");
  });
});

describe("createAccessExpression: call chain formatting", () => {
  it("uses linear format with only one call", () => {
    const tree = renderTree(
      <Expression>
        <Part name="foo" />
        <Part name="bar" args="x" />
      </Expression>,
    );
    // Single call → linear, no grouping.
    expect(printTree(tree)).toBe("foo.bar(x)");
  });

  it("uses call chain format with multiple calls", () => {
    const tree = renderTree(
      <Expression>
        <Part name="foo" />
        <Part name="bar" args="x" />
        <Part name="baz" args="y" />
      </Expression>,
    );
    // Multiple calls → call chain with group/indent wrapping.
    const result = printTree(tree);
    // Should contain both calls.
    expect(result).toContain("bar(x)");
    expect(result).toContain("baz(y)");
  });
});
