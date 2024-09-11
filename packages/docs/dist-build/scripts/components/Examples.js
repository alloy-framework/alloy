import { code, mapJoin } from "@alloy-js/core";
import { StandardTags } from "@microsoft/tsdoc";
import { TsDoc } from "./stc/index.js";
export function Examples(props) {
    if (!props.type.tsdocComment)
        return "";
    const exampleBlocks = props.type.tsdocComment.customBlocks.filter((x) => x.blockTag.tagNameWithUpperCase ===
        StandardTags.example.tagNameWithUpperCase);
    if (exampleBlocks.length === 0)
        return "";
    const exampleCode = mapJoin(exampleBlocks, (block) => {
        return TsDoc({ node: block, context: props.type });
    }, { joiner: "\n\n" });
    return code `

  
    ### Example${exampleBlocks.length > 1 ? "s" : ""}

    ${exampleCode}

  `;
}
//# sourceMappingURL=Examples.js.map