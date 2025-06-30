import { computed, emitSymbol, Refkey } from "@alloy-js/core";
import { ref } from "../symbols/index.js";
import { isTypeRefContext } from "../context/type-ref-context.jsx";

export interface ReferenceProps {
  refkey: Refkey;

  /**
   * Whether this is a reference to a type.
   *
   * @remarks
   * This affect things like import where `type` keyword might be used.
   */
  type?: boolean;
}

export function Reference({ refkey, type }: ReferenceProps) {
  const reference = ref(refkey);
  const symbolRef = computed(() => reference()[1]);

  emitSymbol(symbolRef);
  return <>{reference()[0]}</>;
}
