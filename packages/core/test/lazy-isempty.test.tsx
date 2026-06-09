import { ref } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { Show } from "../src/components/Show.jsx";
import { createContentSlot } from "../src/content-slot.jsx";
import { Context, ensureIsEmpty, getContext } from "../src/reactivity.js";

describe("lazy isEmpty", () => {
  it("context starts without isEmpty ref allocated", () => {
    let ctx: Context | null = null;

    function Capture() {
      ctx = getContext()!;
      return "content";
    }

    expect(<Capture />).toRenderTo("content");

    // The isEmpty ref should NOT be allocated unless someone observes it.
    expect(ctx).not.toBeNull();
    expect(ctx!.isEmpty).toBeUndefined();
    expect(ctx!.childrenWithContent).toBe(1);
  });

  it("ensureIsEmpty lazily allocates the isEmpty ref", () => {
    let ctx: Context | null = null;

    function Capture() {
      ctx = getContext()!;
      return "content";
    }

    expect(<Capture />).toRenderTo("content");

    expect(ctx!.isEmpty).toBeUndefined();
    const isEmptyRef = ensureIsEmpty(ctx!);
    expect(ctx!.isEmpty).toBeDefined();
    expect(isEmptyRef).toBe(ctx!.isEmpty);
  });

  it("tracks content count for empty and non-empty components", () => {
    let emptyCtx: Context | null = null;
    let fullCtx: Context | null = null;

    function EmptyCapture() {
      emptyCtx = getContext()!;
      return false;
    }

    function FullCapture() {
      fullCtx = getContext()!;
      return "has content";
    }

    expect(
      <>
        <EmptyCapture />
        <FullCapture />
      </>,
    ).toRenderTo("has content");

    expect(emptyCtx!.childrenWithContent).toBe(0);
    expect(fullCtx!.childrenWithContent).toBe(1);
  });

  it("ContentSlot triggers ensureIsEmpty and tracks reactively", () => {
    const ContentSlot = createContentSlot();
    const showContent = ref(false);

    const tree = (
      <>
        {ContentSlot.isEmpty && "empty"}
        <ContentSlot>
          <Show when={showContent.value}>content</Show>
        </ContentSlot>
      </>
    );

    expect(tree).toRenderTo("empty");

    showContent.value = true;
    expect(tree).toRenderTo("content");
  });

  it("propagates empty state up through parent contexts", () => {
    const OuterSlot = createContentSlot();
    const showContent = ref(false);

    const tree = (
      <>
        {OuterSlot.isEmpty && "outer-empty"}
        <OuterSlot>
          <Show when={showContent.value}>content</Show>
        </OuterSlot>
      </>
    );

    // Outer should be empty initially.
    expect(tree).toRenderTo("outer-empty");

    // Show content — outer should become non-empty.
    showContent.value = true;
    expect(tree).toRenderTo("content");
  });
});
