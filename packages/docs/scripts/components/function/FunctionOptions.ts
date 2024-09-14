import type { ApiFunction, ApiInterface } from "@microsoft/api-extractor-model";
import { InterfaceMembers, MdxSection } from "../stc/index.js";
import { resolveCodeDestination } from "../TsDoc.js";

export interface FunctionOptionsProps {
  fn: ApiFunction;
}

export function FunctionOptions(props: FunctionOptionsProps) {
  const lastParam = props.fn.parameters.at(-1);
  if (!lastParam || lastParam.name !== "options") return "";

  const optionsType = resolveCodeDestination(
    lastParam.parameterTypeExcerpt.spannedTokens[0].canonicalReference!,
    undefined,
  );

  return MdxSection({ title: "Options", level: 3 }).children(
    InterfaceMembers({ iface: optionsType as ApiInterface, flatten: true }),
  );
}
