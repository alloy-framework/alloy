import { Output, refkey } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { UnionExpression } from "./union-expression.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a union expression with two types", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionExpression types={["string", "int32"]} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `string | int32`,
  });
});

it("renders a union expression with more than two types", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <UnionExpression types={["string", "int32", "boolean"]} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `string | int32 | boolean`,
  });
});

it("renders a union expression with a reference", () => {
  const fooKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Foo" refkey={fooKey} />
        <hbr />
        <UnionExpression types={["string", <Reference refkey={fooKey} />]} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {}
      string | Foo
    `,
  });
});

it("renders a union expression as a model property type", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration name="Foo">
          <ModelProperty
            name="value"
            type={<UnionExpression types={["string", "null"]} />}
          />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Foo {
        value: string | null
      }
    `,
  });
});
