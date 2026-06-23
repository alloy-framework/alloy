import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Match, Switch } from "../../src/components/Switch.jsx";

it("selects the true branch", () => {
  const template = (
    <Switch>
      <Match when={true}>true</Match>
      <Match else>false</Match>
    </Switch>
  );
  expect(template).toRenderTo(`true`);
});
it("selects the else branch", () => {
  const template = (
    <Switch>
      <Match when={false}>true</Match>
      <Match else>false</Match>
    </Switch>
  );
  expect(template).toRenderTo(`false`);
});

it("renders to nothing when no branch matches", () => {
  const template = (
    <Switch>
      <Match when={false}>true</Match>
    </Switch>
  );
  expect(template).toRenderTo(``);
});

it("works with reactivity", () => {
  const count = ref(0);
  const template = (
    <Switch>
      <Match when={count.value % 2 === 0}>even</Match>
      <Match else>odd</Match>
    </Switch>
  );
  const tree = template;
  expect(tree).toRenderTo("even");
  count.value++;
  expect(tree).toRenderTo("odd");
  count.value++;
  expect(tree).toRenderTo("even");
});
