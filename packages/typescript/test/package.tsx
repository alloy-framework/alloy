import "@alloy-js/core/testing";
import { it } from "vitest";
import {
  render,
  Output,
  refkey,
} from "@alloy-js/core";
import * as ts from "../src/components/index.js";
import { PackageDirectory } from "../src/components/PackageDirectory.js";
import { assertFileContents } from "./utils.js";

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

  assertFileContents(res, {
    "greeting.ts": `
      function getGreeting() {
        return "Hello world!";
      }
    `,
    "printing.ts": `
      import { getGreeting } from "./greeting.js";

      const greeting = getGreeting();
      export function printGreeting() {
        console.log(greeting);
      }
    `,
    "index.ts": `
      export * from "./greeting.js";
      export * from "./printing.js";
    `,
    "package.json": `
      {
        "name": "greeting-js",
        "version": "1.0.0",
        "type": "module",
        "dependencies": {},
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "exports": {
          "./printing.js": "./dist/printing.js",
          ".": "./dist/index.js"
        }
      }
    `
  });
});
