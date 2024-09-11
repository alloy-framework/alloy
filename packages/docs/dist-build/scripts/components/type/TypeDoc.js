import { ApiItemKind } from "@microsoft/api-extractor-model";
import { DocSourceFile, Examples, Excerpt, Remarks, SeeAlso, Summary, TypeMembers, } from "../stc/index.js";
export function TypeDoc(props) {
    const apiType = props.type.type;
    const title = apiType.displayName;
    return DocSourceFile({ title, declares: [apiType] }).children(Summary({ type: apiType }), apiType.kind === ApiItemKind.TypeAlias ?
        Excerpt({ excerpt: apiType.excerpt, context: apiType })
        : TypeMembers({ type: apiType }), Remarks({ type: apiType }), Examples({ type: apiType }), SeeAlso({ type: apiType }));
}
//# sourceMappingURL=TypeDoc.js.map