import { mapJoin } from "@alloy-js/core";
import { DocDeclaration, Frontmatter, FunctionOverloadDoc, MdxSourceFile, } from "../stc/index.js";
export function FunctionDoc(props) {
    const title = props.fn.functions[0].displayName;
    return MdxSourceFile({ path: title + ".mdx" }).children(DocDeclaration({
        name: title,
        apiItem: props.fn.functions[0],
    }), Frontmatter({ title }), mapJoin(props.fn.functions, (fn) => FunctionOverloadDoc({
        fn,
        omitOverloadIndex: props.fn.functions.length === 1,
    }), {
        joiner: "\n\n",
    }));
}
//# sourceMappingURL=FunctionDoc.js.map