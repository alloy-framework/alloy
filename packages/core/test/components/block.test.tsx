import { expect, it } from "vitest";
import { Block } from "../../src/components/Block.jsx";
import "../../testing/extend-expect.js";
it("renders properly with no children", () => {
  const template = (
    <Block>
      <></>
    </Block>
  );
  expect(template).toRenderTo(`{}`);
});

it("renders properly with children", () => {
  const template = <Block>Contents!!</Block>;
  expect(template).toRenderTo(`
    {
      Contents!!
    }
  `);
});

it("renders properly with newline and no children", () => {
  const template = (
    <>
      class
      <Block newline>
        <></>
      </Block>
    </>
  );
  expect(template).toRenderTo(`
    class {}
  `);
});

it("renders properly with newline and no children", () => {
  const template = (
    <>
      class<Block newline>contents!!</Block>
    </>
  );
  expect(template).toRenderTo(`
    class
    {
      contents!!
    }
  `);
});

it("takes a custom closer and opener", () => {
  const template = (
    <>
      <Block opener="[" closer="]">
        Contents!!!
      </Block>
      following content
    </>
  );
  expect(template).toRenderTo(`
    [
      Contents!!!
    ]following content
  `);
});

it("takes a false closer", () => {
  const template = (
    <>
      <Block opener="(" closer={false}>
        Contents!!!
      </Block>
      following content
    </>
  );
  expect(template).toRenderTo(`
    (
      Contents!!!following content
  `);
});
