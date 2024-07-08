import "@alloyjs/core/testing";
import { expect, it } from "vitest";
import { render, Output, SourceFile, Declaration, OutputDirectory } from "@alloyjs/core";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";

it("works with back references", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <Declaration name="foo">
          const foo = 1;
        </Declaration>
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey="foo" />;
      </ts.SourceFile>
    </Output>
  );

  printOutput(res);
});

it("works with forward references", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey="foo" />;
      </ts.SourceFile>
      <ts.SourceFile path="test1.ts">
        <Declaration name="foo">
          const foo = 1;
        </Declaration>
      </ts.SourceFile>
    </Output>
  );

  printOutput(res);
});

function printOutput(dir: OutputDirectory, level = 1) {
  console.log(`${"#".repeat(level)} Directory ${dir.path}`);

  for (const item of dir.contents) {
    if (item.kind === "directory") {
      printOutput(item, level + 1)
    } else {
      console.log(`\n${"#".repeat(level + 1)} ${item.path} (${item.filetype})\n`);
      console.log(item.contents.trimStart());
    }
  }
}