import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import {
  render,
  Output,
  OutputDirectory,
  refkey,
  SourceDirectory,
  SourceFile,
} from "@alloy-js/core";
import * as ts from "../src/components/index.js";
import { d } from "@alloy-js/core/testing";
import { PackageDirectory } from "../src/components/PackageDirectory.jsx";

it("exports source files", () => {

  const res = render(
    <Output>
      <PackageDirectory name="greeting-js" path="." version="1.0.0">

        <ts.SourceFile path="greeting.ts">
          <ts.FunctionDeclaration name="getGreeting">
            return "Hello world!";
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.SourceFile export path="printing.ts">
          <ts.VarDeclaration name="greeting">
            <ts.Reference refkey={refkey("getGreeting")} />()
          </ts.VarDeclaration>
          <ts.FunctionDeclaration export name="printGreeting">
            console.log(greeting);
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.BarrelFile export="." />
        
      </PackageDirectory>
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

