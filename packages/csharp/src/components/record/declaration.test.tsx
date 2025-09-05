import { Children, code, namekey, refkey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Property } from "../property/property.jsx";
import { RecordDeclaration } from "./declaration.jsx";

// Remove Wrapper that added <SourceFile> because TestNamespace already does
function Wrapper({ children }: { children: Children }) {
  return <TestNamespace>{children}</TestNamespace>;
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

it("takes a namekey", () => {
  expect(
    <TestNamespace>
      <RecordDeclaration name={namekey("my-record")} />
    </TestNamespace>,
  ).toRenderTo(`
      record MyRecord;
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
      public record Test(string name, int size)
      {
          string PrettyName { get; } = $"{name} {size}";
      }
  `);
  });
});
