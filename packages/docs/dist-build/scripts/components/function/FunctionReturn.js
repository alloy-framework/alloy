import { Excerpt, MdxSection, TsDoc } from "../stc/index.js";
export function FunctionReturn(props) {
    return MdxSection({ title: "Returns", level: 3 }).children(Excerpt({ excerpt: props.fn.returnTypeExcerpt, context: props.fn }), props.fn.tsdocComment &&
        props.fn.tsdocComment.returnsBlock &&
        TsDoc({ node: props.fn.tsdocComment.returnsBlock, context: props.fn }));
}
//# sourceMappingURL=FunctionReturn.js.map