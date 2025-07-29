import { List, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Attribute } from "../attributes/attributes.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { InterfaceDeclaration } from "./declaration.jsx";
import { InterfaceProperty } from "./property.jsx";

it("declares class with no members", () => {
  expect(
    <TestNamespace>
      <InterfaceDeclaration name="TestInterface" />
    </TestNamespace>,
  ).toRenderTo(`
      interface TestInterface;
  `);
});

describe("modifiers", () => {
  it.each(["public", "private", "internal"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <InterfaceDeclaration {...{ [mod]: true }} name="TestInterface" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} interface TestInterface;
    `);
  });

  it.each(["partial"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <InterfaceDeclaration {...{ [mod]: true }} name="TestInterface" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} interface TestInterface;
    `);
  });

  it("combines modifiers", () => {
    expect(
      <TestNamespace>
        <InterfaceDeclaration public partial name="TestInterface" />
      </TestNamespace>,
    ).toRenderTo(`
        public partial interface TestInterface;
    `);
  });
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <InterfaceDeclaration name="TestInterface" doc="This is a test" />
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    interface TestInterface;
  `);
});

describe("with type parameters", () => {
  it("reference parameters", () => {
    const typeParameters: TypeParameterProps[] = [
      {
        name: "T",
        refkey: refkey(),
      },
      {
        name: "U",
        refkey: refkey(),
      },
    ];

    expect(
      <TestNamespace>
        <SourceFile path="Test.cs">
          <InterfaceDeclaration
            public
            name="Test"
            typeParameters={typeParameters}
          >
            <List>
              <InterfaceProperty
                name="PropA"
                type={typeParameters[0].refkey}
                get
                set
              />
              <InterfaceProperty
                name="PropB"
                type={typeParameters[1].refkey}
                get
                set
              />
            </List>
          </InterfaceDeclaration>
        </SourceFile>
      </TestNamespace>,
    ).toRenderTo(`
      namespace TestCode
      {
          public interface Test<T, U>
          {
              T PropA { get; set; }
              U PropB { get; set; }
          }
      }
    `);
  });

  it("defines with constraints", () => {
    const typeParameters: TypeParameterProps[] = [
      {
        name: "T",
        constraints: "IFoo",
      },
      {
        name: "U",
        constraints: "IBar",
      },
    ];

    expect(
      <TestNamespace>
        <InterfaceDeclaration
          public
          name="Test"
          typeParameters={typeParameters}
        >
          // Body
        </InterfaceDeclaration>
      </TestNamespace>,
    ).toRenderTo(`
      public interface Test<T, U>
        where T : IFoo
        where U : IBar
      {
        // Body
      }
    `);
  });
});

it("specify attributes", () => {
  expect(
    <TestNamespace>
      <InterfaceDeclaration
        name="Test"
        attributes={[<Attribute name="Test" />]}
      />
    </TestNamespace>,
  ).toRenderTo(`
    [Test]
    interface Test;
  `);
});
