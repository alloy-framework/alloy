import { Output } from "@alloy-js/core";
import { beforeEach, expect, it } from "vitest";
import { resetProgram } from "../../contexts/program.js";
import { createTypeSpecNamePolicy } from "../../name-policy.js";
import { ModelDeclaration } from "../model/model-declaration.jsx";
import { ModelProperty } from "../model/model-property.jsx";
import { SourceFile } from "../source-file/source-file.jsx";
import {
  DocComment,
  DocParam,
  DocReturns,
  DocTemplate,
  DocWhen,
} from "./doc-comment.jsx";

beforeEach(() => {
  resetProgram();
});

it("renders a simple doc comment", () => {
  expect(<DocComment>A pet in the store</DocComment>).toRenderTo(`
    /**
     * A pet in the store
     */
  `);
});

it("renders a doc comment with @param tag", () => {
  expect(
    <DocComment>
      Get a pet by ID
      <DocParam name="id">The unique identifier</DocParam>
    </DocComment>,
  ).toRenderTo(`
    /**
     * Get a pet by ID
     * @param id The unique identifier
     */
  `);
});

it("renders a doc comment with @returns tag", () => {
  expect(
    <DocComment>
      Get a pet
      <DocReturns>The pet object</DocReturns>
    </DocComment>,
  ).toRenderTo(`
    /**
     * Get a pet
     * @returns The pet object
     */
  `);
});

it("renders a doc comment with @template tag", () => {
  expect(
    <DocComment>
      A container type
      <DocTemplate name="T">The element type</DocTemplate>
    </DocComment>,
  ).toRenderTo(`
    /**
     * A container type
     * @template T The element type
     */
  `);
});

it("renders a doc comment with multiple tags", () => {
  expect(
    <DocComment>
      Create a new pet
      <DocParam name="name">The pet name</DocParam>
      <DocParam name="age">The pet age</DocParam>
      <DocReturns>The created pet</DocReturns>
    </DocComment>,
  ).toRenderTo(`
    /**
     * Create a new pet
     * @param name The pet name
     * @param age The pet age
     * @returns The created pet
     */
  `);
});

it("renders a doc comment before a model declaration", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DocComment>A pet in the store</DocComment>
        <hbr />
        <ModelDeclaration name="Pet">
          <ModelProperty name="name" type="string" />
        </ModelDeclaration>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      /**
       * A pet in the store
       */
      model Pet {
        name: string
      }
    `,
  });
});

it("renders DocWhen when doc is provided", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DocWhen doc="A pet in the store" />
        <ModelDeclaration name="Pet" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      /**
       * A pet in the store
       */
      model Pet {}
    `,
  });
});

it("renders nothing for DocWhen when doc is undefined", () => {
  expect(
    <Output namePolicy={createTypeSpecNamePolicy()}>
      <SourceFile path="main.tsp">
        <DocWhen doc={undefined} />
        <ModelDeclaration name="Pet" />
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "main.tsp": `
      model Pet {}
    `,
  });
});
