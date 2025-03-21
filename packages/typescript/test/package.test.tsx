import { Output, refkey, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { it } from "vitest";
import * as ts from "../src/components/index.js";
import { PackageDirectory } from "../src/components/PackageDirectory.js";
import { assertFileContents } from "./utils.js";

it("exports source files", () => {
  const res = render(
    <Output>
      <PackageDirectory name="greeting-js" path="." version="1.0.0">
        <ts.SourceFile path="greeting.ts">
          <ts.FunctionDeclaration
            name="getGreeting"
            refkey={refkey("getGreeting")}
          >
            return "Hello world!";
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.SourceFile export path="printing.ts">
          <ts.VarDeclaration name="greeting">
            {refkey("getGreeting")}()
          </ts.VarDeclaration>
          ;<hbr />
          <ts.FunctionDeclaration
            export
            name="printGreeting"
            refkey={refkey("printGreeting")}
          >
            console.log(greeting);
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.BarrelFile export="." />
      </PackageDirectory>
    </Output>,
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
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "exports": {
          "./printing.js": "./dist/printing.js",
          ".": "./dist/index.js"
        }
      }
    `,
  });
});

it("combines ref'd exports with explicit exports", () => {
  const res = render(
    <Output>
      <PackageDirectory
        name="greeting-js"
        path="."
        version="1.0.0"
        exports={{
          "./foo": "./foo/test.js",
        }}
      >
        <ts.SourceFile export="." path="index.ts">
          <ts.FunctionDeclaration
            export
            name="printGreeting"
            refkey={refkey("printGreeting")}
          >
            console.log(greeting);
          </ts.FunctionDeclaration>
        </ts.SourceFile>
      </PackageDirectory>
    </Output>,
  );

  assertFileContents(res, {
    "index.ts": `
      export function printGreeting() {
        console.log(greeting);
      }
    `,
    "package.json": `
      {
        "name": "greeting-js",
        "version": "1.0.0",
        "type": "module",
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "exports": {
          "./foo": "./foo/test.js",
          ".": "./dist/index.js"
        }
      }
    `,
  });
});
