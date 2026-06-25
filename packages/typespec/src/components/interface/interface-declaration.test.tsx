import { Output, refkey, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { OperationDeclaration } from "../operation/operation-declaration.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { InterfaceDeclaration } from "./interface-declaration.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders an empty interface", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Foo {}
    `);
});

it("renders an interface with operations", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo">
          <OperationDeclaration name="bar" />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Foo {
        bar(): void
      }
    `);
});

it("renders an interface with extends", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Bar" extends="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Bar extends Foo {}
    `);
});

it("renders an interface with extends and operations", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Bar" extends="Foo">
          <OperationDeclaration
            name="extra"
            parameters={[{ name: "id", type: "string" }]}
            returnType="void"
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Bar extends Foo {
        extra(id: string): void
      }
    `);
});

it("renders an interface with template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="Foo" templateParameters={["T"]} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Foo<T> {}
    `);
});

it("renders an interface with constrained template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration
          name="Foo"
          templateParameters={[
            { name: "T", extends: "BaseModel", default: "DefaultModel" },
          ]}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Foo<T extends BaseModel = DefaultModel> {}
    `);
});

it("resolves template parameter references within the interface", () => {
  const tKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration
          name="ResourceOps"
          templateParameters={[{ name: "T", refkey: tKey }]}
        >
          <OperationDeclaration
            name="get"
            parameters={[{ name: "id", type: "string" }]}
            returnType={<Reference refkey={tKey} />}
          />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface ResourceOps<T> {
        get(id: string): T
      }
    `);
});

it("does not resolve template parameter references outside the interface", () => {
  const tKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration
          name="ResourceOps"
          templateParameters={[{ name: "T", refkey: tKey }]}
        />
        <hbr />
        <Reference refkey={tKey} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": expect.stringContaining("Unresolved Symbol"),
  });
});

it("applies the interface name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="model" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface \`model\` {}
    `);
});

it("deconflicts duplicate interface names within the same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <InterfaceDeclaration name="Foo" />
          <InterfaceDeclaration name="Foo" />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Foo {};
      interface Foo_2 {};
    `);
});

it("resolves an interface reference from another declaration", () => {
  const fooKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <InterfaceDeclaration name="Foo" refkey={fooKey} />
          <InterfaceDeclaration
            name="Bar"
            extends={<Reference refkey={fooKey} />}
          />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      interface Foo {};
      interface Bar extends Foo {};
    `);
});

it("renders an interface with a doc comment", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <InterfaceDeclaration name="PetStore" doc="Pet store API">
          <OperationDeclaration name="getPet" returnType="Pet" />
        </InterfaceDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      /**
       * Pet store API
       */
      interface PetStore {
        getPet(): Pet
      }
    `);
});
