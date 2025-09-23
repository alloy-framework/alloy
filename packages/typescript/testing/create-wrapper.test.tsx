import {
  ClassDeclaration,
  ClassField,
  ClassMethod,
} from "#components/index.js";
import { List, Refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { createTSTestWrapper } from "./create-wrapper.jsx";

it("should render defkey inline", async () => {
  const { Wrapper, defkey } = createTSTestWrapper();

  expect(<Wrapper>return {defkey("myResult")};</Wrapper>).toRenderTo(
    `return myResult;`,
  );
});

it("reuses declarations across multiple usage sites", () => {
  const { Wrapper, defkey } = createTSTestWrapper();
  const T = defkey("Thing");
  const R = defkey("Result");

  expect(
    <Wrapper>
      <ClassDeclaration name="A">
        <List>
          <ClassMethod
            name="a"
            returnType={R}
            parameters={[{ name: "x", type: T }]}
          />
          <ClassMethod
            name="b"
            returnType={R}
            parameters={[{ name: "y", type: T }]}
          />
        </List>
      </ClassDeclaration>
    </Wrapper>,
  ).toRenderTo(d`
    class A {
      a(x: Thing): Result {}
      b(y: Thing): Result {}
    }`);
});

it("reuses declarations across multiple defkeys", () => {
  const { Wrapper, defkey } = createTSTestWrapper();

  expect(
    <Wrapper>
      <ClassDeclaration name="A">
        <List>
          <ClassMethod
            name="a"
            returnType={defkey("Result")}
            parameters={[{ name: "x", type: defkey("Thing") }]}
          />
          <ClassMethod
            name="b"
            returnType={defkey("Result")}
            parameters={[{ name: "y", type: defkey("Thing") }]}
          />
        </List>
      </ClassDeclaration>
    </Wrapper>,
  ).toRenderTo(d`
    class A {
      a(x: Thing): Result {}
      b(y: Thing): Result {}
    }`);
});

it("should render defkey in nested component", async () => {
  function TestComponent(props: { returnTypeRef: Refkey }) {
    return <ClassMethod name="foo" returnType={props.returnTypeRef} />;
  }

  const { Wrapper, defkey } = createTSTestWrapper();

  expect(
    <Wrapper>
      <ClassDeclaration name="MyClass">
        <TestComponent returnTypeRef={defkey("MyType")} />
      </ClassDeclaration>
    </Wrapper>,
  ).toRenderTo(d`
    class MyClass {
      foo(): MyType {}
    }`);
});

it("should render defkey in class property", async () => {
  const { Wrapper, defkey } = createTSTestWrapper();

  expect(
    <Wrapper>
      <ClassDeclaration name="TestClass">
        <ClassField name="MyProperty" type={defkey("MyType")} />
      </ClassDeclaration>
    </Wrapper>,
  ).toRenderTo(d`
    class TestClass {
      MyProperty: MyType
    }`);
});
