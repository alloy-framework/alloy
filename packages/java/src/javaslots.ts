import { resolveFQN, useContext } from "@alloy-js/core";
import { ProjectContext } from "./components/ProjectDirectory.jsx";

export function resolveJavaFQN(artifactId: string, javaFileName: string, pkg?: string,  memberName?: string, isStatic: boolean = false) {

    const fqn = artifactId + "." + transformJavaFqn(pkg) + "." + javaFileName.replace(".", "_") + (memberName ? isStatic ? "_"  + memberName : "." + memberName : "");
    console.log("Resolved Java FQN", fqn);
    return resolveFQN(fqn)
}

function transformJavaFqn(input?: string): string {
    if (!input) return "";
    const parts = input.split('.');
    return parts
        .map((part, index) => {
            if (index < parts.length) {
                return parts.slice(0, index + 1).join('_');
            }
            return part;
        })
        .join('.');
}