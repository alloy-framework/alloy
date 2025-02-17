import { Children, memo } from "@alloy-js/core/jsx-runtime";
import { isRef, Ref } from "@vue/reactivity";
import { JoinOptions, mapJoin } from "../utils.js";

export type UnwrapMaybeRef<T> = T extends Ref<infer U> ? U : T;

export interface ForProps<T extends any[] | Ref<any[]>, U extends Children> {
  /**
   * The array to iterate over.
   */
  each: T;

  /**
   * The string to join the items with. By default, this is a line break.
   */
  joiner?: string;

  /**
   * The string to end the items with. Only emitted when there is more than one
   * item.
   */
  ender?: string;

  /**
   * A function to call for each item.
   */
  children: (item: UnwrapMaybeRef<T>[number], index: number) => U;
}

/**
 * The For component iterates over the provided array and invokes the child
 * callback for each item. It can optionally be provided with a `joiner` which
 * is placed between each item, and an `ender` which is placed after the last
 * item when there is at least one item.
 *
 * @example
 *
 * ```tsx
 * const items = ["apple", "pear", "plum"];
 * return <For each={items}>
 *   {(item) => <>Fruit: {item}</>}
 * </For>
 * ```
 *
 * @remarks
 *
 * When the `each` prop is a reactive (e.g. a reactive array, or ref to an
 * array), `For` will automatically update when the array changes. When doing
 * so, it will attempt to avoid re-rendering items which have not changed. For
 * example, when appending an item to a reactive array, existing items will not
 * be re-rendered. Note that presently the implementation is fairly simple -
 * when making modifications to the middle of an array it likely that every
 * element after the modification will be rerendered.
 *
 * @see {@link mapJoin} for mapping arrays to elements outside of JSX templates.
 */
export function For<T extends any[] | Ref<any[]>, U extends Children>(
  props: ForProps<T, U>,
) {
  const cb = props.children;
  const options: JoinOptions = {};
  if (Object.hasOwn(props, "joiner")) {
    options.joiner = props.joiner;
  }

  if (Object.hasOwn(props, "ender")) {
    options.ender = props.ender;
  }
  return memo(() => {
    const maybeRef = props.each;

    return (mapJoin as any)(
      () => (isRef(maybeRef) ? maybeRef.value : maybeRef),
      cb,
      options,
    );
  });
}
