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
   * The string to join the items with.
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
