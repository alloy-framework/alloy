import { expect, it } from "vitest";
import {
  createContentSlot,
  List,
  printTree,
  ref,
  renderTree,
  Show,
} from "../../src/index.js";
import "../../testing/extend-expect.js";
import { d } from "../../testing/render.js";

it("creates a list with default options", () => {
  const template = (
    <group>
      <List>
        <>1</>
        <>2</>
        <>3</>
      </List>
    </group>
  );

  expect(template).toRenderTo(`
    1
    2
    3
  `);
});

it("creates a list with some options", () => {
  expect(
    <group>
      <List comma line>
        <>1</>
        <>2</>
        <>3</>
      </List>
    </group>,
  ).toRenderTo(`1, 2, 3`);
});

it("creates a list item for substitutions", () => {
  expect(
    <group>
      <List comma line>
        {1}
        {2}
        {3}
      </List>
    </group>,
  ).toRenderTo(`1, 2, 3`);
});

it("doesn't create list items for undefined, null, and boolean values", () => {
  expect(
    <group>
      <List comma line>
        {false}
        {1}
        {true}
        {2}
        {null}
        {3}
        {undefined}
      </List>
    </group>,
  ).toRenderTo(`1, 2, 3`);
});

it("is useful for statements", () => {
  function Statement() {
    return "console.log(true)";
  }
  const includeStatement = ref(false);
  const tree = renderTree(
    <List semicolon hardline ender>
      <Statement />
      {includeStatement.value && <Statement />}
      <Statement />
    </List>,
  );
  expect(printTree(tree)).toEqual(d`
    console.log(true);
    console.log(true);

  `);

  includeStatement.value = true;

  expect(printTree(tree)).toEqual(d`
    console.log(true);
    console.log(true);
    console.log(true);

  `);
});

it("doesn't add joiners when items are empty", () => {
  expect(
    <group>
      <List comma line>
        <></>
        <></>
        <></>
      </List>
    </group>,
  ).toRenderTo(``);
});

it("It add joiners when items are become non-empty", () => {
  const item1 = ref("");
  const item2 = ref("");
  const item3 = ref("");

  const tree = renderTree(
    <group>
      <List comma line ender=";">
        <>{item1}</>
        <>{item2}</>
        <>{item3}</>
      </List>
    </group>,
  );

  expect(printTree(tree)).toBe(``);
  item1.value = "hi";
  expect(printTree(tree)).toBe(`hi;`);
  item2.value = "there";
  expect(printTree(tree)).toBe(`hi, there;`);
  item3.value = "friend";
  expect(printTree(tree)).toBe(`hi, there, friend;`);

  item1.value = "";
  expect(printTree(tree)).toBe(`there, friend;`);
  item3.value = "";
  expect(printTree(tree)).toBe(`there;`);
  item2.value = "";
  expect(printTree(tree)).toBe(``);
});

it("works with show", () => {
  const ContentSlot = createContentSlot();
  const showFirst = ref(false);
  const showSecond = ref(false);
  const tree = renderTree(
    <>
      <ContentSlot.WhenEmpty>Empty list!</ContentSlot.WhenEmpty>
      <ContentSlot>
        <List comma space>
          <Show when={showFirst.value}>One</Show>
          <Show when={showSecond.value}>Two</Show>
        </List>
      </ContentSlot>
    </>,
  );
  expect(printTree(tree)).toBe(`Empty list!`);
  showFirst.value = true;
  expect(printTree(tree)).toBe(`One`);
  showSecond.value = true;
  expect(printTree(tree)).toBe(`One, Two`);
  showFirst.value = false;
  showSecond.value = false;
  expect(printTree(tree)).toBe(`Empty list!`);
});
