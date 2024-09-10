import { memo, resolve, useContext, } from "@alloy-js/core";
import { relative } from "node:path";
import { ContentRootDir } from "../contexts/content-root-dir.js";
export function Reference(props) {
    const resolution = resolve(props.refkey);
    const rootDir = useContext(ContentRootDir);
    const link = memo(() => {
        if (resolution.value === undefined) {
            return props.linkText ?? "[unresolved link]";
        }
        else {
            const targetSym = resolution.value.targetDeclaration;
            return `<a href="/${relative(rootDir, targetSym.path).toLowerCase().replace(".mdx", "/")}">${props.linkText ?? targetSym.name}</a>`;
        }
    });
    return link;
}
//# sourceMappingURL=Reference.js.map