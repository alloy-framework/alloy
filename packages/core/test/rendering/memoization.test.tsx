import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { memo } from "../../src/reactivity.js";
import { flushJobs } from "../../src/scheduler.js";
import { renderTree } from "../../src/test-render.js";

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
  // Without element-cache (legacy), each component creator is invoked on
  // every reactive re-evaluation, except when the same ComponentCreator
  // instance reappears at a slot — reconcileArray keeps the existing
  // subtree intact. child1 is invoked once initially and reused on the
  // memo re-fire; child2 is invoked once when added.
  expect(renderCount).toBe(2);
});
