import { expect, it } from "vitest";
import { Output } from "@alloy-js/core";
import { SourceFile } from "./source-file.jsx";
import { SourceDirectory } from "@alloy-js/core";

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
    expect(
        <Output>
            <SourceFile namespace="My.Namespace" path="main.tsp" />
        </Output>
    ).toRenderTo({
        "main.tsp": `namespace My.Namespace;`,
    });
});