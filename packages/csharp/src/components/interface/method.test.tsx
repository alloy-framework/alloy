import { Children } from "@alloy-js/core/jsx-runtime";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { InterfaceDeclaration } from "./declaration.jsx";
import { InterfaceMethod } from "./method.jsx";

const Wrapper = (props: { children: Children }) => (
  <TestNamespace>
    <InterfaceDeclaration public name="TestInterface">
      {props.children}
    </InterfaceDeclaration>
  </TestNamespace>
);

describe("modifiers", () => {
  describe("access modifiers", () => {
    it.each(["public", "private", "protected", "internal"] as const)(
      "%s",
      (accessModifier) => {
        expect(
          <Wrapper>
            <InterfaceMethod {...{ [accessModifier]: true }} name="MethodOne" />
          </Wrapper>,
        ).toRenderTo(`
        public interface TestInterface
        {
          ${accessModifier} void MethodOne();
        }
      `);
      },
    );
  });

  describe("method modifiers", () => {
    it.each(["new"] as const)("%s", (methodModifier) => {
      expect(
        <Wrapper>
          <InterfaceMethod {...{ [methodModifier]: true }} name="MethodOne" />
        </Wrapper>,
      ).toRenderTo(`
        public interface TestInterface
        {
          ${methodModifier} void MethodOne();
        }
      `);
    });
  });

  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <InterfaceMethod returns="Task" public new name="MethodOne" />
      </Wrapper>,
    ).toRenderTo(`
        public interface TestInterface
        {
          public new Task MethodOne();
        }
      `);
  });
});

it("applies PascalCase naming policy", () => {
  expect(
    <Wrapper>
      <InterfaceMethod name="method_one" />
    </Wrapper>,
  ).toRenderTo(`
    public interface TestInterface
    {
      void MethodOne();
    }
`);
});

it("defines params and return type", () => {
  const params = [
    {
      name: "intParam",
      type: "int",
    },
    {
      name: "stringParam",
      type: "string",
    },
  ];
  const res = (
    <Wrapper>
      <InterfaceMethod
        public
        name="MethodOne"
        parameters={params}
        returns="string"
      />
    </Wrapper>
  );

  expect(res).toRenderTo(`
    public interface TestInterface
    {
      public string MethodOne(int intParam, string stringParam);
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <InterfaceDeclaration name="Test">
        <InterfaceMethod name="Method" doc="This is a test" />
      </InterfaceDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    interface Test
    {
      /// This is a test
      void Method();
    }
  `);
});
