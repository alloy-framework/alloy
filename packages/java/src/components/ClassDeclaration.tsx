import {children, Children, code} from "@alloy-js/core";
import {ClassConstructor} from "./ClassConstructor.js";

export interface ClassDeclarationProps {
    accessModifier: string;
    className: string;
    children?: Children;
}

export function ClassDeclaration(props: ClassDeclarationProps) {
    return code`
        ${props.accessModifier} class ${props.className} {   
            ${(<ClassConstructor accessModifier={props.accessModifier} className={props.className} />)}
            ${props.children}
        }          
    `;
}