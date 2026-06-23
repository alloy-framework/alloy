import {
  Children,
  computed,
  Refkeyable,
  toRefkey,
  unresolvedRefkey,
} from "@alloy-js/core";
import { ref } from "../../symbols/reference.js";
import {
  TemplateArgumentDescriptor,
  TemplateArguments,
} from "../template-parameters/template-arguments.jsx";

export interface ReferenceProps {
  refkey: Refkeyable;
  /** Optional template/type arguments (e.g. `Record<string>` → `typeArgs={["string"]}`). */
  typeArgs?: (Children | TemplateArgumentDescriptor)[];
}

export function Reference(props: ReferenceProps) {
  const refkey = toRefkey(props.refkey);
  const result = ref(refkey);
  const renderedRef = computed(() => {
    const res = result.value;
    if (res !== undefined) {
      const { symbol, accessPath } = res;
      if (accessPath.length > 0) {
        return [symbol.name, ...accessPath.map((m) => m.name)].join(".");
      }
      return symbol.name;
    }
    return unresolvedRefkey(refkey);
  });
  return (
    <>
      {renderedRef.value}
      {props.typeArgs && <TemplateArguments args={props.typeArgs} />}
    </>
  );
}
