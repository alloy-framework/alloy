import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Block } from "../../src/components/Block.jsx";
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

it("renders properly with newline and children", () => {
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

it("renders properly when content is added reactively", () => {
  const contents = ref("");
  const tree = (
    <>
      class Foo <Block>{contents}</Block>
    </>
  );
  expect(tree).toRenderTo(`
    class Foo {}
  `);
  contents.value = "x = 12;";
  expect(tree).toRenderTo(`
    class Foo {
      x = 12;
    }
  `);
});
