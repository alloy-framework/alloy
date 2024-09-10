import { ContextAccessor, ContextInterface, ContextSignature, DocDeclaration, Frontmatter, MdxSourceFile, Remarks, SeeAlso, TsDoc, } from "../stc/index.js";
export function ContextDoc(props) {
    const title = props.context.name + " context";
    return MdxSourceFile({ path: props.context.name + ".mdx" }).children(props.context.contextAccessor &&
        DocDeclaration({
            name: title + " accessor",
            apiItem: props.context.contextAccessor,
        }), typeof props.context.contextInterface !== "string" &&
        DocDeclaration({
            name: title + " interface",
            apiItem: props.context.contextInterface,
        }), DocDeclaration({
        name: title,
        apiItem: props.context.contextVariable,
    }), Frontmatter({ title }), props.context.contextVariable.tsdocComment && [
        TsDoc({
            node: props.context.contextVariable.tsdocComment.summarySection,
            context: props.context.contextVariable,
        }),
        "\n\n",
    ], ContextSignature({ context: props.context }), "\n\n", ContextAccessor({ context: props.context }), "\n\n", ContextInterface({ context: props.context }), "\n\n", Remarks({
        type: props.context.contextVariable,
    }), SeeAlso({
        type: props.context.contextVariable,
        splitContexts: true,
    }));
}
//# sourceMappingURL=ContextDoc.js.map