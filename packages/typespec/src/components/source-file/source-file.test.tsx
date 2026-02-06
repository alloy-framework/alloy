import { Output, SourceDirectory } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { createNamespaceSymbol } from "../../symbols/factories.js";
import { SourceFile } from "./source-file.jsx";

it("defines multiple directories with unique source files", () => {
  expect(
    <Output>
      <SourceDirectory path="dir1">
        <SourceFile path="file.tsp">Content of File1</SourceFile>
      </SourceDirectory>
      <SourceDirectory path="dir2">
        <SourceFile path="file.tsp">Content of File2</SourceFile>
      </SourceDirectory>
    </Output>,
  ).toRenderTo({
    "dir1/file.tsp": `Content of File1`,
    "dir2/file.tsp": `Content of File2`,
  });
});

it("declares a file level namespace when one is provided", () => {
  const parentNamespace = createNamespaceSymbol("My.Namespace");
  expect(
    <Output>
      <SourceFile path="main.tsp" namespace={parentNamespace}>
        Content of the file
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
          namespace My.Namespace;

          Content of the file
          `,
  });
});
