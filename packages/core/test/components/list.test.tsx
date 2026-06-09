import { expect, it } from "vitest";
import {
  createContentSlot,
  List,
  ref,
  Show,
} from "../../src/index.js";

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
  const tree = (
    <List semicolon hardline ender>
      <Statement />
      {includeStatement.value && <Statement />}
      <Statement />
    </List>
  );
  expect(tree).toRenderTo(`
    console.log(true);
    console.log(true);

  `);

  includeStatement.value = true;

  expect(tree).toRenderTo(`
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

  const tree = (
    <group>
      <List comma line ender=";">
        <>{item1}</>
        <>{item2}</>
        <>{item3}</>
      </List>
    </group>
  );

  expect(tree).toRenderTo("");
  item1.value = "hi";
  expect(tree).toRenderTo("hi;");
  item2.value = "there";
  expect(tree).toRenderTo("hi, there;");
  item3.value = "friend";
  expect(tree).toRenderTo("hi, there, friend;");

  item1.value = "";
  expect(tree).toRenderTo("there, friend;");
  item3.value = "";
  expect(tree).toRenderTo("there;");
  item2.value = "";
  expect(tree).toRenderTo("");
});

it("works with show", () => {
  const ContentSlot = createContentSlot();
  const showFirst = ref(false);
  const showSecond = ref(false);
  const tree = (
    <>
      <ContentSlot.WhenEmpty>Empty list!</ContentSlot.WhenEmpty>
      <ContentSlot>
        <List comma space>
          <Show when={showFirst.value}>One</Show>
          <Show when={showSecond.value}>Two</Show>
        </List>
      </ContentSlot>
    </>
  );
  expect(tree).toRenderTo("Empty list!");
  showFirst.value = true;
  expect(tree).toRenderTo("One");
  showSecond.value = true;
  expect(tree).toRenderTo("One, Two");
  showFirst.value = false;
  showSecond.value = false;
  expect(tree).toRenderTo("Empty list!");
});
