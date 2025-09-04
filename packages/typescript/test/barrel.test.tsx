import { Output, SourceDirectory, SourceFile } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as ts from "../src/components/index.js";

it("exports everything from source files within it", () => {
  expect(
    <Output>
      <ts.SourceFile path="test1.ts" />
      <ts.SourceFile path="test2.ts" />
      <SourceDirectory path="components">
        <ts.SourceFile path="c1.ts" />
        <ts.SourceFile path="c2.ts" />
        <ts.BarrelFile />
      </SourceDirectory>
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "components/index.ts": d`
      export * from "./c1.js";
      export * from "./c2.js";
    `,
    "index.ts": d`
    export * from "./test1.js";
    export * from "./test2.js";
    export * from "./components/index.js";
    `,
    "components/c2.ts": "",
    "components/c1.ts": "",
    "test1.ts": "",
    "test2.ts": "",
  });
});

it("ignores non-TS files", () => {
  expect(
    <Output>
      <SourceFile path="test.txt" filetype="text" />
      <ts.SourceFile path="test1.ts" />
      <ts.SourceFile path="test2.ts" />
      <ts.BarrelFile />
    </Output>,
  ).toRenderTo({
    "index.ts": d`
      export * from "./test1.js";
      export * from "./test2.js";
    `,
    "test.txt": "",
    "test1.ts": "",
    "test2.ts": "",
  });
});
