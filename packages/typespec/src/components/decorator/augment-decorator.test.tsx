import { Output, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { AugmentDecorator } from "./augment-decorator.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an augment decorator with no extra arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ModelDeclaration name="Dog" />
          <AugmentDecorator decorator="error" target="Dog" />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {};
      @@error(Dog);
    `,
  });
});

it("renders an augment decorator with arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ModelDeclaration name="Dog" />
          <AugmentDecorator decorator="tag" target="Dog" args={['"Sample"']} />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {};
      @@tag(Dog, "Sample");
    `,
  });
});

it("renders an augment decorator with multiple arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ModelDeclaration name="Dog" />
          <AugmentDecorator
            decorator="encode"
            target="Dog"
            args={['"rfc3339"', '"string"']}
          />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {};
      @@encode(Dog, "rfc3339", "string");
    `,
  });
});

it("renders an augment decorator targeting a member", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ModelDeclaration name="Dog" />
          <AugmentDecorator
            decorator="doc"
            target="Dog.name"
            args={['"The name"']}
          />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {};
      @@doc(Dog.name, "The name");
    `,
  });
});

it("renders an augment decorator with a qualified decorator name", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ModelDeclaration name="Dog" />
          <AugmentDecorator
            decorator="TypeSpec.tag"
            target="Dog"
            args={['"Sample"']}
          />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {};
      @@TypeSpec.tag(Dog, "Sample");
    `,
  });
});

it("renders arguments on multiple lines when they exceed print width", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()} printWidth={20}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ModelDeclaration name="Dog" />
          <AugmentDecorator
            decorator="encode"
            target="Dog"
            args={['"rfc3339"', '"string"']}
          />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Dog {};
      @@encode(
        Dog,
        "rfc3339",
        "string"
      );
    `,
  });
});
