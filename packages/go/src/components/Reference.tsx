import { computed, emitSymbol, Refkey } from "@alloy-js/core";
import { ref } from "../symbols/index.js";

export interface ReferenceProps {
  refkey: Refkey;
}

// used to resolve refkey references within source files
export function Reference({ refkey }: ReferenceProps) {
  const reference = ref(refkey);

  const computedRef = computed(() => reference());
  if (computedRef.value[1]) {
    emitSymbol(computedRef.value[1]);
  }

  return <>{computedRef.value[0]}</>;
}
