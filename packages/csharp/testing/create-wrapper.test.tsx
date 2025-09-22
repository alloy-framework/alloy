import {
  ClassDeclaration,
  Method,
  Property,
  StructDeclaration,
} from "#components/index.js";
import { List, Refkey } from "@alloy-js/core";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { createCSharpTestWrapper } from "./create-wrapper.jsx";

it("should render defkey inline", async () => {
  const { Wrapper, defkey } = createCSharpTestWrapper();

  expect(<Wrapper>return {defkey("myResult")};</Wrapper>).toRenderTo(d`

return myResult;
`);
});

it("emits a single declaration per unique name", () => {
  const { Wrapper, defkey } = createCSharpTestWrapper();
  const a = defkey("MyType");
  const b = defkey("MyType");
  expect(a).toBe(b);

  expect(
    <Wrapper>
      return {a} {b};
    </Wrapper>,
  ).toRenderTo(d`
return MyType MyType;
`); // Ensure only one 'class/struct/interface' (whatever default is) declaration appears above if that's the behavior.
});

it("reuses declarations across multiple usage sites", () => {
  const { Wrapper, defkey } = createCSharpTestWrapper();
  const T = defkey("Thing");
  const R = defkey("Result");

  expect(
    <Wrapper>
      <ClassDeclaration abstract name="A">
        <List>
          <Method
            abstract
            name="a"
            returns={R}
            parameters={[{ name: "x", type: T }]}
          />
          <Method
            abstract
            name="b"
            returns={R}
            parameters={[{ name: "y", type: T }]}
          />
        </List>
      </ClassDeclaration>
    </Wrapper>,
  ).toRenderTo(d`


abstract class A
{
    abstract Result a(Thing x);
    abstract Result b(Thing y);
}
`);
});

it("should render defkey in nested component", async () => {
  function TestComponent(props: { returnTypeRef: Refkey }) {
    return <Method name="foo" returns={props.returnTypeRef} />;
  }

  const { Wrapper, defkey } = createCSharpTestWrapper();

  expect(
    <Wrapper>
      <ClassDeclaration name="MyClass">
        <TestComponent returnTypeRef={defkey("MyType")} />
      </ClassDeclaration>
    </Wrapper>,
  ).toRenderTo(d`

class MyClass
{
    MyType foo() {}
}
`);
});

it("should render defkey in class property", async () => {
  const { Wrapper, defkey } = createCSharpTestWrapper();

  expect(
    <Wrapper>
      <ClassDeclaration name="TestClass">
        <Property name="MyProperty" type={defkey("MyType")} get set />
      </ClassDeclaration>
    </Wrapper>,
  ).toRenderTo(d`
 class TestClass
 {
     MyType MyProperty { get; set; }
 }
`);
});

it("should render defkey in struct property", async () => {
  const { Wrapper, defkey } = createCSharpTestWrapper();

  expect(
    <Wrapper>
      <StructDeclaration name="TestStruct">
        <Property name="MyProperty" type={defkey("MyType")} get set />
      </StructDeclaration>
    </Wrapper>,
  ).toRenderTo(d`
 struct TestStruct
 {
     MyType MyProperty { get; set; }
 }
`);
});
