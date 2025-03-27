import { Output, render } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { SourceFile } from "../src/components/SourceFile.jsx";

it("Includes header", () => {
  const tree = render(
    <Output>
      <SourceFile path="hi.ts" headerComment="This is a header">
        hello!
      </SourceFile>
    </Output>,
  );

  expect(tree.contents[0].contents).toEqual(d`
    // This is a header
    
    hello!`);
});

it("Line wraps a header", () => {
  const tree = render(
    <Output>
      <SourceFile
        path="hi.ts"
        headerComment="This is a very long header that is very long and should be wrapped. Meaning, it should be split into multiple lines."
      >
        hello!
      </SourceFile>
    </Output>,
  );

  expect(tree.contents[0].contents).toEqual(d`
    // This is a very long header that is very long and should be wrapped. Meaning,
    // it should be split into multiple lines.
    
    hello!`);
});
