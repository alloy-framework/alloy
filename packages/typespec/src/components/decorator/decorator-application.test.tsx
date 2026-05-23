import { Output } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { DecoratorApplication } from "./decorator-application.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a decorator with no arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="NotFoundError"
          decorators={<DecoratorApplication decorator="error" />}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      @error
      model NotFoundError {}
    `,
  });
});

it("renders a decorator with a single argument", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Dog"
          decorators={
            <DecoratorApplication decorator="tag" args={['"Sample"']} />
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      @tag("Sample")
      model Dog {}
    `,
  });
});

it("renders a decorator with multiple arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Timestamp"
          decorators={
            <DecoratorApplication
              decorator="encode"
              args={['"rfc3339"', '"string"']}
            />
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      @encode("rfc3339", "string")
      model Timestamp {}
    `,
  });
});

it("renders multiple decorators on a declaration", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Pet"
          decorators={
            <>
              <DecoratorApplication decorator="doc" args={['"A pet"']} />
              <DecoratorApplication decorator="tag" args={['"pets"']} />
            </>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      @doc("A pet")
      @tag("pets")
      model Pet {}
    `,
  });
});

it("renders a decorator on a model property", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Dog">
          <ModelProperty
            name="name"
            type="string"
            decorators={
              <DecoratorApplication decorator="doc" args={['"The name"']} />
            }
          />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {
        @doc("The name")
        name: string
      }
    `,
  });
});

it("renders a decorator with a qualified decorator name", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Pet"
          decorators={
            <DecoratorApplication
              decorator="TypeSpec.doc"
              args={['"A pet"']}
            />
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      @TypeSpec.doc("A pet")
      model Pet {}
    `,
  });
});

it("renders arguments on multiple lines when they exceed print width", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()} printWidth={20}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Timestamp"
          decorators={
            <DecoratorApplication
              decorator="encode"
              args={['"rfc3339"', '"string"']}
            />
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      @encode(
        "rfc3339",
        "string"
      )
      model Timestamp {}
    `,
  });
});
