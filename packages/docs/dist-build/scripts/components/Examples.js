import { StandardTags } from "@microsoft/tsdoc";
import { MdxParagraph, MdxSection, TsDoc } from "./stc/index.js";
export function Examples(props) {
    if (!props.type.tsdocComment)
        return "";
    const exampleBlocks = props.type.tsdocComment.customBlocks.filter((x) => x.blockTag.tagNameWithUpperCase ===
        StandardTags.example.tagNameWithUpperCase);
    if (exampleBlocks.length === 0)
        return "";
    const exampleCode = exampleBlocks.map((block) => MdxParagraph().children(TsDoc({ node: block, context: props.type })));
    return MdxSection({
        title: `Example${exampleBlocks.length > 1 ? "s" : ""}`,
        level: 3,
    }).children(exampleCode);
}
//# sourceMappingURL=Examples.js.map