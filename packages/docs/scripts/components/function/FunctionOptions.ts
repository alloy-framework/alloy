import type { ApiFunction, ApiInterface } from "@microsoft/api-extractor-model";
import { InterfaceMembers, MdxSection } from "../stc/index.js";
import { resolveCodeDestination } from "../TsDoc.js";

export interface FunctionOptionsProps {
  fn: ApiFunction;
}

export function FunctionOptions(props: FunctionOptionsProps) {
  const lastParam = props.fn.parameters.at(-1);
  if (!lastParam || lastParam.name !== "options") return "";
  if (!lastParam.parameterTypeExcerpt.spannedTokens[0].canonicalReference) {
    // we couldn't find a reference, so probably the type is more complex than a simple type reference.
    return "";
  }
  const optionsType = resolveCodeDestination(
    lastParam.parameterTypeExcerpt.spannedTokens[0].canonicalReference!,
    undefined,
  );

  return MdxSection({ title: "Options" }).children(
    InterfaceMembers({ iface: optionsType as ApiInterface, flatten: true }),
  );
}
