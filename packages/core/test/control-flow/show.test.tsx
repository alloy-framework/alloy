import "@alloy-js/core/testing";
import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Show } from "../../src/components/Show.jsx";
import { printTree, renderTree } from "../../src/render.js";

it("selects the true branch", () => {
  const template = <Show when={true}>true</Show>;
  expect(template).toRenderTo(`true`);
});

it("works with reactivity", () => {
  const count = ref(0);
  const template = (
    <Show when={count.value % 2 === 0} fallback={"odd"}>
      even
    </Show>
  );
  const tree = renderTree(template);
  expect(printTree(tree)).toBe(`even`);
  count.value++;
  expect(printTree(tree)).toBe(`odd`);
  count.value++;
  expect(printTree(tree)).toBe(`even`);
});
