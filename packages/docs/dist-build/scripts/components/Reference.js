import { memo, resolve, SourceDirectoryContext, useContext, } from "@alloy-js/core";
import { relative } from "node:path";
export function Reference(props) {
    const resolution = resolve(props.refkey);
    const currentDir = useContext(SourceDirectoryContext).path;
    const link = memo(() => {
        if (resolution.value === undefined) {
            return props.linkText ?? "[unresolved link]";
        }
        else {
            const targetSym = resolution.value.targetDeclaration;
            // initial ../ because the url always contains a trailing slash.
            return `<a href="../${relative(currentDir, targetSym.path).toLowerCase().replace(".mdx", "/")}">${props.linkText ?? targetSym.name}</a>`;
        }
    });
    return link;
}
//# sourceMappingURL=Reference.js.map