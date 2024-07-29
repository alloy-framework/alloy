import {children, Children, code} from "@alloy-js/core";
import {ClassConstructor} from "./ClassConstructor.js";

export interface ClassDeclarationProps {
    accessModifier: string;
    className: string;
    children?: Children;
}

export function ClassDeclaration({accessModifier, className, children}: ClassDeclarationProps ) {
    return code`
                ${accessModifier} class ${className} {
                    ${(<ClassConstructor accessModifier={accessModifier} className={className} />)}
                    ${children}
                }
    `
}