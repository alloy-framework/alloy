import { SourceFile } from "@alloy-js/core/stc";
import { Reference } from "./Reference.js";
export function MdxSourceFile(props) {
    return SourceFile({
        path: props.path,
        reference: Reference,
        filetype: "mdx",
    }).children(props.children);
}
//# sourceMappingURL=MdxSourceFile.js.map