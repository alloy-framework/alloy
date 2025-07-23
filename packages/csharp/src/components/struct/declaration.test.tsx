import { List, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Attribute } from "../attributes/attributes.jsx";
import { Property } from "../property/property.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { TypeParameterProps } from "../type-parameters/type-parameter.jsx";
import { StructDeclaration } from "./declaration.jsx";

it("declares struct with no members", () => {
  expect(
    <TestNamespace>
      <StructDeclaration name="Test" />
    </TestNamespace>,
  ).toRenderTo(`
      struct Test;
  `);
});

describe("modifiers", () => {
  it.each(["public", "private", "internal"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <StructDeclaration {...{ [mod]: true }} name="Test" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} struct Test;
    `);
  });

  it.each(["partial"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <StructDeclaration {...{ [mod]: true }} name="Test" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} struct Test;
    `);
  });

  it("combines modifiers", () => {
    expect(
      <TestNamespace>
        <StructDeclaration public partial name="Test" />
      </TestNamespace>,
    ).toRenderTo(`
        public partial struct Test;
    `);
  });
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <StructDeclaration name="Test" doc="This is a test" />
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    struct Test;
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
          <StructDeclaration public name="Test" typeParameters={typeParameters}>
            <List>
              <Property name="PropA" type={typeParameters[0].refkey} get set />
              <Property name="PropB" type={typeParameters[1].refkey} get set />
            </List>
          </StructDeclaration>
        </SourceFile>
      </TestNamespace>,
    ).toRenderTo(`
      namespace TestCode
      {
          public struct Test<T, U>
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
        <StructDeclaration public name="Test" typeParameters={typeParameters}>
          // Body
        </StructDeclaration>
      </TestNamespace>,
    ).toRenderTo(`
      public struct Test<T, U>
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
      <StructDeclaration name="Test" attributes={[<Attribute name="Test" />]} />
    </TestNamespace>,
  ).toRenderTo(`
    [Test]
    struct Test;
  `);
});
