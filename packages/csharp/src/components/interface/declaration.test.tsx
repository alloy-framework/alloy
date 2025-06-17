import { describe, expect, it } from "vitest";
import { TestNamespace } from "../../../test/utils.jsx";
import { DocComment } from "../doc/comment.jsx";
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
      <InterfaceDeclaration
        name="TestInterface"
        doc={<DocComment>This is a test interface</DocComment>}
      />
    </TestNamespace>,
  ).toRenderTo(`
    /// This is a test interface
    interface TestInterface;
  `);
});
