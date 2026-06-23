import { ref } from "@vue/reactivity";
import { expect, it } from "vitest";
import { Show } from "./components/Show.jsx";
import { createContentSlot } from "./content-slot.jsx";

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

  const tree = (
    <>
      {ContentSlot.isEmpty && "It's empty!"}
      <ContentSlot>
        <Show when={showContent.value}>Content!</Show>
      </ContentSlot>
    </>
  );

  expect(tree).toRenderTo("It's empty!");
  showContent.value = true;
  expect(tree).toRenderTo("Content!");
});

it("works with WhenEmpty and WhenHasContent", () => {
  const ContentSlot = createContentSlot();
  const showContent = ref(false);

  const tree = (
    <>
      <ContentSlot.WhenEmpty>It's empty!</ContentSlot.WhenEmpty>
      <ContentSlot.WhenHasContent>Has content!</ContentSlot.WhenHasContent>
      <ContentSlot>
        <Show when={showContent.value}>Content!</Show>
      </ContentSlot>
    </>
  );

  expect(tree).toRenderTo("It's empty!");
  showContent.value = true;
  expect(tree).toRenderTo("Has content!Content!");
});
