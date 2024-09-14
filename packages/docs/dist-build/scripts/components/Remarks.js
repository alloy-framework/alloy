import { MdxSection, TsDoc } from "./stc/index.js";
export function Remarks(props) {
    if (!props.type.tsdocComment || !props.type.tsdocComment.remarksBlock)
        return "";
    return MdxSection({ title: "Remarks", level: 3 }).children(TsDoc({ node: props.type.tsdocComment.remarksBlock, context: props.type }));
}
//# sourceMappingURL=Remarks.js.map