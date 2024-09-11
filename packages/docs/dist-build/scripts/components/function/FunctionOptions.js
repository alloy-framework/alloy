import { code, useContext } from "@alloy-js/core";
import { ApiModelContext } from "../../contexts/api-model.js";
import { InterfaceMembers } from "../stc/index.js";
export function FunctionOptions(props) {
    const lastParam = props.fn.parameters.at(-1);
    if (!lastParam || lastParam.name !== "options")
        return "";
    const optionTypeRef = lastParam.parameterTypeExcerpt.spannedTokens[0].canonicalReference;
    const apiModel = useContext(ApiModelContext);
    const optionsType = apiModel.resolveDeclarationReference(optionTypeRef, undefined).resolvedApiItem;
    return code `
    ### Options

    ${InterfaceMembers({ iface: optionsType, flatten: true })}
  `;
}
//# sourceMappingURL=FunctionOptions.js.map