import {
  type Refkey,
  type RefkeyableObject,
  REFKEYABLE,
  computed,
  emitSymbol,
  isRefkey,
} from "@alloy-js/core";
import { ref } from "../symbols/reference.js";

export interface ReferenceProps {
  refkey: Refkey | RefkeyableObject;
}

export function Reference(props: ReferenceProps) {
  const resolvedRefkey = isRefkey(props.refkey)
    ? props.refkey
    : (props.refkey as RefkeyableObject)[REFKEYABLE]();
  const result = ref(resolvedRefkey);
  const symbolRef = computed(() => result()[1]);

  emitSymbol(symbolRef);

  return <>{result()[0]}</>;
}
