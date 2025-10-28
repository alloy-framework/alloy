import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import "../testing/extend-expect.js";
import { Show } from "./components/Show.jsx";
import { createContentSlot } from "./content-slot.jsx";
import { printTree, renderTree } from "./render.js";

it("knows when its empty", () => {
  const ContentSlot = createContentSlot();

  expect(
    <>
      {ContentSlot.hasContent && "{"}
      <ContentSlot>hi</ContentSlot>
      {ContentSlot.hasContent && "}"}
    </>,
  ).toRenderTo(`
    {hi}
  `);

  expect(
    <>
      {ContentSlot.hasContent && "{"}
      <ContentSlot>{false}</ContentSlot>
      {ContentSlot.hasContent && "}"}
    </>,
  ).toRenderTo(``);
});

it("is reactive", () => {
  const ContentSlot = createContentSlot();
  const showContent = ref(false);

  const tree = renderTree(
    <>
      {ContentSlot.isEmpty && "It's empty!"}
      <ContentSlot>
        <Show when={showContent.value}>Content!</Show>
      </ContentSlot>
    </>,
  );

  expect(printTree(tree)).toBe(`It's empty!`);
  showContent.value = true;
  expect(printTree(tree)).toBe(`Content!`);
});

it("works with WhenEmpty and WhenHasContent", () => {
  const ContentSlot = createContentSlot();
  const showContent = ref(false);

  const tree = renderTree(
    <>
      <ContentSlot.WhenEmpty>It's empty!</ContentSlot.WhenEmpty>
      <ContentSlot.WhenHasContent>Has content!</ContentSlot.WhenHasContent>
      <ContentSlot>
        <Show when={showContent.value}>Content!</Show>
      </ContentSlot>
    </>,
  );

  expect(printTree(tree)).toBe(`It's empty!`);
  showContent.value = true;
  expect(printTree(tree)).toBe(`Has content!Content!`);
});
