import { Output } from "@alloy-js/core";
import { expect, it } from "vitest";
import { SourceFile } from "../source-file/source-file.jsx";
import { Namespace } from "./namespace.jsx";

it("renders a namespace with contents", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="My.Namespace">Contents!</Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
        namespace My.Namespace;

        Contents!`,
  });
});

it("renders namespaces when a file level namespace is present", () => {
  expect(
    <Output>
      <SourceFile path="main.tsp">
        <Namespace name="File.Level">
          <Namespace name="My.Namespace">Contents!</Namespace>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
        namespace File.Level;

        namespace My.Namespace {
          Contents!
        }`,
  });
});
