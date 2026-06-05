import { Output, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { Namespace } from "../namespace/namespace.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { DeprecatedDirective, SuppressDirective } from "./directive.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a #deprecated directive on a model", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Test">
          <ModelDeclaration
            name="LegacyUser"
            directives={<DeprecatedDirective message="Use NewUser instead" />}
          >
            <StatementList>
              <ModelProperty name="name" type="string" />
            </StatementList>
          </ModelDeclaration>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace Test;

      #deprecated "Use NewUser instead"
      model LegacyUser {
        name: string;
      }
    `);
});

it("renders a #suppress directive", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Test">
          <ModelDeclaration
            name="Foo"
            directives={
              <SuppressDirective
                code="deprecated"
                message="Not ready to migrate yet"
              />
            }
          >
            <StatementList>
              <ModelProperty name="name" type="string" />
            </StatementList>
          </ModelDeclaration>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace Test;

      #suppress "deprecated" "Not ready to migrate yet"
      model Foo {
        name: string;
      }
    `);
});

it("renders a #suppress with a scoped diagnostic code", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Test">
          <ModelDeclaration
            name="Foo"
            directives={
              <SuppressDirective
                code="@typespec/http/no-service-found"
                message="standard library route"
              />
            }
          >
            <StatementList>
              <ModelProperty name="name" type="string" />
            </StatementList>
          </ModelDeclaration>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace Test;

      #suppress "@typespec/http/no-service-found" "standard library route"
      model Foo {
        name: string;
      }
    `);
});

it("renders both #suppress and #deprecated together", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="Test">
          <ModelDeclaration
            name="LegacyUser"
            directives={
              <>
                <SuppressDirective code="some-warning" message="justified" />
                <DeprecatedDirective message="Use NewUser instead" />
              </>
            }
          >
            <StatementList>
              <ModelProperty name="name" type="string" />
            </StatementList>
          </ModelDeclaration>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace Test;

      #suppress "some-warning" "justified"
      #deprecated "Use NewUser instead"
      model LegacyUser {
        name: string;
      }
    `);
});
