import { shallowReactive } from "@vue/reactivity";
import { expect, it } from "vitest";
import { For } from "../../src/index.js";

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
  const tree = template;
  expect(tree).toRenderTo("");
  items.push("item start");
  expect(tree).toRenderTo(`
    item start
    item 1
  `);
});

it("should work with immediately recursive reactives", () => {
  const items: Set<string> = shallowReactive(new Set());
  const template = (
    <>
      <For each={items.values()}>
        {(item) => {
          items.add("item 1");
          return item;
        }}
      </For>
    </>
  );
  const tree = template;
  expect(tree).toRenderTo("");
  items.add("item start");
  expect(tree).toRenderTo(`
    item start
    item 1
  `);
});
