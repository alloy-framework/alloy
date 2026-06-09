import { Props, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { FunctionType } from "../src/components/FunctionType.jsx";
import * as ts from "../src/components/index.js";
import { ParameterDescriptor } from "../src/components/index.js";
import { TestFile } from "./utils.js";

it("render basic", () => {
  expect((
    <TestFile>
        <FunctionType />
    </TestFile>
  )).toRenderTo(`
    () => void
    `);
});

it("render in interface", () => {
  expect(
    (
      <TestFile>
          <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMember name="foo" type={<FunctionType />} />
      </ts.InterfaceDeclaration>
      </TestFile>
    ),
  ).toRenderTo(`
      interface Foo {
        foo: () => void
      }
    `);
});

describe("marking it as async", () => {
  it("no return type change to Promise<void>", () => {
    expect((
      <TestFile>
          <FunctionType async />
      </TestFile>
    )).toRenderTo(`
      () => Promise<void>
    `);
  });

  it("explicit returnType change to Promise<T>", () => {
    expect((
      <TestFile>
          <FunctionType async returnType="Foo" />
      </TestFile>
    )).toRenderTo(`
      () => Promise<Foo>
    `);
  });

  it("component returnType change to Promise<T>", () => {
    function Foo(_props?: Props) {
      return <>Foo</>;
    }
    expect((
      <TestFile>
          <FunctionType async returnType={<Foo />} />
      </TestFile>
    )).toRenderTo(`
    () => Promise<Foo>
  `);
  });
});

it("supports parameters by element", () => {
  const decl = (
    <FunctionType>
      <FunctionType.Parameters>a, b</FunctionType.Parameters>
    </FunctionType>
  );

  expect((
    <TestFile>
        {decl}
    </TestFile>
  )).toRenderTo(`
    (a, b) => void
  `);
});

it("supports type parameters by descriptor object", () => {
  const decl = (
    <FunctionType
      typeParameters={[
        { name: "a", extends: "any" },
        { name: "b", extends: "any" },
      ]}
    ></FunctionType>
  );

  expect((
    <TestFile>
        {decl}
    </TestFile>
  )).toRenderTo(`
    <a extends any, b extends any>() => void
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = <FunctionType typeParameters={["a", "b"]}></FunctionType>;

  expect((
    <TestFile>
        {decl}
    </TestFile>
  )).toRenderTo(`
    <a, b>() => void
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <FunctionType>
      <FunctionType.TypeParameters>a, b</FunctionType.TypeParameters>
    </FunctionType>
  );

  expect((
    <TestFile>
        {decl}
    </TestFile>
  )).toRenderTo(`
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
      <FunctionType parameters={[paramDesc]}></FunctionType>
    );

    expect((
      <TestFile>
          {decl}
      </TestFile>
    )).toRenderTo(`
      (foo?: any) => void
    `);
  });
  it("create rest parameters", () => {
    const paramDesc: ParameterDescriptor = {
      name: "foo",
      refkey: refkey(),
      type: "any[]",
      rest: true,
    };
    const decl = (
      <FunctionType parameters={[paramDesc]}></FunctionType>
    );

    expect((
      <TestFile>
          {decl}
      </TestFile>
    )).toRenderTo(`
      (...foo: any[]) => void
    `);
  });
});
