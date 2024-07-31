import {
  Output,
  render,
} from "@alloy-js/core";
import { expect, it } from "vitest";
import {
  PackageDirectory,
  SourceFile,
  Reference,
  createPackage,
} from "../src/index.js";
import { fs } from "../src/builtins/node.js";
import { assertFileContents, findFile } from "./utils.js";


it("can import builtins", () => {
  const testLib = createPackage({
    name: "testLib",
    version: "1.0.0",
    descriptor: {
      ".": {
        default: "defaultExport",
        named: ["foo", "bar"],
      },
      "./subpath": {
        named: ["nice", "cool"],
      },
    },
  });

  const res = render(
    <Output externals={[testLib, fs]}>
      <PackageDirectory path="." name="test" version="1.0.0">
        <SourceFile path="index.ts">
          <Reference refkey={testLib["./subpath"].nice} />;
          await <Reference refkey={fs["./promises"].readFile} />();
        </SourceFile>
      </PackageDirectory>
    </Output>
  );

  assertFileContents(res, {
    "package.json": `
      {
        "name": "test",
        "version": "1.0.0",
        "type": "module",
        "dependencies": {
          "testLib": "1.0.0"
        },
        "devDependencies": {
          "typescript": "^5.5.2"
        }
      }
    `,
    "index.ts": `
      import { nice } from "testLib/subpath";
      import { readFile } from "node:fs/promises";

      nice;
      await readFile();
    `
  });
});
