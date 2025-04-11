import { Props, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import * as ts from "../src/components/index.js";
import { ParameterDescriptor } from "../src/components/index.js";
import { TypeFunction } from "../src/components/TypeFunction.jsx";
import { toSourceText } from "./utils.jsx";

it("render basic", () => {
  expect(toSourceText(<TypeFunction />)).toBe(d`
    () => void
    `);
});

it("render in interface", () => {
  expect(
    toSourceText(
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMember name="foo" type={<TypeFunction />} />
      </ts.InterfaceDeclaration>,
    ),
  ).toBe(d`
      interface Foo {
        foo: () => void
      }
    `);
});

it("can be an async function", () => {
  expect(toSourceText(<TypeFunction async />)).toBe(d`
     async () => Promise<void>
  `);
});

it("can be an async function with returnType", () => {
  expect(toSourceText(<TypeFunction async returnType="Foo" />)).toBe(d`
    async () => Promise<Foo>
  `);
});

it("can be an async function with returnType element", () => {
  function Foo(_props?: Props) {
    return <>Foo</>;
  }
  expect(toSourceText(<TypeFunction async returnType={<Foo />} />)).toBe(d`
    async () => Promise<Foo>
  `);
});

it("supports parameters by element", () => {
  const decl = (
    <TypeFunction>
      <TypeFunction.Parameters>a, b</TypeFunction.Parameters>
    </TypeFunction>
  );

  expect(toSourceText(decl)).toBe(d`
    (a, b) => void
  `);
});

it("supports type parameters by descriptor object", () => {
  const decl = (
    <TypeFunction
      typeParameters={[
        { name: "a", extends: "any" },
        { name: "b", extends: "any" },
      ]}
    ></TypeFunction>
  );

  expect(toSourceText(decl)).toBe(d`
    <a extends any, b extends any>() => void
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = <TypeFunction typeParameters={["a", "b"]}></TypeFunction>;

  expect(toSourceText(decl)).toBe(d`
    <a, b>() => void
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <TypeFunction>
      <TypeFunction.TypeParameters>a, b</TypeFunction.TypeParameters>
    </TypeFunction>
  );

  expect(toSourceText(decl)).toBe(d`
    <a, b>() => void
  `);
});

describe("symbols", () => {
  it("create optional parameters", () => {
    const paramDesc: ParameterDescriptor = {
      name: "foo",
      refkey: refkey(),
      type: "any",
      optional: true,
    };
    const decl = (
      <>
        <TypeFunction parameters={[paramDesc]}></TypeFunction>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      (foo?: any) => void
    `);
  });
});
