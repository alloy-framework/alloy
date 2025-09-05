import { Output } from "@alloy-js/core";
import { expect, it } from "vitest";
import { SourceFile } from "../src/components/SourceFile.jsx";

it("Includes header", () => {
  expect(
    <Output>
      <SourceFile path="hi.ts" headerComment="This is a header">
        hello!
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    // This is a header
    
    hello!`);
});

it("Line wraps a header", () => {
  expect(
    <Output>
      <SourceFile
        path="hi.ts"
        headerComment="This is a very long header that is very long and should be wrapped. Meaning, it should be split into multiple lines."
      >
        hello!
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    // This is a very long header that is very long and should be wrapped. Meaning,
    // it should be split into multiple lines.

    hello!`);
});
