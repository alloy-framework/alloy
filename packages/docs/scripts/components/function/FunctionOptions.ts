import { useContext } from "@alloy-js/core";
import type { ApiFunction, ApiInterface } from "../../model/index.js";
import { ApiModelContext } from "../../contexts/api-model.js";
import { InterfaceMembers, MdxSection } from "../stc/index.js";

export interface FunctionOptionsProps {
  fn: ApiFunction;
}

export function FunctionOptions(props: FunctionOptionsProps) {
  const lastParam = props.fn.parameters.at(-1);
  if (!lastParam || lastParam.name !== "options") return "";
  if (!lastParam.parameterTypeExcerpt.spannedTokens[0]?.referenceId) {
    return "";
  }
  const apiModel = useContext(ApiModelContext)!;
  const optionsType = apiModel.resolveReference(
    lastParam.parameterTypeExcerpt.spannedTokens[0].referenceId!,
  );

  if (!optionsType) return "";

  return MdxSection({ title: "Options" }).children(
    InterfaceMembers({ iface: optionsType as ApiInterface, flatten: true }),
  );
}
