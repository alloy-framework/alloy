import { Output, refkey } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { IntersectionExpression } from "./intersection-expression.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an intersection expression with two types", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <IntersectionExpression types={["Animal", "Pet"]} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `Animal & Pet`,
  });
});

it("renders an intersection expression with more than two types", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <IntersectionExpression types={["Animal", "Pet", "Named"]} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `Animal & Pet & Named`,
  });
});

it("renders an intersection expression with a reference", () => {
  const animalKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Animal" refkey={animalKey} />
        <hbr />
        <IntersectionExpression
          types={["Pet", <Reference refkey={animalKey} />]}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Animal {}
      Pet & Animal
    `,
  });
});

it("renders an intersection expression as a model property type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Dog">
          <ModelProperty
            name="traits"
            type={<IntersectionExpression types={["Animal", "Pet"]} />}
          />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {
        traits: Animal & Pet
      }
    `,
  });
});
