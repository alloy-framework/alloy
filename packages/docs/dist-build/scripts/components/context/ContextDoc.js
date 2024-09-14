import { ContextAccessor, ContextInterface, ContextSignature, DocSourceFile, Remarks, SeeAlso, Summary, } from "../stc/index.js";
export function ContextDoc(props) {
    const title = props.context.name + " context";
    const { contextVariable, contextAccessor, contextInterface } = props.context;
    const declares = [
        { name: title, apiItem: contextVariable },
    ];
    if (contextAccessor) {
        declares.push({
            name: title + " accessor",
            apiItem: contextAccessor,
        });
    }
    if (typeof contextInterface !== "string") {
        declares.push({
            name: title + " interface",
            apiItem: contextInterface,
        });
    }
    return DocSourceFile({ title, declares }).children(Summary({ type: contextVariable }), ContextSignature({ context: props.context }), ContextAccessor({ context: props.context }), ContextInterface({ context: props.context }), Remarks({
        type: props.context.contextVariable,
    }), SeeAlso({
        type: props.context.contextVariable,
        splitContexts: true,
    }));
}
//# sourceMappingURL=ContextDoc.js.map