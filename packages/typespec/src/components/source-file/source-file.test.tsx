import { expect, it } from "vitest";
import { Output } from "@alloy-js/core";
import { SourceFile } from "./source-file.jsx";
import { Directory } from "#components/directory/directory.jsx";

it("defines multiple directories with unique source files", () => {
    expect(
      <Output>
        <Directory path="dir1">
          <SourceFile path="file.tsp">Content of File1</SourceFile>
        </Directory>
        <Directory path="dir2">
          <SourceFile path="file.tsp">Content of File2</SourceFile>
        </Directory>
      </Output>,
    ).toRenderTo({
      "dir1/file.tsp": `Content of File1`,
      "dir2/file.tsp": `Content of File2`,
    });
});