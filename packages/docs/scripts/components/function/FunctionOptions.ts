import { code, useContext } from "@alloy-js/core";
import type { ApiFunction, ApiInterface } from "@microsoft/api-extractor-model";
import { ApiModelContext } from "../../contexts/api-model.js";
import { InterfaceMembers } from "../stc/index.js";

export interface FunctionOptionsProps {
  fn: ApiFunction;
}

export function FunctionOptions(props: FunctionOptionsProps) {
  const lastParam = props.fn.parameters.at(-1);
  if (!lastParam || lastParam.name !== "options") return "";

  const optionTypeRef =
    lastParam.parameterTypeExcerpt.spannedTokens[0].canonicalReference;
  const apiModel = useContext(ApiModelContext)!;

  const optionsType = apiModel.resolveDeclarationReference(
    optionTypeRef!,
    undefined,
  ).resolvedApiItem!;

  return code`
    ### Options

    ${InterfaceMembers({ iface: optionsType as ApiInterface })}
  `;
}
