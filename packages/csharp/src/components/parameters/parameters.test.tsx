import { ClassDeclaration } from "#components/class/declaration.jsx";
import { Method } from "#components/method/method.jsx";
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
