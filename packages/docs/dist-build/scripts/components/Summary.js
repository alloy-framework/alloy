import { TsDoc } from "./stc/index.js";
export function Summary(props) {
    if (!props.type.tsdocComment || !props.type.tsdocComment.summarySection)
        return "";
    return [
        TsDoc({
            node: props.type.tsdocComment.summarySection,
            context: props.type,
        }),
        "\n\n",
    ];
}
//# sourceMappingURL=Summary.js.map