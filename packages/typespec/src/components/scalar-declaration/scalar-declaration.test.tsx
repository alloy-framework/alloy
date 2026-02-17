import { Output, StatementList } from "@alloy-js/core";
import { d, renderToString } from "@alloy-js/core/testing";
import { beforeEach, expect, it } from "vitest";
import { resetGlobalNamespace } from "../../contexts/index.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Namespace } from "../namespace/namespace.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ScalarDeclaration } from "./scalar-declaration.jsx";

beforeEach(() => {
  resetGlobalNamespace();
});

it("renders a scalar", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="Foo" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      scalar Foo
    `,
  });
});

it("renders a scalar with 'is'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="Foo" is="string" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      scalar Foo is string
    `,
  });
});

it("renders a scalar with 'extends'", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ScalarDeclaration name="Foo" extends="Bar" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      scalar Foo extends Bar
    `,
  });
});

it("throws if both 'is' and 'extends' are provided", () => {
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
  ).toRenderTo({
    "main.tsp": d`
      scalar \`model\`
    `,
  });
});

it("does not deconflict names across namespaces", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <Namespace name="A">
          <ScalarDeclaration name="Foo" />
        </Namespace>
        <hbr />
        <Namespace name="B">
          <ScalarDeclaration name="Foo" />
        </Namespace>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": d`
      namespace A {
        scalar Foo
      }
      namespace B {
        scalar Foo
      }`,
  });
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
  ).toRenderTo({
    "main.tsp": d`
      namespace A {
        scalar Foo;
        scalar Foo_2;
      }`,
  });
});
