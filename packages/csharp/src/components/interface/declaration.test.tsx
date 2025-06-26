import { List, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Property } from "../property/property.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { InterfaceDeclaration } from "./declaration.jsx";

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
            name="TestClass"
            typeParameters={typeParameters}
          >
            <List>
              <Property name="PropA" type={typeParameters[0].refkey} />
              <Property name="PropB" type={typeParameters[1].refkey} />
            </List>
          </InterfaceDeclaration>
        </SourceFile>
      </TestNamespace>,
    ).toRenderTo(`
      namespace TestCode
      {
        public class TestClass<T, U>
        {
          public T MemberOne;
          private U memberTwo;
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
          name="TestClass"
          typeParameters={typeParameters}
        >
          // Body
        </InterfaceDeclaration>
      </TestNamespace>,
    ).toRenderTo(`
      public class TestClass<T, U>
        where T : IFoo
        where U : IBar
      {
        // Body
      }
    `);
  });
});
