import { Output } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { ModelDeclaration } from "../components/model/model-declaration.jsx";
import { Reference } from "../components/reference/reference.jsx";
import { ScalarDeclaration } from "../components/scalar-declaration/scalar-declaration.jsx";
import { SourceFile } from "../components/source-file/source-file.jsx";
import { resetProgram } from "../contexts/program.js";
import { createLibrary } from "../create-library.js";
import { createTypeSpecNamePolicy } from "../name-policy.js";
import Http from "./TypeSpec/Http/index.js";
import TypeSpec from "./TypeSpec/index.js";
import OpenAPI3 from "./TypeSpec/OpenAPI/openapi3.js";
import Reflection from "./TypeSpec/Reflection/index.js";
import Versioning from "./TypeSpec/Versioning/index.js";

beforeEach(() => {
  resetProgram();
});

it("references to implicitly-used library types emit no import or using", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={TypeSpec.Record} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`Record`);
});

it("references to implicitly-used scalars emit no import or using", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration
          name="MyId"
          extends={<Reference refkey={TypeSpec.string} />}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`scalar MyId extends string`);
});

it("references to compiler library types emit using but no import", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={Reflection.Model} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    using TypeSpec.Reflection;

    Model
  `);
});

it("references to external library types emit package import and using", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={Http.OkResponse} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "@typespec/http";

    using TypeSpec.Http;

    OkResponse
  `);
});

it("references to versioning decorators emit package import and using", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={Versioning.added} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "@typespec/versioning";

    using TypeSpec.Versioning;

    added
  `);
});

it("same namespace from different packages emits correct imports", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={OpenAPI3.oneOf} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "@typespec/openapi3";

    using TypeSpec.OpenAPI;

    oneOf
  `);
});

it("deduplicates using when referencing multiple symbols from same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={Http.OkResponse} />{" "}
        <Reference refkey={Http.NotFoundResponse} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "@typespec/http";

    using TypeSpec.Http;

    OkResponse NotFoundResponse
  `);
});

it("can render same library symbol multiple times", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={TypeSpec.string} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`string`);

  resetProgram();

  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={TypeSpec.string} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`string`);
});

it("renders library reference with custom createLibrary options", () => {
  const MyLib = createLibrary(
    "MyCustom.Lib",
    {
      Foo: { kind: "model", members: {} },
    },
    { packageImport: "@my/custom-lib" },
  );

  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={MyLib.Foo} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    import "@my/custom-lib";

    using MyCustom.Lib;

    Foo
  `);
});

it("renders library reference used as model property type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Pet">
          name: <Reference refkey={TypeSpec.string} />;
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model Pet {
      name: string;
    }
  `);
});

it("renders model with 'is' using a templated builtin type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="StringMap"
          is={<Reference refkey={TypeSpec.Record} typeArgs={["unknown"]} />}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`model StringMap is Record<unknown>`);
});

it("renders model extending a templated builtin with another builtin arg", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="Tags"
          is={
            <Reference
              refkey={TypeSpec.Array}
              typeArgs={[<Reference refkey={TypeSpec.string} />]}
            />
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`model Tags is Array<string>`);
});

it("accessing a member with an inline anonymous type does not crash", () => {
  // DiscriminatedOptions.envelope has type: { kind: "union", members: {} }
  // This should not throw even though the type is an inline descriptor
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={TypeSpec.DiscriminatedOptions.envelope} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`DiscriminatedOptions.envelope`);
});

it("accessing a member whose type is a library symbol reference works", () => {
  // DiscriminatedOptions.discriminatorPropertyName has type: () => dataTypes.string
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference
          refkey={TypeSpec.DiscriminatedOptions.discriminatorPropertyName}
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`DiscriminatedOptions.discriminatorPropertyName`);
});

it("renders enum member with parent type path (e.g. Lifecycle.Read)", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Reference refkey={TypeSpec.Lifecycle.Read} />
      </SourceFile>
    </Output>,
  ).toRenderTo(`Lifecycle.Read`);
});
