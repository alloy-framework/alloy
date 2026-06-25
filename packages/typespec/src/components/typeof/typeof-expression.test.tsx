import { Output, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { Namespace } from "../namespace/namespace.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { TypeOfExpression } from "./typeof-expression.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a typeof expression", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Test">
          <ModelDeclaration name="Foo">
            <StatementList>
              <ModelProperty
                name="prop"
                type={<TypeOfExpression value="someValue" />}
              />
            </StatementList>
          </ModelDeclaration>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace Test;

      model Foo {
        prop: typeof someValue;
      }
    `);
});

it("renders typeof with a complex expression", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Test">
          <ModelDeclaration name="Foo">
            <StatementList>
              <ModelProperty
                name="prop"
                type={<TypeOfExpression value="Config.defaultValue" />}
              />
            </StatementList>
          </ModelDeclaration>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace Test;

      model Foo {
        prop: typeof Config.defaultValue;
      }
    `);
});
