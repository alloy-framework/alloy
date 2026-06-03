import { Output, refkey, StatementList } from "@alloy-js/core";
import { renderToString } from "@alloy-js/core/testing";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { DecoratorApplication } from "../decorator/decorator-application.jsx";
import { Namespace } from "../namespace/namespace.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ScalarDeclaration } from "./scalar-declaration.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a scalar", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar Foo
    `);
});

it("renders a scalar with 'is'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="Foo" is="string" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar Foo is string
    `);
});

it("renders a scalar with 'extends'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="Foo" extends="Bar" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar Foo extends Bar
    `);
});

it("throws if both 'is' and 'extends' are provided", () => {
  const consoleMock = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleMock.mockReset();
  });

  expect(() =>
    renderToString(
      <Output namePolicy={createTypeSpecNamePolicy()}>
        <SourceFile path="main.tsp">
          <ScalarDeclaration name="Foo" is="string" extends="Bar" />
        </SourceFile>
      </Output>,
    ),
  ).toThrow(
    "A scalar declaration cannot have both 'is' and 'extends' properties.",
  );
});

it("applies the scalar name policy", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="model" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      scalar \`model\`
    `);
});

it("does not deconflict names across namespaces", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration name="Foo" />
        </Namespace>
        <hbr />
        <hbr />
        <Namespace name="B">
          <ScalarDeclaration name="Foo" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace A {
        scalar Foo
      }

      namespace B {
        scalar Foo
      }`);
});

it("deconflicts duplicate names within the same namespace", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <StatementList>
            <ScalarDeclaration name="Foo" />
            <ScalarDeclaration name="Foo" />
          </StatementList>
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace A;

      scalar Foo;
      scalar Foo_2;`);
});

it("renders a scalar with template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration name="Unreal" templateParameters={["Type"]} />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace A;

      scalar Unreal<Type>`);
});

it("renders a scalar with constrained template parameters", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration
            name="Unreal"
            templateParameters={[{ name: "Type", extends: "string" }]}
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace A;

      scalar Unreal<Type extends string>`);
});

it("resolves template parameter references within the scalar", () => {
  const typeKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration
            name="Wrapped"
            templateParameters={[{ name: "T", refkey: typeKey }]}
            extends={<Reference refkey={typeKey} />}
          />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      namespace A;

      scalar Wrapped<T> extends T`);
});

it("does not resolve template parameter references outside the scalar", () => {
  const typeKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration
            name="Wrapped"
            templateParameters={[{ name: "T", refkey: typeKey }]}
          />
          <hbr />
          <Reference refkey={typeKey} />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": expect.stringContaining("Unresolved Symbol"),
  });
});

it("renders a scalar with decorators", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration
          name="myString"
          extends="string"
          decorators={
            <DecoratorApplication decorator="doc" args={['"Custom string"']} />
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      @doc("Custom string")
      scalar myString extends string
    `);
});

it("renders a scalar with a doc comment", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="ipv4" extends="string" doc="An IPv4 address" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      /**
       * An IPv4 address
       */
      scalar ipv4 extends string
    `);
});
