import { Attribute } from "#components/attributes/attributes.jsx";
import { ClassDeclaration } from "#components/class/declaration.jsx";
import { Method } from "#components/method/method.jsx";
import { Property } from "#components/property/property.jsx";
import { List, memberRefkey, namekey } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";

const Wrapper = (props: { children: Children }) => (
  <TestNamespace>
    <ClassDeclaration public name="TestClass">
      {props.children}
    </ClassDeclaration>
  </TestNamespace>
);

it("can be referenced", () => {
  const param1Key = namekey("param1");
  const param2Key = namekey("param2");
  expect(
    <Wrapper>
      <Method
        name="MethodOne"
        parameters={[
          { name: param1Key, type: "T1" },
          { name: param2Key, type: "T2" },
        ]}
      />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        void MethodOne(T1 param1, T2 param2) {}
    }
  `);
});

it("members can be referenced", () => {
  const classKey = namekey("TestType");
  const methodKey = namekey("TestMethod");
  const param1Key = namekey("param1");

  expect(
    <TestNamespace>
      <List>
        <ClassDeclaration name={classKey}>
          <Method name={methodKey} />
        </ClassDeclaration>
        <ClassDeclaration name="Test">
          <Method
            name="Test"
            parameters={[{ name: param1Key, type: classKey }]}
          >
            return {memberRefkey(param1Key, methodKey)}();
          </Method>
        </ClassDeclaration>
      </List>
    </TestNamespace>,
  ).toRenderTo(`
    class TestType
    {
        void TestMethod() {}
    }
    class Test
    {
        void Test(TestType param1)
        {
            return param1.TestMethod();
        }
    }
  `);
});

it("members can be referenced when the parameter is nullable", () => {
  const propTypeKey = namekey("PropType");
  const propTypePropKey = namekey("Field");
  const classKey = namekey("TestType");
  const propKey = namekey("TestProp");
  const param1Key = namekey("param1");

  expect(
    <TestNamespace>
      <List>
        <ClassDeclaration name={propTypeKey}>
          <Property name={propTypePropKey} type={"string"} nullable />
        </ClassDeclaration>
        <ClassDeclaration name={classKey}>
          <Property name={propKey} type={propTypeKey} nullable />
        </ClassDeclaration>
        <ClassDeclaration name="Test">
          <Method
            name="Test"
            parameters={[{ name: param1Key, type: classKey, optional: true }]}
          >
            return {memberRefkey(param1Key, propKey, propTypePropKey)};
          </Method>
        </ClassDeclaration>
      </List>
    </TestNamespace>,
  ).toRenderTo(`
      class PropType
      {
          string? Field {  }
      }
      class TestType
      {
          PropType? TestProp {  }
      }
      class Test
      {
          void Test(TestType? param1)
          {
              return param1?.TestProp?.Field;
          }
      }
  `);
});

it("can attach attributes", () => {
  expect(
    <Wrapper>
      <Method
        name="MethodOne"
        parameters={[
          {
            name: "param1",
            type: "T1",
            attributes: [<Attribute name="Test" />],
          },
          {
            name: "param2",
            type: "T2",
            attributes: [<Attribute name="Test2" args={["arg1", "arg2"]} />],
          },
        ]}
      />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        void MethodOne(
            [Test]
            T1 param1,
            [Test2(arg1, arg2)]
            T2 param2
        ) {}
    }
  `);
});

it("can add modifiers: in | out | ref", () => {
  expect(
    <Wrapper>
      <Method
        name="MethodOne"
        parameters={[
          {
            name: "param1",
            type: "T1",
            modifiers: "ref",
          },
          {
            name: "param2",
            type: "T2",
            modifiers: "in",
          },
          {
            name: "param3",
            type: "T3",
            modifiers: "out",
          },
        ]}
      />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
        void MethodOne(ref T1 param1, in T2 param2, out T3 param3) {}
    }
  `);
});
