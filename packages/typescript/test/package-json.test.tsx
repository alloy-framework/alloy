import { Output, render } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { it } from "vitest";
import { PackageJsonFile } from "../src/components/PackageJson.jsx";
import { assertFileContents } from "./utils.js";

it("creates a simple package.json", () => {
  const res = render(
    <Output>
      <PackageJsonFile name="test" version="1.0.0" />
    </Output>,
  );

  assertFileContents(res, {
    "package.json": `
        {
          "name": "test",
          "version": "1.0.0",
          "type": "module"
        }
      `,
  });
});

it("makes a complex package.json", () => {
  const res = render(
    <Output>
      <PackageJsonFile
        name="test"
        version="1.0.0"
        author="Brian Terlson"
        license="MIT"
        description="A test package!"
        homepage="https://example.com"
        repository="https://github.com/alloy-project/alloy"
        keywords={["test", "package"]}
        type="commonjs"
        scripts={{
          build: "tsc -p .",
          test: "vitest run",
          "test:watch": "vitest -w",
        }}
        dependencies={{
          "@alloy-js/core": "^0.1.0",
          "@alloy-js/typescript": "^0.1.0",
        }}
        devDependencies={{
          typescript: "^5.5.2",
        }}
        exports={{
          ".": "./lib/index.js",
          "./complex": {
            main: "./lib/index.js",
            export: "./lib/index.mjs",
          },
        }}
      />
    </Output>,
  );

  assertFileContents(res, {
    "package.json": `
      {
        "name": "test",
        "version": "1.0.0",
        "author": "Brian Terlson",
        "description": "A test package!",
        "license": "MIT",
        "homepage": "https://example.com",
        "type": "commonjs",
        "dependencies": {
          "@alloy-js/core": "^0.1.0",
          "@alloy-js/typescript": "^0.1.0"
        },
        "devDependencies": {
          "typescript": "^5.5.2"
        },
        "scripts": {
          "build": "tsc -p .",
          "test": "vitest run",
          "test:watch": "vitest -w"
        },
        "exports": {
          ".": "./lib/index.js",
          "./complex": {
            "main": "./lib/index.js",
            "export": "./lib/index.mjs"
          }
        }
      }
    `,
  });
});
