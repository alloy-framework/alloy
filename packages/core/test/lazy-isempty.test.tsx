import { ref } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { Show } from "../src/components/Show.jsx";
import { createContentSlot } from "../src/content-slot.jsx";
import { Context, ensureIsEmpty, getContext } from "../src/reactivity.js";
import { printTree, renderTree } from "../src/render.js";
import "../testing/extend-expect.js";

describe("lazy isEmpty / _lastEmpty", () => {
  it("context starts without isEmpty ref allocated", () => {
    let ctx: Context | null = null;

    function Capture() {
      ctx = getContext()!;
      return "content";
    }

    renderTree(<Capture />);

    // The isEmpty ref should NOT be allocated unless someone observes it.
    expect(ctx).not.toBeNull();
    expect(ctx!.isEmpty).toBeUndefined();
    expect(ctx!._lastEmpty).toBe(false);
  });

  it("ensureIsEmpty lazily allocates the isEmpty ref", () => {
    let ctx: Context | null = null;

    function Capture() {
      ctx = getContext()!;
      return "content";
    }

    renderTree(<Capture />);

    expect(ctx!.isEmpty).toBeUndefined();
    const isEmptyRef = ensureIsEmpty(ctx!);
    expect(ctx!.isEmpty).toBeDefined();
    expect(isEmptyRef).toBe(ctx!.isEmpty);
  });

  it("_lastEmpty is true for empty component, false for non-empty", () => {
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

    renderTree(
      <>
        <EmptyCapture />
        <FullCapture />
      </>,
    );

    expect(emptyCtx!._lastEmpty).toBe(true);
    expect(fullCtx!._lastEmpty).toBe(false);
  });

  it("ContentSlot triggers ensureIsEmpty and tracks reactively", () => {
    const ContentSlot = createContentSlot();
    const showContent = ref(false);

    const tree = renderTree(
      <>
        {ContentSlot.isEmpty && "empty"}
        <ContentSlot>
          <Show when={showContent.value}>content</Show>
        </ContentSlot>
      </>,
    );

    expect(printTree(tree)).toBe("empty");

    showContent.value = true;
    expect(printTree(tree)).toBe("content");
  });

  it("propagates empty state up through parent contexts", () => {
    const OuterSlot = createContentSlot();
    const showContent = ref(false);

    const tree = renderTree(
      <>
        {OuterSlot.isEmpty && "outer-empty"}
        <OuterSlot>
          <Show when={showContent.value}>content</Show>
        </OuterSlot>
      </>,
    );

    // Outer should be empty initially.
    expect(printTree(tree)).toBe("outer-empty");

    // Show content — outer should become non-empty.
    showContent.value = true;
    expect(printTree(tree)).toBe("content");
  });
});
