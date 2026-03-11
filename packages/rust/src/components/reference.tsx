import { Refkey, computed, emitSymbol } from "@alloy-js/core";
import { ref } from "../symbols/reference.js";

export interface ReferenceProps {
  refkey: Refkey;
}

export function Reference(props: ReferenceProps) {
  const result = ref(props.refkey);
  const symbolRef = computed(() => result()[1]);

  emitSymbol(symbolRef);

  return <>{result()[0]}</>;
}
