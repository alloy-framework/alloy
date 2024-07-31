import {code, useContext} from "@alloy-js/core";
import {AccessModifier} from "../access-modifier.js";
export interface ClassConstructorProps {
    accessModifier: AccessModifier;
    className: string;
}

export function ClassConstructor (props: ClassConstructorProps) {
    return code`
        ${props.accessModifier} ${props.className}() {
          }
    `;
}

