import { expect, it } from "vitest";
import { List, printTree, ref, renderTree } from "../../src/index.js";
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
