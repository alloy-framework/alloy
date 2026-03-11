import { Namespace } from "#components/namespace/namespace.jsx";
import { ScalarDeclaration } from "#components/scalar-declaration/scalar-declaration.jsx";
import { SourceFile } from "#components/source-file/source-file.jsx";
import { Output, refkey, SourceDirectory } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Reference } from "./reference.jsx";

beforeEach(() => {
  resetProgram();
});

it("properly resolves and imports referenced types in different files", () => {
  const barRefkey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="a.tsp">
        <Namespace name="A">
          <ScalarDeclaration name="Bar" refkey={barRefkey} />
        </Namespace>
      </SourceFile>
      <SourceFile path="b.tsp">
        <Reference refkey={barRefkey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "a.tsp": `
      namespace A;

      scalar Bar`,
    "b.tsp": `
      import "./a.tsp";

      using A;

      Bar`,
  });
});

it("properly resolves types in the same file and namespace", () => {
  const barRefkey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration name="Bar" refkey={barRefkey} />
          <hbr />
          <Reference refkey={barRefkey} />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      scalar Bar
      Bar`,
  });
});

it("properly resolves types in the same file and different namespace", () => {
  const barRefkey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration name="Bar" refkey={barRefkey} />
        </Namespace>
        <hbr />
        <hbr />
        <Namespace name="B">
          <Reference refkey={barRefkey} />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      using A;

      namespace A {
        scalar Bar
      }

      namespace B {
        Bar
      }`,
  });
});

it("properly resolves types in different directories", () => {
  const barRefkey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceDirectory path="dir1">
        <SourceFile path="a.tsp">
          <Namespace name="A">
            <ScalarDeclaration name="Bar" refkey={barRefkey} />
          </Namespace>
        </SourceFile>
      </SourceDirectory>
      <SourceDirectory path="dir2">
        <SourceFile path="b.tsp">
          <Reference refkey={barRefkey} />
        </SourceFile>
      </SourceDirectory>
    </Output>,
  ).toRenderTo({
    "dir1/a.tsp": `
      namespace A;

      scalar Bar`,
    "dir2/b.tsp": `
      import "../dir1/a.tsp";

      using A;

      Bar`,
  });
});
