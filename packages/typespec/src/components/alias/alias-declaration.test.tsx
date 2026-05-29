import { Output, refkey, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { UnionExpression } from "../union/union-expression.jsx";
import { AliasDeclaration } from "./alias-declaration.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a basic alias", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration name="StringOrInt" type={`string | int32`} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      alias StringOrInt = string | int32
    `,
  });
});

it("renders an alias with union expression children", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="Breed"
          type={
            <UnionExpression
              types={["Beagle", "GermanShepherd", "GoldenRetriever"]}
            />
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      alias Breed = Beagle | GermanShepherd | GoldenRetriever
    `,
  });
});

it("renders an alias with template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration name="Response" templateParameters={["T"]} type="T" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      alias Response<T> = T
    `,
  });
});

it("renders an alias with constrained template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="StringAlias"
          templateParameters={[{ name: "T", extends: "string" }]}
          type="T"
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      alias StringAlias<T extends string> = T
    `,
  });
});

it("renders an alias with default template parameter", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="Options"
          templateParameters={[
            { name: "T", extends: "string", default: `"default"` },
          ]}
          type="T"
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      alias Options<T extends string = "default"> = T
    `,
  });
});

it("applies the alias name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration name="model" type="string" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      alias \`model\` = string
    `,
  });
});

it("deconflicts duplicate alias names within the same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <StatementList>
            <AliasDeclaration name="Options" type="string" />
            <AliasDeclaration name="Options" type="int32" />
          </StatementList>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      alias Options = string;
      alias Options_2 = int32;
    `,
  });
});

it("resolves an alias reference from another declaration", () => {
  const optionsKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <AliasDeclaration
            name="Options"
            refkey={optionsKey}
            type={`"one" | "two"`}
          />
          <ModelDeclaration name="Foo">
            <Reference refkey={optionsKey} />
          </ModelDeclaration>
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      alias Options = "one" | "two";
      model Foo {
        Options
      };
    `,
  });
});

it("resolves an alias reference across namespaces", () => {
  const optionsKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <AliasDeclaration name="Options" refkey={optionsKey} type="string" />
        </Namespace>
        <hbr />
        <hbr />
        <Namespace name="B">
          <Reference refkey={optionsKey} />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      using A;

      namespace A {
        alias Options = string
      }

      namespace B {
        Options
      }
    `,
  });
});

it("renders an alias with a doc comment", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="Options"
          type={'"one" | "two"'}
          doc="Available options"
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      /**
       * Available options
       */
      alias Options = "one" | "two"
    `,
  });
});
