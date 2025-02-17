import "@alloy-js/core/testing";
import { printTree } from "@alloy-js/core/testing";
import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Match, Switch } from "../../src/components/Switch.jsx";
import { renderTree } from "../../src/render.js";

it("selects the true branch", () => {
  const template =
    <Switch>
      <Match when={true}>
        true
      </Match>
      <Match else>
        false
      </Match>
    </Switch>;
  expect(template).toRenderTo(`true`);
});
it("selects the else branch", () => {
  const template =
    <Switch>
      <Match when={false}>
        true
      </Match>
      <Match else>
        false
      </Match>
    </Switch>;
  expect(template).toRenderTo(`false`);
});

it("renders to nothing when no branch matches", () => {
  const template =
    <Switch>
      <Match when={false}>
        true
      </Match>
    </Switch>;
  expect(template).toRenderTo(``);
});

it("works with reactivity", () => {
  let count = ref(0);
  const template =
    <Switch>
      <Match when={count.value % 2 === 0}>
        even
      </Match>
      <Match else>
        odd
      </Match>
    </Switch>;
  const tree = renderTree(template);
  expect(printTree(tree)).toBe(`even`);
  count.value++;
  expect(printTree(tree)).toBe(`odd`);
  count.value++;
  expect(printTree(tree)).toBe(`even`);
});
