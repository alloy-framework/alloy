import { expect, it } from "vitest";
import { Attribute, AttributeList } from "./attributes.jsx";

it("define attribute", () => {
  expect(<Attribute name="Test" />).toRenderTo(`
      [Test]
  `);
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

it("define attribute list", () => {
  expect(
    <AttributeList
      attributes={[<Attribute name="TestA" />, <Attribute name="TestB" />]}
    />,
  ).toRenderTo(`
      [TestA]
      [TestB]
      
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
