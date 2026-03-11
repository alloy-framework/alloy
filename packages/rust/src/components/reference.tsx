import {
  Refkey,
  computed,
  emitSymbol,
  resolve,
  unresolvedRefkey,
} from "@alloy-js/core";
import { RustScopeBase } from "../scopes/rust-scope.js";
import { RustOutputSymbol } from "../symbols/rust-output-symbol.js";

export interface ReferenceProps {
  refkey: Refkey;
}

export function Reference(props: ReferenceProps) {
  const result = resolve<RustScopeBase, RustOutputSymbol>(props.refkey);
  const symbolRef = computed(() => result.value?.symbol);

  emitSymbol(symbolRef);

  return <>{result.value?.symbol.name ?? unresolvedRefkey(props.refkey)}</>;
}
