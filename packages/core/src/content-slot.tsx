import { effect, Ref, shallowRef } from "@vue/reactivity";
import { Show } from "./components/Show.jsx";
import { getContext } from "./reactivity.js";
import { Children, Component } from "./runtime/component.js";

export interface ContentSlot {
  (props: { children: Children }): Children;
  /**
   * A ref indicating whether the slot is currently empty.
   */
  ref: Ref<boolean>;

  /**
   * Whether the slot is currently empty.
   */
  isEmpty: boolean;

  /**
   * Whether the slot has any content.
   */
  hasContent: boolean;

  /**
   * A component that will render its contents when the content slot is empty.
   */
  WhenEmpty: Component<{}>;

  /**
   * A component that will render its contents when the content slot has content.
   */
  WhenHasContent: Component<{}>;
}

/**
 * Create a component which tracks whether any content is placed inside of it.
 * The component exposes a ref `isEmpty` which indicates whether the slot is
 * empty, as well as convenience accessors `isEmpty` and `hasContent`.
 * Additionally, it provides two sub-components, `WhenEmpty` and
 * `WhenHasContent`, which render their contents conditionally based on whether
 * the slot is empty.
 *
 * @example
 *
 * ```tsx
 * const ContentSlot = createContentSlot();
 *
 * <>
 *   <ContentSlot.WhenEmpty>The slot is empty!</ContentSlot.WhenEmpty>
 *   <ContentSlot.WhenHasContent>The slot has content!</ContentSlot.WhenHasContent>
 *   <ContentSlot>
 *     {someCondition && "Here is some content!"}
 *   </ContentSlot>
 * </>
 * ```
 */
export function createContentSlot(): ContentSlot {
  const isEmpty = shallowRef<boolean>(false);

  function ContentSlot(props: { children: Children }) {
    const context = getContext()!;
    effect(() => {
      isEmpty.value = context.isEmpty!.value;
    });

    return props.children;
  }
  ContentSlot.ref = isEmpty;
  ContentSlot.WhenEmpty = function WhenEmpty(props: { children: Children }) {
    return <Show when={isEmpty.value}>{props.children}</Show>;
  };

  ContentSlot.WhenHasContent = function WhenHasContent(props: {
    children: Children;
  }) {
    return <Show when={!isEmpty.value}>{props.children}</Show>;
  };

  Object.defineProperty(ContentSlot, "isEmpty", {
    get() {
      return isEmpty.value;
    },
  });

  Object.defineProperty(ContentSlot, "hasContent", {
    get() {
      return !isEmpty.value;
    },
  });

  return ContentSlot as any;
}
