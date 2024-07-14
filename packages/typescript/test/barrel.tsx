import "@alloyjs/core/testing";
import { expect, it } from "vitest";
import {
  render,
  Output,
  SourceFile,
  Declaration,
  OutputDirectory,
} from "@alloyjs/core";
import * as ts from "../src/components/index.js";
import { Reference } from "../src/components/Reference.js";
import { Block } from "../src/components/Block.jsx";

it("works with default imports", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration export default name="test" />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey="test" />;
      </ts.SourceFile>
    </Output>
  );

  printOutput(res);
});

it("works with named imports", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration export name="test" />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v = <Reference refkey="test" />;
      </ts.SourceFile>
    </Output>
  );

  printOutput(res);
});

it("works with default and named imports", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration export default name="test1" />
        <ts.FunctionDeclaration export name="test2" />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        const v1 = <Reference refkey="test1" />;
        const v2 = <Reference refkey="test2" />;
      </ts.SourceFile>

      
      <ts.SourceFile path="test3.ts">
        const v1 = <Reference refkey="test3" />;
        const v2 = <Reference refkey="test4" />;
      </ts.SourceFile>
    </Output>
  );

  printOutput(res);
});

it("works with default and named imports and name conflicts", () => {
  const res = render(
    <Output>
      <ts.SourceFile path="test1.ts">
        <ts.FunctionDeclaration export default name="test1" />
        <ts.FunctionDeclaration export name="test2" />
      </ts.SourceFile>

      <ts.SourceFile path="test2.ts">
        <ts.FunctionDeclaration export default name="test1" refkey="test3" />
        <ts.FunctionDeclaration export name="test2" refkey="test4" />
      </ts.SourceFile>

      <ts.SourceFile path="test3.ts">
        const v1 = <Reference refkey="test1" />;
        const v2 = <Reference refkey="test2" />;
        const v3 = <Reference refkey="test3" />;
        const v4 = <Reference refkey="test4" />;
      </ts.SourceFile>
    </Output>
  );

  printOutput(res);
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
