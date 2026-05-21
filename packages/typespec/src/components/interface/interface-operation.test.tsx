import { Output, refkey, StatementList } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { beforeEach, expect, it, vi } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { InterfaceDeclaration } from "./interface-declaration.jsx";
import { InterfaceOperationDeclaration } from "./interface-operation.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an operation with no parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration name="ping" />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        ping(): void
      }
    `,
  });
});

it("renders an operation with parameters and return type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration
            name="getPet"
            parameters={[{ name: "name", type: "string" }]}
            returnType="Pet"
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        getPet(name: string): Pet
      }
    `,
  });
});

it("renders an operation with 'is'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration name="deletePet" is="Delete" />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        deletePet is Delete
      }
    `,
  });
});

it("throws if both 'is' and 'parameters' are provided", () => {
  const consoleMock = vi.spyOn(console, "error").mockImplementation(() => {});

  expect(() =>
    renderToString(
      <Output namePolicy={createTypeSpecNamePolicy()}>
        <SourceFile path="main.tsp">
          <InterfaceDeclaration name="Foo">
            <InterfaceOperationDeclaration
              name="bar"
              is="Delete"
              parameters={[{ name: "id", type: "string" }]}
            />
          </InterfaceDeclaration>
        </SourceFile>
      </Output>,
    ),
  ).toThrow(
    "An operation declaration cannot have both 'is' and 'parameters'/'returnType' properties.",
  );

  consoleMock.mockRestore();
});

it("applies the operation name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration name="model" />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        \`model\`(): void
      }
    `,
  });
});

it("renders an operation with multiple parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration
            name="createPet"
            parameters={[
              { name: "name", type: "string" },
              { name: "age", type: "int32" },
            ]}
            returnType="Pet"
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        createPet(name: string, age: int32): Pet
      }
    `,
  });
});

it("renders in multiple lines if parameters exceed line length limit", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()} printWidth={10}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration
            name="createPet"
            parameters={[
              { name: "name", type: "string" },
              { name: "age", type: "int32" },
            ]}
            returnType="Pet"
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        createPet(
          name: string,
          age: int32
        ): Pet
      }
    `,
  });
});

it("renders an operation with an optional parameter", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration
            name="listPets"
            parameters={[{ name: "filter", type: "string", optional: true }]}
            returnType="Pet[]"
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        listPets(filter?: string): Pet[]
      }
    `,
  });
});

it("renders an operation with template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration
            name="ReadResource"
            templateParameters={["T"]}
            parameters={[{ name: "id", type: "string" }]}
            returnType="T"
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        ReadResource<T>(id: string): T
      }
    `,
  });
});

it("renders an operation with constrained template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration
            name="ReadResource"
            templateParameters={[
              { name: "T", extends: "BaseModel", default: "DefaultModel" },
            ]}
            parameters={[{ name: "id", type: "string" }]}
            returnType="T"
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        ReadResource<T extends BaseModel = DefaultModel>(id: string): T
      }
    `,
  });
});

it("resolves template parameter references within the operation", () => {
  const tKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <InterfaceOperationDeclaration
            name="ReadResource"
            templateParameters={[{ name: "T", refkey: tKey }]}
            parameters={[{ name: "id", type: "string" }]}
            returnType={<Reference refkey={tKey} />}
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      interface Foo {
        ReadResource<T>(id: string): T
      }
    `,
  });
});

it("does not resolve template parameter references outside the operation", () => {
  const tKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <StatementList>
            <InterfaceOperationDeclaration
              name="ReadResource"
              templateParameters={[{ name: "T", refkey: tKey }]}
              parameters={[{ name: "id", type: "string" }]}
              returnType="T"
            />
            <InterfaceOperationDeclaration
              name="other"
              returnType={<Reference refkey={tKey} />}
            />
          </StatementList>
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": expect.stringContaining("Unresolved Symbol"),
  });
});
