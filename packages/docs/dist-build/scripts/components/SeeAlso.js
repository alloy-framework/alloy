import { code, mapJoin } from "@alloy-js/core";
import { MdxSection, TsDoc } from "./stc/index.js";
import { resolveCodeDestination } from "./TsDoc.js";
export function SeeAlso(props) {
    if (!props.type.tsdocComment ||
        props.type.tsdocComment.seeBlocks.length === 0) {
        return "";
    }
    const contextsProvided = [];
    const seeBlocks = [];
    for (const seeBlock of props.type.tsdocComment.seeBlocks) {
        // this check probably needs to be more robust, not sure why the link tag is after two softbreaks.
        if (props.splitContexts &&
            seeBlock.content.nodes.length === 1 &&
            seeBlock.content.nodes[0].kind === "Paragraph" &&
            seeBlock.content.nodes[0].nodes[2].kind === "LinkTag" &&
            seeBlock.content.nodes[0].nodes[2]
                .codeDestination) {
            const resolvedType = resolveCodeDestination(seeBlock.content.nodes[0].nodes[2]
                .codeDestination, props.type);
            if (resolvedType && resolvedType.displayName.indexOf("Context") > -1) {
                contextsProvided.push(seeBlock);
            }
            else {
                seeBlocks.push(seeBlock);
            }
        }
        else {
            seeBlocks.push(seeBlock);
        }
    }
    const contextsProvidedList = contextsProvided.length > 0 &&
        MdxSection({ title: "Contexts provided", level: 3 }).children(mapJoin(contextsProvided, (seeBlock) => {
            return code `
          * ${TsDoc({ node: seeBlock, context: props.type })}
        `;
        }));
    const seeAlsoList = seeBlocks.length > 0 &&
        MdxSection({ title: "See also", level: 3 }).children(mapJoin(seeBlocks, (seeBlock) => {
            return code `
          * ${TsDoc({ node: seeBlock, context: props.type })}
        `;
        }));
    return [contextsProvidedList, seeAlsoList];
}
//# sourceMappingURL=SeeAlso.js.map