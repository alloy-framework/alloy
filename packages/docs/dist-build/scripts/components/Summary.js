import { MdxParagraph, TsDoc } from "./stc/index.js";
export function Summary(props) {
    if (!props.type ||
        !props.type.tsdocComment ||
        !props.type.tsdocComment.summarySection)
        return "";
    return MdxParagraph().children(TsDoc({
        node: props.type.tsdocComment.summarySection,
        context: props.type,
    }));
}
//# sourceMappingURL=Summary.js.map