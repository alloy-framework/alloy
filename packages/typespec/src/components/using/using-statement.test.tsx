import { Output, refkey } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { ScalarDeclaration } from "../scalar-declaration/scalar-declaration.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { Reference } from "../reference/reference.jsx";
import { UsingStatement } from "./using-statement.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a single using statement", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UsingStatement name="TypeSpec.Http" />
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      using TypeSpec.Http;

      scalar Foo`,
  });
});

it("renders multiple using statements", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UsingStatement name="TypeSpec.Http" />
        <UsingStatement name="TypeSpec.Rest" />
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      using TypeSpec.Http;
      using TypeSpec.Rest;

      scalar Foo`,
  });
});

it("deduplicates usings with auto-generated ones", () => {
  const barRefkey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UsingStatement name="A" />
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

it("renders using alongside import", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UsingStatement name="TypeSpec.Http" />
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      using TypeSpec.Http;

      scalar Foo`,
  });
});
