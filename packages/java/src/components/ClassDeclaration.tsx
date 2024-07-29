import {code} from "@alloy-js/core";
import {ClassConstructor} from "./ClassConstructor.js";

export interface ClassDeclarationProps {
    accessModifier: string;
    className: string;
}

export function ClassDeclaration({accessModifier, className}: ClassDeclarationProps ) {
    return code`
                ${accessModifier} class ${className} {
                    ${(<ClassConstructor accessModifier={accessModifier} className={className} />)}
                }
    `
}