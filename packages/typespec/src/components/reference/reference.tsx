import { computed, emitSymbol, Refkey, unresolvedRefkey } from "@alloy-js/core";
import { ref } from "../../symbols/reference.js";

export interface ReferenceProps {
  refkey: Refkey;
}

export function Reference(props: ReferenceProps) {
  const { refkey } = props;
  const symbol = ref(refkey);
  const symbolRef = computed(() => symbol());
  const renderedRef = computed(() => {
    const sym = symbol();
    if (sym !== undefined) {
      return sym.name;
    }
    return unresolvedRefkey(refkey);
  });
  emitSymbol(symbolRef);
  return <>{renderedRef.value}</>;
}
