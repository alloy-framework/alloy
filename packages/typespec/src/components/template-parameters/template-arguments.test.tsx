import { Output } from "@alloy-js/core";
import { expect, it } from "vitest";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { AliasDeclaration } from "../alias/alias-declaration.jsx";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import { TemplateArguments } from "./template-arguments.jsx";

it("renders positional template arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="MyBox"
          type={
            <>
              Box
              <TemplateArguments args={["string"]} />
            </>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    alias MyBox = Box<string>
  `);
});

it("renders named template arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="MyBox"
          type={
            <>
              Box
              <TemplateArguments args={[{ name: "T", value: "string" }]} />
            </>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    alias MyBox = Box<T = string>
  `);
});

it("renders mixed positional and named template arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="MyPair"
          type={
            <>
              Pair
              <TemplateArguments
                args={["int32", { name: "B", value: "boolean" }]}
              />
            </>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    alias MyPair = Pair<int32, B = boolean>
  `);
});

it("renders multiple positional template arguments", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <AliasDeclaration
          name="MyMap"
          type={
            <>
              Record
              <TemplateArguments args={["string", "int32"]} />
            </>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    alias MyMap = Record<string, int32>
  `);
});

it("renders template arguments in model extends", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <ModelDeclaration
          name="StringBox"
          extends={
            <>
              Box
              <TemplateArguments args={["string"]} />
            </>
          }
        />
      </SourceFile>
    </Output>,
  ).toRenderTo(`
    model StringBox extends Box<string> {}
  `);
});
