import { Children } from "@alloy-js/core/jsx-runtime";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { ClassDeclaration } from "../ClassDeclaration.jsx";
import { ClassProperty } from "./property.jsx";

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
            <ClassProperty
              {...{ [accessModifier]: true }}
              name="TestProp"
              type="string"
              get
            />
          </Wrapper>,
        ).toRenderTo(`
        public class TestClass
        {
          ${accessModifier} string TestProp { get; }
        }
      `);
      },
    );
  });

  describe("property modifiers", () => {
    it.each([
      "new",
      "static",
      "virtual",
      "sealed",
      "override",
      "abstract",
      "extern",
      "readonly",
    ] as const)("%s", (methodModifier) => {
      expect(
        <Wrapper>
          <ClassProperty
            {...{ [methodModifier]: true }}
            name="TestProp"
            type="string"
            get
          />
        </Wrapper>,
      ).toRenderTo(`
        public class TestClass
        {
          ${methodModifier} string TestProp { get; }
        }
      `);
    });
  });

  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <ClassProperty public new name="TestProp" type="string" get />
      </Wrapper>,
    ).toRenderTo(`
        public class TestClass
        {
          public new string TestProp { get; }
        }
      `);
  });
});

it("applies PascalCase naming policy", () => {
  expect(
    <Wrapper>
      <ClassProperty name="test_prop" type="string" get />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      string TestProp { get; }
    }
`);
});

it("has getter only", () => {
  expect(
    <Wrapper>
      <ClassProperty name="TestProp" type="string" get />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      string TestProp { get; }
    }
  `);
});

it("has setter only", () => {
  expect(
    <Wrapper>
      <ClassProperty name="TestProp" type="string" set />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      string TestProp { set; }
    }
  `);
});

it("has getter and setter", () => {
  expect(
    <Wrapper>
      <ClassProperty name="TestProp" type="string" get set />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      string TestProp { get; set; }
    }
  `);
});

it("has getter and init", () => {
  expect(
    <Wrapper>
      <ClassProperty name="TestProp" type="string" get init />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      string TestProp { get; init; }
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <ClassDeclaration name="Test">
        <ClassProperty
          name="Method"
          type="string"
          get
          set
          doc="This is a test"
        />
      </ClassDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    class Test
    {
      /// This is a test
      string Method { get; set; }
    }
  `);
});

it("specify nullable property", () => {
  expect(
    <Wrapper>
      <ClassProperty name="TestProp" type="string" nullable get set />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      string? TestProp { get; set; }
    }
  `);
});

it("specify initializer", () => {
  expect(
    <Wrapper>
      <ClassProperty
        name="TestProp"
        type="string"
        get
        set
        initializer={`"abc"`}
      />
    </Wrapper>,
  ).toRenderTo(`
    public class TestClass
    {
      string TestProp { get; set; } = "abc";
    }
  `);
});
