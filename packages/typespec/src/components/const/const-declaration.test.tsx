import { Output, refkey, StatementList } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { Reference } from "../reference/reference.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { ConstDeclaration } from "./const-declaration.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a const declaration with a value", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ConstDeclaration name="maxAge" value="255" />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
      const maxAge = 255
  `);
});

it("renders a const declaration with a type annotation", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ConstDeclaration name="maxAge" type="uint8" value="255" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      const maxAge: uint8 = 255
    `,
  });
});

it("renders a const declaration with a string value", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ConstDeclaration name="greeting" value={`"hello"`} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      const greeting = "hello"
    `,
  });
});

it("resolves a const reference from another declaration", () => {
  const maxAgeKey = refkey();
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <StatementList>
          <ConstDeclaration name="maxAge" value="255" refkey={maxAgeKey} />
          <ConstDeclaration
            name="limit"
            value={<Reference refkey={maxAgeKey} />}
          />
        </StatementList>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      const maxAge = 255;
      const limit = maxAge;
    `,
  });
});

it("renders a const with an object value expression", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ConstDeclaration name="origin" value={"#{ x: 0, y: 0 }"} />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      const origin = #{ x: 0, y: 0 }
    `,
  });
});
