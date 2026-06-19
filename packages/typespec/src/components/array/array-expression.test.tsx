import { Output, refkey } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ArrayExpression } from "./array-expression.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an array expression with a simple type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ArrayExpression type="string" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`string[]`);
});

it("renders an array expression with a reference", () => {
  const petKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Pet" refkey={petKey} />
        <hbr />
        <ArrayExpression type={<Reference refkey={petKey} />} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Pet {}
    Pet[]
  `);
});

it("renders an array expression as a model property type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Page">
          <ModelProperty
            name="items"
            type={<ArrayExpression type="string" />}
          />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Page {
      items: string[]
    }
  `);
});
