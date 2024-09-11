import { code } from "@alloy-js/core";
import { Excerpt, TsDoc } from "../stc/index.js";
export function FunctionReturn(props) {
    return code `
    ### Returns

    ${Excerpt({ excerpt: props.fn.returnTypeExcerpt, context: props.fn })}

    ${props.fn.tsdocComment &&
        props.fn.tsdocComment.returnsBlock &&
        TsDoc({ node: props.fn.tsdocComment.returnsBlock, context: props.fn })}

  `;
}
//# sourceMappingURL=FunctionReturn.js.map