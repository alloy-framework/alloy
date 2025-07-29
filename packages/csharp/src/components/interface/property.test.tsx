import { Children } from "@alloy-js/core/jsx-runtime";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Attribute } from "../attributes/attributes.jsx";
import { InterfaceDeclaration } from "./declaration.jsx";
import { InterfaceProperty } from "./property.jsx";

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
            <InterfaceProperty
              {...{ [accessModifier]: true }}
              name="TestProp"
              type="string"
              get
            />
          </Wrapper>,
        ).toRenderTo(`
        public interface TestInterface
        {
          ${accessModifier} string TestProp { get; }
        }
      `);
      },
    );
  });

  describe("method modifiers", () => {
    it.each(["new"] as const)("%s", (methodModifier) => {
      expect(
        <Wrapper>
          <InterfaceProperty
            {...{ [methodModifier]: true }}
            name="TestProp"
            type="string"
            get
          />
        </Wrapper>,
      ).toRenderTo(`
        public interface TestInterface
        {
          ${methodModifier} string TestProp { get; }
        }
      `);
    });
  });

  it("combine modifiers", () => {
    expect(
      <Wrapper>
        <InterfaceProperty public new name="TestProp" type="string" get />
      </Wrapper>,
    ).toRenderTo(`
        public interface TestInterface
        {
          public new string TestProp { get; }
        }
      `);
  });
});

it("applies PascalCase naming policy", () => {
  expect(
    <Wrapper>
      <InterfaceProperty name="test_prop" type="string" get />
    </Wrapper>,
  ).toRenderTo(`
    public interface TestInterface
    {
      string TestProp { get; }
    }
`);
});

it("has getter only", () => {
  expect(
    <Wrapper>
      <InterfaceProperty name="TestProp" type="string" get />
    </Wrapper>,
  ).toRenderTo(`
    public interface TestInterface
    {
      string TestProp { get; }
    }
  `);
});

it("has setter only", () => {
  expect(
    <Wrapper>
      <InterfaceProperty name="TestProp" type="string" set />
    </Wrapper>,
  ).toRenderTo(`
    public interface TestInterface
    {
      string TestProp { set; }
    }
  `);
});
it("has getter and setter", () => {
  expect(
    <Wrapper>
      <InterfaceProperty name="TestProp" type="string" get set />
    </Wrapper>,
  ).toRenderTo(`
    public interface TestInterface
    {
      string TestProp { get; set; }
    }
  `);
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <InterfaceDeclaration name="Test">
        <InterfaceProperty
          name="Method"
          type="string"
          get
          set
          doc="This is a test"
        />
      </InterfaceDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    interface Test
    {
      /// This is a test
      string Method { get; set; }
    }
  `);
});

it("specify attributes", () => {
  expect(
    <Wrapper>
      <InterfaceProperty
        name="Test"
        type="int"
        attributes={[<Attribute name="Test" />]}
        get
        set
      />
    </Wrapper>,
  ).toRenderTo(`
    public interface TestInterface
    {
      [Test]
      int Test { get; set; }
    }
  `);
});
