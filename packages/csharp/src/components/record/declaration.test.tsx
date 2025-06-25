import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { Property } from "../property/property.jsx";
import { RecordDeclaration } from "./declaration.jsx";

it("declares class with no members", () => {
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

it("specify class property inside", () => {
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
