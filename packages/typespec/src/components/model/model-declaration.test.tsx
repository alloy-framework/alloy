import { Output, refkey, StatementList } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ModelDeclaration } from "./model-declaration.jsx";
import { ModelExpression } from "./model-expression.jsx";
import { ModelProperty } from "./model-property.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an empty model", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {}
    `,
  });
});

it("renders a model with properties", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Foo">
          <StatementList>
            <ModelProperty name="name" type="string" />
            <ModelProperty name="age" type="int32" optional />
          </StatementList>
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {
        name: string;
        age?: int32;
      }
    `,
  });
});

it("renders a model with 'extends'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Bar" extends="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Bar extends Foo {}
    `,
  });
});

it("renders a model with 'extends' and properties", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Bar" extends="Foo">
          <ModelProperty name="extra" type="boolean" />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Bar extends Foo {
        extra: boolean
      }
    `,
  });
});

it("renders a model with 'is'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="MyString" is="string" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model MyString is string
    `,
  });
});

it("throws if 'is' and 'extends' are both provided", () => {
  const consoleMock = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleMock.mockReset();
  });

  expect(() =>
    renderToString(
      <Output namePolicy={createTypeSpecNamePolicy()}>
        <SourceFile path="main.tsp">
          <ModelDeclaration name="Foo" is="string" extends="Bar" />
        </SourceFile>
      </Output>,
    ),
  ).toThrow(
    "A model declaration cannot have both 'is' and 'extends'/'children' properties.",
  );
});

it("throws if 'is' and children are both provided", () => {
  const consoleMock = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleMock.mockReset();
  });

  expect(() =>
    renderToString(
      <Output namePolicy={createTypeSpecNamePolicy()}>
        <SourceFile path="main.tsp">
          <ModelDeclaration name="Foo" is="string">
            <ModelProperty name="name" type="string" />
          </ModelDeclaration>
        </SourceFile>
      </Output>,
    ),
  ).toThrow(
    "A model declaration cannot have both 'is' and 'extends'/'children' properties.",
  );
});

it("applies the model name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="model" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model \`model\` {}
    `,
  });
});

it("applies the model-property name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Foo">
          <ModelProperty name="model" type="string" />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {
        \`model\`: string
      }
    `,
  });
});

it("does not deconflict model names across namespaces", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ModelDeclaration name="Foo" />
        </Namespace>
        <hbr />
        <hbr />
        <Namespace name="B">
          <ModelDeclaration name="Foo" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A {
        model Foo {}
      }

      namespace B {
        model Foo {}
      }
    `,
  });
});

it("deconflicts duplicate model names within the same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <StatementList>
            <ModelDeclaration name="Foo" />
            <ModelDeclaration name="Foo" />
          </StatementList>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      model Foo {};
      model Foo_2 {};
    `,
  });
});

it("renders a model with template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Container" templateParameters={["T"]} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Container<T> {}
    `,
  });
});

it("renders a model with constrained template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Wrapper"
          templateParameters={[{ name: "T", extends: "BaseModel" }]}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Wrapper<T extends BaseModel> {}
    `,
  });
});

it("resolves template parameter references within the model", () => {
  const typeKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Container"
          templateParameters={[{ name: "T", refkey: typeKey }]}
        >
          <ModelProperty name="value" type={<Reference refkey={typeKey} />} />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Container<T> {
        value: T
      }
    `,
  });
});

it("does not resolve template parameter references outside the model", () => {
  const typeKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Container"
          templateParameters={[{ name: "T", refkey: typeKey }]}
        />
        <hbr />
        <Reference refkey={typeKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": expect.stringContaining("Unresolved Symbol"),
  });
});

it("resolves a model reference from another declaration", () => {
  const fooKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ModelDeclaration name="Foo" refkey={fooKey} />
          <ModelDeclaration
            name="Bar"
            extends={<Reference refkey={fooKey} />}
          />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {};
      model Bar extends Foo {};
    `,
  });
});

it("resolves a model property reference", () => {
  const propKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Foo">
          <ModelProperty name="id" type="string" refkey={propKey} />
        </ModelDeclaration>
        <hbr />
        <Reference refkey={propKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {
        id: string
      }
      id
    `,
  });
});

it("renders a model expression as a property type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Foo">
          <ModelProperty
            name="nested"
            type={
              <ModelExpression>
                <ModelProperty name="x" type="int32" />
              </ModelExpression>
            }
          />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {
        nested: {
          x: int32
        }
      }
    `,
  });
});

it("renders a model expression as 'extends'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Foo"
          extends={
            <ModelExpression>
              <ModelProperty name="id" type="string" />
            </ModelExpression>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo extends {
        id: string
      } {}
    `,
  });
});

it("renders a model expression as 'is'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Foo"
          is={
            <ModelExpression>
              <ModelProperty name="id" type="string" />
            </ModelExpression>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo is {
        id: string
      }
    `,
  });
});
