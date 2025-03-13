import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { assertFileContents } from "./utils.js";

it("works", () => {
  expect(
    <Output>
      <ts.SourceFile path="test.js">
        <ts.VarDeclaration name="hi" initializer="12" />;
      </ts.SourceFile>
    </Output>,
  ).toRenderTo("const hi = 12;");
});

it("works end-to-end", () => {
  const TestType = refkey("TestType");

  const res = render(
    <Output>
      <ts.SourceFile path="types.ts">
        <ts.TypeDeclaration name="TestType" refkey={TestType}>
          "hello" | "goodbye"
        </ts.TypeDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="test.ts">
        <ts.VarDeclaration
          export
          let
          name="hi"
          type={<ts.Reference refkey={TestType} />}
        >
          "hello"
        </ts.VarDeclaration>
        ;
      </ts.SourceFile>
    </Output>,
  );

  assertFileContents(res, {
    "types.ts": `
      type TestType = "hello" | "goodbye";
    `,
    "test.ts": `
      import { TestType } from "./types.js";

      export let hi: TestType = "hello";
    `,
  });
});
