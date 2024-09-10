import { stc } from "@alloy-js/core";
import { Scope, SourceDirectory } from "@alloy-js/core/stc";
import { PackageDocContext } from "../contexts/package-docs.js";
export function PackageDocs(props) {
    return stc(PackageDocContext.Provider)({
        value: { name: props.name },
    }).children(SourceDirectory({ path: props.name }).children(Scope({ name: props.name }).children(props.children)));
}
//# sourceMappingURL=PackageDocs.js.map