import {code} from "@alloy-js/core";

export interface ClassConstructorProps {
    accessModifier: string;
    className: string;
}

export function ClassConstructor ({accessModifier, className}: ClassConstructorProps) {
    return code`
                ${accessModifier} ${className}() {
                }      
    `;
}