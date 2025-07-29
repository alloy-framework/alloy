import { Refkey } from "@alloy-js/core";
import { ref } from "../symbols/index.js";

export interface ReferenceProps {
  /**
   * The refkey for the symbol to reference.
   */
  refkey: Refkey;
}

/**
 * Emit a reference to a JSON value by its refkey.
 *
 * @remarks
 *
 * Note that when you place a refkey in a template, the refkey will be converted
 * into a reference automatically. Using this component directly is generally
 * not required or recommended.
 */
export function Reference(props: ReferenceProps) {
  const reference = ref(props.refkey);
  return <>"{reference}"</>;
}
