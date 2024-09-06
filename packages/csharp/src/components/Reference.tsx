import * as core from "@alloy-js/core";
import * as symbols from "../symbols/index.js";

export interface ReferenceProps {
  refkey: core.Refkey;
}

// used to resolve refkey references within source files
export function Reference({ refkey }: ReferenceProps) {
  const reference = symbols.ref(refkey);

  return <>{reference}</>;
}
