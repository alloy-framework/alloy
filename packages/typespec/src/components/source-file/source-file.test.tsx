import { Namespace } from "#components/namespace/namespace.jsx";
import { Output, SourceDirectory } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
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
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="My.Namespace">Content of the file</Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      namespace My.Namespace;

      Content of the file`,
  });
});

it("does not declare a file level namespace when more than one top-level namespace is provided", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="My.Namespace1">Content of the file</Namespace>
        <hbr />
        <Namespace name="My.Namespace2">More content of the file</Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      namespace My.Namespace1 {
        Content of the file
      }
      namespace My.Namespace2 {
        More content of the file
      }`,
  });
});
