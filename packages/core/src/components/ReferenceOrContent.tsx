import { Children } from "@alloy-js/core/jsx-runtime";
import { computed } from "@vue/reactivity";
import { useContext } from "../context.js";
import { BinderContext } from "../context/binder.js";
import type { Refkey } from "../refkey.js";

export interface ReferenceOrContentProps {
  readonly refkey: Refkey;
  readonly children: Children;
}

export function ReferenceOrContent(props: ReferenceOrContentProps) {
  const binder = useContext(BinderContext);
  if (!binder) {
    throw new Error("Need binder context to create declarations");
  }

  const sym = binder.getSymbolForRefkey(props.refkey);
  return computed(() =>
    sym.value === undefined ? props.children : props.refkey,
  );
}
