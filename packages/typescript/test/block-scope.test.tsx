import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { BlockScope } from "../src/components/BlockScope.jsx";
import { VarDeclaration } from "../src/index.js";
import { toSourceText } from "./utils.jsx";

it("creates a scope", () => {
  const text = toSourceText(
    <>
      <VarDeclaration name="x" initializer="hi" />;<hbr />
      <BlockScope>
        <VarDeclaration name="x" initializer="hello" />;
      </BlockScope>
    </>,
  );

  expect(text).toBe(d`
    const x = hi;
    {
      const x = hello;
    }
  `);
});

it("renders an empty block properly", () => {
  const text = toSourceText(<BlockScope></BlockScope>);

  expect(text).toBe("{}");
});
