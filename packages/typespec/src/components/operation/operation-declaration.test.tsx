import { Output, refkey, StatementList } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { OperationDeclaration } from "./operation-declaration.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an operation with no parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration name="ping" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op ping(): void`,
  });
});

it("renders an operation with parameters and return type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="getPet"
            parameters={[{ name: "name", type: "string" }]}
            returnType="Pet"
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op getPet(name: string): Pet`,
  });
});

it("renders an operation with 'is'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration name="deletePet" is="Delete" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op deletePet is Delete`,
  });
});

it("throws if both 'is' and 'parameters' are provided", () => {
  const consoleMock = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleMock.mockReset();
  });

  expect(() =>
    renderToString(
      <Output namePolicy={createTypeSpecNamePolicy()}>
        <SourceFile path="main.tsp">
          <Namespace name="A">
            <OperationDeclaration
              name="foo"
              is="Delete"
              parameters={[{ name: "id", type: "string" }]}
            />
          </Namespace>
        </SourceFile>
      </Output>,
    ),
  ).toThrow(
    "An operation declaration cannot have both 'is' and 'parameters'/'returnType' properties.",
  );
});

it("applies the operation name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration name="model" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op \`model\`(): void`,
  });
});

it("deconflicts duplicate operation names within the same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <StatementList>
            <OperationDeclaration name="ping" />
            <OperationDeclaration name="ping" />
          </StatementList>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op ping(): void;
      op ping_2(): void;`,
  });
});

it("renders an operation with multiple parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="createPet"
            parameters={[
              { name: "name", type: "string" },
              { name: "age", type: "int32" },
            ]}
            returnType="Pet"
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op createPet(name: string, age: int32): Pet`,
  });
});

it("renders an operation in multiple lines if parameters exceed line length limit", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()} printWidth={10}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="createPet"
            parameters={[
              { name: "name", type: "string" },
              { name: "age", type: "int32" },
            ]}
            returnType="Pet"
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op createPet(
        name: string,
        age: int32
      ): Pet`,
  });
});

it("renders an operation with an optional parameter", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="listPets"
            parameters={[{ name: "filter", type: "string", optional: true }]}
            returnType="Pet[]"
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op listPets(filter?: string): Pet[]`,
  });
});

it("renders an operation with template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="ReadResource"
            templateParameters={["T"]}
            parameters={[{ name: "id", type: "string" }]}
            returnType="T"
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op ReadResource<T>(id: string): T`,
  });
});

it("renders an operation with constrained template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="ReadResource"
            templateParameters={[
              { name: "T", extends: "BaseModel", default: "DefaultModel" },
            ]}
            parameters={[{ name: "id", type: "string" }]}
            returnType="T"
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op ReadResource<T extends BaseModel = DefaultModel>(id: string): T`,
  });
});

it("resolves template parameter references within the operation", () => {
  const tKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="ReadResource"
            templateParameters={[{ name: "T", refkey: tKey }]}
            parameters={[{ name: "id", type: "string" }]}
            returnType={<Reference refkey={tKey} />}
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      namespace A;

      op ReadResource<T>(id: string): T`,
  });
});

it("does not resolve template parameter references outside the operation", () => {
  const tKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <OperationDeclaration
            name="ReadResource"
            templateParameters={[{ name: "T", refkey: tKey }]}
            parameters={[{ name: "id", type: "string" }]}
            returnType="T"
          />
          <hbr />
          <Reference refkey={tKey} />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": expect.stringContaining("Unresolved Symbol"),
  });
});
