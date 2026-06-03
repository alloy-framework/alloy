import { Output, refkey } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { ScalarDeclaration } from "../scalar-declaration/scalar-declaration.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ImportStatement } from "./import-statement.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a single import statement", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ImportStatement path="./models.tsp" />
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "./models.tsp";

    scalar Foo
  `);
});

it("renders multiple import statements", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ImportStatement path="./models.tsp" />
        <ImportStatement path="@typespec/rest" />
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "./models.tsp";
    import "@typespec/rest";

    scalar Foo
  `);
});

it("deduplicates imports with auto-generated ones", () => {
  const barRefkey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="models.tsp">
        <Namespace name="Models">
          <ScalarDeclaration name="Bar" refkey={barRefkey} />
        </Namespace>
      </SourceFile>
      <SourceFile path="main.tsp">
        <ImportStatement path="./models.tsp" />
        <Reference refkey={barRefkey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "models.tsp": `
      namespace Models;

      scalar Bar`,
    "main.tsp": `
      import "./models.tsp";

      using Models;

      Bar`,
  });
});

it("renders an import for a library package", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ImportStatement path="@typespec/http" />
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "@typespec/http";

    scalar Foo
  `);
});
