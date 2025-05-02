import { Props, refkey } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { FunctionType } from "../src/components/FunctionType.jsx";
import * as ts from "../src/components/index.js";
import { ParameterDescriptor } from "../src/components/index.js";
import { toSourceText } from "./utils.jsx";

it("render basic", () => {
  expect(toSourceText(<FunctionType />)).toBe(d`
    () => void
    `);
});

it("render in interface", () => {
  expect(
    toSourceText(
      <ts.InterfaceDeclaration name="Foo">
        <ts.InterfaceMember name="foo" type={<FunctionType />} />
      </ts.InterfaceDeclaration>,
    ),
  ).toBe(d`
      interface Foo {
        foo: () => void
      }
    `);
});

describe("marking it as async", () => {
  it("no return type change to Promise<void>", () => {
    expect(toSourceText(<FunctionType async />)).toBe(d`
      () => Promise<void>
    `);
  });

  it("explicit returnType change to Promise<T>", () => {
    expect(toSourceText(<FunctionType async returnType="Foo" />)).toBe(d`
      () => Promise<Foo>
    `);
  });

  it("component returnType change to Promise<T>", () => {
    function Foo(_props?: Props) {
      return <>Foo</>;
    }
    expect(toSourceText(<FunctionType async returnType={<Foo />} />)).toBe(d`
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

  expect(toSourceText(decl)).toBe(d`
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

  expect(toSourceText(decl)).toBe(d`
    <a extends any, b extends any>() => void
  `);
});

it("supports type parameters by descriptor array", () => {
  const decl = <FunctionType typeParameters={["a", "b"]}></FunctionType>;

  expect(toSourceText(decl)).toBe(d`
    <a, b>() => void
  `);
});

it("supports type parameters by element", () => {
  const decl = (
    <FunctionType>
      <FunctionType.TypeParameters>a, b</FunctionType.TypeParameters>
    </FunctionType>
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
        <FunctionType parameters={[paramDesc]}></FunctionType>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
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
      <>
        <FunctionType parameters={[paramDesc]}></FunctionType>
      </>
    );

    expect(toSourceText(decl)).toBe(d`
      (...foo: any[]) => void
    `);
  });
});
