import { Output, refkey } from "@alloy-js/core";
import { expect, it } from "vitest";
import * as ts from "../src/index.js";

it("imports external packages", () => {
  expect(
    <Output>
      <ts.PackageDirectory
        name="greeting-lib"
        path="greeting-lib"
        version="1.0.0"
      >
        <ts.SourceFile path="greetings.ts">
          <ts.FunctionDeclaration
            name="getGreeting"
            refkey={refkey("getGreeting")}
          >
            return "Hello world!";
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.SourceFile path="logGreetings.ts">
          <ts.FunctionDeclaration
            export
            name="printGreeting"
            refkey={refkey("printGreeting")}
          >
            console.log("Hello world!");
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.BarrelFile export="." />
      </ts.PackageDirectory>

      <ts.PackageDirectory name="consumer" path="consumer" version="1.0.0">
        <ts.SourceFile export="." path="ref.ts">
          <ts.Reference refkey={refkey("getGreeting")} />
          ();
        </ts.SourceFile>
      </ts.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "consumer/package.json": `
      {
        "name": "consumer",
        "version": "1.0.0",
        "type": "module",
        "dependencies": {
          "greeting-lib": "1.0.0"
        },
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "exports": {
          ".": "./dist/ref.js"
        }
      }
    `,
    "consumer/tsconfig.json": expect.anything(),
    "greeting-lib/package.json": `
      {
        "name": "greeting-lib",
        "version": "1.0.0",
        "type": "module",
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "exports": {
          ".": "./dist/index.js"
        }
      }
    `,
    "greeting-lib/tsconfig.json": expect.anything(),
    "greeting-lib/index.ts": expect.anything(),
    "greeting-lib/greetings.ts": expect.anything(),
    "greeting-lib/logGreetings.ts": expect.anything(),
    "consumer/ref.ts": `
      import { getGreeting } from "greeting-lib";
      
      getGreeting();
    `,
  });
});

it("combines explicit dependencies with referenced dependencies", () => {
  expect(
    <Output>
      <ts.PackageDirectory
        name="greeting-lib"
        path="greeting-lib"
        version="1.0.0"
      >
        <ts.SourceFile path="greetings.ts">
          <ts.FunctionDeclaration
            name="getGreeting"
            refkey={refkey("getGreeting")}
          >
            return "Hello world!";
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.SourceFile path="logGreetings.ts">
          <ts.FunctionDeclaration
            export
            name="printGreeting"
            refkey={refkey("printGreeting")}
          >
            console.log("Hello world!");
          </ts.FunctionDeclaration>
        </ts.SourceFile>

        <ts.BarrelFile export="." />
      </ts.PackageDirectory>

      <ts.PackageDirectory
        name="consumer"
        path="consumer"
        version="1.0.0"
        dependencies={{
          foo: "bar",
        }}
      >
        <ts.SourceFile export="." path="ref.ts">
          <ts.Reference refkey={refkey("getGreeting")} />
          ();
        </ts.SourceFile>
      </ts.PackageDirectory>
    </Output>,
  ).toRenderTo({
    "consumer/package.json": `
      {
        "name": "consumer",
        "version": "1.0.0",
        "type": "module",
        "dependencies": {
          "foo": "bar",
          "greeting-lib": "1.0.0"
        },
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "exports": {
          ".": "./dist/ref.js"
        }
      }
    `,
    "consumer/tsconfig.json": expect.anything(),
    "greeting-lib/package.json": `
    {
      "name": "greeting-lib",
      "version": "1.0.0",
      "type": "module",
      "devDependencies": {
        "typescript": "^5.5.2"
      },
      "exports": {
        ".": "./dist/index.js"
      }
    }
    `,
    "greeting-lib/tsconfig.json": expect.anything(),
    "greeting-lib/index.ts": expect.anything(),
    "greeting-lib/greetings.ts": expect.anything(),
    "greeting-lib/logGreetings.ts": expect.anything(),
    "consumer/ref.ts": `
    import { getGreeting } from "greeting-lib";
    
    getGreeting();
  `,
  });
});
