import { Children } from "@alloy-js/core/jsx-runtime";
import { describe, expect, it } from "vitest";
import { Class, ClassMethod } from "../src/index.js";
import { TestNamespace } from "./utils.jsx";

const Wrapper = (props: { children: Children }) => (
  <TestNamespace>
    <Class accessModifier="public" name="TestClass">
      {props.children}
    </Class>
  </TestNamespace>
);

describe("modifiers", () => {
  describe("access modifiers", () => {
    it.each(["public", "private", "protected", "internal"] as const)(
      "%s",
      (accessModifier) => {
        expect(
          <Wrapper>
            <ClassMethod accessModifier={accessModifier} name="MethodOne" />
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
            <ClassMethod methodModifier={methodModifier} name="MethodOne" />
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
          <ClassMethod methodModifier="abstract" name="MethodOne" />
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
        <ClassMethod async name="MethodOne" />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
          async void MethodOne() {}
        }
      `);
  });
  it("mark method async", () => {
    expect(
      <Wrapper>
        <ClassMethod async name="MethodOne" />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
          async void MethodOne() {}
        }
      `);
  });
  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <ClassMethod
          async
          returns="Task"
          accessModifier="public"
          methodModifier="abstract"
          name="MethodOne"
        />
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
      <ClassMethod name="method_one" />
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
      name: "IntParam",
      type: "int",
    },
    {
      name: "StringParam",
      type: "string",
    },
  ];
  const res = (
    <Wrapper>
      <ClassMethod
        accessModifier="public"
        name="MethodOne"
        parameters={params}
        returns="string"
      />
    </Wrapper>
  );

  expect(res).toRenderTo(`
    public class TestClass
    {
      public string MethodOne(int IntParam, string StringParam) {}
    }
  `);
});
