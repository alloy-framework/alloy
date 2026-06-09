import { expect, it } from "vitest"; import { BlockScope } from "../src/components/BlockScope.jsx"; import { VarDeclaration } from "../src/index.js";
import { TestFile } from "./utils.js";

it("creates a scope", () => {
  const text = (
    <TestFile>
      <VarDeclaration name="x" initializer="hi" />;<hbr />
      <BlockScope name="foo">
        <VarDeclaration name="x" initializer="hello" />;
      </BlockScope>
    </TestFile>
  );

  expect(text).toRenderTo(`
    const x = hi;
    {
      const x = hello;
    }
  `);
});

it("renders an empty block properly", () => {
  const text = (
    <TestFile>
        <BlockScope></BlockScope>
    </TestFile>
  );

  expect(text).toRenderTo("{}");
});
