import { render, Output, refkey, OutputDirectory } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";
import { findFile } from "./utils.jsx";
import { d } from "@alloy-js/core/testing";

it("imports external packages", () => {
  const res = render(
    <Output>
      <ts.PackageDirectory name="greeting-lib" path="greeting-lib" version="1.0.0">
        <ts.SourceFile path="greetings.ts">
          <ts.FunctionDeclaration name="getGreeting">
            return "Hello world!";
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.SourceFile path="logGreetings.ts">
          <ts.FunctionDeclaration export name="printGreeting">
            console.log("Hello world!");
          </ts.FunctionDeclaration>
        </ts.SourceFile>
      
        <ts.BarrelFile export="." />
      </ts.PackageDirectory>

      <ts.PackageDirectory name="consumer" path="consumer" version="1.0.0">
        <ts.SourceFile export="." path="ref.ts">
          <ts.Reference refkey={refkey("getGreeting")} />();
        </ts.SourceFile>
      </ts.PackageDirectory>
    </Output>
  );

  const consumerPkgJson = findFile(res, "consumer/package.json")!;
  const greetingPkgJson = findFile(res, "greeting-lib/package.json")!;
  const refFile = findFile(res, "consumer/ref.ts")!

  expect(consumerPkgJson.contents).toEqual(d`
    {
      "name": "consumer",
      "version": "1.0.0",
      "type": "module",
      "dependencies": {
        "greeting-lib": "1.0.0"
      },
      "exports": {
        ".": "./dist/ref.js"
      }
    }
  `);

  expect(greetingPkgJson.contents).toEqual(d`
    {
      "name": "greeting-lib",
      "version": "1.0.0",
      "type": "module",
      "dependencies": {},
      "exports": {
        ".": "./dist/index.js"
      }
    }
  `);

  expect(refFile.contents).toEqual(d`
    import { getGreeting } from "greeting-lib";
    
    getGreeting();
  `);

});