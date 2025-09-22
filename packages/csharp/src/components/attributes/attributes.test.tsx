import { ClassDeclaration } from "#components/class/declaration.jsx";
import { createLibrary } from "#createLibrary";
import { TestNamespace } from "#test/utils.jsx";
import { List, namekey } from "@alloy-js/core";
import { describe, expect, it } from "vitest";
import { Attribute, AttributeList } from "./attributes.jsx";
it("define attribute", () => {
  expect(<Attribute name="Test" />).toRenderTo(`
      [Test]
  `);
});

describe("Attribute suffix trimming", () => {
  it("define attribute whose name ending with 'Attribute'", () => {
    expect(<Attribute name="TestAttribute" />).toRenderTo(`
      [Test]
    `);
  });

  it("when using namekey", () => {
    const key = namekey("TestAttribute");
    expect(
      <TestNamespace>
        <List>
          <Attribute name={key} />
          <ClassDeclaration name={key} />
        </List>
      </TestNamespace>,
    ).toRenderTo(`
      [Test]
      class TestAttribute;
    `);
  });

  it("when referenced from library", () => {
    const TestLib = createLibrary("TestLib", {
      TestAttribute: { kind: "method", methodKind: "ordinary" },
    });
    expect(
      <TestNamespace>
        <Attribute name={TestLib.TestAttribute} />
      </TestNamespace>,
    ).toRenderTo(`
      using TestLib;
      
      [Test]
    `);
  });
});

it("define attribute with single arg", () => {
  expect(<Attribute name="Test" args={[`"abc"`]} />).toRenderTo(`
      [Test("abc")]
  `);
});

it("define attribute with multiple arg", () => {
  expect(<Attribute name="Test" args={[`"abc"`, `"def"`]} />).toRenderTo(`
      [Test("abc", "def")]
  `);
});

it("define attribute list with Attribute components", () => {
  expect(
    <AttributeList
      attributes={[<Attribute name="TestA" />, <Attribute name="TestB" />]}
    />,
  ).toRenderTo(`
      [TestA]
      [TestB]
  `);
});

it("define attribute list with attribute names", () => {
  expect(<AttributeList attributes={["TestA", "TestB"]} />).toRenderTo(`
      [TestA]
      [TestB]
  `);
});

it("define attribute list with attribute props", () => {
  expect(
    <AttributeList
      attributes={[{ name: "TestA" }, { name: "TestB", args: [`"test"`] }]}
    />,
  ).toRenderTo(`
      [TestA]
      [TestB("test")]
  `);
});

it("define attribute list with children", () => {
  expect(
    <AttributeList>
      <Attribute name="TestA" />
      <Attribute name="TestB" />
    </AttributeList>,
  ).toRenderTo(`
      [TestA]
      [TestB]
  `);
});
