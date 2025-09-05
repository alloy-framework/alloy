import { computed, emitSymbol, Refkey } from "@alloy-js/core";
import { ref } from "../symbols/index.js";

export interface ReferenceProps {
  refkey: Refkey;
}

/**
 * A Python reference to a symbol, such as a variable, function, or class.
 *
 * @remarks
 * This component is used to render references to symbols in Python code.
 * It takes a `refkey` prop which is the key of the symbol to reference.
 */
export function Reference({ refkey }: ReferenceProps) {
  const reference = ref(refkey);
  const symbolRef = computed(() => reference()[1]);

  emitSymbol(symbolRef);
  return <>{reference()[0]}</>;
}
