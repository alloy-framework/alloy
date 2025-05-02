import { Refkey } from "@alloy-js/core";
import { isTypeRefContext } from "../context/type-ref-context.js";
import { ref } from "../symbols/index.js";

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
  const inTypeRef = isTypeRefContext();
  const reference = ref(refkey, { type: type ?? inTypeRef });

  return <>{reference}</>;
}
