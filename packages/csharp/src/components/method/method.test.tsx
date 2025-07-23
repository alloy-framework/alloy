import { Children } from "@alloy-js/core/jsx-runtime";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { ClassDeclaration, Method } from "../../index.js";

const Wrapper = (props: { children: Children }) => (
  <TestNamespace>
    <ClassDeclaration public name="TestClass">
      {props.children}
    </ClassDeclaration>
  </TestNamespace>
);

describe("modifiers", () => {
  describe("access modifiers", () => {
    it.each(["public", "private", "protected", "internal"] as const)(
      "%s",
      (accessModifier) => {
        expect(
          <Wrapper>
            <Method {...{ [accessModifier]: true }} name="MethodOne" />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
          ${accessModifier} void MethodOne() {}
        }
      `);
      },
    );
  });

  describe("method modifiers", () => {
    it.each(["static", "virtual", "sealed"] as const)(
      "%s",
      (methodModifier) => {
        expect(
          <Wrapper>
            <Method {...{ [methodModifier]: true }} name="MethodOne" />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
          ${methodModifier} void MethodOne() {}
        }
      `);
      },
    );

    it("abstract exclude body", () => {
      expect(
        <Wrapper>
          <Method abstract name="MethodOne" />
        </Wrapper>,
      ).toRenderTo(`
        public class TestClass
        {
          abstract void MethodOne();
        }
      `);
    });
  });

  it("mark method async", () => {
    expect(
      <Wrapper>
        <Method async name="MethodOne" />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
          async Task MethodOne() {}
        }
      `);
  });

  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <Method async returns="Task" public abstract name="MethodOne" />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
          public abstract async Task MethodOne();
        }
      `);
  });
});

it("applies PascalCase naming policy", () => {
  expect(
    <Wrapper>
      <Method name="method_one" />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      void MethodOne() {}
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
      <Method public name="MethodOne" parameters={params} returns="string" />
    </Wrapper>
  );

  expect(res).toRenderTo(`
    public class TestClass
    {
      public string MethodOne(int intParam, string stringParam) {}
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test">
        <Method name="Method" doc="This is a test" />
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    class Test
    {
      /// This is a test
      void Method() {}
    }
  `);
});

it("use expression body form", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test">
        <Method name="Method" doc="This is a test" expression>
          this.MyProperty.Value;
        </Method>
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    class Test
    {
      /// This is a test
      void Method() => this.MyProperty.Value;
    }
  `);
});
