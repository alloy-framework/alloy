import { List, Output, refkey, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { EnumDeclaration } from "../enum/enum-declaration.jsx";
import { EnumMember } from "../enum/enum-member.jsx";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { SpreadExpression } from "./spread-expression.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a spread expression with a string type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Dog">
          <SpreadExpression type="Animal" />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Dog {
      ...Animal
    }
  `);
});

it("renders a spread expression with a reference", () => {
  const animalKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Animal" refkey={animalKey}>
          <ModelProperty name="species" type="string" />
        </ModelDeclaration>
        <hbr />
        <ModelDeclaration name="Dog">
          <SpreadExpression type={<Reference refkey={animalKey} />} />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Animal {
      species: string
    }
    model Dog {
      ...Animal
    }
  `);
});

it("renders a spread expression with additional properties in a statement list", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Dog">
          <StatementList>
            <SpreadExpression type="Animal" />
            <ModelProperty name="breed" type="string" />
          </StatementList>
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Dog {
      ...Animal;
      breed: string;
    }
  `);
});

it("renders a spread expression with additional properties", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Dog">
          <SpreadExpression type="Animal" />
          <hbr />
          <ModelProperty name="breed" type="string" />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Dog {
      ...Animal
      breed: string
    }
  `);
});

it("renders multiple spread expressions", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Dog">
          <SpreadExpression type="Animal" />
          <hbr />
          <SpreadExpression type="Pet" />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Dog {
      ...Animal
      ...Pet
    }
  `);
});

it("renders a spread expression inside an enum", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <EnumDeclaration name="DirectionExt">
          <List comma hardline enderPunctuation>
            <SpreadExpression type="Direction" />
            <EnumMember name="NorthEast" />
            <EnumMember name="SouthWest" />
          </List>
        </EnumDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    enum DirectionExt {
      ...Direction,
      NorthEast,
      SouthWest,
    }
  `);
});

it("resolves a cross-file spread reference with import", () => {
  const animalKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="animal.tsp">
        <Namespace name="Animals">
          <ModelDeclaration name="Animal" refkey={animalKey}>
            <ModelProperty name="species" type="string" />
          </ModelDeclaration>
        </Namespace>
      </SourceFile>
      <SourceFile path="dog.tsp">
        <ModelDeclaration name="Dog">
          <SpreadExpression type={<Reference refkey={animalKey} />} />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "animal.tsp": `
      namespace Animals;

      model Animal {
        species: string
      }
    `,
    "dog.tsp": `
      import "./animal.tsp";

      using Animals;

      model Dog {
        ...Animal
      }
    `,
  });
});
