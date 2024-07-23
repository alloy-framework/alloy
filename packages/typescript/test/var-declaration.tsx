import { render, Output, mapJoin, reactive, renderTree, effect, memo, ref, refkey, OutputDirectory } from "@alloy-js/core";
import { expect, it } from "vitest";
import "@alloy-js/core/testing";

import * as ts from "../src/index.js";
import { d, renderToString } from "@alloy-js/core/testing";

it("works", () => {
  expect(<Output>
    <ts.SourceFile path="test.js">
      <ts.VarDeclaration name="hi" value="12" />
    </ts.SourceFile>
  </Output>).toRenderTo("const hi = 12;");
});


it("works end-to-end", () => {
  const TestType = refkey("TestType");

  const tree = render(
    <Output>
      <ts.SourceFile path="types.ts">
        <ts.TypeDeclaration name="TestType" refkey={TestType}>
          "hello" | "goodbye"
        </ts.TypeDeclaration>
      </ts.SourceFile>
      <ts.SourceFile path="test.ts">
        <ts.VarDeclaration export let name="hi" type={<ts.Reference refkey={TestType} />}>
          "hello"
        </ts.VarDeclaration>
      </ts.SourceFile>
    </Output>
  );

  printOutput(tree);
});



function printOutput(dir: OutputDirectory, level = 1) {
  console.log(`${"#".repeat(level)} Directory ${dir.path}`);

  for (const item of dir.contents) {
    if (item.kind === "directory") {
      printOutput(item, level + 1);
    } else {
      console.log(
        `\n${"#".repeat(level + 1)} ${item.path} (${item.filetype})\n`
      );
      console.log(item.contents.trimStart());
    }
  }
}
