import { Refkey } from "@alloy-js/core";
import { ref } from "../symbols/index.js";

export interface ReferenceProps {
  refkey: Refkey;

  /**
   * If the reference is a type.
   * This affect things like import where `type` keyword might be used.
   */
  type?: boolean;
}

export function Reference({ refkey, type }: Readonly<ReferenceProps>) {
  const reference = ref(refkey, type);

  return <>{reference}</>;
}
