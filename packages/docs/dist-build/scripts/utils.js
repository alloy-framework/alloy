import { useContext } from "@alloy-js/core";
import { ApiModelContext } from "./contexts/api-model.js";
export function resolveExcerptReference(excerpt, context) {
    const apiModel = useContext(ApiModelContext);
    if (!excerpt.canonicalReference)
        return;
    return apiModel.resolveDeclarationReference(excerpt.canonicalReference, context).resolvedApiItem;
}
export function cleanExcerpt(excerpt) {
    return excerpt.replace(/^(export |declare )*/, "");
}
//# sourceMappingURL=utils.js.map