import * as core from "@alloy-js/core";
import { ref } from "../symbols/reference.js";

export interface ReferenceProps {
  refkey: core.Refkey;
}

// used to resolve refkey references within source files
export function Reference({ refkey }: ReferenceProps) {
  const reference = ref(refkey);
  const symbolRef = core.computed(() => reference()[1]);

  core.emitSymbol(symbolRef);
  return <>{reference()[0]}</>;
}
