import { code } from "@alloy-js/core";
import { TsDoc } from "./stc/index.js";
export function Remarks(props) {
    if (!props.type.tsdocComment || !props.type.tsdocComment.remarksBlock)
        return "";
    return code `

  
    ### Remarks

    ${TsDoc({ node: props.type.tsdocComment.remarksBlock, context: props.type })}


  `;
}
//# sourceMappingURL=Remarks.js.map