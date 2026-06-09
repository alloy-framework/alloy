import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Show } from "../../src/components/Show.jsx";

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
  expect(template).toRenderTo("even");
  count.value++;
  expect(template).toRenderTo("odd");
  count.value++;
  expect(template).toRenderTo("even");
});
