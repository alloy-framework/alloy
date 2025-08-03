import { Children, code, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Property } from "../property/property.jsx";
import { SourceFile } from "../SourceFile.jsx";
import { RecordDeclaration } from "./declaration.jsx";

function Wrapper({ children }: { children: Children }) {
  return (
    <TestNamespace>
      <SourceFile path="Test.cs">{children}</SourceFile>
    </TestNamespace>
  );
}

it("declares record with no members", () => {
  expect(
    <TestNamespace>
      <RecordDeclaration name="TestRecord" />
    </TestNamespace>,
  ).toRenderTo(`
      record TestRecord;
  `);
});

describe("modifiers", () => {
  it.each(["public", "private", "internal"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <RecordDeclaration {...{ [mod]: true }} name="TestRecord" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} record TestRecord;
    `);
  });

  it.each(["partial"])("%s", (mod) => {
    expect(
      <TestNamespace>
        <RecordDeclaration {...{ [mod]: true }} name="TestRecord" />
      </TestNamespace>,
    ).toRenderTo(`
        ${mod} record TestRecord;
    `);
  });

  it("combines modifiers", () => {
    expect(
      <TestNamespace>
        <RecordDeclaration public partial name="TestRecord" />
      </TestNamespace>,
    ).toRenderTo(`
        public partial record TestRecord;
    `);
  });
});

it("specify doc comment", () => {
  expect(
    <TestNamespace>
      <RecordDeclaration name="TestRecord" doc="This is a test" />
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    record TestRecord;
  `);
});

it("specify record property inside", () => {
  expect(
    <TestNamespace>
      <RecordDeclaration name="TestRecord" doc="This is a test">
        <Property name="Prop" get set type="string" />
      </RecordDeclaration>
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test
    record TestRecord
    {
      string Prop { get; set; }
    }
  `);
});

describe("constructor", () => {
  it("declares primary constructor with args", () => {
    const paramNameRefkey = refkey();
    const paramSizeRefkey = refkey();

    const ctorParams = [
      {
        name: "name",
        type: "string",
        refkey: paramNameRefkey,
      },
      {
        name: "size",
        type: "int",
        refkey: paramSizeRefkey,
      },
    ];

    expect(
      <Wrapper>
        <RecordDeclaration public name="Test" primaryConstructor={ctorParams}>
          <Property
            name="PrettyName"
            type="string"
            get
            initializer={code`$"{${paramNameRefkey}} {${paramSizeRefkey}}"`}
          />
        </RecordDeclaration>
      </Wrapper>,
    ).toRenderTo(`
      namespace TestCode
      {
          public record Test(string name, int size)
          {
              string PrettyName { get; } = $"{name} {size}";
          }
      }
  `);
  });
});
