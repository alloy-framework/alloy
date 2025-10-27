import { expect, it } from "vitest";
import { Directory } from "./directory.jsx";
import { Output, SourceFile } from "@alloy-js/core";

it("defines multiple directories with unique source files", () => {
    expect(
      <Output>
        <Directory path="dir1">
          <SourceFile path="file.tsp" filetype="tsp">Content of File1</SourceFile>
        </Directory>
        <Directory path="dir2">
          <SourceFile path="file.tsp" filetype="tsp">Content of File2</SourceFile>
        </Directory>
      </Output>,
    ).toRenderTo({
      "dir1/file.tsp": `Content of File1`,
      "dir2/file.tsp": `Content of File2`,
    });
});