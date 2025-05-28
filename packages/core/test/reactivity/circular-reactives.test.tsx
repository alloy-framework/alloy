import { shallowReactive } from "@vue/reactivity";
import { expect, it } from "vitest";
import { For } from "../../src/index.js";
import { printTree, renderTree } from "../../src/render.js";
import { d } from "../../testing/render.js";

it("it should work with circular reactives", () => {
  const items: string[] = shallowReactive([]);
  let added = false;
  function MaybeAddString(props: any) {
    if (!added) {
      items.push("item " + items.length);
      added = true;
    }
    return <>{props.item}</>;
  }
  const template = (
    <>
      <For each={items}>
        {(item) => {
          return <MaybeAddString item={item} />;
        }}
      </For>
    </>
  );
  const tree = renderTree(template);
  items.push("item start");
  expect(printTree(tree)).toBe(d`
    item start
    item 1
  `);
});
