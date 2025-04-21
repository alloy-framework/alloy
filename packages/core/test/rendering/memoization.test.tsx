import { memo } from "@alloy-js/core/jsx-runtime";
import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { renderTree } from "../../src/render.js";
import { flushJobs } from "../../src/scheduler.js";

it("memoizes child components", () => {
  let renderCount = 0;
  function Child() {
    renderCount++;
    return "hi " + String(Math.random());
  }

  const doThing = ref();
  const child1 = <Child />;
  const child2 = <Child />;
  const items = memo(() => {
    const list = [child1];
    if (doThing.value) {
      list.push(child2);
    }

    return list;
  });

  const template = <>{items}</>;

  renderTree(template);
  doThing.value = true;
  flushJobs();
  expect(renderCount).toBe(2);
});
